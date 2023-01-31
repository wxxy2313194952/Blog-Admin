<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="auto" @submit.native.prevent>
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
            <el-select
              @change="selectClass"
              v-model="classId"
              placeholder="请选择分类"
            >
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
            <el-select
              @change="selectTag"
              v-model="tagId"
              placeholder="请选择标签"
            >
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
        <el-col :span="13">
          <el-form-item label="已选:" label-width="50px">
            <el-tag
              class="label-list"
              style="margin-right: 5px"
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
        <el-col :span="1">
          <el-form-item class="btn-submit">
            <el-button type="primary" @click="onSubmit()"
              >保存</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 提交按钮 -->
    </el-form>
    <Edit :newData="getNewData"/>
  </div>
</template>

<script>
import Edit from "./edit";
import { mapState } from "vuex";
import { reqGetArticle,reqEditArticle } from "@/api/article";
export default {
  name: "ArticleEdit",
  components: { Edit },
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
      },
      classId: "",
      tagId: "",
      // 当前选中标签
      tags: [],
      // 文章信息
      articleInfo: {},
    };
  },
  methods: {
    // 选择分类
    selectClass() {
      this.form.classification = this.classId;
    },
    // 选择标签
    selectTag() {
      this.articleTag.forEach((el) => {
        if (el.id == this.tagId) {
          this.tags.push(el);
        }
      });
      this.form.label = JSON.stringify(this.tags);
    },
    // 删除选中的标签
    closeTag(tag) {
      // console.log(tag)
      this.articleTag.forEach((el) => {
        if (el.id == tag.id) {
          this.tags.splice(this.tags.indexOf(el), 1);
        }
        if (this.tags.length == 0) {
          this.tagId = "";
        }
      });
      this.form.label = JSON.stringify(this.tags);
    },
    clickTag(tag) {
      this.articleTag.forEach((el) => {
        if (el.id == tag.id) {
          this.tagId = el.id;
        }
      });
    },
    getNewData(val){
      this.form.content = val
    },
    // 提交
    async onSubmit() {
      let artInfo = this.form
      artInfo.id = this.$route.params.id
      const result = await reqEditArticle(artInfo);
      if (result.code == 200){
        this.$message({
          message: "编辑文章成功",
          type: "success",
        });
      }else{
        this.$message({
          message: "编辑文章失败",
          type: "warning",
        });
      }
      this.$router.push({
        name: 'List'
      })
      
      
      
      // this.form.state = artState;
      // const newFormData = new FormData();
      // for (const item in this.form) {
      //   newFormData.append(item, this.form[item]);
      // }
      // const result = await reqAddArticle(newFormData);
      // if (result.code == 200) {
      //   this.$message({
      //     message: "发布文章成功",
      //     type: "success",
      //   });
      //   this.form.title = "";
      //   this.form.describe = "";
      //   this.classId = "";
      //   this.tagId = "";
      //   this.tags.splice(0, this.tags.length);
      //   this.fileList.splice(0, this.tags.length);
      //   this.$bus.$emit("clearCont", "");
      // }
    },
  },
  computed: {
    ...mapState({
      articleClass: (state) => state.article.artClass,
      articleTag: (state) => state.article.tags,
    }),
  },
  async mounted() {
    this.$store.dispatch("article/getArtClass");
    this.$store.dispatch("article/getArtTag");
    if (this.$route.params.id) {
      let result = await reqGetArticle(this.$route.params.id);
      if (result.code == 200) {
        this.form.title = result.data.title;
        this.form.describe = result.data.describe;
        this.classId = this.form.classification = result.data.classification;
        this.form.content = result.data.content;
        this.$bus.$emit('getData',result.data.content)
        this.articleTag.forEach((el) => {
          result.data.tags.forEach((it) => {
            if (el.name == it) {
              this.tags.push(el);
            }
          });
        });
        this.form.label = JSON.stringify(this.tags)
        this.articleInfo = result.data;
      } else {
        this.$message({
          type: "warning",
          message: "获取用户信息失败",
        });
      }
    }else{
      this.$message({
        type: 'warning',
        message: '请选择文章'
      })
    }
  },
};
</script>

<style scoped>
</style>