<script setup>
</script>

<template>
  <div class="modal_mask">
    <div class="modal_content">
        <slot name="content"></slot>
    </div>
  </div>
</template>

<style scoped>
/* モーダル */
.modal_mask {
  background-color: rgba(51, 51, 51, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal_content {
  background-color: #FFF;
  box-shadow: 0 0 30px #000;
  position: relative;
  padding: 20px;
  text-align: center;
}
</style>