# frozen_string_literal: true

# The Primer Spec theme isn't distributed as a Gem. However, we need to specify
# runtime dependencies so that websites that use the theme don't have to
# manually include the Jekyll plugins in their _config.yml
# Docs: https://jekyllrb.com/docs/themes/#theme-gem-dependencies350
Gem::Specification.new do |s|
  s.name          = 'jekyll-theme-primer-spec'
  s.version       = '1.7.0'
  s.authors       = ['Sesh Sadasivam', 'EECS 485 Staff', 'GitHub, Inc.']
  s.email         = ['sesh.sadasivam@gmail.com', 'eecs485staff@umich.edu', 'open-source@github.com']
  s.homepage      = 'https://github.com/eecs485staff/primer-spec'
  s.summary       = 'Primer Spec is a Jekyll theme for GitHub Pages, designed for hosting project specs'

  s.files         = `git ls-files -z`.split("\x0").select do |f|
    f.match(%r{^(assets|_(includes|layouts|sass)/|(LICENSE|README)((\.(txt|md)|$)))}i)
  end

  s.platform      = Gem::Platform::RUBY
  s.license       = 'MIT'

  s.add_dependency 'jekyll', '> 3.5', '< 4.0'
  s.add_runtime_dependency 'jekyll-github-metadata', '~> 2.9'
  s.add_runtime_dependency 'jekyll-seo-tag', '~> 2.0'
  s.add_runtime_dependency 'jekyll-default-layout'
  s.add_development_dependency 'html-proofer', '~> 3.0'
  s.add_development_dependency 'rubocop', '~> 0.50'
  s.add_development_dependency 'w3c_validators'

  s.required_ruby_version = '> 2.4'
end
