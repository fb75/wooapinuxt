<template>
	<div class="toggler">
		<fa :icon="faChevronUp" @click="$emit('toggle')"/>
	</div>
</template>

<script>
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'

export default {
	computed: {
		faChevronUp() {
			return faChevronUp
		}
	}
};
</script>
<style lang="scss" scoped>
	@media screen and(max-width: 767.68px) {
		.toggler {
			display: none;			
		}
	}
	@media screen and (min-width: 768px) {
		.toggler {
	    width: 100%;
	    height: 4em;
	    padding: 0;
	    margin: 0;
	    display: flex;
	    align-items: center;
	    justify-content: center;
	    position: sticky;
		}
	}

</style>