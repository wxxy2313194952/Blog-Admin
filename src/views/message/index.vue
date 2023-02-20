<template>
  <div class="app-container">
    <el-table
      :row-style="{ height: '30px' }"
      stripe
      :data="messageList"
      border
      style="width: 100%"
    >
      <el-table-column align="center" type="index" width="60" label="序号">
      </el-table-column>
      <el-table-column header-align="center" prop="name" width="240" label="留言者">
      </el-table-column>
      <el-table-column header-align="center" prop="content" label="留言内容">
      </el-table-column>
      <el-table-column header-align="center" prop="time" label="时间" width="97">
      </el-table-column>
      <el-table-column header-align="center" prop="email" label="邮箱" width="180">
      </el-table-column>
      <el-table-column header-align="center" prop="avatar" label="城市" width="120">
      </el-table-column>
      <el-table-column align="center" prop="avatar" label="头像" width="66">
      </el-table-column>
      <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            style="margin-right:6px"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next, jumper"
        :total="this.messageNum"
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
import { mapState,mapGetters } from "vuex";
import { rulePuss } from "@/utils/rules";
import { accessLeave } from '@/api/access'
import {reqDelMessage,reqEditMessage} from '@/api/message'
export default {
  name: 'Message',
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
    this.$store.dispatch("message/getMessageNum");
    accessLeave({message:'访问留言管理',city: this.city}).catch(e => {})
  },
  computed: {
    ...mapGetters([
      'rules'
    ]),
    ...mapState({
      messageList: (state) => state.message.messageList,
      messageNum: (state) => state.message.messageNum,
      city: (state) => state.access.city
    }),
  },
  methods: {
    handleEdit(index, row) {
      this.$prompt("请输入修改内容", "提示", {
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
            let res = await reqEditMessage({content: value,id: row.id});
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
      this.$confirm("确定删除该文章吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async() => {
        // 判断权限
        if(!rulePuss(this.rules)){
          this.$message({
              message: "权限不足，无法删除",
              type: "error",
            });
        }else{
          let res = await reqDelMessage(row.id);
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
      this.$store.dispatch("message/getMessageList", this.pag);
    },
  },
}
</script>

<style scoped>
.pagination {
  margin-top: 35px;
  text-align: center;
}
</style>