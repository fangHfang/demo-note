<template>
  <div class='baogao'>
    报告
    <p>{{this.$route.params.name}}</p>
  </div>
</template>

<script>
import '../../assets/css/report.css'
export default {
  name: 'report',
  data(){
    return {}
  },
  components: {},
  created(){
  },
  mounted(){
    console.log(this.$route.query.name)
  },
  methods: {}
}
</script>
<style scoped>
</style>
