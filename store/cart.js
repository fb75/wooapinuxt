export const state = () => ({
	productsInCart: []
})

export const mutations = {
	addProducts(state, data) {
		state.productsInCart.push(data)
	}
}

export const actions = {
	addProduct(vuexContext, data) {
		vuexContext.commit('addProducts', data)
	}
}	

export const getters = {
	cartProducts(state) {
		return state.productsInCart
	}
}