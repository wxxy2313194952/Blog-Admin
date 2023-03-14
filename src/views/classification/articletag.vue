<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAdd()" style="margin-bottom: 20px"
      >添加标签</el-button
    >
    <el-table :data="articleTag" stripe style="width: 100%" border>
      <el-table-column type="index" label="序号" width="300"> </el-table-column>
      <el-table-column prop="name" label="标签名称"> </el-table-column>
      <el-table-column label="操作" width="230" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            style="margin-right: 15px"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState,mapGetters } from "vuex";
import { rulePuss } from "@/utils/rules";
import { accessLeave } from '@/api/access'
import {addArticleTag,editArticleTag,delArticleTag} from "@/api/artcate";
export default {
  name: "ArticleTag",
  methods: {
    handleEdit(index, row) {
      this.$prompt("请输入标签名", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(async ({ value }) => {
          // 判断权限
          if(!rulePuss(this.rules)){
            this.$message({
                message: "权限不足，无法修改",
                type: "error",
              });
          }else{
            let res = await editArticleTag({ name: value, id: row.id });
            if (res.code == 200) {
              this.$message({
                message: "编辑成功",
                type: "success",
              });
              this.getData();
              return res.message;
            } else {
              return Promise.reject(res.message);
            }
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消编辑",
          });
        });
    },
    handleDelete(index, row) {
      this.$confirm("确定删除该标签吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // 判断权限
          if(!rulePuss(this.rules)){
            this.$message({
                message: "权限不足，无法删除",
                type: "error",
              });
          }else{
            let res = await delArticleTag({ id: row.id });
            if (res.code == 200) {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              this.getData();
              return res.message;
            } else {
              return Promise.reject(res.message);
            }
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleAdd() {
      this.$prompt("请输入标签名", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(async ({ value }) => {
          // 判断权限
          if(!rulePuss(this.rules)){
            this.$message({
                message: "权限不足，无法添加",
                type: "error",
              });
          }else{
            let res = await addArticleTag({ name: value });
            if (res.code == 200) {
              this.$message({
                message: "添加成功",
                type: "success",
              });
              this.getData();
              return res.message;
            } else {
              return Promise.reject(res.message);
            }
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    getData() {
      this.$store.dispatch("artcate/getArtTag");
    },
  },
  computed: {
    ...mapGetters([
      'rules'
    ]),
    ...mapState({
      articleTag: (state) => state.artcate.tags,
    }),
  },
  mounted() {
    this.getData()
    accessLeave({
      message: '访问文章标签管理(管理端)',
      user_behavior: 201,
      user_menu: 210
    }).catch(e => {})
  },
};
</script>
