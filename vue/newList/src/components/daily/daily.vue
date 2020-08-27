<template>
  <div class=''>
      {{this.$route.query.name}}
  </div>
</template>

<script>
import '../../assets/css/daily.css'
export default {
  name: 'daily',
  data(){
    return {}
  },
  components: {},
  created(){},
  mounted(){
    console.log(this.$route.query.name)
  },
  methods: {}
}
</script>
<style scoped>
</style>
