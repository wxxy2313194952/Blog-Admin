<template>
  <div class="app-container">
    <el-row>
      <el-col class="first-line" :span="6">
        <el-card>
          <div class="pieChart" ref="pieChart1"></div>
        </el-card>
      </el-col>
      <el-col class="first-line" :span="6">
        <el-card>
          <div class="pieChart" ref="pieChart2"></div>
        </el-card>
      </el-col>
      <el-col class="first-line" :span="6">
        <el-card>
          <div class="pieChart" ref="pieChart3"></div>
        </el-card>
      </el-col>
      <el-col class="first-line" :span="6">
        <el-card>
          <div class="pieChart" ref="pieChart4"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="second-line" :span="18">
        <el-card>
          <div slot="header" class="clearfix">
            <span class="lineChart-title">流量统计</span>
            <el-button class="btn" size="mini" type="text">最近7天</el-button>
            <el-button class="btn" size="mini" type="text">最近15天</el-button>
            <el-button class="btn" size="mini" type="text">最近30天</el-button>
          </div>
          <div class="lineChart" ref="lineChart"></div>
        </el-card>
      </el-col>
      <el-col class="second-line" :span="6">
        <el-card>
          <div slot="header" class="clearfix">
            <span class="ranking-title">数据排名</span>
            <el-button class="btn" size="mini" type="text" @click="changeRanking(1)"
              >浏览量排名</el-button
            >
            <el-button class="btn" size="mini" type="text" @click="changeRanking(0)"
              >评论排名</el-button
            >
          </div>
          <div class="ranking" ref="ranking"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from "echarts/core";
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from "echarts/components";
import { LineChart, PieChart, BarChart } from "echarts/charts";
import { UniversalTransition, LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
  PieChart,
  BarChart,
  LabelLayout,
]);
import { mapState } from "vuex";
import { accessLeave } from "@/api/access";
export default {
  name: "Dashboard",
  data() {
    return {
      lineChart: null,
      pieChart1: null,
      pieChart2: null,
      pieChart3: null,
      pieChart4: null,
      ranking: null,
    };
  },
  computed: {
    ...mapState({
      lineCharts: (state) => state.access.lineCharts,
      lastWeek: (state) => state.access.lastWeek,
      behavior: (state) => state.access.behavior,
      menu: (state) => state.access.menu,
      bowser: (state) => state.access.bowser,
      os: (state) => state.access.os,
      lookRanking: (state) => state.access.lookRanking,
      messRanking: (state) => state.access.messRanking,
    }),
  },
  methods: {
    changeRanking(i) {
      if(i){
        this.$store.dispatch("access/getBarLookRanking");
      }
      if(!i){
        this.$store.dispatch("access/getBarMessRanking");
      }
    },
  },
  mounted() {
    this.$store.dispatch("access/getLineCharts", 7);
    this.$store.dispatch("access/getLastweek", 7);
    this.$store.dispatch("access/getPieBehavior", 7);
    this.$store.dispatch("access/getPieMenu", 7);
    this.$store.dispatch("access/getPieBowser", 7);
    this.$store.dispatch("access/getPieOS", 7);
    this.$store.dispatch("access/getBarLookRanking");
    // this.$store.dispatch("access/getBarMessRanking");

    this.pieChart1 = echarts.init(this.$refs.pieChart1);
    this.pieChart1.setOption({
      title: {
        text: "用户行为占比",
        textStyle: {
          fontSize: "16px",
          fontWeight: "bold",
        },
      },
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          top: "20px",
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            formatter(param) {
              return param.name;
            },
          },
          emphasis: {
            label: {
              show: true,
              formatter(param) {
                return param.percent + "%";
              },
            },
          },
          labelLine: {
            show: true,
            length: 10,
            length2: 10,
            maxSurfaceAngle: 120,
            minTurnAngle: 30,
          },
          data: [],
        },
      ],
    });
    this.pieChart2 = echarts.init(this.$refs.pieChart2);
    this.pieChart2.setOption({
      title: {
        text: "菜单点击占比",
        textStyle: {
          fontSize: "16px",
          fontWeight: "bold",
        },
      },
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          top: "20px",
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            formatter(param) {
              return param.name;
            },
          },
          emphasis: {
            label: {
              show: true,
              formatter(param) {
                return param.percent + "%";
              },
            },
          },
          labelLine: {
            show: true,
            length: 10,
            length2: 10,
            maxSurfaceAngle: 120,
            minTurnAngle: 30,
          },
          data: [],
        },
      ],
    });
    this.pieChart3 = echarts.init(this.$refs.pieChart3);
    this.pieChart3.setOption({
      title: {
        text: "访客访问浏览器占比",
        textStyle: {
          fontSize: "16px",
          fontWeight: "bold",
        },
      },
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          top: "20px",
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            formatter(param) {
              return param.name;
            },
          },
          emphasis: {
            label: {
              show: true,
              formatter(param) {
                return param.percent + "%";
              },
            },
          },
          labelLine: {
            show: true,
            length: 10,
            length2: 10,
            maxSurfaceAngle: 120,
            minTurnAngle: 30,
          },
          data: [],
        },
      ],
    });
    this.pieChart4 = echarts.init(this.$refs.pieChart4);
    this.pieChart4.setOption({
      title: {
        text: "访客操作系统占比",
        textStyle: {
          fontSize: "16px",
          fontWeight: "bold",
        },
      },
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          top: "20px",
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            formatter(param) {
              return param.name;
            },
          },
          emphasis: {
            label: {
              show: true,
              formatter(param) {
                return param.percent + "%";
              },
            },
          },
          labelLine: {
            show: true,
            length: 10,
            length2: 10,
            maxSurfaceAngle: 120,
            minTurnAngle: 30,
          },
          data: [],
        },
      ],
    });
    this.lineChart = echarts.init(this.$refs.lineChart);
    this.lineChart.setOption({
      // 提示框组件
      tooltip: {
        trigger: "axis",
      },
      // 图例组件
      legend: {
        data: ["博客浏览量", "博客访问IP数"],
        left: "center",
      },
      grid: {
        left: "2%",
        right: "5%",
        bottom: "2%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: [],
      },
      yAxis: {
        type: "value",
      },

      series: [
        {
          name: "博客浏览量",
          type: "line",
          data: [],
          lineStyle: {
            color: "#01aaed",
          },
          itemStyle: {
            color: "#01aaed",
          },
        },
        {
          name: "博客访问IP数",
          type: "line",
          data: [],
          lineStyle: {
            color: "#F72C5B",
          },
          itemStyle: {
            color: "#F72C5B",
          },
        },
      ],
    });
    this.ranking = echarts.init(this.$refs.ranking);
    this.ranking.setOption({
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      legend: {},
      grid: {
        left: "0%",
        right: "5%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "value",
        boundaryGap: [0, 0.01],
      },
      yAxis: {
        // show: false,
        type: "category",
        data: [],
        inverse: true,
      },
      axisLabel: {
        color: "#000",
        interval: 0,
        formatter: function (value) {
          if (value.length > 4) {
            return value.substring(0, 4) + "...";
          } else {
            return value;
          }
        },
      },
      series: [
        {
          name: "评论",
          type: "bar",
          data: [],
        },
        {
          name: "浏览量",
          type: "bar",
          data: [],
        },
      ],
    });

    accessLeave({
      message: "访问后台管理首页(管理端)",
      user_behavior: 201,
      user_menu: 201,
    }).catch((e) => {});
  },
  watch: {
    lineCharts() {
      this.lineChart.setOption({
        series: [
          {
            data: this.lineCharts,
          },
          {
            data: [12, 34, 23, 4, 13, 38, 25],
          },
        ],
      });
    },
    lastWeek() {
      this.lineChart.setOption({
        xAxis: {
          data: this.lastWeek,
        },
      });
    },
    behavior() {
      this.pieChart1.setOption({
        series: [
          {
            data: this.behavior,
          },
        ],
      });
    },
    menu() {
      this.pieChart2.setOption({
        series: [
          {
            data: this.menu,
          },
        ],
      });
    },
    bowser() {
      this.pieChart3.setOption({
        series: [
          {
            data: this.bowser,
          },
        ],
      });
    },
    os() {
      this.pieChart4.setOption({
        series: [
          {
            data: this.os,
          },
        ],
      });
    },
    lookRanking() {
      this.ranking.setOption({
        yAxis: {
          data: this.lookRanking.arrY.slice(0, 5),
          // data: [1,2,3,4,5],
        },
        series: [
          {
            data: this.lookRanking.arrXLook.slice(0, 5),
          },
          {
            data: this.lookRanking.arrXMess.slice(0, 5),
          },
        ],
      });
    },
    messRanking() {
      this.ranking.setOption({
        yAxis: {
          data: this.messRanking.arrY.slice(0,5),
        },
        series: [
          {
            data: this.messRanking.arrXLook.slice(0,5),
          },
          {
            data: this.messRanking.arrXMess.slice(0,5),
          },
        ],
      });
    },
  },
};
</script>

<style scoped>
.pieChart {
  height: 30vh;
}
.first-line {
  padding: 0px 5px;
}
.second-line {
  padding: 10px 5px 0px 5px;
}
/* 第二行 */
.lineChart {
  height: 41vh;
}
.lineChart-title,
.ranking-title {
  margin-right: 10px;
  font-size: 1.1rem;
  font-weight: bold;
}
.btn {
  border: none;
  padding: 0px;
}
.ranking {
  height: 41vh;
}
</style>
