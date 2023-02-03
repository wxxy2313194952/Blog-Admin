<template>
  <div>
    <h2>评论管理</h2>
  </div>
</template>

<script>
import { accessLeave } from '@/api/access'
export default {
  name: 'discuss',
  mounted() {
    accessLeave('访问评论管理').catch(e => {})
  }
}
</script>

<style>

</style>