#!/bin/bash

set -e

git branch -D gh-pages    || true
git push origin :gh-pages || true

git checkout --orphan gh-pages

git rm -r -f test/
git rm -r -f readme.md
git rm -r -f .gitignore
git rm -r -f deploy.sh

git commit -m 'deploy'

git push origin gh-pages

git status

git checkout master

exit
#EOF
