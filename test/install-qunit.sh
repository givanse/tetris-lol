#!/bin/bash

set -e

cd qunit

rm qunit-* || true

wget http://code.jquery.com/qunit/qunit-1.14.0.js
ln -vfs qunit-1.14.0.js qunit.js

wget http://code.jquery.com/qunit/qunit-1.14.0.css
ln -vfs qunit-1.14.0.css qunit.css

ls -l

exit 0
#EOF
