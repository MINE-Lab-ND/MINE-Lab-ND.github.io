source "https://rubygems.org"

# Jekyll and core dependencies
gem "jekyll", "~> 4.3.0"
gem "webrick", "~> 1.7"

# Ruby 3.4 compatibility - standard library gems that are no longer bundled
gem "csv"
gem "logger"
gem "base64"
gem "bigdecimal"
gem "ostruct"

group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-seo-tag", "~> 2.7"
end

# Windows timezone data
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end
