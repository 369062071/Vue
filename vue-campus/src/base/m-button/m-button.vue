<template>
  <div>
    <button type="button" class="btn">
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
  .btn
    width: 1.6rem;
    margin: 0 auto;
    padding: .14rem 0 .12rem;
    border-radius: 22px;
    border: none;
    font-size: .14rem;
    color: #fff;
    background: #F6704F;
</style>
