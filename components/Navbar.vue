<template>
  <div :class="{ 'navbar': !isNavbarActive, 'navbar active': isNavbarActive }">
    <nuxt-link to="/">SHOP</nuxt-link>
    <nuxt-link to="/">BLOG</nuxt-link>
    <nuxt-link to="/">
      <fa :icon="faShoppingCart" />
    </nuxt-link>
    <nuxt-link to="/">
      <fa :icon="faUser" />
    </nuxt-link>
  </div>
</template>

<script>
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      isNavbarActive: 'ui/navbarState'
    }),
    faShoppingCart() {
       return faShoppingCart
    },
    faUser() {
      return faUser
    }
  }
};
</script>

<style lang="scss">

@media screen and (max-width: 767.98px) {
  .navbar {
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 50%;
    min-height: 100vh;
    background: rgb(14,25,48);
    color: #fff;
    overflow-y: hidden;
    padding: 0;
    z-index: 999;
    transform: translateX(-100%);
    transition: all .4s;

    &.active {
      transform: translateX(0);
    }
    .nuxt-link-exact-active {
      color: #fff;
      width: 100%;
      padding: 0 .5em;
      margin: .5em auto;
    }
  }
}

@media screen and (min-width: 768px) {
  .navbar {
    display: flex;
    width: 100%;
    align-content: center;
    align-items: center;
    justify-content: flex-end;
    background: #fff;
    border-bottom: 1px solid lightgray;
    padding: 1em;
    z-index: 999;
  
    .nuxt-link-exact-active {
      font-size: 1em;
      color: navy;
      transition: all .4s;
      position: relative;
      margin: 0 5em;
      &:before {
        position: absolute;
        top: 0;
        left: 0;
        content: '';
        width: 100%;
        height: 100%;
        background: transparent;
        opacity: .1;
        transform: scaleX(.9);
        transition: all .2s ease-in-out;
      }
      &:hover {
        text-decoration: none;
        filter: none;
        
      }

      &:hover:before {
        transform: scaleX(2.5);
        background: navy;
        transform-origin: center;
        border-radius: 2px;
      }
    }
   
  }
}

</style>