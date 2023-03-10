<template>
  <div>
    <v-md-editor
      v-model="text"
      height="510px"
      :disabled-menus="[]"
      @change="blur"
      @upload-image="handleUploadImage"
      left-toolbar="undo redo clear | h bold italic strikethrough quote | ul ol table hr | tip link image code | save"
    ></v-md-editor>
  </div>
</template>

<script>
import Vue from "vue";
// 引入v-md-editor编辑器 进阶版
import VueMarkdownEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";

import Prism from "prismjs";

// 引入代码块显示行号插件
import createLineNumbertPlugin from "@kangc/v-md-editor/lib/plugins/line-number/index";

// highlightjs
import hljs from "highlight.js";

// codemirror 编辑器的相关资源
import Codemirror from "codemirror";
// mode
import "codemirror/mode/markdown/markdown";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/vue/vue";
// edit
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/matchbrackets";
// placeholder
import "codemirror/addon/display/placeholder";
// active-line
import "codemirror/addon/selection/active-line";
// scrollbar
import "codemirror/addon/scroll/simplescrollbars";
import "codemirror/addon/scroll/simplescrollbars.css";
// style
import "codemirror/lib/codemirror.css";

// VMdEditor.Codemirror = Codemirror
VueMarkdownEditor.Codemirror = Codemirror;

// 使用代码块行号插件
VueMarkdownEditor.use(createLineNumbertPlugin());

// 使用主题插件
VueMarkdownEditor.use(vuepressTheme, {
  Prism,
  Hljs: hljs,
});

Vue.use(VueMarkdownEditor);
import { addPicture } from "@/api/article";
import { mapGetters } from "vuex";
import { rulePuss } from "@/utils/rules";
export default {
  name: "Editor",
  data() {
    return {
      text: "",
    };
  },
  methods: {
    blur(event) {
      this.$emit("getContent", this.text);
    },
    clearCont(val) {
      this.text = val;
    },
    async handleUploadImage(event, insertImage, files) {
      // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
      // console.log(files);
      // 判断权限
      if (!rulePuss(this.rules)) {
        this.$message({
          message: "权限不足，无法上传",
          type: "error",
        });
      } else {
        const newFormData = new FormData();
        newFormData.append("mypicture", files[0]);
        const result = await addPicture(newFormData);
        if (result.code == 200) {
          this.$message({
            message: "上传成功",
            type: "success",
          });
          insertImage({
            url: process.env.VUE_APP_BASE_API + result.path,
            width: "auto",
            height: "auto",
          });
        }
      }
    },
  },
  mounted() {
    this.$bus.$on("clearCont", this.clearCont);
  },
  computed: {
    ...mapGetters(["rules"]),
  },
};
</script>