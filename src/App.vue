<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Axios from 'axios'
import { setCity } from '@/utils/city.js'
export default {
  name: 'App',
  async mounted() {
    await Axios.get('https://restapi.amap.com/v3/ip?key=3451452303fb16375647a3ca4b147578')
      .then(res => {
        setCity(res.data.city)
      })
      .catch(e => console.log(e))
  },
}
</script>
