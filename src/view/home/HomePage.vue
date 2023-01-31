<template>
  <div class="common-layout">
    <el-container style="height: 100%">
      <el-aside :width="sidebarWidth" class="aside">
        <sidebar></sidebar>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script>
import sidebar from "@/components/layout/sidebar/sidebar";

const sidebarWidth = '230px'

export default {
  name: "HomePage",
  components: {sidebar},
  computed() {
    // const style = {}
    // if (this.isPhone){
    //   style.position = 'absolute'
    //   style.height = `${this.clientHeight}px`
    //
    // }
  },
  data() {
    return {
      sidebarWidth,
      isPhone: false,
      isCollapse: false, // 左侧菜单栏是否折叠

    }
  },
  mounted() {
    // this.addRouteFn()
  },
  methods: {
    addRouteFn() {
      window.console.log('1111')
      this.$router.addRoute('test_abc',{
        path: 'test_abc3',
        name: 'test_abc3',
        component: () => import( '@/view/home/test_abc3.vue'),
        meta: {
          name: "权限树",
          keepAlive: true,
          icon: "el-iton-umbrella"
        }
      })
      window.console.log(this.$router.options.routes)
    }
  },
}
</script>

<style scoped>
.common-layout {
  height: 100%;
}

.aside {
  background: rgb(25, 42, 94);
  overflow-x: hidden;
}
</style>
