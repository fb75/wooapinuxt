<template>
    <transition-group tag="div" name="fade" mode="out-in" appear>
    <div class="card-product" :key="product.id">
      <div class="header">
        <div class="img-cont">
        	<fa 
            v-if="product.short_description != ''" 
            @click="info" :icon="faEllipsisV" />
          <img :src="product.images[0].src" v-if="product.images.length > 0" alt="no-image" />
          <div
            :class="{'short-descr': !clicked, 'short-descr active': clicked}"
            v-if="product.short_description !== null && product.short_description.length !== 0"
            v-html="product.short_description"
          >
          </div>
          <div class="alt-image" v-if="(product.images.length <= 0)">
          </div>
        </div>
      </div>  
      <div :key="product.id" class="header-description">
        <h3 class="product-title" v-html="product.name"></h3>
        <div class="prod-price">
          <div class="regular-price">
            <div :class="{'line': product.on_sale}" v-html="product.regular_price"></div>
            <p :class="{'line': product.on_sale}">€</p>
          </div>
          <div class="sale-price">
            <div v-if="product.on_sale" v-html="product.sale_price"></div>
            <p v-if="product.sale_price">€</p>
          </div>
        </div>
        <div class="product-description">
          <div class="description text-center" v-html="product.description"></div>
        </div>
        <button
          v-if="!isOnCart" 
          class="cta-cart"
          @click="addToCart(product)">
          <p>Add to Cart</p>
        	<fa :icon="faCartPlus" />
        </button>
        <button
          v-if="isOnCart"
          class="cta-remove"
          @click="removeFromCart(product)">
          <p>Remove</p>
          <fa :icon="faMinusSquare" class="pl-1 pr-1" />
        </button>
        <div class="product-categories">
          <p>{{product.categories[0].name}}</p>
          <p v-if="product.categories[1] != null">{{product.categories[1].name}}</p>
        </div>
      </div>
  </div>
    </transition-group>
</template>
<script>
import { mapGetters } from 'vuex'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { faMinusSquare } from '@fortawesome/free-solid-svg-icons'

export default {
  props: ['product'],
  data() {
    return {
      clicked: false,
      isOnCart: false
    };
  },
  computed: {
    ...mapGetters({
      loadedProducts: "products/showProducts",
      cartProducts: "cart/cartProducts"
    }),
    faCartPlus() {
    	return faCartPlus
    },
    faEllipsisV() {
    	return faEllipsisV
    },
    faMinusSquare() {
      return faMinusSquare
    }
  },
  methods: {
    info() {
      this.clicked = !this.clicked;
    },
    addToCart(product) {
      if(product.isOnCart) {
        return
      }
      this.isOnCart = true
      product.isOnCart = true
      this.$store.dispatch('cart/addProduct', product)
    },
    removeFromCart(product) {
      if(!product.isOnCart) {
        return
      }
      product.isOnCart = false
      this.isOnCart = false
      this.$store.dispatch('cart/removeProduct', product)
    }
  }
};
</script>

<style lang="scss" scoped>
@keyframes scalevert {
  0% {
    transform: scaleY(0) translateX(-100%);
  }
  50% {
    transform: scaleY(20%) translateX(-50%);
  }
  100% {
    transform: scaleY(1) translateX(0);
  }
}

.hidden {
  display: none;
}

@media only screen and (max-width: 767.98px) {
  .card-product {
    display: flex;
    flex-flow: column;
    align-content: center;
    justify-content: flex-start;
    border: 1px solid #d9dbde;
    border-radius: 10px;
    scroll-snap-align: center;
    filter: drop-shadow(1px 1px 1px #d9dbde);

    .header {
      margin-top: 0;
      width: 100%;
      .img-cont {
        svg {
          margin: .5em;
        }
        .info {
          position: absolute;
          z-index: 999;
          right: 5%;
          top: 1.5%;
        }

        img {
          width: 100%;
          //height: 10em;
        }

        .short-descr {
          position: relative;
          margin: 0 auto;
          font-size: 0.8em;
          text-align: center;
          //border: 1px solid black;
          opacity: 0;
          height: 100%;
          display: flex;
          align-items: center;
          align-content: center;
          background: rgba(212, 213, 217, 0.9);
          color: #fff;
          transition: all 0.3s;

          &:before {
            position: absolute;
            border-left: 1px solid #fff;
            display: flex;
            content: "";
            margin: 0 auto;
            bottom: 5%;
            width: 93%;
            height: 90%;
          }
          &.active {
            opacity: 1;
          }
        }
      }

      .alt-image {
        width: 100%;
        height: 10em;
        margin: 0 auto;
        padding: 0;
        background: url("~assets/img/woocommerce-placeholder.png");
        background-size: cover;
        background-position: center;
        z-index: 999;
      }
    }
    .header-description {
      display: flex;
      flex-flow: column;
      align-items: center;
      align-content: center;
      justify-content: center;
      .product-title {
        text-transform: capitalize;
        font-size: 1em;
        text-align: center;
        margin-bottom: 1em;
      }
    }
    .prod-price {
      width: 100%;
      display: flex;
      flex-flow: column;
      align-items: center;
      align-content: center;
      justify-content: center;
      //background: #e4ebff;
      font-family: 'Lato', sans-serif;
      .regular-price {
        display: flex;
        align-content: center;
        .line {
          text-decoration: line-through;
          font-size: 0.9em;
          align-content: center;
          display: flex;
          align-items: center;
        }
      }
      .sale-price {
        display: flex;
        align-content: center;
      }
      div {
        font-size: 1.1em;
        font-weight: bold;
      }
      p {
        font-size: 1.1em;
        margin-right: 0.5em;
        margin-left: 0.1em;
      }
    }
    .product-description {
      display: flex;
      align-items: center;
      align-content: center;
      justify-content: center;
      padding: 0.5em;
      .description {
        p {
          margin-bottom: 0;
        }
      }
    }
    .cta-cart {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 90%;
      text-align: center;
      padding: 0.5em;
      background: #5f5c6d;
      border: 1px solid #5f5c6d;
      color: #fff;
      font-weight: bold;
      opacity: 1;
      border-radius: 3px;
      filter: drop-shadow(1px 1px 1px #d9dbde);
      &:focus {
        border: none;
      }
    }
    .cta-remove {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 90%;
      text-align: center;
      padding: 0.5em;
      background: lightblue;
      border: 1px solid #5f5c6d;
      color: #fff;
      font-weight: bold;
      opacity: 1;
      border-radius: 3px;
      filter: drop-shadow(1px 1px 1px #d9dbde);
      &:focus {
        border: none;
      }
    }
    .product-categories {
      width: 100%;
      display: flex;
      flex-flow: column;
      align-items: center;
      padding: 0.5em;
      line-height: 2em;
      background: #6a6d5c;
      color: #fff;
      margin-top: 0.5em;
    }
  }
}

@media only screen and (min-width: 768px) {
  .card-product {
    z-index: 2;
    scroll-snap-align: start;
    //transform: scale(.9);
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-auto-rows: auto;
    align-items: start;
    align-content: start;
    font-size: 0.85em;
    z-index: 9;
    margin: 0;
    transition: all 0.5s;
    &:last-of-type {
      margin-bottom: 1em;
    }

    .header {
      width: 100%;
      height: 12rem;
      display: flex;
      flex-flow: column;
      align-items: center;
      align-content: center;
      justify-content: center;
      padding: 0;
      margin: 0;
      border: 1px solid lightgray;
      border-bottom: none;
      transition: all 0.5s;
      .img-cont {
        position: relative;
        width: 100%;
        height: 100%;
       

        img {
          max-width: 100%;
          transition: all .5s;
          z-index: 998;
        }

        svg {
          position: absolute;
          top: 1em;
          left: 1em;
          font-size: 1em;
          cursor: pointer;
					&:hover {
						transform: rotate(180deg);
					}
        }
      }
      .short-descr {
        position: absolute;
        z-index: 999;
        transition: all 0.5s;
        opacity: 0;
        width: 100%;
        height: auto;
        padding: .5em;
        background: transparent;
        color: #fff;
        bottom: 0;
        right: 0;

        &.active {
          background: #d9dbde;
          color: #fff;
          opacity: 1;
        }
      }

      .info {
        background: none;
        border: none;
        margin:.2em .5em;
        font-size: 1.5em;
      }

      .alt-image {
        width: 100%;
        height: 100%;
        z-index: 998;
        text-align: center;
        background: url("~assets/img/woocommerce-placeholder.png");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
      }
    }
    .header-description {
      width: 100%;
      height: auto;
      border: 1px solid lightgray;
      border-top: none;
      background: #fff;
      padding: 0.5em;
      margin: 0;
      font-size: 1em;
      z-index: 1;
      transition: all 0.5s;
      display: flex;
      flex-flow: column;
      align-items: center;

      .product-title {
	        font-size: 1.2em;
	        margin: 0 auto;
	        font-weight: bold;

      }

    	.prod-price {
    		display: flex;
    		width: 100%;
    		margin: 1em;
    		align-items: center;
    		align-content: center;
    		justify-content:center;
      	font-weight: bold;
    	}

      .regular-price {
      	font-size: 1.2em;
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        .line {
          text-decoration: line-through;
          font-size: 1em;
          align-content: center;
          display: flex;
          align-items: flex-start;
        }
      }
      .sale-price {
      	font-size: 1.3em;
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        margin-left: 1em;
      }
      .cta-cart {
      	width: 80%;
      	margin: 2em auto;
      	background: green;
      	border: none;
      	padding: 1em;
      }
    }
  }
  .card-enter {
  }
  .card-enter-to {
  }
  .card-enter-active {
    position: absolute;
  }
  .card-leave {
  }
  .card-leave-to {
    opacity: 0;
    //transform: translateX(100%);
  }
  .card-leave-active {
    transition: all 0.5s;
  }
  .card-move {
    transition: all 0.5s;
  }

  .slide-enter {
    opacity: 0;
    transform: translateX(100%);
  }
  .slide-enter-to {
    opacity: 1;
    transform: translateX(0);
  }
  .slide-enter-active {
    transition: all 0.5s;
  }
  .slide-leave {
  }
  .slide-leave-to {
    opacity: 0;
    transform: translateX(100%);
  }
  .slide-leave-active {
    transition: all 0.5s;
  }
  .slide-move {
    transition: all 0.5s;
  }


}
</style>