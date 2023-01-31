<template>
  <el-menu
      router
      default-active="2"
      class="el-menu"
      unique-opend="true"
      active-text-color="#3963bc"
      background-color="rgb(25, 42, 94)"
      text-color="rgb(255,255,255)"
  >
    <el-sub-menu v-for="(item,index) in this.$router.options.routes" :key="index" :index="item.path"
                 class="el-sub-menu">
      <template #title>
        <span class="el-sub-menu-title">{{ item.name }}</span>
      </template>
      <el-menu-item v-for="(children) in item.children" :index="children.path" :key="children.id" id="test_id">
        {{ children.name }}
      </el-menu-item>
    </el-sub-menu>
  </el-menu></template>

<script>
export default {
  name: "route_tree"
}
</script>

<style scoped>

</style>
