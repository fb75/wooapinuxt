<template>
	<div>
		<Navbar />
		<Header />
		<UIMenu />
		<div class="col mt-2 product-list">
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
import UIMenu from '@/components/UIMenu'
import CardProduct from '@/components/CardProduct'

export default {
	components: {
		Navbar,
		Header,
		UIMenu,
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
		})
	},
	created() {
		if(this.showProducts == 0) {
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

<style lang="scss" scoped>
	@media screen and (max-width: 768px) {
		.product-list {
			display: grid;
			grid-template-columns: repeat(2, auto);
			grid-gap: .5em;
		}
	}
</style>