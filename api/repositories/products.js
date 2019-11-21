export default $axios => ({
	showProducts() {
    return $axios.$get('/api/server')
  },
  getCategories() {
  	return $axios.$get('/api/server/categories')
  },
  filterCategories(id) {
  	return $axios.$get(`/api/server/categories/${id}`)
  }
})