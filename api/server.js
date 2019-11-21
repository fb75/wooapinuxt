const rootCa = require('./rootCas')
const express = require("express");
const app = express();
const WooCommerce = require('./woocommerce');

app.use(express.json());

var wooproducts;
var woocategories;
var wooCurrentCategory;

var id;
if(WooCommerce) console.log('Woocommerce found!');

wooproducts = WooCommerce.getAsync('products?filter[limit]=-1')
  .then(res => {
    if(res) {
      wooproducts = res.body;
      console.log('[res WOOPRODUCTS]', wooproducts)
    }
    else console.log('no result!');
  })
  .catch(e => console.log('wooerror' + e))  

app.get('/', (req, res) => {
  res.json(wooproducts);
});

woocategories = WooCommerce.getAsync('products/categories')
  .then(res => {
    if(res) {
      woocategories = res.body;
      console.log('[res WOOCATEGORIES]', res.body);
    } else console.log('no categories result!')
  })
  .catch(e => console.log('categories error' + e))

app.get('/categories', (req, res) => {
  res.json(woocategories);
});

app.get('/categories/:id', (req, res, next) => {
  let id = req.params.id;
  
  let wooCurrentCategory = WooCommerce.getAsync(`products?category=${id}`)
  .then(response => {
    if(response) {
      wooCurrentCategory = response.body;
      console.log('[FILTERED WOO CATEGORY]', wooCurrentCategory);
      return wooCurrentCategory;
    }
  })
  .then(wooCurrentCategory => {
    res.json(wooCurrentCategory);
  })
  .catch(e => {
    console.log('filtered woocat error' + e);
  })
 });

module.exports = {
  path: '/api/server',
  handler: app
};
