<template>
  <div class='userEmail'>
      <h5>email</h5>
      <h1>{{id}}</h1>
  </div>
</template>

<script>
export default {
  name: 'userEmail',
  data(){
    return {}
  },
  components: {},
  props: ['id'],
  created(){},
  mounted(){console.log(this.id)},
  methods: {}
}
</script>
<style scoped>
</style>
