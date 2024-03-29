import execa from 'execa';
import fs from 'fs-extra';
import Listr from 'listr';
import path from 'path';
import semver from 'semver';
import yargs from 'yargs';

const ROOT_PATH = path.resolve(__dirname, '../');
const VERSION_FILEPATH = path.resolve(ROOT_PATH, 'VERSION');
const VERSION_RAW = fs.readFileSync(VERSION_FILEPATH, 'utf-8');
const CURRENT_VERSION = semver.coerce(VERSION_RAW);
if (CURRENT_VERSION == null) {
  throw new Error('CURRENT_VERSION is unexpectedly null');
}

function freezeAssetsForVersion(version_str: string) {
  const assets_path = path.resolve(ROOT_PATH, 'assets', version_str);
  return new Listr([
    {
      // (1) Run a CI Build to generate the right CSS/JS assets
      title: 'script/cibuild',
      task: async () => {
        const cibuild_script_path = path.join(ROOT_PATH, 'script/cibuild');
        await execa(cibuild_script_path);
      },
    },
    {
      // (2) Delete original SCSS/JS assets from the assets directory
      title: `Delete assets/${version_str}`,
      task: async () => {
        await fs.remove(assets_path);
      },
    },
    {
      // (3) Copy over the generated CSS/JS assets
      title: `Copy _site/assets/${version_str} --> assets/${version_str}`,
      task: async () => {
        const generated_assets_path = path.resolve(
          ROOT_PATH,
          '_site/assets',
          version_str,
        );
        await fs.mkdir(assets_path);
        await fs.copy(generated_assets_path, assets_path);
      },
    },
  ]);
}

yargs
  .scriptName('version')
  .command(
    'bump <release_type>',
    'bump the minor/major version of the develop branch by creating the appropriate asset files',
    (yargs) => {
      yargs.positional('release_type', {
        describe: 'the type of semver version bump',
        choices: ['major', 'minor', 'patch'],
      });
    },
    async (argv) => {
      const release_type = argv.release_type;
      switch (release_type) {
        case 'major':
        case 'minor':
        case 'patch':
          break;
        default:
          console.log(
            '❌ Invalid release_type supplied. Expected "major" or "minor".',
          );
          console.log(
            'Please see the usage instructions with the --help option.',
          );
          return;
      }

      // Need to "coerce" to clone the semver object
      const next_version = semver
        .coerce(`${CURRENT_VERSION}`)
        ?.inc(release_type);
      if (next_version == null) {
        throw new Error('next_version is unexpectedly null');
      }

      console.log(`Bumping v${CURRENT_VERSION} --> v${next_version}.d`);

      let tasks: null | Listr<Listr.ListrContext> = null;

      if (release_type === 'patch') {
        // ONLY update the VERSION file
        tasks = new Listr([
          {
            // Write to the VERSION file
            title: 'Update VERSION file',
            task: async () => {
              await fs.writeFile(VERSION_FILEPATH, `${next_version}.d`);
            },
          },
        ]);
      } else {
        const old_version_str = `v${CURRENT_VERSION.major}.${CURRENT_VERSION.minor}`;
        const new_version_str = `v${next_version.major}.${next_version.minor}`;
        tasks = new Listr([
          {
            // (1) Create the new assets directory
            title: `Create new assets directory: assets/${new_version_str}`,
            task: async () => {
              await fs.copy(
                path.resolve(ROOT_PATH, `assets/${old_version_str}`),
                path.resolve(ROOT_PATH, `assets/${new_version_str}`),
              );
            },
          },
          {
            // (2) Freeze the CSS/JS assets
            title: `Freeze generated CSS/JS assets for ${old_version_str}`,
            task: () => freezeAssetsForVersion(old_version_str),
          },
          {
            // (3) Write to the VERSION file
            title: 'Update VERSION file',
            task: async () => {
              await fs.writeFile(VERSION_FILEPATH, `${next_version}.d`);
            },
          },
          {
            // (4) Update the version in _layouts/spec.html
            title: 'Update _layouts/spec.html',
            task: async () => {
              const spec_layout = await fs.readFile(
                path.resolve(ROOT_PATH, '_layouts/spec.html'),
                'utf-8',
              );
              await fs.writeFile(
                path.resolve(ROOT_PATH, '_layouts/spec.html'),
                spec_layout.replace(
                  /version_string: v\d+\.\d+/g,
                  `version_string: ${new_version_str}`,
                ),
              );
            },
          },
        ]);
      }
      tasks.run().catch((err) => {
        console.error(err);
      });
    },
  )
  .command(
    'freeze',
    'freeze the current develop version',
    () => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_argv) => {
      // Write to the VERSION file
      fs.writeFileSync(VERSION_FILEPATH, `${CURRENT_VERSION}`);
      console.log(`Version frozen to v${CURRENT_VERSION}`);
    },
  )
  .help()
  .version(false)
  .demandCommand().argv;
