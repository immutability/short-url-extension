# Short URL Extension

Very simple eBay URL shortener extension for Chrome. Unlike the typical URL shorteners, this one does not rely on any 3rd party service. What it actually does is strip all of the unnecessary parts of the item URL, like search parameters or product description, leaving only the bare minimum (the domain and the item ID) for a nice, short URL that's easy to share.

Sample dummy eBay item URL: `https://www.ebay.co.uk/itm/High-quality-hyper-cool-fantastic-near-mint-99MP-digital-camera-black/123456789012?_trkparms=aid%3D12345%26algo%3DREC.SEED%26ao%3D1%26asc%3D20160908105057%26meid%3D123456789123456789%26pid%3D123456`

Would get shortened to: `http://www.ebay.co.uk/itm/123456789012`


## Building

This is a very simple extension consisting of a handful files. The gulp-based build process is only responsible for packaging the extension - there is no real compilation involved. For testing purposes, the extension can be loaded into Chrome (using developer mode) from the ./extension directory directly. Extension reload is required in case the background script or manifest are modified.

Install gulp globally:
```
npm install --global gulp-cli
```

Install the dependencies within the project directory:
```
npm install
```

Run the default gulp task to build the extension ZIP/CRX files inside the ./dist directory. Expects an external build configuration file `build.json` in the root directory, specifying the path to the PEM key file.
```
gulp
```

Sample build.json:
```json
{ "keyfile": "./shorturl.pem" }
```

Other gulp tasks:
```
gulp bump --type major|minor|patch 
```

## Release History

0.2.0 (November 24, 2019)
* supports most eBay sites (18)
* minor UI improvements

0.1 (March 13, 2015)
* initial release supporting eBay.com, eBay.co.uk and eBay.de 