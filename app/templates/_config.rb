# Require any additional compass plugins here.
# install sass-globbing from here https://github.com/chriseppstein/sass-globbing
require 'sass-globbing'
require 'susy'

# Autoprefixer https://github.com/ai/autoprefixer
# See install instructions under the Compass heading
# require 'autoprefixer-rails' # remove prefixes not needed
# require 'csso'

# on_stylesheet_saved do |file|
#   css = File.read(file)
#   File.open(file, 'w') do |io|
#     # io << Csso.optimize( AutoprefixerRails.compile(css) ) # use this for compressed files
#     io << AutoprefixerRails.compile(css, ["last 2 versions", "ie 8"])
#   end
# end

# Set this to the root of your project when deployed:
http_path = "<%= configRbPath %>"
css_dir = "css"
sass_dir = "css/sass"
images_dir = "images"
javascripts_dir = "js"

# dev environment settings
if environment == :development
  line_comments = true
  output_style = :expanded
end

# production environment settings
if environment == :production
  line_comments = false
  output_style = :compressed
end

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
# output_style = :compact

# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
# line_comments = false


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass css/sass scss && rm -rf sass && mv scss sass
