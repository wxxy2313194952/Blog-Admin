<template>
  <div class="app-container">
    <el-descriptions
      label-class-name="my-label"
      class="margin-top my-op"
      :column="2"
      :size="size"
      border
    >
      <el-descriptions-item content-class-name="my-content">
        <template slot="label">
          <i class="el-icon-user"></i>
          文章标题
        </template>
        {{ articleInfo.title }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-notebook-2"></i>
          文章描述
        </template>
        {{ articleInfo.describe }}
      </el-descriptions-item>
      <el-descriptions-item label-class-name="my-label">
        <template slot="label">
          <i class="el-icon-discount"></i>
          所属分类
        </template>
        {{ articleClaName }}
      </el-descriptions-item>
      <el-descriptions-item label-class-name="my-label">
        <template slot="label">
          <i class="el-icon-paperclip"></i>
          标签
        </template>
        <el-tag style="margin-right:5px;" size="small" v-for="tag,index in articleInfo.tags" :key="index">{{ tag }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label-class-name="my-label">
        <template slot="label">
          <i class="el-icon-time"></i>
          创建时间
        </template>
        {{ articleInfo.create_time }}
      </el-descriptions-item>
      <el-descriptions-item label-class-name="my-label">
        <template slot="label">
          <i class="el-icon-time"></i>
          修改时间
        </template>
        {{ articleInfo.last_time }}
      </el-descriptions-item>
    </el-descriptions>
    <EditShow :content="articleInfo.content" />
  </div>
</template>

<script>
import EditShow from "./editShow";
import { reqGetArticle } from "@/api/article";
import { mapState } from "vuex";
export default {
  name: "ArticleShow",
  components: { EditShow },
  data() {
    return {
      size: "medium",
      articleInfo: {},
      // tagsArr: []
    };
  },
  computed: {
    ...mapState({
      articleClass: (state) => state.article.artClass,
    }),
    articleClaName(){
      for (const el of this.articleClass) {
        if(el.id == this.articleInfo.classification){
          return el.name
        }
      }
    }
  },
  async mounted() {
    this.$store.dispatch("article/getArtClass");
    let result = await reqGetArticle(this.$route.params.id);
    if (result.code == 200) {
      this.articleInfo = result.data;
    } else {
      this.$message({
        type: "warning",
        message: "获取用户信息失败",
      });
    }
  },
};
</script>

<style scoped>
.my-label {
  width: 120px;
}
.my-content {
  width: 500px;
}
.my-op {
  margin: 15px;
  margin-bottom: 0px;
}
</style>