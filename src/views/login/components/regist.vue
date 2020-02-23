<template>
  <el-dialog
    title="用户注册"
    :center="true"
    width="603px"
    rules="rules"
    :visible.sync="dialogFormVisible"
  >
    <el-form :model="form" :rules="rules" ref="regForm">
      <el-form-item label="头像" :label-width="formLabelWidth" prop="avatar">
        <el-upload
          name='image'
          v-model="form.avatar"
          class="avatar-uploader"
          :action='upLoadUrl'
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="昵称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
        <el-input v-model="form.password" show-password autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="图形码" :label-width="formLabelWidth" prop="graphic" @click="getgraphic">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.graphic" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <img @click="getgraphic" class="code" :src="imgCode" alt />
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="验证码" :label-width="formLabelWidth" prop="code">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.code" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <!-- 倒计时不为0禁用按钮  -->
            <el-button
              :disabled="sec !=0"
              @click="getPhoneCode"
              :plain="true"
            >{{sec==0? '获取用户验证码' : '还有'+sec+'秒'}}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="doRegister">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// import axios from "axios";
import {sendsms,register} from '../../../api/reg.js'
export default {
  name:'reg',
  data() {
    return {
      //要上传图片的接口地址
      upLoadUrl:process.env.VUE_APP_URL +'/uploads',
    //图片临时路径
       imageUrl: '',
      //倒计时的秘数
      sec: 0,
      //图形验证码的接口地址
      imgCode: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      //是否显示对话框
      dialogFormVisible: false,
      //设置文字宽度
      formLabelWidth: "65px",
      form: {
        avatar:'',
        name: "",
        email: "",
        phone: "",
        password: "",
        code: "",
        graphic: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "昵称不能为空",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            message: "手机号不能为空",
            trigger: "blur"
          },
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: "手机号码错误",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "邮箱不能为空",
            trigger: "blur"
          },
          {
            pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
            message: "邮箱格式错误",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }
        ],
        //头像规则
        avatar:[{required:true, message:'头像不能为空' , trigger:'change' }],
        //图片验证码规则
        graphic:[
          {required:true, message:'图片验证码不能为空' , trigger:'blur'},
          {len:4, message:'图片验证码只能是4位' , trigger:'blur'  }
          ],
        //
        code:[ {required:true, message:'图片验证码不能为空' , trigger:'blur'},
                {len:4, message:'手机验证码是4位' , trigger:'blur'  }
        ]
      }
    };
  },
  methods: {
    doRegister(){
      //要找到表单对象(就先要给表单加ref属性)
      this.$refs.regForm.validate(v=>{
        if(v){
          // alert('全部通过')
          register({
            username:this.form.name,
            phone:this.form.phone,
            email:this.form.email,
            avatar:this.form.avatar,
            password:this.form.password,
            rcode:this.form.code
          }).then(res=>{
            console.log(res);
            if(res.data.code==200){
              this.$message.success('注册成功')
              //重置表单,只能重置表单元素
              this.$refs.regForm.resetFields();
               this.imageUrl = "";
               //注册成功,关闭对话框
               this.dialogFormVisible=false
            }else{
              this.$message.error(res.data.message);
            }
            
          })
        }
      })
    },
    //图片点击事件
    getgraphic() {
      //游览器缓存机制
      //专门用来解决请求缓存的2套方案
      //1.随机数(少一点)
      //   this.imgCode= process.env.VUE_APP_URL+'/captcha?type=sendsms&t='+Math.random()
      //2.时间戳(多一点)
      this.imgCode =
        process.env.VUE_APP_URL + "/captcha?type=sendsms&t=" + Date.now();
    },
    //获取手机验证码
    getPhoneCode() {
      //手机号码判断
      if(!/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(this.form.phone)){
        //提示手机号是否合法
        return this.$message.error('手机格式不正确')
      }
  //验证码判断
      if(this.form.graphic.length != 4){
        return this.$message.error('验证码长度不对')
      }

      this.sec = 5;
      let timeID = setInterval(() => {
        this.sec--;
        if (this.sec == 0) {
          clearInterval(timeID);
        }
      }, 1000);
      // 发请求获取手机验证码
      // axios如果发送跨域请求,默认不会带cookice
      // axios({
      //   url: process.env.VUE_APP_URL + "/sendsms",
      //   method: "post",
      //   data: {
      //     code: this.form.graphic,
      //     phone: this.form.phone
      //   },
      //   //允许携带cookie
      //   withCredentials: true
      // })
      sendsms({
        code: this.form.graphic,
         phone: this.form.phone
      })
      .then(res => {
        //成功回调
        window.console.log(res);
        if (res.data.code == 200) {
          // alert('获取验证码成功,验证码为'+res.data.data.captcha)
          this.$message({
            message: "获取验证码成功,验证码为" + res.data.data.captcha,
            type: "success"
          });
        } else {
          // alert(res.data.message)
          this.$message.error(res.data.message);
        }
      });
    },

      //上传成功调用的钩子
      //res就是响应报文
      //file就是文件信息
      handleAvatarSuccess(res, file) {
        // console.log(file);
        console.log(res);
        //吧图片转换成了给了imageUrl
        //所以此时img标签有值,但avatar没有值
        this.imageUrl = URL.createObjectURL(file.raw);
        //上传成功还要给acatar赋值,手动赋值才让他有值,没有事件重新校验
        this.form.avatar=res.data.file_path;
        this.$refs.regForm.validateField('avatar')
      },
      //上传之前调用的钩子
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' ||'image/png' || 'image/gif';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 图片 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    

  }
};
</script>

<style lang='less'>
.el-dialog__header {
  background: linear-gradient(to right, #11bfee, #2491e9);
}

.el-dialog__title {
  color: white;
  font-size: 17px;
}
.code {
  width: 100%;
  height: 42px;
  vertical-align: top;
}

.avatar-uploader {
  // 让上传的内容居中
  text-align: center;
}
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>