<template>
    <div class="guide">
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
.guide{
  background: #fff;
  .root{
    width: 1200px;
    margin: 0 auto;
  }
}
</style>
