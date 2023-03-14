<template>
  <div class="app-container">
    <h2>图片修改</h2>
  </div>
</template>

<script>
import { accessLeave } from '@/api/access'
export default {
  name: 'ArticleImage',
  mounted() {
    accessLeave({
      message: '访问图片编辑(管理端)',
      user_behavior: 201,
      user_menu: 207
    }).catch(e => {})
  }
}
</script>

<style>

</style>