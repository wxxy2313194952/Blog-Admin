<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { setCityToken } from '@/utils/auth'
import Axios from 'axios'
export default {
  name: 'App',
  mounted() {
    Axios.get('https://restapi.amap.com/v3/ip?key=3451452303fb16375647a3ca4b147578')
      .then(res => {
        setCityToken(res.data.city)
      })
      .catch(e => console.log(e))
  },
}
</script>
