export const state = () => ({
	products: [],
	categories: [],
	category: [] 
})

export const mutations = {
	setProducts(state, data) {
		state.products = data
	},
	setCategory(state, data) {
		state.category = data
	},
	setCategories(state, data) {
		state.categories = data
	},
	removeProducts(state) {
		state.products = []
	}
}

export const actions = {
	setProducts(vuexContext, data) {
		vuexContext.commit('setProducts', data)
	},
	setCategories(vuexContext, data) {
		vuexContext.commit('setCategories', data)
	},
	setCategory(vuexContext, data) {
		vuexContext.commit('setCategory', data)
	},
	removeProducts(vuexContext) {
		vuexContext.commit('removeProducts')
	}
}	

export const getters = {
	showProducts(state) {
		return state.products
	},
	loadedCategories(state) {
		return state.categories
	},
	loadedCategory(state) {
		return state.category
	}
}