<template>
	<div>
		<Navbar />
		<Header />
		<div class="col mt-2 product-list">
			<CardProduct 
				v-if="productsInCart" 
				class="mb-4"
				v-for="item in cartProducts"
				:product="item"
				:key="item.id" />
			<p v-else>No products in cart found</p>
		<!-- <p v-else>No products in cart!</p> -->
		</div>
		<Footer />
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from '@/components/Navbar'
import Header from '@/components/Header'
import CardProduct from '@/components/CardProduct'
import Footer from '@/components/Footer'

export default {
	components: {
		Navbar,
		Header,
		CardProduct,
	},
	computed: {
		...mapGetters({
			cartProducts: 'cart/cartProducts'
		}),
		productsInCart() {
			return this.cartProducts.length > 0
		}
	}
};
</script>

<style lang="scss" scoped>
	
</style>