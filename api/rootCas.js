'use-strict';
const https = require('https')
const fs = require('fs-extra')

// using mkcert utility for generating local development self signed certs
// cat localhost.pem rootCA.pem > chain.pem
// only fullchain cert needed (not the key)

let rootCas = fs.readFileSync('chain.pem');
https.globalAgent.options.ca = rootCas;

module.exports = rootCas;