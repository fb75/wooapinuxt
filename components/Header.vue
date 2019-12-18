<template>
		<header role="navigation">
			<fa v-if="canGoBack" :icon="faArrowLeft" @click="onClickBack" />
			<p @click="$router.replace('/')">Nuxt.js + WC-API Ecommerce</p>
			<div class="cart">
				<b-badge variant="primary" v-if="cartProducts.length > 0">{{cartProducts.length}}</b-badge>
				<fa :icon="faShoppingCart" @click="viewCart" />
			</div>
			<Hamburger @navActive="changeVisibility" />
		</header>
</template>

<script>
import { mapGetters } from 'vuex'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import Hamburger from '@/components/Hamburger'
import Navbar from '@/components/Navbar'

export default {
	components: {
		Hamburger,
		Navbar
	},
	data() {
		return {
			isVisible: true
		}
	},
	computed: {
		faArrowLeft() {
      return faArrowLeft
    },
    faShoppingCart() {
      return faShoppingCart
    },
  	canGoBack() {
    	return this.$route.name !== 'index'
  	},
  	 ...mapGetters({
      cartProducts: "cart/cartProducts"
    })
	},
	methods: {
		changeVisibility() {
			this.isVisible = !this.isVisible
			this.$store.dispatch('ui/toggleNavbar', this.isVisible)
		},
		onClickBack() {
      const routeName = this.$route.name
        switch(routeName) {
	        case 'products':
            this.$router.replace('/')
          break    
          case 'cart':
          	this.$router.replace('/products')      
        default: break
      }
    },
    viewCart() {
    	this.$router.push('/cart')
    }
	}
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 768px) {
	header {
		position: sticky;
		top: 0;
		left:0;
		display: flex;
		align-items: center;
		align-content: center;
		justify-content: center;
		width: 100vw;
		height: 10vh;
		background: #fff;
		border-bottom: .1em solid lightgrey;
		z-index: 997;
		
		.fa-arrow-left {
			position: absolute;
	  	left: 1em;
	  	cursor: pointer;
		}
		
		.cart {
			display: flex;
			flex-flow: column;
			height: 100%;
			align-items: center;
			justify-content: center;
			padding: 1em;
			.badge {
				border-radius: 50px;
			}
			.fa-shopping-cart {

			}
		}
		
		p {
			position: relative;	
		}
	}
}

@media screen and (min-width: 768.98px) {
	header {
		position: fixed;
		width: 100%;
		top: 0;
		left:0;
		z-index: 999;

		.fa-shopping-cart, p {
			display: none;
		}
	}
}

</style>