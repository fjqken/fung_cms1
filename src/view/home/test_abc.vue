<template>
  <div> test_abc
    <el-button @click="addRouteFn">test</el-button>
    <span>{{username}}</span>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "test_abc",
  data() {
    return {
      name: ''
    }
  },
  computed:{
    ...mapState(['username'])
  },
  methods: {
    addRouteFn() {
      window.console.log(this.$router)
      this.$router.addRoute('home', {
        path: '/route_tree',
        name: 'route_tree',
        component: () => import( '@/view/home/route_tree.vue'),
        meta: {
          name: "权限树",
          keepAlive: true,
          icon: "el-iton-umbrella"
        }
      })
      window.console.log(this.$router)
      this.$store.commit('SETUSERNAME', "fengjunqiang")

    }
  }

}
</script>

<style scoped>

</style>
