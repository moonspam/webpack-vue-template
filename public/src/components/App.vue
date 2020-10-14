<template>
  <div>
    <h1>{{ hangle }}은 사랑입니다.</h1>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hangle: '한글',
    }
  }
}
</script>
