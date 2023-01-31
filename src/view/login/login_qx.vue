<template>
  <div class="login_div">
    <div class="login_body" >
      <h1>欢迎您</h1>
      <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs_box" :stretch="true"
      >
        <el-tab-pane label="密码登录" name="first">
          <el-form :rules="rules" :model="password_login" ref="password_login">
            <el-form-item prop="user">
              <el-input size="large" v-model="password_login.user" placeholder="请输入账号" @input="phone_none">
                <template #prefix>
                  <el-icon class="iconfont icon-a-topliontubiaoku_kehuguanxi" size="large"></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input size="large" v-model="password_login.password" show-password placeholder="请输入密码"
                        @input="phone_none">
                <template #prefix>
                  <el-icon class="iconfont icon-a-topliontubiaoku_daohangguanli" size="large"></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="remember_me" style="color: white;">记住我</el-checkbox>
            </el-form-item>
            <el-form-item class="login_button_box">
              <el-button class="login_button" @click="password_login_def('password_login')"
                         :disabled="login_button_status">
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="验证码登录" name="second" >
          <el-form :rules="code_rules" :model="code_body" ref="code_login" id="code_body">
            <el-form-item prop="phone">
              <el-input size="large" placeholder="请输入手机号" v-model="code_body.phone" @input="code_none">
                <template #prefix>
                  <el-icon class="iconfont icon-a-topliontubiaoku_kehuguanxi" size="large"></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item class="yzm_box" prop="code">
              <el-input size="large" style="width: 200px" placeholder="请输入验证码" v-model="code_body.code"
                        @input="code_none">
                <template #prefix>
                  <el-icon class="iconfont icon-a-topliontubiaoku_daohangguanli" size="large"></el-icon>
                </template>
              </el-input>
              <span v-show="show" style="margin-left: 50px;cursor:pointer" @click="post_code">发送验证码</span>
              <span v-show="!show" style="margin-left: 50px;">{{ code_count }}</span>
            </el-form-item>
            <el-form-item class="login_button_box">
              <el-button class="login_button" @click="send('code_login')" :disabled="code_button_status">登录</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>


<script>

import UserModel from "@/model/user";
const Base64 = require("js-base64").Base64

export default {
  mounted() {
    let username = localStorage.getItem("user");
    if (username) {
      this.password_login.user = localStorage.getItem("user");
      this.code_body.phone = localStorage.getItem("user");
      this.password_login.password = Base64.decode(localStorage.getItem("password"));// base64解密
      this.remember_me = true;
      this.phone_none()
    }
  },
  data() {
    return {
      activeName: 'first',
      remember_me: false,
      password_login: {
        user: '',
        password: ''
      },
      login_button_status: true,
      code_button_status: true,
      code_body: {
        phone: '',
        code: ''
      },
      rules: {
        user: [
          {required: true, message: '手机号不能为空', trigger: 'blur'},
          {
            pattern: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/,
            message: '请输入正确的手机号码或者座机号',
            trigger: 'blur'
          }],
        password: [{required: true, message: '密码不能为空', trigger: 'blur'}
        ]
      },
      code_rules: {
        phone:
            [
              {required: true, message: '手机号不能为空', trigger: 'blur'},
              {
                pattern: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/,
                message: '请输入正确的手机号码或者座机号',
                trigger: 'blur'
              }
            ],
        code:
            [
              {required: true, message: '验证码不能为空', trigger: 'blur'},
            ]
      },
      show: true,
      code_count: 5
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    password_login_def(ref) {
      this.$refs[ref].validate((valid) => {
        if (valid) {
          UserModel.getToken(this.password_login.user, this.password_login.password).then(res => {
            if (res.data.code === '0') {
              if (this.remember_me) {
                let password = Base64.encode(this.password_login.password); // base64加密
                localStorage.setItem("user", this.password_login.user);
                localStorage.setItem("password", password);
              } else {
                localStorage.removeItem("user");
                localStorage.removeItem("password");
              }
              this.$router.replace('/home')
              const refreshToken = res.data['data']['refreshToken']
              localStorage.setItem("session-id", res.data['data']['sessionId'])
              localStorage.setItem("refreshToken", refreshToken)
              this.$message({
                type: "success",
                message: "登录成功"})
            } else {
              this.$message({
                type: "warning",
                message: res.data.msg
              })
            }
          })
        } else {
          return false;
        }
      })
    },
    post_code() {
      if (!this.code_body.phone) {
        this.$message({
          type: "warning",
          message: "手机号不能为空！"
        })
      } else if (/^1[3584]\d{9}$/.test(this.code_body.phone) === false) {
        this.$message({
          type: "warning",
          message: "请输入正确的手机号"
        })
      } else {
        UserModel.get_phone_code('BUS_LOGIN_CODE', this.code_body.phone)
        this.count_down()
      }
    },
    count_down() {
      if (this.code_count !== 0) {
        this.show = false
        this.code_count--
        setTimeout(this.count_down, 1000)
      } else {
        this.show = true
        this.code_count = 60
      }
    },
    phone_none() {
      this.login_button_status = this.password_login.phone && this.password_login.password;
      this.login_button_status = this.password_login.phone === '' || this.password_login.password === '';
    },
    code_none() {
      this.code_button_status = this.code_body.code === '' || this.code_body.phone === '';
    },
    send(ref) {
      this.$refs[ref].validate((valid) => {
        if (valid) {
          this.$store.dispatch('code_login',this.code_body)
        } else {
          return false;
        }
      })

    }
  }

};
</script>

<style scoped>
.login_div {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background: #1b2c5f url('../../assets/image/login/login-ba.png') no-repeat center center;
  color: white !important;
}

.login_body {
  width: 445px;
  margin-top: 100px;
}

.login_button {
  width: 100px;
  margin-left: 40%;
}

.tabs_box {
  height: 400px;
}

/deep/ .el-tabs__item {
  color: white !important;
}

.yzm_box {
  flex-wrap: nowrap;
}
</style>
