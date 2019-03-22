Gem::Specification.new do |s|
  s.name          = 'jekyll-theme-primer-spec'
  s.version       = '0.1.0'
  s.authors       = ['EECS 485 Staff', 'GitHub, Inc.']
  s.email         = ['eecs485staff@umich.edu', 'open-source@github.com']
  s.homepage      = 'https://github.com/eecs485staff/primer-spec'
  s.summary       = 'Primer Spec is a Jekyll theme for GitHub Pages, designed for hosting project specs'

  s.files         = `git ls-files -z`.split("\x0").select do |f|
    f.match(%r{^(assets|_(includes|layouts|sass)/|(LICENSE|README)((\.(txt|md)|$)))}i)
  end

  s.platform      = Gem::Platform::RUBY
  s.license       = 'MIT'

  s.add_dependency 'jekyll', '> 3.5', '< 5.0'
  s.add_runtime_dependency 'jekyll-github-metadata', '~> 2.9'
  s.add_runtime_dependency 'jekyll-seo-tag', '~> 2.0'
  s.add_development_dependency 'html-proofer', '~> 3.0'
  s.add_development_dependency 'rubocop', '~> 0.50'
  s.add_development_dependency 'w3c_validators', '~> 1.3'
end
