var WooCommerceAPI = require('woocommerce-api');

var WooCommerce = new WooCommerceAPI({
  url: 'https://localhost/wc-api',
  consumerKey: 'ck_2d1afb8166a3c3718526981558560cc9cd86c08f',
  consumerSecret: 'cs_771e545ce264ec7fb01df2ad56c5ad0c273373bf',
  wpAPI: true,
  version: 'wc/v3'
});

module.exports = WooCommerce;