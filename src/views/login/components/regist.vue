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

        <el-form-item label="图形码" :label-width="formLabelWidth" prop="graphic">
            <el-row>
                <el-col :span="16">
                    <el-input v-model="form.graphic" autocomplete="off"></el-input>
                </el-col>
                  <el-col :span="7" :offset='1'>
                    <img class="code" :src="imgCode" alt="">
                </el-col>

            </el-row>
        
      </el-form-item>

       <el-form-item label="验证码" :label-width="formLabelWidth" prop="code">
            <el-row>
                <el-col :span="16">
                    <el-input v-model="form.code" autocomplete="off"></el-input>
                </el-col>
                  <el-col :span="7" :offset='1'>
                      <el-button>获取用户验证码</el-button>
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
export default {
  data() {
    return {
        imgCode:process.env.VUE_APP_URL+'/captcha?type=sendsms',
      dialogFormVisible: false,
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
 
};
</script>

<style lang="less">
.code{
    width: 100%;
     height: 42px;
    vertical-align: top;
}
</style>