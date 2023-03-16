<template>
  <div class="app-container">
    <el-table
      :row-style="{ height: '30px' }"
      stripe
      :data="reviewList"
      border
      style="width: 100%"
    >
      <el-table-column
        header-align="center"
        prop="titlt"
        width="200"
        label="评论文章"
      >
      </el-table-column>
      <el-table-column header-align="center" prop="content" label="评论内容">
      </el-table-column>
      <el-table-column
        header-align="center"
        prop="name"
        width="180"
        label="评论者"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        prop="email"
        label="邮箱"
        width="170"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        prop="web"
        label="网址"
        width="170"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        prop="time"
        label="评论时间"
        width="97"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        prop="city"
        label="评论来源"
        width="90"
      >
      </el-table-column>
      <el-table-column align="center" prop="avatar" label="头像" width="66">
      </el-table-column>
      <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            style="margin-right: 6px"
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
    <div>
      <el-pagination
        background
        layout="prev, pager, next, jumper"
        :total="this.reviewNum"
        :page-size="this.pag.pageSize"
        :current-page="this.pag.pageNo"
        prev-click
        next-click
        @current-change="handleCurrentChange"
        style="margin-top: 35px;text-align: center;"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { accessLeave } from "@/api/access";
import { mapState,mapGetters } from "vuex";
import { rulePuss } from "@/utils/rules";
import { reqDelReview, reqEditReview } from "@/api/review";
export default {
  name: "Review",
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
    this.$store.dispatch("review/getReviewNum");
    accessLeave({
      message: "访问评论管理(管理端)",
      user_behavior: 201,
      user_menu: 212
    }).catch((e) => {});
  },
  computed: {
    ...mapGetters([
      'rules'
    ]),
    ...mapState({
      reviewList: (state) => state.review.reviewList,
      reviewNum: (state) => state.review.reviewNum,
    }),
  },
  methods: {
    handleEdit(index, row) {
      this.$prompt("请输入修改内容", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue:row.content
      })
        .then(async ({ value }) => {
          // 判断权限
          if(!rulePuss(this.rules)){
            this.$message({
                message: "权限不足，无法修改",
                type: "error",
              });
          }else{
            // 进行逻辑处理
            let res = await reqEditReview({ content: value, id: row.id });
            if (res.code == 200) {
              this.$message({
                message: "修改成功",
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
      this.$confirm("确定删除这条评论吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // 判断权限
          if(!rulePuss(this.rules)){
            this.$message({
                message: "权限不足，无法修改",
                type: "error",
              });
          }else{
            let res = await reqDelReview({id:row.id,article_id:row.article_id});
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
      this.$store.dispatch("review/getReviewList", this.pag);
    },
  },
}
</script>