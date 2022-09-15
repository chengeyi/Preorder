<template>
  <div>
    <!--導航區-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首頁</el-breadcrumb-item>
      <el-breadcrumb-item>訂單管理</el-breadcrumb-item>
      <el-breadcrumb-item>訂單列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card id="cardContainer">
      <!-- <div class="filterContainer">
        <div class="filterFont">搜尋方式</div>
        <div class="radioContainer">
          <el-radio class="radio" v-model="radio" label="文字搜尋">文字搜尋</el-radio>
          <el-radio class="radio" v-model="radio" label="日期區間">日期區間</el-radio>
        </div>
      </div> -->
      <el-row :gutter="24" id="searchContainer">
        <el-col  class="mb-3" :xl="7" :lg="7" :md="6" :sm="6" :xs="16" id="iptContainer">
          <el-input prefix-icon="el-icon-search" id="orderNumIpt" placeholder="商店代號查詢" v-model="storeId" suffix-icon="el-icon-circle-close">
          </el-input>
          <span class="circle-close" @click="clickCircleClose()"></span>
        </el-col>
        <el-col  class="mb-3" :xl="7" :lg="5" :md="6" :sm="4" :xs="24">
          <el-date-picker id="el-date-picker" class="w-100" v-model="inqTxnTimeStart" type="date" placeholder="交易日期（起）">
          </el-date-picker>
        </el-col>
        <el-col  class="mb-3" :xl="7" :lg="5" :md="6" :sm="4" :xs="24">
          <el-date-picker id="el-date-picker" class="w-100" v-model="inqTxnTimeEnd" type="date" placeholder="交易日期（迄）">
          </el-date-picker>
        </el-col>
        <el-col  class="text-right mb-3" :xl="3" :lg="5" :md="6" :sm="8" :xs="24">
          <div id="aa">
            <el-button icon="el-icon-search" type="info" @click="getData()" id="searchBtn">
              搜尋
            </el-button>
          </div>
        </el-col>
      </el-row>

      <!-- 訂單列表數據 -->
      <div class="dataLength"> {{dataLength}} 筆</div>
      <el-table 
        id="tableContainer"
        v-loading="loading"
        element-loading-text="拼命加載中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        class="phone-hide"
        :data="displayData" 
        style="width: 100%" 
        :row-class-name="tableRowClassName">
        <el-table-column label="查詢結果" width="150">

          <el-table-column type="expand">
            <template slot-scope="props">
              <el-descriptions title="訂單明細" class="mb-3 ml-5 mr-5">
                <el-descriptions-item label="銀行端交易序號">
                  {{ props.row.txnSeqno }}
                </el-descriptions-item>
                <!-- <el-descriptions-item label="執行結果說明">
                  <el-tag size="small"
                    :type="props.row.rtnMsg === '交易成功' ? 'success' : props.row.rtnMsg === '交易失敗' ? 'danger' : 'primary'"
                    disable-transitions>
                    {{ props.row.rtnMsg }}
                  </el-tag>
                </el-descriptions-item> -->
                <el-descriptions-item label="交易時間">
                  {{ props.row.txnTime }}
                </el-descriptions-item>
                <el-descriptions-item label="交易幣別">
                  {{ props.row.txnCurrency }}
                </el-descriptions-item>
                <el-descriptions-item label="付款人帳號/卡號">
                  {{ props.row.txnAccNO }}
                </el-descriptions-item>
                <el-descriptions-item label="載具顯碼 id">
                  {{ props.row.carrierId1 }}
                </el-descriptions-item>
              </el-descriptions>
            </template>
          </el-table-column>
          <el-table-column sortable label="訂單編號" prop="orderNumber" align="center"></el-table-column>
          <el-table-column sortable label="商店代號" prop="storeId" align="center"></el-table-column>
          <el-table-column sortable label="執行結果說明" prop="rtnMsg" align="center">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.rtnMsg === '交易成功' ? 'success' : scope.row.rtnMsg === '交易失敗' ? 'danger' : 'primary'"
                disable-transitions>
                <span :class="scope.row.rtnMsg === '交易成功' ? 'el-icon-check' : scope.row.rtnMsg === '交易失敗' ? 'el-icon-close' : 'el-icon-loading'"></span>
                {{ scope.row.rtnMsg }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="付款方式" prop="payType" align="center"></el-table-column>
          <el-table-column sortable label="建立日期" prop="crtDate" align="center"></el-table-column>
          <el-table-column sortable label="交易日期" prop="acctDate" align="center"> </el-table-column>
          <el-table-column sortable label="訂單金額" prop="txnAmt" align="center"> </el-table-column>
        </el-table-column>
      </el-table>
      <div class="paginationContainer">
        <el-pagination
          class="phone-hide"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="sizes, prev, pager, next"
          :total="data.length">
        </el-pagination>
      </div>
    </el-card>

    <div v-for="item in data" :key="item.orderNumber" class="listContainer web-hide">
      <div class="itemContainer"
        :class="item.rtnMsg === '交易成功' ? 'success' : item.rtnMsg == '交易失敗' ? 'danger' : 'inProcess'"
        @click="handlerItemBox(item)">
        <div>
          <img class="statusImg"
            :src="item.rtnMsg === '交易成功' ? successImgUrl : item.rtnMsg === '交易失敗' ? falseImgUrl : inProcessImgUrl">
        </div>
        <div>
          <h4>交易日期: {{ item.acctDate }}</h4>
          <h5>訂單編號: {{ item.orderNumber }}</h5>
          <h5>交易類型: {{ item.txnType }}</h5>
          <h5>付款方式: {{ item.payType }}</h5>
          <span v-if="item.isShow">
            <h5>付款人帳號/卡號: {{ item.txnAccNO }}</h5>
            <h5>銀行端交易序號: {{ item.txnSeqno }}</h5>
            <h5>交易時間: {{ item.txnTime }}</h5>
            <h5>訂單金額: {{ item.txnAmt }}</h5>
            <h5>交易幣別碼: {{ item.txnCurrency }}</h5>
            <h5>載具顯碼 id: {{ item.carrierId1 }}</h5>
            <h5>執行結果說明: {{ item.rtnMsg }}</h5>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      loading: true,
      pageSize:5,
      page:1,
      radio: '文字搜尋',
      flex: '',
      successImgUrl: require('../assets/images/交易成功.jpg'),
      falseImgUrl: require('../assets/images/交易失敗.jpg'),
      inProcessImgUrl: require('../assets/images/交易進行中.jpg'),
      searchText: '',
      storeId:'',
      inqTxnTimeStart: '',
      inqTxnTimeEnd: '',
      data: [
        // {
        //   "txnDir": "RQ",
        //   "storeId": "test123",
        //   "endpointCode": "test123",
        //   "terminalId": "",
        //   "orderNumber": "1f031d1e-d18f-47fe-a7d8-d303b2d12123",
        //   "txnSeqno": "TXN202208290001",
        //   "payType": "C",
        //   "acctDate": "20220830",
        //   "txnAccNO": "432188******3389",
        //   "crtDate": "20220829",
        //   "crtTime": "175555",
        //   "txnDate": "20220829",
        //   "txnTime": "175628",
        //   "txnCurrency": "901",
        //   "txnAmt": "10000",
        //   "carrierType": "",
        //   "carrierId1": "",
        //   "storeMemo": "max測試",
        //   "rtnCode": "0000",
        //   "rtnMsg": "交易進行中",
        //   "sign": ""
        // },
        // {
        //   "txnDir": "RQ",
        //   "storeId": "test123",
        //   "endpointCode": "test123",
        //   "terminalId": "",
        //   "orderNumber": "1f031d1e-d18f-47fe-a7d8-d303b2d12123",
        //   "txnSeqno": "TXN202208290001",
        //   "payType": "C",
        //   "acctDate": "20220830",
        //   "txnAccNO": "432188******3389",
        //   "crtDate": "20220829",
        //   "crtTime": "175555",
        //   "txnDate": "20220829",
        //   "txnTime": "175628",
        //   "txnCurrency": "901",
        //   "txnAmt": "20000",
        //   "carrierType": "",
        //   "carrierId1": "",
        //   "storeMemo": "max測試",
        //   "rtnCode": "0000",
        //   "rtnMsg": "交易成功",
        //   "sign": ""
        // },
        // {
        //   "txnDir": "RQ",
        //   "storeId": "test123",
        //   "endpointCode": "test123",
        //   "terminalId": "",
        //   "orderNumber": "1f031d1e-d18f-47fe-a7d8-d303b2d12123",
        //   "txnSeqno": "TXN202208290001",
        //   "payType": "C",
        //   "acctDate": "20220830",
        //   "txnAccNO": "432188******3389",
        //   "crtDate": "20220829",
        //   "crtTime": "175555",
        //   "txnDate": "20220829",
        //   "txnTime": "175628",
        //   "txnCurrency": "901",
        //   "txnAmt": "30000",
        //   "carrierType": "",
        //   "carrierId1": "",
        //   "storeMemo": "max測試",
        //   "rtnCode": "0000",
        //   "rtnMsg": "交易進行中",
        //   "sign": ""
        // },
        // {
        //   "txnDir": "RQ",
        //   "storeId": "test123",
        //   "endpointCode": "test123",
        //   "terminalId": "",
        //   "orderNumber": "1f031d1e-d18f-47fe-a7d8-d303b2d12123",
        //   "txnSeqno": "TXN202208290001",
        //   "payType": "C",
        //   "acctDate": "20220830",
        //   "txnAccNO": "432188******3389",
        //   "crtDate": "20220829",
        //   "crtTime": "175555",
        //   "txnDate": "20220829",
        //   "txnTime": "175628",
        //   "txnCurrency": "901",
        //   "txnAmt": "40000",
        //   "carrierType": "",
        //   "carrierId1": "",
        //   "storeMemo": "max測試",
        //   "rtnCode": "0000",
        //   "rtnMsg": "交易成功",
        //   "sign": ""
        // },
        // {
        //   "txnDir": "RQ",
        //   "storeId": "test123",
        //   "endpointCode": "test123",
        //   "terminalId": "",
        //   "orderNumber": "1f031d1e-d18f-47fe-a7d8-d303b2d12123",
        //   "txnSeqno": "TXN202208290001",
        //   "payType": "C",
        //   "acctDate": "20220830",
        //   "txnAccNO": "432188******3389",
        //   "crtDate": "20220829",
        //   "crtTime": "175555",
        //   "txnDate": "20220829",
        //   "txnTime": "175628",
        //   "txnCurrency": "901",
        //   "txnAmt": "50000",
        //   "carrierType": "",
        //   "carrierId1": "",
        //   "storeMemo": "max測試",
        //   "rtnCode": "0000",
        //   "rtnMsg": "交易成功",
        //   "sign": ""
        // },
        // {
        //   "txnDir": "RQ",
        //   "storeId": "test123",
        //   "endpointCode": "test123",
        //   "terminalId": "",
        //   "orderNumber": "1f031d1e-d18f-47fe-a7d8-d303b2d12123",
        //   "txnSeqno": "TXN202208290001",
        //   "payType": "C",
        //   "acctDate": "20220830",
        //   "txnAccNO": "432188******3389",
        //   "crtDate": "20220829",
        //   "crtTime": "175555",
        //   "txnDate": "20220829",
        //   "txnTime": "175628",
        //   "txnCurrency": "901",
        //   "txnAmt": "60000",
        //   "carrierType": "",
        //   "carrierId1": "",
        //   "storeMemo": "max測試",
        //   "rtnCode": "0000",
        //   "rtnMsg": "交易失敗",
        //   "sign": ""
        // },
        // {
        //   "txnDir": "RQ",
        //   "storeId": "test123",
        //   "endpointCode": "test123",
        //   "terminalId": "",
        //   "orderNumber": "1f031d1e-d18f-47fe-a7d8-d303b2d12123",
        //   "txnSeqno": "TXN202208290001",
        //   "payType": "C",
        //   "acctDate": "20220830",
        //   "txnAccNO": "432188******3389",
        //   "crtDate": "20220829",
        //   "crtTime": "175555",
        //   "txnDate": "20220829",
        //   "txnTime": "175628",
        //   "txnCurrency": "901",
        //   "txnAmt": "70000",
        //   "carrierType": "",
        //   "carrierId1": "",
        //   "storeMemo": "max測試",
        //   "rtnCode": "0000",
        //   "rtnMsg": "交易失敗",
        //   "sign": ""
        // },
        // {
        //   "txnDir": "RQ",
        //   "storeId": "test123",
        //   "endpointCode": "test123",
        //   "terminalId": "",
        //   "orderNumber": "1f031d1e-d18f-47fe-a7d8-d303b2d12123",
        //   "txnSeqno": "TXN202208290001",
        //   "payType": "C",
        //   "acctDate": "20220830",
        //   "txnAccNO": "432188******3389",
        //   "crtDate": "20220829",
        //   "crtTime": "175555",
        //   "txnDate": "20220829",
        //   "txnTime": "175628",
        //   "txnCurrency": "901",
        //   "txnAmt": "50000",
        //   "carrierType": "",
        //   "carrierId1": "",
        //   "storeMemo": "max測試",
        //   "rtnCode": "0000",
        //   "rtnMsg": "交易失敗",
        //   "sign": ""
        // },
        // {
        //   "txnDir": "RQ",
        //   "storeId": "test123",
        //   "endpointCode": "test123",
        //   "terminalId": "",
        //   "orderNumber": "1f031d1e-d18f-47fe-a7d8-d303b2d12123",
        //   "txnSeqno": "TXN202208290001",
        //   "payType": "C",
        //   "acctDate": "20220830",
        //   "txnAccNO": "432188******3389",
        //   "crtDate": "20220829",
        //   "crtTime": "175555",
        //   "txnDate": "20220829",
        //   "txnTime": "175628",
        //   "txnCurrency": "901",
        //   "txnAmt": "60000",
        //   "carrierType": "",
        //   "carrierId1": "",
        //   "storeMemo": "max測試",
        //   "rtnCode": "0000",
        //   "rtnMsg": "交易失敗",
        //   "sign": ""
        // },
        // {
        //   "txnDir": "RQ",
        //   "storeId": "test123",
        //   "endpointCode": "test123",
        //   "terminalId": "",
        //   "orderNumber": "1f031d1e-d18f-47fe-a7d8-d303b2d12123",
        //   "txnSeqno": "TXN202208290001",
        //   "payType": "C",
        //   "acctDate": "20220830",
        //   "txnAccNO": "432188******3389",
        //   "crtDate": "20220829",
        //   "crtTime": "175555",
        //   "txnDate": "20220829",
        //   "txnTime": "175628",
        //   "txnCurrency": "901",
        //   "txnAmt": "70000",
        //   "carrierType": "",
        //   "carrierId1": "",
        //   "storeMemo": "max測試",
        //   "rtnCode": "0000",
        //   "rtnMsg": "交易失敗",
        //   "sign": ""
        // },
        // {
        //   "txnDir": "RQ",
        //   "storeId": "test123",
        //   "endpointCode": "test123",
        //   "terminalId": "",
        //   "orderNumber": "1f031d1e-d18f-47fe-a7d8-d303b2d12123",
        //   "txnSeqno": "TXN202208290001",
        //   "payType": "C",
        //   "acctDate": "20220830",
        //   "txnAccNO": "432188******3389",
        //   "crtDate": "20220829",
        //   "crtTime": "175555",
        //   "txnDate": "20220829",
        //   "txnTime": "175628",
        //   "txnCurrency": "901",
        //   "txnAmt": "80000",
        //   "carrierType": "",
        //   "carrierId1": "",
        //   "storeMemo": "max測試",
        //   "rtnCode": "0000",
        //   "rtnMsg": "交易進行中",
        //   "sign": ""
        // },
        // {
        //   "txnDir": "RQ",
        //   "storeId": "test123",
        //   "endpointCode": "test123",
        //   "terminalId": "",
        //   "orderNumber": "1f031d1e-d18f-47fe-a7d8-d303b2d12123",
        //   "txnSeqno": "TXN202208290001",
        //   "payType": "C",
        //   "acctDate": "20220830",
        //   "txnAccNO": "432188******3389",
        //   "crtDate": "20220829",
        //   "crtTime": "175555",
        //   "txnDate": "20220829",
        //   "txnTime": "175628",
        //   "txnCurrency": "901",
        //   "txnAmt": "90000",
        //   "carrierType": "",
        //   "carrierId1": "",
        //   "storeMemo": "max測試",
        //   "rtnCode": "0000",
        //   "rtnMsg": "交易成功",
        //   "sign": ""
        // },
        // {
        //   "txnDir": "RQ",
        //   "storeId": "test123",
        //   "endpointCode": "test123",
        //   "terminalId": "",
        //   "orderNumber": "1f031d1e-d18f-47fe-a7d8-d303b2d12123",
        //   "txnSeqno": "TXN202208290001",
        //   "payType": "C",
        //   "acctDate": "20220830",
        //   "txnAccNO": "432188******3389",
        //   "crtDate": "20220829",
        //   "crtTime": "175555",
        //   "txnDate": "20220829",
        //   "txnTime": "175628",
        //   "txnCurrency": "901",
        //   "txnAmt": "10000",
        //   "carrierType": "",
        //   "carrierId1": "",
        //   "storeMemo": "max測試",
        //   "rtnCode": "0000",
        //   "rtnMsg": "交易進行中",
        //   "sign": ""
        // },
        // {
        //   "txnDir": "RQ",
        //   "storeId": "test123",
        //   "endpointCode": "test123",
        //   "terminalId": "",
        //   "orderNumber": "1f031d1e-d18f-47fe-a7d8-d303b2d12123",
        //   "txnSeqno": "TXN202208290001",
        //   "payType": "C",
        //   "acctDate": "20220830",
        //   "txnAccNO": "432188******3389",
        //   "crtDate": "20220829",
        //   "crtTime": "175555",
        //   "txnDate": "20220829",
        //   "txnTime": "175628",
        //   "txnCurrency": "901",
        //   "txnAmt": "10000",
        //   "carrierType": "",
        //   "carrierId1": "",
        //   "storeMemo": "max測試",
        //   "rtnCode": "0000",
        //   "rtnMsg": "交易成功",
        //   "sign": ""
        // },
      ],
      // customColor: '#409eff',
      // cityData,
      // 訂單查詢對象
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      // 總數
      total: 0,
      // 訂單列表
      // orderList: [],
      // 控制修改地址的顯示及隱藏
      addressVisible: false,
      // 控制物流進度的顯示及隱藏
      progressVisible: false,
      // 地址表單
      addressForm: {
        address1: [],
        address2: "",
      },
      // 驗證規則
      addressFormRules: {
        address1: [{ required: true, message: "請選擇縣/市", trigger: "blur" }],
        address2: [
          { required: true, message: "請輸入詳細地址", trigger: "blur" },
        ],
      },
      //物流信息列表
      progressInfo: [],
    };
  },
  mounted(){
    this.getData()
    // setTimeout(()=>{
    //   this.loading = false
    // }, 2000)
  },
  computed: {
    ...mapState(['examination']),
    dataLength() {
      return this.data.length
    },
    displayData() {
      if(!this.data || this.data.length === 0) return [];
      return this.data.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
    }
  },
  methods: {
    selectChange(value) {
      console.log(value);
    },
    getData() {
      // if (this.examination) {
      //   return
      // }
      this.loading = true
      let api = 'http://192.168.1.122/servlet/twpay/V1/controller/QueryServlet';
      let data = {
        txnDateStart: this.inqTxnTimeStart ? this.$moment(this.inqTxnTimeStart).format('YYYYMMDD') : '',
        txnDateEnd: this.inqTxnTimeStart ? this.$moment(this.inqTxnTimeEnd).format('YYYYMMDD') : '',
      }
      console.log(data)
      let sendData = "requestHeader={}&requestBody=" + JSON.stringify(data);
      
      this.axios(api, {
        method: 'POST',
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        data: sendData
      }).then((res) => {
        console.log(res)
        this.loading = false
        this.data = JSON.parse(JSON.stringify(res.data.responseBody.inQueryVo))
        this.data.forEach(item => {
          this.$set(item, "isShow", false)
        });
      });

      this.data.forEach((item) => {
        item.crtDate = this.$moment(item.crtDate).format('YYYY-MM-DD')
        item.txnDate = this.$moment(item.txnDate).format('YYYY-MM-DD')
        item.acctDate = this.$moment(item.acctDate).format('YYYY-MM-DD')
      })
    },
    tableRowClassName({ row }) {
      if (row.txnStatus === '交易失敗') {
        return 'warning-row';
      } else if (row.txnStatus === '交易成功') {
        return 'success-row';
      }
      return '';
    },
    handlerItemBox(item) {
      this.$set(item, "isShow", !item.isShow)
    },
    clickCircleClose(){
      this.storeId = ''
    },
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.page = val;
    }
  },
  created() {
    this.getData()
  },
};
</script>

<style lang="less">
.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

#searchBtn {
  width: 120px;
  height: 48px;
  background-color: #4177FF;
  position: relative;
  left: -140px;
}

@media screen and (max-width:767px) {
  .phone-hide {
    display: none;
  }

  // #orderNumIpt {
  //   width: 50%;
  // }

  // #searchOrderNumBtn {
  //   position: relative;
  //   top: -60px;
  // }
}

@media screen and (min-width:768px) {
  .web-hide {
    display: none;
  }

}

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

.test {
  border: 1px solid red;
  height: 180px;
}

.success {
  background-color: #95f59f;
  border-radius: 5px;
  border: 5px solid #61F17B;
}

.danger {
  background-color: #FFAFAF;
  border-radius: 5px;
  border: 5px solid #f17d7d;
}

.inProcess {
  background-color: #B8FFFF;
  border-radius: 5px;
  border: 5px solid #79ECF6;
}

.statusImg {
  border-radius: 10px;
}

.itemContainer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 20px;
}

.filterFont {
  font-size: 16px;
  color: #7E7E7E;
  width: 65px;
  height: 42px;
  margin-right: 18px;
}

.filterContainer {
  display: flex;
  width: 500px;
  height: 42px;
  margin-top: 30px;
}

.radio {
  width: 124px;
  height: 42px;
  line-height: 42px;
}

.el-radio__label {
  font-size: 16px !important;
  color: #A0A0A0;
}

.radioContainer {
  margin-top: 2px;
  margin-left: 30px;
}

// .el-input__inner::placeholder { 
//   color: #A0A0A0;
// }

.el-input__inner::-webkit-input-placeholder {
  color: #A0A0A0;
}

@media screen and (max-width:765px) {
  #searchBtn {
    position: relative;
    top: -59px;
    left: -256px;
  }
}

@media screen and (max-width:682px) {
  #searchBtn {
    position: relative;
    top: -9px;
    left: -256px;
  }
}

@media screen and (max-width:500) {
  #searchBtn {
    position: relative;
    top: -9px;
    left: -256px;
  }

  #aa {
    border: 1px solid red;
  }
}

#searchOrderNumBtn {
  width: 120px;
  height: 48px;
  background-color: #4177FF;
  position: relative;
  left: 0px;
}

#el-date-picker {
  width: 240px;
  height: 48px;
}

#orderNumIpt {
  // width: 496px;
  width: 100%;
  height: 48px;
}

.el-table_1_column_1 {
  background: #4177FF !important;
  position: relative;
}

.el-table_1_column_1 .cell {
  color: #FFFFFF;
  font-size: 15px;
  margin-left: 50px;
}

.el-table {
  margin-top: 20px;
}

#cardContainer {
  margin-top: 5px;
  position: relative;
}

.dataLength {
  width: 40px;
  height: 40px;
  color: #FFFFFF;
  position: absolute;
  right: 6rem;
  top: 7.2rem;
  z-index: 999;
  line-height: 40px;
}

td {
  color: black;
  
}

.el-descriptions-item__container span{
  display: inline-block;
}

.el-descriptions-item__container {
  display: flex;
  justify-content: center;
}

.el-input__suffix {
  margin-right: -30px;
  cursor: pointer;
}

.el-icon-circle-close {
  position: relative;
  left: -40px;
}

#iptContainer {
  position: relative;
}

.circle-close {
  display: inline-block;
  width: 10px;
  height: 10px;
  position: absolute;
  right: 33px;
  top: 17px;
  z-index: 999;
  cursor: pointer;
}

.paginationContainer {
  padding-top: 15px;
  display: flex;
  justify-content: end;
}

.el-descriptions {
  padding-left: 85px;
}

#tableContainer {
  box-shadow: 12px 12px 7px rgba(103, 111, 119, 0.7);
  transition: .5s;
  border: 1px solid #c2bebe;
  border-radius: 3px;
}

#searchContainer {
  margin-top: 10px;
}
</style>