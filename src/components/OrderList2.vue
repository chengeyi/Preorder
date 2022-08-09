<template>
  <div>
    <!--導航區-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首頁</el-breadcrumb-item>
      <el-breadcrumb-item>訂單管理</el-breadcrumb-item>
      <el-breadcrumb-item>訂單列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="請输入内容" clearable v-model="search">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
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
            <el-descriptions title="訂單明細">
            <el-descriptions-item label="訂單編號">{{ props.row.orderNumber }}</el-descriptions-item
            >
            <el-descriptions-item label="訂單交易狀態">
                <el-tag
                    :type="props.row.txnStatus === '交易成功' ? 'success' : 'success'"
                    disable-transitions>{{props.row.txnStatus}}
                </el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="付款方式">{{ props.row.payType }}</el-descriptions-item>
            <el-descriptions-item label="建立日期時間">
                <el-tag size="small">{{ props.row.crtDateTime }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="訂單金額">{{ props.row.txnDateTime }}</el-descriptions-item>
            </el-descriptions>
          </template>
        </el-table-column>
        <el-table-column sortable label="訂單編號" prop="orderNumber"> </el-table-column>
        <el-table-column sortable label="訂單交易狀態" prop="txnStatus">
            <template slot-scope="scope">
                <el-tag
                    :type="scope.row.txnStatus === '交易成功' ? 'success' : 'success'"
                    disable-transitions>{{scope.row.txnStatus}}
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column sortable label="付款方式" prop="payType"> </el-table-column>
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
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
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

<script>
export default {
  data() {
    return {
      search: '',
      newTableData:[
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
            txnDateTime:'2022/07/30',
            txnAmt:'8,888',
          },
          {
            txnDir:'Response 銀行端填入',
            storeId:'兆豐銀行所核發之收款方編號',
            endpointCode:'兆豐銀行所核發之端末代號',
            terminalId:'POS 機編號或自訂之編碼',
            orderNumber:'12987123',
            inqDateTime:'2022/08/08',
            txnType:'購物',
            txnSeqno:'2022020201233',
            txnStatus:'交易成功',
            payType:'信用卡',
            crtDateTime:'2022/07/30',
            txnDateTime:'2022/07/30',
            txnAmt:'8,888',
          },
      ],  
      tableData: [
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
          percentage: 10,
          customColor: "#409eff",
        },
        {
          id: "12987123",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
          percentage: 20,
        },
        {
          id: "12987125",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
          percentage: 30,
        },
        {
          id: "12987126",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
          percentage: 40,
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
  methods:{
    
  }
};
</script>