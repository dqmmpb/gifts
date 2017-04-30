<template>
  <div>
    <div class="panel-padding text-align-center">
      <div>领取成功</div>
      <div class="wechat">
        <img src="../../assets/qrcode.png" class="qrcode">
        <div>长按识别二维码关注哦</div>
      </div>
      <div>关注公众号，进入"进入物流信息"中可查看物流动态</div>
    </div>
  </div>
</template>

<script>

import { Tabbar, Group, Cell, XInput, XAddress, XTextarea, XButton } from 'vux'

export default {
  components: {
    Tabbar,
    Group,
    Cell,
    XInput,
    XAddress,
    XTextarea,
    XButton
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
