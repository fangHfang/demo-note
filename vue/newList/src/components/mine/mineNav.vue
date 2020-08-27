<template>
  <div class=''>
      <router-link :to='{path:"userEmail?id=10001"}'>
          <h3>userEmail</h3>
      </router-link>
      <router-link :to='{name:"userProfile"}'>
          <h3>UserProfile</h3>
      </router-link> 
  </div>
</template>

<script>
export default {
  name: 'mineNav',
  data(){
    return {}
  },
  components: {},
  created(){},
  mounted(){},
  methods: {}
}
</script>
<style scoped>
</style>
