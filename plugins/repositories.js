import products from '~/api/repositories/products.js'
 
export default (ctx, inject) => {
	
	const repositories = {
		products: products(ctx.$axios)
	}

	inject('repositories', repositories)
}