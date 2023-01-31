<template>
  <div class="login_box">
    <div>
      <span :class="isActiveIndex===1?'isActiveTitle': ''" @click="test1">账号</span>
      <span :class="isActiveIndex === 0 ? 'isActiveTitle' : ''" @click="test0">密码</span>
    </div>
    <div v-if="isActiveIndex===1">1</div>
    <div v-else>0</div>
  </div>
</template>

<script>
export default {
  name: "login_vif",
  data() {
    return {isActiveIndex: 0}
  },
  methods: {
    test1(){
      this.isActiveIndex=1
    },
    test0(){
      this.isActiveIndex=0
    }
  }
}
</script>

<style scoped>
.isActiveTitle {
  color: #333;
  font-weight: bolder;
}
</style>
