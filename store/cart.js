export const state = () => ({
	productsInCart: []
})

export const mutations = {
	addProducts(state, data) {
		state.productsInCart.push(data)
	},
	removeProducts(state, data) {
		let a = state.productsInCart.findIndex(el => data.id === el.id)
		console.log(a)
	}
}

export const actions = {
	addProduct(vuexContext, data) {
		vuexContext.commit('addProducts', data)
	},
	removeProduct(vuexContext, data) {
		vuexContext.commit('removeProducts', data)
	}
}	

export const getters = {
	cartProducts(state) {
		return state.productsInCart
	}
}