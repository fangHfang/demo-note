<template>
    <div class="news">
      <div class="root">
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Root',
  components: {},
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
.news{
  /*background: #fff;*/
  .root{
    width: 1200px;
    margin: 0 auto;
  }
}
</style>
