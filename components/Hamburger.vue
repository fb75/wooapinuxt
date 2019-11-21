<template>
  <div :class="{'hamburger': !navActive, 'hamburger cross': navActive}" @click="$emit('navActive')">
    <span></span>
    <span></span>
    <span></span>
	</div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
computed: {
  ...mapGetters({
    navActive: 'ui/navbarState'
  })
 }
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 768px) {
  .hamburger {
    margin-right: 1em;
    cursor: pointer;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    height: 25px;
    width: 25px;
    background: transparent;
    //transition: all 0.4s ease;
    z-index: 999;
  }
  .cross {
    span:first-of-type {
      transform: rotate(-45deg) translateY(.49em);
      width: 1.5em;
      height: .1em;
    }
    span:nth-of-type(2) {
     opacity: 0;
    }
    span:nth-of-type(3) {
      transform:  rotate(45deg) translateY(-.45em);
      width: 1.5em;
      height: .1em;
    }
  }

  
  
  span {
    cursor: pointer;
    margin: .1em 0;
    width: 100%;
    height: .17em;
    background: #5F5C6D;
    transition: all 0.4s ease;
  }
}

@media only screen and (min-width: 767.98px) {
  .hamburger {
    display: none;
  }
}
</style>