<template>
  <el-dialog title="用户注册" :center='true' width="603px" rules='rules'  :visible.sync="dialogFormVisible">
    <el-form :model="form"  :rules="rules" >
      <el-form-item label="昵称" :label-width="formLabelWidth" prop="name" >
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>

        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>

        <el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>

        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
        <el-input v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>

        <el-form-item label="图形码" :label-width="formLabelWidth" prop="graphic" @click="getgraphic">
            <el-row>
                <el-col :span="16">
                    <el-input v-model="form.graphic" autocomplete="off"></el-input>
                </el-col>
                  <el-col :span="7" :offset='1'>
                    <img @click="getgraphic" class="code" :src="imgCode" alt="">
                </el-col>

            </el-row>
        
      </el-form-item>

       <el-form-item label="验证码" :label-width="formLabelWidth" prop="code" >
            <el-row>
                <el-col :span="16">
                    <el-input v-model="form.code" autocomplete="off"></el-input>
                </el-col>
                  <el-col :span="7" :offset='1'>
                      <!-- 倒计时不为0禁用按钮  -->
                      <el-button :disabled="sec !=0" @click="getPhoneCode" >
                          {{sec==0? '获取用户验证码' : '还有'+sec+'秒'}}
                          </el-button>
                </el-col>

            </el-row>
      </el-form-item>
     
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
        //倒计时的秘数
        sec:0,
        //图形验证码的接口地址
      imgCode:process.env.VUE_APP_URL+'/captcha?type=sendsms',
      //是否显示对话框
      dialogFormVisible: false,
      //设置文字宽度
      formLabelWidth: "60px",
      form: {
          name:'',
          email:'',
          phone:'',
          password:'',
          code:'',
          graphic:''
      },
      rules:{
        name:[{
          required:true, message: "昵称不能为空", trigger: "blur"
        },
        ],
        phone:[{
          required:true, message: "手机号不能为空", trigger: "blur"
        },
         {pattern:/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/, message: "手机号码错误", trigger: "blur"}
        ],
        email:[{
          required:true, message: "邮箱不能为空", trigger: "blur"
        },
         {pattern:/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/, message: "邮箱格式错误", trigger: "blur"}
        ],
        password:[{
          required:true, message: "密码不能为空", trigger: "blur"
        }],
      }
    };
  },
  methods:{
      //图片点击事件
      getgraphic(){
          //游览器缓存机制
          //专门用来解决请求缓存的2套方案
          //1.随机数(少一点)
        //   this.imgCode= process.env.VUE_APP_URL+'/captcha?type=sendsms&t='+Math.random()
          //2.时间戳(多一点)
          this.imgCode= process.env.VUE_APP_URL+'/captcha?type=sendsms&t='+Date.now()

      },
      //获取手机验证码
      getPhoneCode(){
          this.sec=5;
          let timeID = setInterval(()=>{
              this.sec--;
              if(this.sec==0){
                  clearInterval(timeID)
              }
          },1000);
          //发请求获取手机验证码
          //axios如果发送跨域请求,默认不会带cookice
          axios({
              url:process.env.VUE_APP_URL+'/sendsms',
              method:'post',
              data: { 
                  code:this.form.graphic,
                  phone:this.form.phone
              },
              //允许携带cookie
              withCredentials:true
          }).then(res=>{
              //成功回调
              window.console.log(res);
              if(res.data.code==200){
                  alert('获取验证码成功,验证码为'+res.data.data.captcha)
              }else{
                  alert(res.data.message)
              }
          });
      }
  }
 
};
</script>

<style lang="less">
.code{
    width: 100%;
     height: 42px;
    vertical-align: top;
}
</style>