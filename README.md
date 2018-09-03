# gatsby-plugin-zopfli

[![Travis](https://img.shields.io/travis/com/ovhemert/gatsby-plugin-zopfli.svg?branch=master&logo=travis)](https://travis-ci.com/ovhemert/gatsby-plugin-zopfli)
[![AppVeyor](https://img.shields.io/appveyor/ci/ovhemert/gatsby-plugin-zopfli.svg?logo=appveyor)](https://ci.appveyor.com/project/ovhemert/gatsby-plugin-zopfli)
[![Dependencies](https://img.shields.io/david/ovhemert/gatsby-plugin-zopfli.svg)](https://david-dm.org/ovhemert/gatsby-plugin-zopfli)
[![Dependencies](https://img.shields.io/david/ovhemert/gatsby-plugin-zopfli.svg)](https://david-dm.org/ovhemert/gatsby-plugin-zopfli)
[![Known Vulnerabilities](https://snyk.io/test/npm/gatsby-plugin-zopfli/badge.svg)](https://snyk.io/test/npm/gatsby-plugin-zopfli)
[![Coverage Status](https://coveralls.io/repos/github/ovhemert/gatsby-plugin-zopfli/badge.svg?branch=master)](https://coveralls.io/github/ovhemert/gatsby-plugin-zopfli?branch=master)
[![Greenkeeper badge](https://badges.greenkeeper.io/ovhemert/gatsby-plugin-zopfli.svg)](https://greenkeeper.io/)
[![npm](https://img.shields.io/npm/v/gatsby-plugin-zopfli.svg)](https://www.npmjs.com/package/gatsby-plugin-zopfli)
[![npm](https://img.shields.io/npm/dm/gatsby-plugin-zopfli.svg)](https://www.npmjs.com/package/gatsby-plugin-zopfli)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)

Gatsby plugin for preparing zopfli-compressed gzip versions of assets.

The Zopfli Compression Algorithm is a new, open sourced data compression library. It creates a smaller output size, typically 3–8% smaller compared to zlib at maximum compression

The compression method is best suited for static web content, files that don't change that often and that generate a lot of traffic. That's because Zopfli uses two to three times more CPU time than zlib at maximum quality.

Files compressed with Zopfli can be decompressed with existing methods on the client and there will be no performance penalty at this end.

```bash
/webpack-runtime-cde5506958f1afc4d89e.js
```
becomes
```bash
/webpack-runtime-cde5506958f1afc4d89e.js.gz
```

## Installation

With npm:

```bash
npm install --save gatsby-plugin-zopfli
```

Or with Yarn:

```bash
yarn add gatsby-plugin-zopfli
```

## Usage

In your `gatsby-config.js` file add:

```javascript
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-zopfli'
    }
  ]
}
```

## Maintainers

**Osmond van Hemert**

[![Github](https://img.shields.io/badge/style-github-333333.svg?logo=github&logoColor=white&label=)](https://github.com/ovhemert)
[![NPM](https://img.shields.io/badge/style-npm-333333.svg?logo=npm&logoColor=&label=)](https://www.npmjs.com/~ovhemert)
[![Twitter](https://img.shields.io/badge/style-twitter-333333.svg?logo=twitter&logoColor=&label=)](https://twitter.com/osmondvanhemert)
[![Web](https://img.shields.io/badge/style-website-333333.svg?logoColor=white&label=&logo=diaspora)](https://www.osmondvanhemert.nl)

## Contributing

See the [CONTRIBUTING.md](./docs/CONTRIBUTING.md) file for details.

## Donations

Want to help me out by giving a donation? Check out these options:

[![Patreon](https://img.shields.io/badge/style-patreon-333333.svg?logo=patreon&logoColor=&label=)](https://www.patreon.com/ovhemert)
[![Coinbase](https://img.shields.io/badge/style-bitcoin-333333.svg?logo=bitcoin&logoColor=&label=)](https://commerce.coinbase.com/checkout/fd177bf0-a89a-481b-889e-22bfce857b75)
[![PayPal](https://img.shields.io/badge/style-paypal-333333.svg?logo=paypal&logoColor=&label=)](https://www.paypal.me/osmondvanhemert)
[![Ko-fi](https://img.shields.io/badge/style-coffee-333333.svg?logo=ko-fi&logoColor=&label=)](http://ko-fi.com/ovhemert)

## License

Licensed under [MIT](./LICENSE).

_NOTE: This plugin only generates output when run in `production` mode! To test, run: `gatsby build && gatsby serve`_
