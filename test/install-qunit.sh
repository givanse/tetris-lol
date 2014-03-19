#!/bin/bash

# Execute this script from the root folder of this repo.

set -e

cd test/qunit

rm qunit-* || true

wget http://code.jquery.com/qunit/qunit-1.14.0.js
ln -vfs qunit-1.14.0.js qunit.js

wget http://code.jquery.com/qunit/qunit-1.14.0.css
ln -vfs qunit-1.14.0.css qunit.css

ls -l

exit 0
#EOF
