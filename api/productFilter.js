const express = require('express');
const router = express.Router();
const WooCommerce = require('./woocommerce');

let wooCurrentCategory;

router.get('/', (req, res) => {
	let id = req.params.id;
	console.log(id)
	wooCurrentCategory = WooCommerce.getAsync(`products?category=${id}`)
	  .then(res => {
	    if (res) {
	      // wooCurrentCategory = res.body;
	      console.log(res.body);
	    }
	  })
	  .catch(e => {
	    console.log('filtered woocat error' + e);
	  })
	res.json(wooCurrentCategory);  
});
  


module.exports = router;


