<template>
  <div class="app-container">
    <el-table
      :row-style="{ height: '30px' }"
      stripe
      :data="articleList"
      border
      style="width: 100%"
    >
      <el-table-column header-align="center" prop="title" label="标题">
      </el-table-column>
      <el-table-column header-align="center" prop="describe" label="简介">
      </el-table-column>
      <el-table-column
        header-align="center"
        prop="classification"
        label="分类"
        width="140"
      >
      </el-table-column>
      <el-table-column header-align="center" prop="tags" label="标签">
        <template slot-scope="scope">
          <el-tag
            :disable-transitions="true"
            style="margin-right: 4px"
            size="mini"
            v-for="(tag, index) in scope.row.tags"
            :key="index"
            >{{ tag }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        prop="create_time"
        label="创建时间"
        width="97"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        prop="last_time"
        label="最后修改"
        width="97"
      >
      </el-table-column>
      <el-table-column align="center" prop="state" label="状态" width="66">
      </el-table-column>
      <el-table-column
        align="center"
        prop="look_count"
        label="浏览量"
        width="66"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="message_count"
        label="评论量"
        width="66"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        prop="classification"
        label="操作"
        width="210"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleShow(scope.$index, scope.row)"
            >查看</el-button
          >
          <el-button
            size="mini"
            type="success"
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
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next, jumper"
        :total="this.articleNum"
        :page-size="this.pag.pageSize"
        :current-page="this.pag.pageNo"
        prev-click
        next-click
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { reqDelArticle } from "@/api/article";
import { accessLeave } from '@/api/access'
export default {
  name: "List",
  data() {
    return {
      pag: {
        // 每页显示的数量pageSize
        pageSize: 9,
        // 当前页码pageNo
        pageNo: 1,
      },
    };
  },
  mounted() {
    this.getData();
    this.$store.dispatch("article/getArticleNum");
    accessLeave('访问文章管理列表').catch(e => {})
  },
  computed: {
    ...mapState({
      articleList: (state) => state.article.articleList,
      articleNum: (state) => state.article.articleNum,
    }),
  },
  methods: {
    handleEdit(index, row) {
      this.$router.push({
	      name:'ArticleEdit',
		    params:{id:row.id}
      })
    },
    handleShow(index, row) {
      this.$router.push({
	      name:'ArticleShow',
		    params:{id:row.id}
      })
    },
    handleDelete(index, row) {
      this.$confirm("确定删除该文章吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async() => {
        let res = await reqDelArticle(row.id);
        if (res.code == 200) {
          this.$message({
            message: "删除成功",
            type: "success",
          })
          this.getData()
          return res.message
        }else {
          return Promise.reject(res.message)
        }
      }).catch(() => {
        this.$message({
          type: "success",
          message: "已取消删除",
        });
      });
    },
    // 当前页改变时的回调
    handleCurrentChange(val) {
      this.pag.pageNo = val;
      this.getData();
      let pag = Math.ceil(this.articleNum / this.pag.pageSize);
      if (pag != val) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      } else {
        document.documentElement.scrollTop = 0;
      }
    },
    getData() {
      this.$store.dispatch("article/getArticleList", this.pag);
    },
  },
};
</script>

<style scoped>
.pagination {
  margin-top: 35px;
  text-align: center;
}
</style>