import Vue from 'vue';
import VueCarousel from 'vue-carousel';
Vue.use(VueCarousel);

export default ({ app }, inject) => {
 
	inject('VueCarousel', VueCarousel)
}