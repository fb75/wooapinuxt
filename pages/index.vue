<template>
  <div>
    <div :class="{'products': !panelState, 'products listed': panelState}">
      <CardProduct
        v-for="(item, index) in showProducts"
        :key="item.id"
        :product="item"
        :indx="index"
      />  
    </div>
  <transition name="fade" mode="out-in" appear>
    <div class="no-products" v-if="noProducts">
      <p>Sorry, no products found for this category.</p>
    </div>
  </transition>
  </div>
    <!--   <div class="navigation">
      <button :disabled="productsMinLength" @click="prevProduct()">prev</button>
      <button :disabled="productsMaxLength" @click="nextProduct()">next</button>
    </div>-->
</template>

<script>
import { mapGetters } from "vuex";
import CardProduct from "@/components/CardProduct";
import UIMenu from "@/components/UIMenu";

export default {
  layout: "ecommerce",
  components: {
    CardProduct,
    UIMenu
  },
  data() {
    return {
      idx: 0,
      currentPosition: 0,
      filtProducts: null,
      products: null
    };
  },
  asyncData(context) {
    return context.app.$repositories.products
      .showProducts()
      .then(res => {
        const items = JSON.parse(res);
        context.app.store.dispatch("products/setProducts", items);
      })
      .catch(e => console.log(e));
  },
  computed: {
    ...mapGetters({
      showProducts: "products/showProducts",
      panelState: "ui/panelState"
    }),
    noProducts() {
      return this.showProducts.length === 0;
    }
    // productsMaxLength() {
    //   return this.currentPosition === (this.showProducts.length - 1)
    // },
    // productsMinLength() {
    //   return this.currentPosition === 0
    // }
  },
  // watch: {
  //   showProducts(newProducts) {
  //     if (newProducts.length < this.currentPosition) {
  //       this.currentPosition = 0;
  //     }
  //   }
  // },
  methods: {
    nextProduct() {
      // if(this.productsMaxLength) {
      //   return this.product[1]
      // }
      this.currentPosition++;
    },
    prevProduct() {
      this.currentPosition--;
    }
  }
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 768px) {
  .products {
    margin: 1em auto;
    width: 100%;
    z-index: 2;
    display: grid;
    grid-template-columns: 50%;
    grid-auto-flow: column;
    grid-gap: 1em;
    grid-auto-columns: calc(50% - 1em);
    overflow-x: auto;
    scroll-snap-type: x proximity;
  }
  .no-products {
    display: flex;
    width: 100%;
    font-size: 1em;
    align-items: center;
    align-content: center;
    justify-content: center;
    min-height: 50vh;
  }
  .navigation {
    display: none;
  }
}

@media screen and (min-width: 768.98px) {
  .products {
    width: 95%;
    z-index: 999;
    margin: 1em auto;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap: 0.5em;
    grid-template-rows: auto;
    background: #fff;
    overflow-y: auto;
    height: -webkit-fill-available;
    transition: all 0.4s;

    &.listed {
      grid-template-columns: repeat(4, 1fr);
      width: 75%;
      float: right;
      margin-right: 1em;
      &.empty {
        grid-template-columns: repeat(1, 1fr);
        width: 75%;
        float: right;
        margin-right: 1em;
      }
    }


    &::-webkit-scrollbar {
      width: 0.3em;
    }

    &::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.07);
    }
    &::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.5);
      border-radius: 50px;
    }
  }

  .navigation {
    position: fixed;
    bottom: 2.5em;
    left: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: space-between;
    width: 100%;
    button:first-child {
      margin-left: 25%;
    }
    button:nth-child(2) {
      margin-right: 35%;
    }
  }
}
</style>
