#!/bin/bash

# Generate all the icon sizes, for different platforms, from a single PNG file.
#
#
# This only works when you are using PhoneGap Build to build your 
# application, not when you are building locally. If you are building 
# locally you must actually put the images in the appropriate folders for each 
# platform manually. 
# stackoverflow.com/questions/15018098
# stackoverflow.com/questions/12329554
#
# Dependency:
#     sudo apt-get install imagemagick
#
# Usage examples:
#     ./create-phonegap-icons.sh my_pretty_icon.png
#

set -e

cd www/

original_icon_file=$1

convert $original_icon_file -resize 128 icon.png
convert $original_icon_file -resize 170x200 'img/logo.png'

# android
icons_path_android='res/icon/android/'
convert $original_icon_file -resize 36 $icons_path_android'icon-36-ldpi.png'
convert $original_icon_file -resize 48 $icons_path_android'icon-48-mdpi.png'
convert $original_icon_file -resize 72 $icons_path_android'icon-72-hdpi.png'
convert $original_icon_file -resize 96 $icons_path_android'icon-96-xhdpi.png'

# ios
icons_path_ios='res/icon/ios/'
convert $original_icon_file -resize 114 $icons_path_ios'icon-57-2x.png'
convert $original_icon_file -resize 57 $icons_path_ios'icon-57.png'
convert $original_icon_file -resize 144 $icons_path_ios'icon-72-2x.png'
convert $original_icon_file -resize 72 $icons_path_ios'icon-72.png'

exit
#EOF
