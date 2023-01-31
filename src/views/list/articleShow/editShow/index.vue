<template>
  <v-md-preview :text="content"  @copy-code-success="handleCopyCodeSuccess"></v-md-preview>
</template>

<script>
import Vue from 'vue';
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';

VMdPreview.use(createCopyCodePlugin());
VMdPreview.use(createLineNumbertPlugin());
import Prism from 'prismjs';

VMdPreview.use(vuepressTheme, {
  Prism,
});

Vue.use(VMdPreview);
export default {
  name: 'EditShow',
  data() {
    return {
      text: 'dgsdgdg',
    };
  },
  props: ["content"],
   methods: {
    handleCopyCodeSuccess(code) {
      this.$message({
        type: "success",
        message: "复制成功"
      })
    },
  },
}
</script>

<style>

</style>