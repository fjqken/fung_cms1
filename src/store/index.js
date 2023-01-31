// import Vue from 'vue'
import Vuex from 'vuex'
import UserModel from "@/model/user";
import router from '@/router'
import {ElMessage} from 'element-plus'

// Vue.use(Vuex)
/* eslint-disable */
export default new Vuex.Store({
    state: {
        username: localStorage.username,
        routes: [],
        organizationId: localStorage.organizationId,
        userId: localStorage.userId
    },
    mutations: {
        SETUSERNAME(state, payload) {
            state.username = payload
            localStorage.username = payload
        },
        SETORGID(state, payload) {
            state.organizationId = payload.orgId
            localStorage.organizationId = payload.orgId
            state.userId = payload.userId
            localStorage.userId = payload.userId
        }
    },
    actions: {
        code_login(context, code_body) {
            UserModel.login_code(code_body).then(res => {
                if (res.data.code === '0') {
                    router.replace('/home')
                    const refreshToken = res.data['data']['refreshToken']
                    localStorage.setItem("session-id", res.data['data']['sessionId'])
                    localStorage.setItem("refreshToken", refreshToken)
                    ElMessage({
                        type: "success",
                        message: "登录成功"
                    })
                    const UserDtoList = res.data.data.terminalAccountUser.userDTOList
                    UserDtoList.map((item) => {
                        if (item.id === res.data.data.terminalAccountUser.currentUserId) {
                            console.log(item['organizationId'])
                            console.log(item['id'])
                            context.commit('SETORGID', {'orgId':item['organizationId'],userId:item['id']})
                        }
                    })
                    context.commit('SETUSERNAME', res.data.data.terminalAccountUser.realName,)
                    // initMenu()
                } else {
                    ElMessage({
                        type: "warning",
                        message: res.data.msg
                    })
                }
            })
        }
    }

})
/* eslint-disable */
