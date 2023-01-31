<template>
<div class="logo" >
  <img src="../../../assets/image/logo.png">
</div>
  <div style="margin-bottom:50px">
    <search></search>
    <menu-tree></menu-tree>
  </div>
</template>

<script>
import Search from './search'
import MenuTree from './menu-tree'

export default {
  name:"SideBar",
  components:{
    Search,
    MenuTree
  },
  props: {
    isPhone: {
      type: Boolean,
      default: false,
    },
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    elMenuCollapse() {
      if (this.isPhone) {
        return false
      }
      return this.isCollapse
    }
  }
}

</script>

<style scoped>

</style>
