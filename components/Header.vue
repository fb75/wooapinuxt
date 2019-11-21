<template>
		<header role="navigation">
			<!-- <Navbar v-if="isVisible" /> -->
			<p>Nuxt.js + Woocommerce API Ecommerce</p>
			<Hamburger @navActive="changeVisibility" />
		</header>
</template>

<script>
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
	methods: {
		changeVisibility() {
			this.isVisible = !this.isVisible
			this.$store.dispatch('ui/toggleNavbar', this.isVisible)
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
		justify-content: flex-end;
		width: 100vw;
		height: 10vh;
		background: #fff;
		border-bottom: .1em solid lightgrey;
		z-index: 997;
		p {
			margin-right: 1em;
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