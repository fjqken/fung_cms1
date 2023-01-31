<template>
  <div class="login">
    <div class="form-box" v-loading="loading">
      <div class="title"><h1>欢迎您!
      </h1></div>
      <form class="login-form" autocomplete="off" @submit.prevent="login()">
      <div class="username">
        <el-input class="el-input"  placeholder="请输入姓名" v-model="account.user_name"></el-input>
      </div>
      <div class="password " >
        <el-input class="el-input"  placeholder="请输入密码" v-model="account.password" type="password"></el-input>
      </div>
      <div class="submit">
        <button class="submit" type="submit">登录</button>
      </div></form>
    </div>
  </div>
</template>

<script>
import { reactive,ref ,getCurrentInstance} from 'vue'
import UserModel from '@/model/user'
import { useRouter } from 'vue-router'
import Config from '@/config'

export default {
  name: 'LoginView',

  setup(){
    const loading = ref(false)
    const router = useRouter()
    const { ctx } = getCurrentInstance()

    /**
     * 根据账号密码登录，拿到 token 并储存
     */
    const login = async () => {
      const { user_name, password, captcha } = account
      try {
        loading.value = true
        await UserModel.getToken(user_name, password, captcha)
        loading.value = false
        router.push(Config.defaultRoute)
        ctx.$message({
          message: '登录成功',
          type: 'success',
        })
      } catch (e) {
        loading.value = false
      }
    }
    const account = reactive({
      user_name:'',
      password:''
    })
    return{
      account,
      loading,
      login
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/deep/ .el-input__wrapper {
  background-color: transparent;
  padding-left: 1px ;
  padding-right: 1px ;
  box-shadow: none;
}
/deep/ .el-input__inner {
  background-color: transparent;
  color: white;
}
.login{
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1b2c5f url('../../assets/image/login/login-ba.png') no-repeat center center;;
}
.username{
  display: flex;
  justify-content: flex-start;
  background: url("../../assets/image/login/nickname.png") no-repeat;
  background-size: 100% auto;
  background-position: left bottom;
  padding-bottom:8px ;
}
.form-box{
  width: 445px;
  color: aliceblue;
  background: transparent;
  border-radius: 10px;
}
.title{
  text-align: left;
  margin-bottom: 70px;
}
h1 {
  padding-left: 10px;
  margin-top: 0;
}
.el-input{
  margin-left: 10px;
  background-color:transparent;
  padding-left: 70px;
}
.password{
  /*text-align: left;*/
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
  background: url("../../assets/image/login/password.png") no-repeat;
  background-size: 100% auto;
  background-position: left bottom;
  padding-bottom:9px ;

}
.submit1{
  width: 100%;
  height: 70px;
  color: #c4c9d2;
  font-size: 16px;
  text-align: left;
  box-sizing: border-box;
  padding: 0 10px;
  padding-left: 74px;
  background: url('../../assets/image/login/login-btn.png') no-repeat;
  background-size: 90% auto;
  background-position: center bottom;
  border: none;
  cursor: pointer;
}
.submit{
  width: 100%;
  height: 70px;
  color: #c4c9d2;
  font-size: 16px;
  text-align: left;
  box-sizing: border-box;
  padding: 0 10px;
  padding-left: 74px;
  background: url('../../assets/image/login/login-btn.png') no-repeat;
  background-size: 90% auto;
  background-position: center bottom;
  border: none;
  cursor: pointer;
  margin-top: 10px;
}

</style>
