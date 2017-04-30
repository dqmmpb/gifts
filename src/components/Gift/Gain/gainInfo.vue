<template>
  <div>
    <scroller lock-x scrollbar-y use-pulldown height="-50" :pulldown-config="{content:'下拉刷新',downContent:'下拉刷新',upContent:'释放刷新',loadingContent:'加载中'}" @on-pulldown-loading="refresh" v-model="status" ref="scrollerGainInfo">
      <div class="gain-bg">
        <card v-if="getGainDetail">
          <div slot="content">
            <div v-if="getGainDetail.isDevlieried === 0">
              <div class="gain-info">
                <div class="gain-from">来自{{launcher()}}的心意</div>
                <div class="gain-panel text-align-center">
                  <div class="goods-pic">
                    <img :src="goodsPic()">
                  </div>
                </div>
              </div>
              <div class="gain-other">
                <div class="gain-panel text-align-center">
                  <div class="gain-title">恭喜您！</div>
                  <div class="gain-text">获得"{{goodsName()}}"</div>
                  <router-link v-if="getGainDetail.isDevlieried === 0" :to="toAddressList()">
                    <x-button type="warn" class="btn-normal btn-default btn-fill padding5px0px border40px btn-address">填写收货地址</x-button>
                  </router-link>
                  <router-link v-else :to="{path:'/logistics',query: {deliveryId:getGainDetail.id}}">
                    <x-button mini type="warn" class="btn-normal btn-default padding5px0px border40px">关注公众号，查看物流信息>></x-button>
                  </router-link>
                </div>
              </div>
            </div>
            <div v-if="getGainDetail.isDevlieried === 1">
              <div class="gain-info">
                <div class="gain-from">来自{{launcher()}}的心意</div>
                <div class="gain-panel text-align-center">
                  <div class="goods-pic">
                    <img :src="goodsPic()">
                  </div>
                </div>
              </div>
              <div class="gain-other">
                <div class="gain-panel text-align-center">
                  <div class="gain-text">您已领取"{{goodsName()}}"</div>
                  <router-link :to="toQrCode()">
                    <x-button type="warn" class="btn-normal btn-default padding5px0px border40px">关注公众号，查看物流信息>></x-button>
                  </router-link>
                </div>
              </div>

            </div>
            <div v-if="getGainDetail.isDevlieried === 2">
              <div class="gain-info">
                <div class="gain-from"></div>
                <div class="gain-panel text-align-center">
                  <div class="launcher-pic">
                    <img :src="launcherPic()">
                  </div>
                </div>
              </div>
              <div class="gain-other">
                <div class="gain-panel text-align-center">
                  <div class="gain-text">"{{launcher()}}"的礼物红包</div>
                  <router-link :to="toQrCode()">
                    <x-button type="warn" class="btn-normal btn-default padding5px0px border40px">关注公众号，获取更多惊喜>></x-button>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </card>

        <card v-if="getGainDetail">
          <div slot="content" class="card-gain">
            <group :title="giftTitle()">
              <cell v-for="item in getGainDetail.gainUsers" :inline-desc="forthDesc(item)" :key="item.id" :title="forthTitle(item)" class="cell-card no-before">
                <img slot="icon" width="38" style="display:block;margin-right:5px;" :src="getHeadImg(item)">
                <div slot="value" class="gift-info">
                  <span>领取了</span>
                  <span>{{forthValue(item)}}</span>
                  <span>{{forthValue2(item)}}</span>
                </div>
              </cell>
            </group>
          </div>
        </card>
      </div>
    </scroller>


    <tabbar v-if="getGainDetail" class="view-tabbar" slot="bottom">
      <tabbar-item  v-if="getGainDetail.isDevlieried !== 0" :link="{path:'/gift/sendList'}">
        <span slot="label">查看活动详情</span>
      </tabbar-item>
      <tabbar-item :link="{path:'/gift/gainList'}" class="weui-bar__item_normal">
        <span slot="label">我也要送</span>
      </tabbar-item>
    </tabbar>

  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

import moduleStore from './bll/gainStore'
import store from '../../../store'
(!store.state.gainStore) && store.registerModule('gainStore', moduleStore)

import dateUtil from '../../../common/dateUtil'

import { Tabbar, TabbarItem, Scroller, Group, Cell, Card, XButton, Spinner } from 'vux'

export default {
  components: {
    Tabbar,
    TabbarItem,
    Scroller,
    Group,
    Cell,
    Card,
    XButton,
    Spinner
  },
  computed: {
    ...mapGetters(['getGainDetail'])
  },
  methods: {
    ...mapActions(['queryGainInfo']),
    toAddressList () {
      const shareCode = this.$route.query.shareCode
      if (shareCode) {
        return '/giftAddress?shareCode=' + shareCode + '&redirectUrl=' + encodeURIComponent(this.$route.fullPath)
      } else {
        return '/giftAddress?redirectUrl=' + encodeURIComponent(this.$route.fullPath)
      }
    },
    toLogistics () {

    },
    toQrCode () {
      return '/qrcode'
    },
    launcher () {
      let nickName = this.getGainDetail ? this.getGainDetail.launcher.nickName : 0
      return nickName
    },
    launcherPic () {
      let launcherPic = this.getGainDetail ? this.getGainDetail.launcher.getHeadImg : ''
      let defaultImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII='
      if (/^(data:image)|(http)/.test(launcherPic)) {
        return launcherPic
      } else {
        return defaultImg
      }
    },
    goodsName () {
      let goodsName = this.getGainDetail ? this.getGainDetail.goodsName : ''
      return goodsName
    },
    goodsPic () {
      let goodsPic = this.getGainDetail ? this.getGainDetail.goodsPic : ''
      let defaultImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII='
      if (/^(data:image)|(http)/.test(goodsPic)) {
        return goodsPic
      } else {
        return defaultImg
      }
    },
    firstValue (item) {
      return item.leftAmount + '/' + item.totalAmount
    },
    secondTitle (item) {
      return item.goodsName
    },
    secondValue (item) {
      return item.goodsPrice
    },
    thirdTitle (item) {
      if (item.isDevlieried === 0) {
        return '您已领取'
      } else if (item.isDevlieried === 1) {
        return '已确认发货'
      }
    },
    forthTitle (item) {
      return item.nickName
    },
    forthDesc (item) {
      return dateUtil.format(item.gainTime, 'YYYY.MM.DD', 'YYYY-MM-DD HH:mm:ss')
    },
    forthValue (item) {
      return '"' + item.goodsName + '"'
    },
    forthValue2 (item) {
      return '1个'
    },
    getHeadImg (item) {
      let defaultImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII='
      if (/^(data:image)|(http)/.test(item.headImg)) {
        return item.headImg
      } else {
        return defaultImg
      }
    },
    giftTitle () {
      let totalAmount = this.getGainDetail ? this.getGainDetail.totalAmount : 0
      let leftAmount = this.getGainDetail ? this.getGainDetail.leftAmount : 0
      return '礼包中共有' + totalAmount + '件礼物，目前剩余' + leftAmount + '件未领取'
    },
    refresh () {
      console.log('refresh... ' + 1)
      const shareCode = this.$route.query.shareCode
      if (shareCode) {
        this.queryGainInfo({shareCode: shareCode}).then(() => {
          this.$nextTick(() => {
            setTimeout(() => {
              this.$refs.scrollerGainInfo.donePulldown()
            }, 10)
          })
        })
      }
    },
    initPage () {
      if (this.$route.query) {
        const shareCode = this.$route.query.shareCode
        if (shareCode) {
          this.queryGainInfo({shareCode: shareCode}).then(() => {
            this.$nextTick(() => {
              setTimeout(() => {
                this.$refs.scrollerGainInfo.reset()
              }, 10)
            })
          })
        }
      }
    }
  },
  data () {
    return {
      status: {
        pulldownStatus: 'default'
      }
    }
  },
  mounted () {
    console.log('[GainInfo Page] mounted')
    this.initPage()
  }
}
</script>

<style lang="less">

  @import './gain.less';

</style>
