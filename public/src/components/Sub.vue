<template>
  <div class="app">
    <info-component :info-text="this.text"></info-component>
    <p>웹팩 기본 틀 👍<br><small><router-link to="/">메인페이지 이동</router-link></small></p>
    <p><img src="../img/cat/cat2.jpg" alt="Cat" width="300" height="300"></p>
  </div>
</template>

<script>
import Info from './Info';

export default {
  components: {
    'info-component': Info,
  },
  data() {
    return {
      text: '가족',
    }
  }
}
</script>