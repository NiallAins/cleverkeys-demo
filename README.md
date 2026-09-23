# Clever Keys Demo

A public demo version of the CleverKeys app

## Dev

### Init:
  - Requires NODE, PHP7, Composer
  - `git pull`
  - `npm install`
  - `composer install`
  - Move `/vender` into `/public`
  - `npm run serve`

### Deploy:
  - `npm run build --prod`
  - FTP contents of `/dist' using regular FTP
    - For front-end only changes, FTP only `/dist/index`, `/dist/css`, `/dist/js`
    - Update `/images`, `/media` (music files), `/data` as needed