import _axios from '../axios/axios'

export const initMenu = (router,store)=> {
    if (store.state.routes.length>0){
        return
    }
    _axios.get('/xdeas_api/xdeas-user-v2/resource/selectByAccountIdOrg?accountId=115512738809122816&orgId=181461159335956480').then(res=>{
        if(res){
            // let fmtRoutes = format
            window.console.log(res.data)
        }
    })
}
