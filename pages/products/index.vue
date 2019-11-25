<template>
	<div>
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
import Header from '@/components/Header'
import CardProduct from '@/components/CardProduct'

export default {
	components: {
		Header,
		CardProduct
	},
  computed: {
		...mapGetters({
			showProducts: "products/showProducts"
		})
	}
};
</script>

<style lang="scss" scoped>
	
</style>