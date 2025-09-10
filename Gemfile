source "https://rubygems.org"

# Jekyll and core dependencies - compatible with Ruby 2.6
gem "jekyll", "~> 3.9.0"
gem "webrick", "~> 1.7"

# Compatible versions for Ruby 2.6
gem "public_suffix", "~> 5.1.1"
gem "rouge", "~> 3.30.0"
gem "kramdown-parser-gfm", "~> 1.1.0"

group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.15"
  gem "jekyll-seo-tag", "~> 2.6"
end

# Windows timezone data
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end
