<template>
  <div>
    <div class="panel-padding text-align-center panel-qrcode">
      <div class="qrcode-msg">领取成功</div>
      <div class="qrcode">
        <img src="../../assets/qrcode.png" class="img-qrcode">
      </div>
      <div class="qrcode-msg-2">
        <div>长按识别二维码关注哦</div>
        <div>关注公众号，进入"物流信息"中可查看物流动态</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  methods: {
    initPage () {
    }
  },
  data () {
    return {
    }
  },
  mounted () {
    console.log('[Qrcode Page] mounted')
    this.initPage()
  }
}
</script>

<style lang="less">

  @import './qrCode.less';

</style>
