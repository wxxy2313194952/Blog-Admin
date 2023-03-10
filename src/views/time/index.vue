<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAdd()" style="margin-bottom: 20px"
      >添加时间轴</el-button
    >
    <el-table
      :row-style="{ height: '30px' }"
      stripe
      :data="timeList"
      border
      style="width: 100%"
    >
      <el-table-column
        align="center"
        prop="id"
        width="80"
        label="序号"
      ></el-table-column>
      <el-table-column
        
        prop="content"
        label="内容"
      ></el-table-column>
      <el-table-column
        
        prop="date"
        label="时间"
      ></el-table-column>
      <el-table-column align="center" label="操作" width="250">
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
    <div>
      <el-pagination
        background
        layout="prev, pager, next, jumper"
        :total="this.timeNum"
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
import { reqDelTime, reqEditTime, reqaddTime } from "@/api/time";
export default {
  name: 'Time',
  data() {
    return {
      pag: {
        // 每页显示的数量pageSize
        pageSize: 13,
        // 当前页码pageNo
        pageNo: 1,
      },
    };
  },
  mounted() {
    this.getData();
    this.$store.dispatch("time/getTimeNum");
    accessLeave("访问时间轴管理(管理端)").catch((e) => {});
  },
  computed: {
    ...mapGetters([
      'rules'
    ]),
    ...mapState({
      timeList: (state) => state.time.timeList,
      timeNum: (state) => state.time.timeNum,
    }),
  },
  methods: {
    getData() {
      this.$store.dispatch("time/getTimeList", this.pag);
    },
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
            let res = await reqEditTime({ content: value, id: row.id });
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
      this.$confirm(`确定删除${row.content}吗？`, "提示", {
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
            let res = await reqDelTime(row.id);
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
    handleAdd(){
      this.$prompt("请输入内容", "提示", {
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
            let res = await reqaddTime({content: value});
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
  },

}
</script>