<template>
  <div :class="{'menu-container': !panelActive, 'menu-container toggled': panelActive}">
    <div @click.prevent="openMenu()">
      <fa :icon="faFilter" class="ml-2 mt-2" /> Filter
    </div>
    <div :class="{'menu-filter': !menuToggled, 'menu-filter menu-toggled': menuToggled}">
      <p @click="showAllProducts">All products</p>
      <hr>
      <p>Size</p>
      <div class="size">
        <div class="size-input">
          <input type="checkbox" value="5" />6 - 7
          <input type="checkbox" value="5" />7 - 8
          <input type="checkbox" value="5" />8 - 9
        </div>
      </div>
      <hr>
      <p>Price</p>
      <div class="price">
        <div class="price-input">
          <input type="checkbox" value="1" />40€ - 70€
          <input type="checkbox" value="1" />70€ - 100€
          <input type="checkbox" value="1" />>100€  
        </div>
      </div>
      <hr>
      <p>Color</p>
      <div class="color">
        <div class="color-type white"></div>
        <div class="color-type red"></div>
        <div class="color-type grey"></div>
        <div class="color-type blue"></div>
        <div class="color-type black"></div>
      </div>
    </div>
    <div :class="{'menu-items': !isSelected, 'menu-items selected': isSelected, 'menu-items slided': menuItemsSlide}">
      <img
        v-for="(category, index) in shopcategories"
        :key="category.title"
        @click="!isSelected ? changeClass(index, category) : resetCategories()"
        :src="category.image.src"
        v-if="category.image !== null && category.parent === 0"
        class="img-item"
        :class="{active: (index === activeItem), inactive: ((index !== activeItem) && isSelected)}"
      />
    </div>
    <div class="subcategories">
      <span
        v-for="category in shopcategories"
        :key="category.title"
        v-if="category.parent !== 0"
      >{{category.name}}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

export default {
  data() {
    return {
      shopCategories: null,
      activeItem: -1,
      currentClass: "inactive",
      currentCategory: null,
      isSelected: false,
      menuToggled: false,
      menuItemSlided: false
    };
  },
  created() {
    this.$repositories.products
    .getCategories()
    .then(res => {
      this.shopCategories = JSON.parse(res);
      this.$store.dispatch("products/setCategories", this.shopCategories);
    })
    .catch(e => console.log(e));
  },
  methods: {
    changeClass(index, category) {
      this.activeItem = index;
      this.isSelected = true;
      this.$repositories.products
        .filterCategories(category.id)
        .then(res => {
          this.currentCategory = JSON.parse(res);
          return this.$store.dispatch(
            "products/setProducts",
            this.currentCategory
          );
        })
        .catch(e => console.log(e));
    },
    resetCategories() {
      this.isSelected = false;
      this.activeItem = -1;
    },
    openMenu() {
      this.menuToggled = !this.menuToggled;
      this.menuItemSlided = !this.menuItemSlided;
    },
    showAllProducts() {
      if(this.categoriesLenght) {
        this.$repositories.products.showProducts()
        .then(res => {
          const items = JSON.parse(res)
          this.$store.dispatch('products/setProducts', items)
        })
        .catch(e => console.log(e))
      }
    }
  },
  computed: {
    ...mapGetters({
      shopcategories: "products/loadedCategories",
      shoproducts: "products/showProducts",
      panelActive: "ui/panelState"
    }),
    categoriesLenght() {
      return this.shopcategories.length > 0
    },
    // productsChanged() {
    //   return
    // }
    menuToggle() {
      return this.menuToggled;
    },
    menuItemsSlide() {
      return this.menuItemSlided
    },
    faFilter() {
      return faFilter;
    }
  }
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 768px) {
  .menu-container {
    position: sticky;
    .menu-items {
      position: relative;
      top: 0;
      left: 0;
      width: 100%;
      padding: 1em 0;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: auto;
      align-items: center;
      align-content: center;
      justify-content: center;
      transition: all 0.5s ease;
      .img-item {
        width: 5em;
        justify-self: center;
        transition: all 0.5s;
      }

    }
    .color {
      width: 100%;
      display: flex;
      align-items: center;
      align-content: center;
      justify-content: space-around;

      .color-type {
        width: 1.5em;
        height: 1.5em;
        border-radius: 50%;
        margin: .3em auto;

        &.white {
          border: 1px solid lightgray;
          background: white;
        }
        &.red {
          background: red;
        }
        &.grey {
          background: grey;
        }
        &.blue {
          background: blue;
        }
        &.black {
          background: black;
        }
      }


    }
    .price {
      width: 100%;
      font-size: .85em;    
      display: flex;
      justify-content: center;
      margin: 0 auto;
      .price-input {
        width: 100%;
        padding: .2em 0;
        display: flex;
        align-content: center;
        align-items: center;
        justify-content: space-around;

        input {
          margin-right: -3.5em;
        }

      }
      p {
        text-align: center;
      }
    }
    .menu-filter {
      display: flex;
      flex-flow: column;
      align-items: flex-start;
      justify-content: flex-start;
      height: 0;
      transform: translateY(-100%);
      opacity: 0;
      transition: all 0.2s ease-in-out;
      hr {
        width: 95%;
        margin: 0 auto;
        color: lightgrey;
      }

      p {
        margin: .3em auto;
        font-weight: bold;
      }

      .size {
        width: 100%;
        display: flex;
        justify-content: center;
        font-size: .85em;
        .size-input {
          width: 100%;
          padding: .2em 0;
          display: flex;
          align-content: center;
          align-items: center;
          justify-content: space-around;

          input {
            margin-right: -5em;
          }
        }
    }
      &.menu-toggled {
        transform: translateY(0);
        opacity: 1;
        height: fit-content;
      }
    }
    .menu-items {
      width: 95%;
      margin: .5em auto;
      transition: all .3s ease-in-out;
      border: 1px solid lightgrey;
      border-radius: 5px;

      &.slided {
        //transform: translateY(10%);
      }
    }
    .subcategories {
      display: flex;
      width: 100%;
      overflow-x: scroll;
      align-items: center;
      align-content: center;
      justify-content: space-between;
      text-align: center;
      span {
        min-width: 40%;
        font-weight: bold;
        padding: 0.5em;
        background: #5c6d5f;
        border-right: 1px solid #fff;
      }
    }
    .active {
      filter: drop-shadow(4px 5px 5px darkblue);
    }
    .inactive {
      opacity: 0.2;
      transform: scale(0.95);
      z-index: 1;
    }
  }
}

@media screen and (min-width: 768.98px) {
  .menu-container {
    position: absolute;
    margin-top: 1em;
    transform: translateX(-101%);
    max-width: 20%;
    height: auto;
    background: lightgray;
    display: flex;
    flex-flow: column;
    padding: 0.5em;
    transition: all 0.4s;
    &.toggled {
      transform: translateX(0);
    }
  }
  .menu-filter {
    width: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-around;
    font-size: 0.9em;
    background: #fff;
    margin: 0.5em auto;
    transform: translateX(-100%);
    opacity: 0;
    transition: all 0.4s;

    .color {
      width: 100%;
      height: auto;
      padding: .3em;
      display: flex;
      align-items: center;
      justify-content: space-around;

      .color-type {
        width: 1.5em;
        height: 1.5em;
        border-radius: 50%;
        margin: .3em auto;

        &.white {
          border: 1px solid lightgray;
          background: white;
        }
        &.red {
          background: red;
        }
        &.grey {
          background: grey;
        }
        &.blue {
          background: blue;
        }
        &.black {
          background: black;
        }
      }
    }

    &.menu-toggled {
      opacity: 1;
      transform: translateX(0);
      transform-origin: none;
    }

    .size {
      width: 100%;
      display: flex;
      justify-content: center;
      .size-input {
        width: 100%;
        padding: 0.5em 0;
        display: flex;
        align-content: center;
        align-items: center;
        justify-content: space-evenly;
      }
    }
  }
  .subcategories {
    display: grid;
    grid-template-columns: repeat(2, auto);
    align-items: center;
    justify-items: start;
    align-content: center;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    span {
      margin: 0 0.5em;
      text-align: center;
      font-size: 0.85em;
      cursor: pointer;
      transition: all .35s ease-in-out;
      background: black;
      background-size: 50%;
      background-position: top left;
      &:hover {
        background-size: 0;
        background-position: bottom right;
        background: red;
        color: lightgrey;
      }
    }
  }
  .menu-items {
    z-index: 999;
    display: flex;
    flex-flow: column;
    padding: 1em;
    align-items: center;
    align-content: center;
    justify-content: flex-end;
    transform: translateY(-40%);
    transition: all .25s ease-in-out;
    .img-item {
      width: 4em;
      margin: 1em auto;
      transition: all 0.5s;
      &:hover {
      }
    }
    &.slided {
      transform: translateY(0);
    }
    .active {
      filter: drop-shadow(2px 2px 3px darkblue);
      transform: scale(1.16);
    }
  }
}
</style>