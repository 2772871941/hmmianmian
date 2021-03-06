import axios from 'axios'
export function sendsms(data){
    return axios({
        url:process.env.VUE_APP_URL+'/sendsms',
        method:'post',
        data,
        withCredentials:true
    })
}

//发送注册账号接口的请求
export function register(data){
    return   axios({
    url:process.env.VUE_APP_URL+'/register',
    method:'post',
    data,
    withCredentials:true
   })

}