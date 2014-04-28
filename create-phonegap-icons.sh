#!/bin/bash

#
# Generate all the icon sizes from a single PNG file.
#
# Dependency:
#     sudo apt-get install imagemagick
#
# Usage examples:
#     ./create-phonegap-icons.sh www/img/tlol.png
#

set -e

original_icon_file=$1
echo $original_icon_file

# android
icons_path_android='platforms/android/res/'
convert -verbose $original_icon_file -resize 96 $icons_path_android'drawable/icon.png'
convert -verbose $original_icon_file -resize 72 $icons_path_android'drawable-hdpi/icon.png'
convert -verbose $original_icon_file -resize 36 $icons_path_android'drawable-ldpi/icon.png'
convert -verbose $original_icon_file -resize 48 $icons_path_android'drawable-mdpi/icon.png'
convert -verbose $original_icon_file -resize 96 $icons_path_android'drawable-xhdpi/icon.png'

exit
#EOF
