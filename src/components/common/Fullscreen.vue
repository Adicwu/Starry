<template>
  <div class="fullscreen" :style="domClass">
    <slot/>
  </div>
</template>

<script>
  export default {
    name: 'Fullscreen',
    props: {},
    data() {
      return {

      };
    },
    computed: {
      domClass() {
        return ({
          height: window.innerHeight+'px',
        });
      }
    },
    mounted() {},
    methods: {},
  };
</script>
<style lang="less" scoped>
  .fullscreen {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
</style>