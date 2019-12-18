<template>
	<div>
		<Navbar />
		<Header />
		<div class="col mt-2 product-list">
			<div class="w-100">
				<h3>Products in carts</h3>
				<div class="d-flex justify-content-between align-items-center" v-for="product in cartProducts">
					<img :src="product.images[0].src" width="100" alt="">
					<div class="descr" v-html="product.description"></div>
						€ {{product.price}}	
	      	  <fa :icon="faMinusSquare" class="ml-1" @click="removeFromCart(product)"/>
        </div>
					<hr style="color: black; width: 100%;">
					<div class="total"><strong>Total to pay</strong><strong>€ {{totalAmount}}</strong></div>
			</div>
			<p v-if="!productsInCart">No products in cart found</p>
		</div>
		<Footer />
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { faMinusSquare } from '@fortawesome/free-solid-svg-icons'
import Navbar from '@/components/Navbar'
import Header from '@/components/Header'
import CardProduct from '@/components/CardProduct'
import Footer from '@/components/Footer'

export default {
	components: {
		Navbar,
		Header,
		CardProduct
	},
	computed: {
		...mapGetters({
			cartProducts: 'cart/cartProducts',
			totalAmount: 'cart/totalAmount'
		}),
		productsInCart() {
			return this.cartProducts.length > 0
		},
    faMinusSquare() {
      return faMinusSquare
    }
	},
	methods: {
	  removeFromCart(product) {
      if(!product.isOnCart) {
        return
      }
      product.isOnCart = false
      this.$store.dispatch('cart/removeProduct', product)
    }
	}
};
</script>

<style lang="scss" scoped>
@media screen and(max-width: 768px) {

	.fa-minus-square {
		color: lightblue;

	}
}
</style>