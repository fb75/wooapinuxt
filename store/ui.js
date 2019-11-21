export const state = () => ({
	navbarActive: false,
	panelActive: false
})

export const mutations = {
	toggleNavbar(state, data) {
		state.navbarActive = data
	},
	togglePanel(state, data) {
		state.panelActive = data
	}
}

export const actions = {
	toggleNavbar(vuexContext, data) {
		vuexContext.commit('toggleNavbar', data)
	},
	togglePanel(vuexContext, data) {
		vuexContext.commit('togglePanel', data)
	}
}	

export const getters = {
	navbarState(state) {
		return state.navbarActive
	},
	panelState(state) {
		return state.panelActive
	}
}