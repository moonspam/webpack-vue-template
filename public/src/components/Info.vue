<template>
  <div>
    <h1>{{ this.infoText }}은 사랑입니다.</h1>
  </div>
</template>

<script>
export default {
  props: {
    'info-text': String,
  }
}
</script>