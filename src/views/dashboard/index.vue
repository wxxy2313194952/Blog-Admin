<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
  </div>
</template>

<script>
import { mapGetters,mapState } from 'vuex'
import { accessLeave } from '@/api/access'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ]),
    ...mapState({
      city: (state) => state.access.city
    })
  },
  mounted() {
    this.$bus.$on('getCity',city => {
      accessLeave({message:'访问后台管理首页',city}).catch(e => {})
    })
    
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
