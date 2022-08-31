<template>
  <div>
    <!--導航區-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首頁</el-breadcrumb-item>
      <el-breadcrumb-item>訂單管理</el-breadcrumb-item>
      <el-breadcrumb-item>訂單列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="24">
        <el-col class="mb-3" :xl="7" :lg="8" :md="6" :sm="6" :xs="24">
          <el-input placeholder="訂單編號查詢" v-model="searchText">
            <!-- <el-button slot="append" icon="el-icon-search"></el-button> -->
          </el-input>
        </el-col>
        <el-col class="mb-3" :xl="7" :lg="5" :md="6" :sm="5" :xs="12">
          <el-date-picker class="w-100" v-model="inqTxnTimeStart" type="datetime" placeholder="起始日期時間"
            default-time="8:00:00">
          </el-date-picker>
        </el-col>
        <el-col class="mb-3" :xl="7" :lg="5" :md="6" :sm="5" :xs="12">
          <el-date-picker class="w-100" v-model="inqTxnTimeEnd" type="datetime" placeholder="結束日期時間"
            default-time="20:00:00">
          </el-date-picker>
        </el-col>
        <el-col class="text-right mb-3" :xl="3" :lg="6" :md="6" :sm="8">
          <el-button icon="el-icon-search" type="primary" plain @click="filterData()">
            搜尋
          </el-button>
          <el-button @click="allFilterReset" plain>清除篩選</el-button>
        </el-col>
      </el-row>

      <!-- 訂單列表數據 -->
      <el-table class="phone-hide" :data="data" style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-descriptions title="訂單明細" class="mb-3 ml-5 mr-5">
              <el-descriptions-item label="訂單編號">
                {{ props.row.orderNumber }}
              </el-descriptions-item>
              <el-descriptions-item label="訂單交易狀態">
                <el-tag size="small"
                  :type="props.row.txnStatus === '交易成功' ? 'success' : props.row.txnStatus === '交易失敗' ? 'danger' : 'primary'"
                  disable-transitions>
                  {{ props.row.txnStatus }}
                </el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="付款方式">
                {{ props.row.payType }}
              </el-descriptions-item>
              <el-descriptions-item label="建立日期時間">
                {{ props.row.crtTime }}
              </el-descriptions-item>
              <el-descriptions-item label="訂單金額">
                {{ props.row.txnAmt }}
              </el-descriptions-item>
            </el-descriptions>
          </template>
        </el-table-column>

        <el-table-column sortable label="訂單編號" prop="orderNumber"></el-table-column>
        <el-table-column sortable label="訂單交易狀態" prop="txnStatus">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.txnStatus === '交易成功' ? 'success' : scope.row.txnStatus === '交易失敗' ? 'danger' : 'primary'"
              disable-transitions>
              {{ scope.row.txnStatus }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="付款方式" prop="payType"> </el-table-column>
        <el-table-column sortable label="建立日期時間" prop="crtDate"></el-table-column>
        <el-table-column sortable label="交易日期時間" prop="acctDate"> </el-table-column>
        <el-table-column sortable label="訂單金額" prop="txnAmt"> </el-table-column>
      </el-table>
    </el-card>

    <div v-for="item in data" :key="item.orderNumber" class="listContainer web-hide">
      <div class="itemContainer"
        :class="item.txnStatus === '交易成功' ? 'success' : item.txnStatus == '交易失敗' ? 'danger' : 'inProcess'"
        @click="handlerItemBox(item)">
        <div>
          <img class="statusImg"
            :src="item.txnStatus === '交易成功' ? successImgUrl : item.txnStatus === '交易失敗' ? falseImgUrl : inProcessImgUrl">
        </div>
        <div>
          <h4>交易日期時間: {{ item.txnDateTime }}</h4>
          <h5>訂單編號: {{ item.orderNumber }}</h5>
          <h5>付款方式: {{ item.payType }}</h5>
          <h5>訂單交易狀態: {{ item.txnStatus }}</h5>
          {{ item.isShow }}
          <span v-if="item.isShow">
            <h5>付款方式: {{ item.payType }}</h5>
            <h5>付款人帳號/卡號: XXXX</h5>
            <h5>訂單金額: {{ item.txnAmt }}</h5>
            <h5>交易幣別碼: XXXX</h5>
            <h5>載具: XXXX</h5>
            <h5>執行結果說明: XXXX</h5>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      flex: '',
      successImgUrl: require('../assets/images/交易成功.jpg'),
      falseImgUrl: require('../assets/images/交易失敗.jpg'),
      inProcessImgUrl: require('../assets/images/交易進行中.jpg'),
      searchText: '',
      inqTxnTimeStart: '',
      inqTxnTimeEnd: '',
      data: [],
      //   customColor: '#409eff',
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
  created() {
    this.allFilterReset();
    this.getData()
    console.log(this.$moment(this.data[0].crtDate).format('YYYY-MM-DD'))
  },
  methods: {
    getData() {
      // let api = 'http://192.168.10.112/servlet/twpay/V1/controller/QueryServlet'
      // let data = {
      //   txnDateStart: this.inqTxnTimeStart || "20220801",
      //   txnDateEnd: this.inqTxnTimeEnd || "20220829",
      // }
      // let sendData = "requestHeader={}&requestBody=" + JSON.stringify(data);

      // this.axios(api,{
      //   method: 'POST',
      //   headers: {
      //     "Content-type": "application/x-www-form-urlencoded;charset=UTF-8",
      //   },
      //   data: sendData,
      // })
      // .then((res) => {
      //   this.data = JSON.parse(JSON.stringify(res.data.responseBody.inQueryVo))
      //   this.data.forEach(item=>{
      //     this.$set(item,"isShow", false)
      //   })
      //   console.log(this.txnList)
      // })
      this.data = [
        {
          "txnDir": "RQ",
          "storeId": "test123",
          "endpointCode": "test123",
          "terminalId": "",
          "orderNumber": "1f031d1e-d18f-47fe-a7d8-d303b2d12123",
          "txnSeqno": "TXN202208290001",
          "payType": "C",
          "acctDate": "20220830",
          "txnAccNO": "432188******3389",
          "crtDate": "20220829",
          "crtTime": "175555",
          "txnDate": "20220829",
          "txnTime": "175628",
          "txnCurrency": "901",
          "txnAmt": "10000",
          "carrierType": "",
          "carrierId1": "",
          "storeMemo": "max測試",
          "rtnCode": "0000",
          "rtnMsg": "交易成功",
          "sign": ""
        },
        {
          "txnDir": "RQ",
          "storeId": "test123",
          "endpointCode": "test123",
          "terminalId": "",
          "orderNumber": "1f031d1e-d18f-47fe-a7d8-d303b2d12a2d",
          "txnSeqno": "TXN202208290001",
          "payType": "C",
          "acctDate": "20220830",
          "txnAccNO": "432188******3389",
          "crtDate": "20220829",
          "crtTime": "175555",
          "txnDate": "20220829",
          "txnTime": "175628",
          "txnCurrency": "901",
          "txnAmt": "10000",
          "carrierType": "",
          "carrierId1": "",
          "storeMemo": "max測試",
          "rtnCode": "0000",
          "rtnMsg": "交易成功",
          "sign": ""
        }
      ]
      this.data.forEach((item)=>{
        item.crtDate = this.$moment(item.crtDate).format('YYYY-MM-DD')
        item.txnDate = this.$moment(item.txnDate).format('YYYY-MM-DD')
        item.acctDate = this.$moment(item.acctDate).format('YYYY-MM-DD')
      })
    },
    filterData() {
      let filterResult = JSON.parse(JSON.stringify(this.data));
      let regExp = new RegExp(this.searchText);

      // 時間搜尋
      if (this.inqTxnTimeStart || this.inqTxnTimeEnd) {
        filterResult = filterResult.filter(item => {
          return this.inqTxnTimeStart <= new Date(item.crtDateTime) && new Date(item.txnDateTime) <= this.inqTxnTimeEnd
        })
      }

      // 文字搜尋
      if (this.searchText) {
        filterResult = filterResult.filter(item => {
          return regExp.test(item.orderNumber)
        });
      }
      this.data = filterResult;
    },
    textFilterData() {
      console.log('here')
    },
    allFilterReset() {
      this.data = JSON.parse(JSON.stringify(this.data));
      this.searchText = '';
      this.inqTxnTimeStart = '';
      this.inqTxnTimeEnd = '';
    },
    tableRowClassName({ row }) {
      console.log(row)
      if (row.txnStatus === '交易失敗') {
        return 'warning-row';
      } else if (row.txnStatus === '交易成功') {
        return 'success-row';
      }
      return '';
    },
    handlerItemBox(item) {
      this.$set(item, "isShow", !item.isShow)
    }
  }
};
</script>

<style>
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

@media screen and (max-width:768px) {
  .phone-hide {
    display: none;
  }
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
</style>