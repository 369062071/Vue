<template>
  <div class="sales-board">
      <div class="sales-board-intro">
        <h2>流量分析</h2>
        <p>是指在获得网站访问量基本数据的情况下对有关数据进行统计、分析，从中发现用户访问网站的规律，并将这些规律与网络营销策略等相结合，从而发现目前网络营销活动中可能存在的问题，并为进一步修正或重新制定网络营销策略提供依据。当然这样的定义是站在网络营销管理的角度来考虑的</p>
      </div>
      <div class="sales-board-form">
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  购买数量：
              </div>
              <div class="sales-board-line-right">
                <v-counter @on-change="onParamChange('buyNum',$event)"></v-counter>
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  产品类型：
              </div>
              <div class="sales-board-line-right">
                <multiple-choice :selections='productTypes'
                  @on-change="onParamChange('versions',$event)"
                ></multiple-choice>
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  有效时间：
              </div>
              <div class="sales-board-line-right">
                  <valid-time :selections='periodList'
                    @on-change="onParamChange('period',$event)"
                  ></valid-time>
              </div>
          </div>

          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  总价：
              </div>
              <div class="sales-board-line-right">
                  45 元
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">&nbsp;</div>
              <div class="sales-board-line-right">
                  <div class="button" @click='showDialog'>
                    立即购买
                  </div>
              </div>
          </div>
      </div>
      <div class="sales-board-des">
        <h2>产品说明</h2>
        <p>网站访问统计分析报告的基础数据源于网站流量统计信息，但其价值远高于原始数据资料。专业的网站访问统计分析报告对网络营销的价值，正如专业的财务分析报告对企业经营策略的价值。</p>

        <h3>用户行为指标</h3>
        <ul>
          <li>用户行为指标主要反映用户是如何来到网站的、在网站上停留了多长时间、访问了哪些页面等，主要的统计指标包括：</li>
          <li>用户在网站的停留时间；</li>
          <li>用户来源网站（也叫“引导网站”）；</li>
          <li>用户所使用的搜索引擎及其关键词；</li>
          <li>在不同时段的用户访问量情况等。</li>
        </ul>

        <h3>浏览网站方式</h3>
        <ul>
          <li>用户上网设备类型</li>
          <li>用户浏览器的名称和版本</li>
          <li>访问者电脑分辨率显示模式</li>
          <li>用户所使用的操作系统名称和版本</li>
          <li>用户所在地理区域分布状况等</li>
        </ul>
      </div>
      <my-dialog :is-show='inShowPayDialog' @on-close='closeDialog'>
        <table class="buy-dialog-table">
          <tr>
            <th>购买数量</th>
            <th>产品类型</th>
            <th>有效时间</th>
            <th>总价</th>
          </tr>
          <tr>
            <td>{{ buyNum }}</td>
            <td>{{ versions.label }}</td>
            <td>{{ period.label }}</td>
            <td></td>
          </tr>
        </table>
        <h3 class="buy-dialog-title">请选择银行</h3>
        <bank-choose @on-change='onChangeBanks'></bank-choose>
        <div class="button buy-dialog-btn"
        @click='confirmBuy'>
          确认购买
        </div>
      </my-dialog>
      <check-order :is-show='isShowCheckOrder'
        @close-show-check-dialog='hideCheckDialog'
      ></check-order>
  </div>
</template>

<script>
import VCounter from '../../components/base/counter.vue'
import MultipleChoice from '../../components/base/multipleChoice.vue'
import ValidTime from '../../components/base/validTime.vue'
import MyDialog from '../../components/dialog.vue'
import BankChoose from "../../components/bankChoose.vue"
import CheckOrder from '../../components/checkOrder.vue'

export default {
  components: {
    VCounter,
    MultipleChoice,
    ValidTime,
    MyDialog,
    BankChoose,
    CheckOrder
  },
  data () {
    return {
      inShowPayDialog: false,
      buyNum: 0,
      versions:[],
      period:{},
      bankId:'',
      isShowCheckOrder:false,
      periodList: [
        {
          label: '半年',
          value: 0
        },
        {
          label: '一年',
          value: 1
        },
        {
          label: '三年',
          value: 2
        }
      ],
      productTypes: [
        {
          label: '客户版',
          value: 0
        },
        {
          label: '代理商版',
          value: 1
        },
        {
          label: '专家版',
          value: 2
        }
      ],
    }
  },
  methods: {
    showDialog () {
      this.inShowPayDialog = true;
    },
    closeDialog () {
      this.inShowPayDialog = false;
    },
    onParamChange (attr,val) {
      this[attr] = val
      this.getPrice()
    },
    getPrice () {
      let buyVersionsArray = _.map(this.versions,(item) =>{
        return item.value
      })
      let reqParams = {
        buyNum: this.buyNum,
        version: buyVersionsArray.join(','),
        period: this.period.value
      }
      console.log(this.versions)
      this.$http.post('http://127.0.0.1:3000/getPrice',reqParams).then((res) => {
        console.log(res.data)
      })
    },
    onChangeBanks (bankObj) {
      this.bankId = bankObj.id
    }
    ,
    confirmBuy () {
      let buyVersionsArray = _.map(this.versions,(item) =>{
        return item.value
      })
      let reqParams = {
        buyNum: this.buyNum,
        version: buyVersionsArray.join(','),
        period: this.period.value,
        bankId: this.bankId
      }
      this.$http.post('http://127.0.0.1:3000/getPrice',reqParams).then((res) => {
        console.log(res.data)
        this.isShowCheckOrder = true;
        this.inShowPayDialog = false
      })
    },
    hideCheckDialog () {
      this.isShowCheckOrder = false;
    }
  },
  mounted () {
    this.buyNum = 1;
    this.period = this.periodList[0];
    this.versions = this.productTypes[0];
  }



}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.buy-dialog-title {
  font-size: 16px;
  font-weight: bold;
}
.buy-dialog-btn {
  margin-top: 20px;
}
.buy-dialog-table {
  width: 100%;
  margin-bottom: 20px;
}
.buy-dialog-table td,
.buy-dialog-table th{
  border: 1px solid #e3e3e3;
  text-align: center;
  padding: 5px 0;
}
.buy-dialog-table th {
  background: #4fc08d;
  color: #fff;
  border: 1px solid #4fc08d;
}
</style>
