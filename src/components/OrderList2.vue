<template>
  <div>
    <!--導航區-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首頁</el-breadcrumb-item>
      <el-breadcrumb-item>訂單管理</el-breadcrumb-item>
      <el-breadcrumb-item>訂單列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="24" :type="flex">
        <el-col class="mb-3" :xl="7" :lg="8" :md="6" :sm="6" :xs="24">
          <el-input placeholder="訂單編號查詢" v-model="searchText">
            <!-- <el-button slot="append" icon="el-icon-search"></el-button> -->
          </el-input>
        </el-col>
        <el-col class="mb-3" :xl="7" :lg="5" :md="6" :sm="5" :xs="12">
          <el-date-picker
            class="w-100"
            v-model="searchTimeStart"
            type="datetime"
            placeholder="起始日期時間"
            default-time="8:00:00">
          </el-date-picker>
        </el-col>
        <el-col class="mb-3" :xl="7" :lg="5" :md="6" :sm="5" :xs="12">
          <el-date-picker
            class="w-100"
            v-model="searchTimeEnd"
            type="datetime"
            placeholder="結束日期時間"
            default-time="20:00:00">
          </el-date-picker>
        </el-col>
        <el-col class="text-right mb-3" :xl="3" :lg="6" :md="6" :sm="8">
          <el-button  icon="el-icon-search" type="primary" plain
          @click="filterData()">
            搜尋
          </el-button>
          <el-button @click="allFilterReset" plain>清除篩選</el-button>
        </el-col>
      </el-row>

      <!-- <div class="block">
        <span class="demonstration">有默认值</span>
        <el-color-picker v-model="color1"></el-color-picker>
      </div> -->
      <!-- <el-skeleton :rows="6" animated /> -->
      <!-- 訂單列表數據 -->
      <el-table :data="newTableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-descriptions title="訂單明細" class="mb-3 ml-5 mr-5">
              <el-descriptions-item label="訂單編號">
                {{ props.row.orderNumber }}
              </el-descriptions-item>
              <el-descriptions-item label="訂單交易狀態">
                <el-tag size="small"
                        :type="props.row.txnStatus === '交易成功' ? 'success' : 'success'"
                        disable-transitions>{{props.row.txnStatus}}
                </el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="付款方式">
                {{ props.row.payType }}
              </el-descriptions-item>
              <el-descriptions-item label="建立日期時間">
                {{ props.row.crtDateTime }}
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
                    :type="scope.row.txnStatus === '交易成功' ? 'success' : 'success'"
                    disable-transitions>{{scope.row.txnStatus}}
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column label="付款方式" prop="payType"> </el-table-column>
        <el-table-column sortable label="建立日期時間" prop="crtDateTime"> </el-table-column>
        <el-table-column sortable label="交易日期時間" prop="txnDateTime"> </el-table-column>
        <el-table-column sortable label="訂單金額" prop="txnAmt"> </el-table-column>
        <el-table-column sortable label="商品進度">
          <template #default="scope">
            <el-progress :percentage="scope.row.percentage"> </el-progress>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分頁 -->
      <el-pagination
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchText: '',
      searchTimeStart: '',
      searchTimeEnd: '',
      newTableData:[],
      data:[
          {
            txnDir:'Response 銀行端填入',
            storeId:'兆豐銀行所核發之收款方編號',
            endpointCode:'兆豐銀行所核發之端末代號',
            terminalId:'POS 機編號或自訂之編碼',
            orderNumber:'12987122',
            inqDateTime:'2022/08/08',
            txnType:'購物',
            txnSeqno:'2022020201233',
            txnStatus:'交易成功',
            payType:'信用卡',
            crtDateTime:'2022/07/30',
            txnDateTime:'2022/08/05',
            txnAmt:'8,888',
          },
          {
            txnDir:'Response 銀行端填入',
            storeId:'兆豐銀行所核發之收款方編號',
            endpointCode:'兆豐銀行所核發之端末代號',
            terminalId:'POS 機編號或自訂之編碼',
            orderNumber:'12987148',
            inqDateTime:'2022/08/08',
            txnType:'購物',
            txnSeqno:'2022020201233',
            txnStatus:'交易成功',
            payType:'信用卡',
            crtDateTime:'2022/07/20',
            txnDateTime:'2022/07/31',
            txnAmt:'8,888',
          },
      ],
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
  created(){
    this.allFilterReset();
  },
  methods:{
    filterData(){
      let filterResult = JSON.parse(JSON.stringify(this.data));
      let regExp = new RegExp(this.searchText);

      // 時間搜尋
      if(this.searchTimeStart || this.searchTimeEnd){
        filterResult = filterResult.filter(item => {
          return this.searchTimeStart <= new Date(item.crtDateTime) && new Date(item.txnDateTime) <= this.searchTimeEnd
        })
      }

      // 文字搜尋
      if(this.searchText){
        filterResult = filterResult.filter(item => {
          // return item.orderNumber === this.searchText
          return regExp.test(item.orderNumber)
        });
      }
      this.newTableData = filterResult;
    },
    textFilterData(){
      console.log('here')
    },
    allFilterReset(){
      this.newTableData = JSON.parse(JSON.stringify(this.data));
      this.searchText = '';
      this.searchTimeStart = '';
      this.searchTimeEnd = '';
    },
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
</style>