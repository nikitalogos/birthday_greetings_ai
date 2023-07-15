#!/usr/bin/env sh

# abort on errors
set -e

# fetch repo remote url
REPO_URL=$(git config --get remote.origin.url)

# clear output folder
rm -rf .output

# build
npm run generate

# navigate into the build output directory
cd dist

# workaround for github pages.
# Explaination: https://learnvue.co/2020/09/how-to-deploy-your-vue-app-to-github-pages/#tip-handling-vue-router-with-a-custom-404-page-->
# seems that it's not needed for nuxt
# cp index.html 404.html

# if you are deploying to a custom domain
echo 'logosnikita.com' > CNAME

# prevent Github Pages returning 404 for files/dirs starting with an underscore
touch .nojekyll

git init
git remote add origin "$REPO_URL"
git config --add --local core.sshCommand 'ssh -i ~/.ssh/id_github_nikita_logos'
git config user.email "thelogosnik@gmail.com"

git checkout -b gh-pages
git add -A
git commit -m 'deploy'
git push -f origin gh-pages

cd -
