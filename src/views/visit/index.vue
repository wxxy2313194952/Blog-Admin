<template>
  <div class="app-container">
    <el-table :data="accessList" stripe border style="width: 100%">
      <el-table-column prop="ip" label="IP" width="160" header-align="center">
      </el-table-column>
      <el-table-column
        prop="show_type"
        label="操作内容"
        width="300"
        header-align="center"
      >
      </el-table-column>
      <el-table-column prop="city" label="访客定位" header-align="center" width="220">
      </el-table-column>
      <el-table-column prop="browser" label="访问设备" header-align="center">
      </el-table-column>
      <el-table-column prop="os_name" label="系统" header-align="center">
      </el-table-column>
      <el-table-column prop="time" label="访问时间" header-align="center">
      </el-table-column>
      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
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
        :total="this.accessNum"
        :page-size="this.pag.pageSize"
        :current-page="this.pag.pageNo"
        prev-click
        next-click
        @current-change="handleCurrentChange"
        style="margin-top: 20px;text-align: center;"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { accessLeave, reqDelAccess } from "@/api/access";
import { mapState,mapGetters } from "vuex";
import { rulePuss } from "@/utils/rules";
export default {
  name: "Visit",
  data() {
    return {
      pag: {
        // 每页显示的数量pageSize
        pageSize: 13,
        // 当前页码pageNo
        pageNo: 1,
      },
      tableData: [],
    };
  },
  mounted() {
    this.getData();
    this.$store.dispatch("access/getAccessNum");
    accessLeave('访问访客统计(管理端)').catch(e => {})
  },
  methods: {
    getData() {
      this.$store.dispatch("access/getAccessList", this.pag);
    },
    handleDelete(_, row) {
      this.$confirm("确定删除该条记录吗？", "提示", {
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
            let res = await reqDelAccess(row.id);
            if (res.code == 200) {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              this.getData();
              return res.message;
            } else {
              return Promise.reject();
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
  },
  computed: {
    ...mapGetters([
      'rules'
    ]),
    ...mapState({
      accessList: (state) => state.access.accessList,
      accessNum: (state) => state.access.accessNum,
    }),
  },
};
</script>