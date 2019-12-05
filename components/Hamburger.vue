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
    position: absolute;
    right: 1em;
    cursor: pointer;
    display: flex;
    flex-flow: column;
    align-items: center;
    align-content: center;
    justify-content: space-around;
    width: 25px;
    height: 20px;
    background: transparent;
    //transition: all 0.4s ease;
    z-index: 999;

    span {
      cursor: pointer;
      width: 100%;
      height: 1px;
      background: #5F5C6D;
      transition: all 0.4s ease;
    }
  }
  .cross {
    span:first-of-type {
      transform: rotate(-45deg) translateY(.5em);
    
    }
    span:nth-of-type(2) {
     opacity: 0;
    }
    span:nth-of-type(3) {
      transform:  rotate(45deg) translateY(-.51em);
    }
  }
}

@media only screen and (min-width: 767.98px) {
  .hamburger {
    display: none;
  }
}
</style>