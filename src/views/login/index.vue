<template>
  <div class="login-wrap">
    <!-- 左侧登录盒子 -->
    <div class="login-box">
      <div class="title-box">
        <img class="logo" src="./images/矢量智能对象 拷贝 9.png" alt />
        <span class="left-title">黑马面面</span>
        <span class="line"></span>
        <span class="right-title">用户登录</span>
      </div>

      <!-- 表单 -->
      <el-form label-width="43px" ref="loginForm" :model="form" :rules="rules">
        <el-form-item prop="phone">
          <el-input v-model="form.phone" prefix-icon="el-icon-user" placeholder="请输入手机号"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input v-model="form.password" prefix-icon="el-icon-lock" show-password placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <el-row>
            <el-col :span="17">
              <el-input v-model="form.code" prefix-icon="el-icon-key" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="7">
              <img class="code" src="./images/login_captcha.png" alt />
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item class="checks" prop="agree" >
           <div class="check">
          <el-checkbox v-model="form.agree">
               我已阅读并同意
              <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
            </el-checkbox>
            </div>
        </el-form-item>

        <el-form-item>
          <el-button @click="goLogin" class="el-button" type='primary'>登录</el-button>
          <el-button class="el-button" type='primary'>注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <img src="./images/login_banner_ele.png" alt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      //跟表单双向绑定的数据
      form:{
        phone:'',
        password:'',
        code:'',
        agree:false
      },
      // 规则对象
      rules:{
        phone:[{
          required:true, message: "手机号不能为空", trigger: "blur"
        }],
        password:[{
          required:true, message: "密码", trigger: "blur"
        }],
        code:[{
          required:true, message: "验证码", trigger: "blur"
        }],
        agree:[{
          pattern:/true/, message: "必须勾选同意用户协议", trigger: "change"
        }],
      }
    }
  },
  methods:{
    goLogin(){
      this.$refs.loginForm.validate(v=>{
        if(v){
          alert('全部通过')
        }
      })
    }
  }
};
</script>

<style lang="less">
.login-wrap {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  display: flex;
  justify-content: space-around;
  align-items: center;

  .login-box {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding-right: 42px;

    

    .title-box {
      display: flex;
      align-items: center;
      margin-left: 48px;
      margin-top: 50px;
      margin-bottom: 29px;

      .logo {
        width: 22px;
        height: 17px;
        margin-right: 16px;
      }

      .left-title {
        margin-right: 14px;
        font-size: 22px;
      }
      .line {
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
        margin-right: 12px;
      }
      .right-title {
        font-size: 21px;
      }
    }
  }

  .code{
    width: 100%;
    height: 42px;
  }
  .checks{
    display: flex;
    .check{
    display: flex;
    align-items: center
  }
  }
  .el-button{
    width: 100%;
    &:nth-child(2){
      margin-left: 0;
      margin-top: 26px
    }
  }
  
}
</style>