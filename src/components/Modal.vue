<script setup>
</script>

<template>
  <div class="modal">
    <p class="modal_mask"></p>
    <div class="modal_content">
        <slot name="content"></slot>
    </div>
  </div>
</template>

<style scoped>
/* モーダル */
.modal {
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
}

.modal > .modal_mask {
  background-color: #333;
  height: 100%;
  margin: 0;
  opacity: 0.8;
  position: absolute;
  width: 100%;
  z-index: 2;
}

.modal > .modal_content {
  background-color: #FFF;
  box-shadow: 0 0 30px #000;
  margin: 0 auto;
  padding: 20px;
  position: relative;
  text-align: center;
  top: 200px;
  width: 400px;
  z-index: 3;
}
</style>