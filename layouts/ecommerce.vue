<template>
  <div class="container-fluid no-padding">
    <Navbar />
    <Header />
    <div :class="{'row upper-content': !panelState, 'row upper-content restricted': panelState}">
      <div class="col upleft">
        <section>
          <h1>Sport Shoes Ecommerce</h1>
          <p>This is an ecommerce example, datas are served from Wordpress and WooCommerce APIs and managed by Node.js as an api and Nuxt.js for the fronted.</p>
        </section>
        <button class="cta-show" @click="panelSlide">Show last products</button>
      </div>
      <div class="col upright">
        <h3 class="text-right pb-2">Order one of our in-sale products of the month and recive a special gift!</h3>
        <div class="row d-flex">
          <div class="col-4">
            <img src="~assets/img/woocommerce-placeholder.png" alt="">
          </div>
          <div class="col-4">
            <img src="~assets/img/woocommerce-placeholder.png" alt="">
          </div>
          <div class="col-4">
            <img src="~assets/img/woocommerce-placeholder.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <div :class="{'nuxt-container': !panelState, 'nuxt-container stretched': panelState}">
      <Toggler @toggle="panelSlide" />
      <UIMenu />
      <nuxt />
      <!-- <Footer /> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import UIMenu from "@/components/UIMenu";
import Toggler from "@/components/Toggler.vue";

export default {
  components: {
    Header,
    UIMenu,
    Toggler,
    Navbar,
    Footer
  },
  data() {
    return {
      isVisible: true,
      isToggled: false
    };
  },
  computed: {
    ...mapGetters({
      showProducts: "products/showProducts",
      panelState: "ui/panelState"
    })
  },
  methods: {
    panelSlide() {
      if(window.innerWidth < 767) {
        this.isToggled = !this.isToggled;
        this.$store.dispatch("ui/togglePanel", this.isToggled);  
        this.$router.push('/products')
      }
      this.isToggled = !this.isToggled;
      this.$store.dispatch("ui/togglePanel", this.isToggled);
    },
    changeVisibility() {
      this.isVisible = !this.isVisible;
      this.$store.dispatch("ui/toggleNavbar", this.isVisible);
    }
  }
};
</script>

<style lang="scss">
h3,
p {
  margin-bottom: 0;
}
.no-padding {
  padding: 0;
}

.products-title {
  font-size: 1.5em;
}

@media only screen and (max-width: 767.98px) {
  .upper-content {
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    height: 100vh;
    background-image: url("~assets/img/Nike_Adapt_1200x900.png");
    background-attachment: fixed;
    background-position: left center;
    background-repeat: no-repeat;
    background-size: contain;
    transition: all 0.5s;
    
    &.restricted {
      //transform:translateY(-90%);
    }
    
    .upleft {
      max-width: 100vw;
      padding: 0;
      margin: 0 auto;
      background: rgba(0, 0, 0, 0.1);
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
      align-content: flex-start;

      section {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        align-content: flex-start;
        color: #879abe;
        font-size: 1em;
        h1 {
          width: 100%;
          font-size: 1.2em;
          text-transform: uppercase;
          color: darkblue;
          margin-top: .5em;
          text-align: center;
        }
        p {
          margin: 1em auto;
          text-align: center;
        }
      }

      .cta-show {
        display: flex;
        justify-content: center;
        margin: auto;
        width: 60%;
        background: #879abe;
        border: none;
        text-decoration: none;
        padding: .6em;
        border-radius: 5px;
      }

    }

    .upright {
      max-width: 100vw;
      
      h3 {
        margin-top: 1em;
        color: #879abe;
      }
      img {
        margin-top: 2em;
        width: 100%;
      }

    }



    .toggler-cont {
      display: flex;
      align-items: center;
      align-content: center;
      justify-items: space-around;
    }
  }

  .nuxt-container {
    height: -webkit-fill-available;
    overflow-y: auto;
    transition: all .5s;
    
  }
}
@media only screen and (min-width: 768px) {
  .upper-content {
    width: 100%;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: space-between;
    height: 100vh;
    background-image: url("~assets/img/Nike_Adapt_1200x900.png");
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    transition: all 0.4s;
    z-index: 998;

    .upleft {
      height: 75%;
      margin-left: 3em;
      border-radius: 40% 20% 40%;
      padding: 1.5em;
      width: 30%;
      background: rgba(0, 0, 0, 0.2);
      display: flex;
      flex-flow: column;
      justify-content: center;
    }

    .toggler-cont {
      position: sticky;
    }
    &.restricted {
      transform: translateY(-100%);
    }
    section {
      width:80%;
      margin: auto;
      transition: all 0.4s;
      text-align: right;
      padding: 2em;
      color: #879abe;

      h1 {
        margin-bottom: 1em;
      }
    }
    .cta-show {
      position: absolute;
      bottom: 0;
      right: 0;
      display: flex;
      justify-content: center;
      width: 50%;
      background: #879abe;
      border: none;
      text-decoration: none;
      padding: 1em;
      border-radius: 5px;
    }
  }

  .upright {

    padding: 3em;
    h3 {
      color: #879abe;
    }
    img {
      width: 100%;
    }
  }

  .nuxt-container {
    position: absolute;
    z-index: 2;
    transition: all 0.4s;
    &.stretched {
      transform: translateY(-80%);
    }
  }
}
</style>