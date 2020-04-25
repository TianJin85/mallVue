<template>
  <div class="container">
    <div class="title">
      <span>修改商品</span> <span class="back" @click="back"> <i class="iconfont icon-fanhui"></i> 返回 </span>
    </div>
    <el-divider></el-divider>
    <div class="wrap">
      <el-row>
        <el-col :lg="20" :md="20" :sm="24" :xs="24">
          <el-form :model="form" status-icon ref="form" label-width="100px" @submit.native.prevent>
            <el-form-item label="商品名" prop="name">
              <el-input size="medium" v-model="form.name" placeholder="请填写商品名"></el-input>
            </el-form-item>
            <el-form-item label="商品库存" prop="author">
              <el-input type="number" size="medium" v-model="form.pepertory" placeholder="请填写商品库存"></el-input>
            </el-form-item>
            <el-form-item label="商品类型" prop="author">
             <el-select  size="medium"  v-model="form.type" placeholder="请选择商品类型">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="规格" prop="author">
              <div class="block-box">
                <i class="iconfont icon-jia plus" v-if="!form.product.length" @click="addContent"></i>
                <el-row class="input-row" v-for="(item, index) in form.product" :key="index">
                  <el-input v-model="item.ProductModel" placeholder="请输入规格名称" size="medium" class="input-detail"></el-input>
                  <el-input v-model="item.Price" type="number" placeholder="请输入价格" size="medium" class="input-detail"></el-input>
                  <div class="function">
                    <i class="iconfont icon-jian1 minus" @click="removeContent(index)"></i>
                    <i class="iconfont icon-jia plus" v-if="index === form.product.length - 1" @click="addContent"></i>
                  </div>
                </el-row>
              </div>
            </el-form-item>
            <el-form-item label="商品图片">
              <upload-imgs ref="uploadEle3"  :value="form.titleImg" :rules="rules" :multiple="true" />
            </el-form-item>
            <el-form-item label="商品详情" prop="detail">
              <div class="lin-wrap"><tinymce :defaultContent="form.detailsImg" @change="detailChange" upload_url="http://dev.lin.colorful3.com/cms/file/" /></div>
            </el-form-item>
            <el-form-item class="submit">
              <el-button type="primary" @click="submitForm('form')">保 存</el-button>
              <el-button @click="resetForm('form')">重 置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import book from '@/models/book'
import UploadImgs from '@/components/base/upload-imgs'
import Tinymce from '@/components/base/tinymce'

export default {
  components: {
    UploadImgs,
    Tinymce
  },
  props: {
    editBookID: {
      type: Number,
    },
  },
  data() {
    return {
      loading: false,
      form: {
        name: '',
        pepertory: '',
        type: '',
        titleImg: [],
        detailsImg: '',
        product: []
      },
      rules: {
        minWidth: 100,
        minHeight: 100,
        maxSize: 5,
      },
      options: [
        { label: '手机数码', value: 1 },
        { label: '礼品鲜花', value: 2 },
        { label: '男装女装', value: 3 },
        { label: '母婴用品', value: 4 }
      ]
    }
  },
  async mounted() {
    this.loading = true
    const data= await book.getBook(this.editBookID)
    data.data.titleImg.forEach((item,index) => {
        data.data.titleImg[index]={
          id: index,
          display:
            item,
          src: item,
          imgId: index,
        }
      })
   console.log(data.data)
    this.form =data.data
    console.log(data.data)
    this.loading = false
  },
  methods: {
    async submitForm() {
        this.form.titleImg=[]
      const imglist = await this.$refs.uploadEle3.getValue()
      imglist.forEach(item => {
        this.form.titleImg.push(item.src)
      })
      const res = await book.editBook({id:this.editBookID, ...this.form})
      console.log(res)
      if (res.error_code === 200) {
        this.$message.success(`${res.msg}`)
        this.$emit('editClose')
      }
    },
    async getValue(name) {
      console.log(await this.$refs[name].getValue())
    },
    detailChange(e) {
      console.log(e)
      this.form.detailsImg = e
    },
    addContent() {
      this.form.product.push({
        text: '',
        type: 'plus',
      })
    },
    removeContent(index) {
      this.form.product.splice(index, 1)
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    back() {
      this.$emit('editClose')
    },
  },
}
</script>

<style lang="scss" scoped>
.el-divider--horizontal {
  margin: 0;
}

.container {
  .title {
    height: 59px;
    line-height: 59px;
    color: $parent-title-color;
    font-size: 16px;
    font-weight: 500;
    text-indent: 40px;

    .back {
      float: right;
      margin-right: 40px;
      cursor: pointer;
    }
  }

  .wrap {
    padding: 20px;
  }

  .submit {
    float: left;
  }
}
.lin-wrap-ui /deep/ .el-card__body {
  padding-top: 30px;
  padding-bottom: 0px;
}
.lin-wrap-ui /deep/ .el-collapse {
  border-top: none;
  border-bottom: none;
  cursor: pointer;
  .el-collapse-item__header {
    border-bottom: none;
    color: #2f4e8c;
    padding-left: calc(100% - 77px);
  }

  .el-collapse-item__content {
    background: #e9f0f8;
    color: #2f4e8c;
    border-radius: 4px;
    padding: 0px 20px 20px 20px;
    margin-bottom: 20px;
  }
}
.lin-wrap-ui {
  padding: 30px 40px;
}

.label-title {
  margin-bottom: 10px;
}

.block-box {
  background: #f7f7f7;
  padding: 20px;
  .plus {
    cursor: pointer;
    font-size: 24px;
    font-weight: 500;
    color: #7289b2;
  }

  .input-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    .input-detail {
      width: 300px;
    }

    .function {
      display: flex;
      justify-content: space-between;
      width: 60px;
      height: 36px;
      line-height: 36px;
      cursor: pointer;

      .iconfont {
        font-size: 24px;
        font-weight: 500;

        &.plus {
          color: #7289b2;
        }

        &.minus {
          font-size: 26px;
          color: #c6848e;
        }
      }
    }
  }
}
</style>
