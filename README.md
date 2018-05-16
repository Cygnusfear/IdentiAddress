# IdentiAddress

![IndentiAddress with the Underline feature enabled](/promo/screenshot_underline.png?raw=true "IndentiAddress using the underline option")

IdentiAddress is a proof of concept chrome plugin that changes the appearance of Ethereum addresses in the browser to be more legible and recognizable. Addresses as currently used are akin to using IP addresses on the web. They are long strings of characters, that are hard to checksum for a human being. They are a security issue to both experienced and novice users alike, causing them to be very hard to distinguish and verify.

This plugin hashes addresses on webpages visited and changes them to make them easily recognisable to any user, even with only the first characters of the address being displayed. Because the addresses are being hashed even a single character difference between addresses will make them look completely different, making it much harder to trick the user. This proof of concept contains various experiments with formatting, such as using blocks, underlines, emoticons etcetera which can be found in the IdentiAddress.js file.

And a big thank you to the original Ethereum Identicons and Ethereum Address Lookup (https://bit.ly/2ku7nko) for the inspiration.

## Installation

	$ npm install

## Usage

Run `$ gulp --watch` and load the `dist`-directory into chrome.

## Entryfiles (bundles)

There are two kinds of entryfiles that create bundles.

1. All js-files in the root of the `./app/scripts` directory
2. All css-,scss- and less-files in the root of the `./app/styles` directory

## Tasks

### Build

    $ gulp


| Option         | Description                                                                                                                                           |
|----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| `--watch`      | Starts a livereload server and watches all assets. <br>To reload the extension on change include `livereload.js` in your bundle.                      |
| `--production` | Minifies all assets                                                                                                                                   |
| `--verbose`    | Log additional data to the console.                                                                                                                   |
| `--vendor`     | Compile the extension for different vendors (chrome, firefox, opera, edge)  Default: chrome                                                                 |
| `--sourcemaps` | Force the creation of sourcemaps. Default: !production                                                                                                |


### pack

Zips your `dist` directory and saves it in the `packages` directory.

    $ gulp pack --vendor=firefox

### Version

Increments version number of `manifest.json` and `package.json`,
commits the change to git and adds a git tag.


    $ gulp patch      // => 0.0.X

or

    $ gulp feature    // => 0.X.0

or

    $ gulp release    // => X.0.0


## Globals

The build tool also defines a variable named `process.env.NODE_ENV` in your scripts. It will be set to `development` unless you use the `--production` option.


**Example:** `./app/background.js`

```javascript
if(process.env.NODE_ENV === 'development'){
  console.log('We are in development mode!');
}
```






