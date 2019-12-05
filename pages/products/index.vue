<template>
	<div>
		<Navbar />
		<Header />
		<div class="col mt-2">
		<CardProduct  
			class="mb-4"
			v-for="item in showProducts"
			:product="item"
			:key="item.id" />
	</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from '@/components/Navbar'
import Header from '@/components/Header'
import CardProduct from '@/components/CardProduct'

export default {
	components: {
		Navbar,
		Header,
		CardProduct
	},
	data() {
		return {
			isVisible: false
		}
	},
  computed: {
		...mapGetters({
			showProducts: "products/showProducts"
		}),
		noProducts() {
			return this.showProducts == 0
		},
		reloadProducts(noProducts) {
			this.$repositories.products.showProducts()
				.then(res => {
					const items = JSON.parse(res)
					this.$store.dispatch('products/setProducts', items)
				})
				.catch(e => console.log(e))
		}
	}
};
</script>

<style lang="scss">
	
</style>