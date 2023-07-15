#!/usr/bin/env sh

# abort on errors
set -e

# do this on a special branch!
git branch -d gh-pages || true
git checkout -b gh-pages

# clear output folder, then rebuild
rm -rf .output
npm run generate

# prevent Github Pages returning 404 for files/dirs starting with an underscore
touch dist/.nojekyll

# delete unnecessary files
cd ..
mv nuxt_app/dist/* ./
rm -r nuxt_app
cd -

git add -A
git commit -m 'deploy'
git push -f
