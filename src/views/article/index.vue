<template>
  <div class="app-container">
    <el-form
      ref="form"
      :model="form"
      label-width="70px"
      @submit.native.prevent
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="文章标题">
            <el-input placeholder="请输入标题" v-model="form.title"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="文章摘要">
            <el-input
              placeholder="请输入摘要"
              v-model="form.describe"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="4">
          <el-form-item label="文章分类">
            <el-select @change="selectClass" v-model="classId" placeholder="请选择分类">
              <el-option
                v-for="item in articleClass"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="文章标签">
            <el-select @change="selectTag" v-model="tagId" placeholder="请选择标签">
              <el-option
                v-for="item in articleTag"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="已选:" label-width="50px">
            <el-tag
              class="label-list"
              v-for="tag in tags"
              :key="tag.name"
              closable
              :type="tag.type"
              @close="closeTag(tag)"
              @click="clickTag(tag)"
              :disable-transitions="false"
            >
              {{ tag.name }}
            </el-tag>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="封面上传">
          <el-upload
            class="upload-demo"
            action=""
            :limit="1"
            :on-change="handleChange"
            :http-request="UnloadImg"
            :file-list="fileList"
            :on-exceed="moreFileList">
            <el-button size="small" type="primary">点击上传<i class="el-icon-upload el-icon--right"></i></el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件,且不超过500kb</div>
          </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="18" :push="13">
          <el-form-item class="btn-submit">
            <el-button type="primary" @click="onSubmit('已发布')">发布</el-button>
            <el-button type="success" @click="onSubmit('草稿')">草稿</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 提交按钮 -->
    </el-form>
    <Editor @getContent="getContent" :clearCont="''"></Editor>
  </div>
</template>

<script>
import Editor from "./editor";
import { mapState } from 'vuex'
import {reqAddArticle} from '@/api/article'
export default {
  name: "Article",
  components: { Editor },
  data() {
    return {
      form: {
        //标题
        title: "",
        // 内容
        content: "",
        //简介
        describe: "",
        //文章分类
        classification: "",
        // 标签
        label: "",
        // 封面图片
        cover_img: null,
        // 文章状态 已发布&草稿
        state: ""
      },
      classId: "",
      tagId: "",
      // 当前选中标签
      tags: [],
      // 上传图片
      formData: {},
      fileList: []
    };
  },
  methods: {
    // 选择分类
    selectClass(){
      this.form.classification = this.classId
    },
    // 选择标签
    selectTag(){
      this.articleTag.forEach((el) => {
        if (el.id == this.tagId) {
          // 判断当前标签列表中有无要添加的元素 不能重复添加
          if (this.tags.indexOf(el) < 0) {
            this.tags.push(el);
          } else {
            this.$message({
              type: "warning",
              message: "不可重复添加",
            });
          }
        }
      });
      this.form.label = JSON.stringify(this.tags)
    },
    // 删除选中的标签
    closeTag(tag){
      // console.log(tag)
      this.articleTag.forEach(el => {
        if(el.id == tag.id){
          this.tags.splice(this.tags.indexOf(el),1)
        }
        if(this.tags.length == 0){
          this.tagId = ""
        }
      })
      this.form.label = JSON.stringify(this.tags)
    },
    clickTag(tag){
      this.articleTag.forEach(el => {
        if(el.id == tag.id){
          this.tagId = el.id
        }
        
      })
    },
    // 拿到编辑器的文本
    getContent(cont){
      this.form.content = cont
    },
    // 上传封面图片
    UnloadImg(file) {
      // 此时我们只是储存了file，并没有直接提交，如果你需要直接提交直接在后面调用接口，传递FormData格式的file参数即可，复制submitFormData 里面的逻辑即可。
      this.imageUrl = URL.createObjectURL(file.file);
      this.form.cover_img = file.file;
      // console.log(file);
    },
    handleChange(file, fileList) {
      let fileObj = {}
      fileObj.name = file.name
      fileObj.url = this.imageUrl
      if(fileList.length == 0){
        this.fileList.push(fileObj)
      }
    },
    // 超出限制 弹窗提示
    moreFileList(){
      this.$message({
        message:'只能上传一张图片呦',
        type: 'warning'
      });
    },
    // 提交
    async onSubmit(artState) {
      this.form.state = artState
      const newFormData = new FormData()
      for (const item in this.form) {
        newFormData.append(item, this.form[item])
      }
      const result = await reqAddArticle(newFormData)
      if(result.code == 200){
        this.$message({
          message: '发布文章成功',
          type: 'success'
        })
        this.form.title = ""
        this.form.describe = ""
        this.classId = ""
        this.tagId = ""
        this.tags.splice(0,this.tags.length)
        this.fileList.splice(0,this.tags.length)
        this.$bus.$emit('clearCont','')
      }
    }
  },
  computed: {
    ...mapState({
      articleClass: (state) => state.article.artClass,
      articleTag: (state) => state.article.tags,
    })
  },
  mounted() {
    this.$store.dispatch('article/getArtClass')
    this.$store.dispatch('article/getArtTag')
  }
};
</script>

<style scoped>
.label-list {
  margin: 5px;
}
.btn-submit{
  margin-top: 82px;
}
</style>