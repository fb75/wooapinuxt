<template>
		<header role="navigation">
			<fa v-if="canGoBack" :icon="faArrowLeft" @click="onClickBack" />
			<p>Nuxt.js + WC-API Ecommerce</p>
			<Hamburger @navActive="changeVisibility" />
		</header>
</template>

<script>
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
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
  	canGoBack() {
    	return this.$route.name !== 'index'
  	}
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
        default: break
      }
    }
	}
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 767.98px) {
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
		
		p {
			position: relative;	
		}
	}
}

@media screen and (min-width: 768px) {
	header {
		position: fixed;
		width: 100%;
		top: 0;
		left:0;
		z-index: 999;
	}
}

</style>