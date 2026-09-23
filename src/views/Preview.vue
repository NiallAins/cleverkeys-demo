<template>
  <div id="preview">
    <div class="title">
      <img alt="home page" src="../../public/site_images/title.png" />
      <p class="text">
        Launching 2021
        <br/><br/><br/>
        <span>
          cleverkeysmusicbooks@gmail.com
        </span>
      </p>
    </div>
  </div>
</template>

<style lang="scss">
  @import '../vars';

  #preview {
    background: $c-bg;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    .title {
      background: #fff;
      padding: 80px 180px;
      border-radius: 20px;
      position: fixed;
      left: 50%;
      top: 45%;
      transform: translate(-50%, -50%);
      text-align: center;
      @include f-title;
      font-weight: normal;

      span {
        @include f-body;
      }
    }
  }
</style>

<script>
  export default {
  }
</script>