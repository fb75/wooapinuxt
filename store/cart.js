export const state = () => ({
	productsInCart: [],
	totalAmount: 0
})

export const mutations = {
	addProducts(state, data) {
		state.productsInCart.push(data)
	},
	addAmount(state, data) {
		state.totalAmount += data
	},
	removeAmount(state, data) {
		state.totalAmount -= data
	},
	removeProducts(state, data) {
		let pos = state.productsInCart.findIndex(el => data.id === el.id)
		state.productsInCart.splice(pos, 1)
	}
}

export const actions = {
	addProduct(vuexContext, data) {
		vuexContext.commit('addAmount', parseInt(data.price))
		vuexContext.commit('addProducts', data)
	},
	removeProduct(vuexContext, data) {
		vuexContext.commit('removeAmount', parseInt(data.price))
		vuexContext.commit('removeProducts', data)
	}
}	

export const getters = {
	cartProducts(state) {
		return state.productsInCart
	},
	totalAmount(state) {
		return state.totalAmount
	}
}