<template>
  <div>
    <div class="mainContain">
      <!-- <topNav id="topNavContainer"></topNav> -->
      <!--導航區-->
      <!-- <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首頁</el-breadcrumb-item>
        <el-breadcrumb-item>訂單管理</el-breadcrumb-item>
        <el-breadcrumb-item>訂單列表</el-breadcrumb-item>
      </el-breadcrumb> -->
      <el-card id="cardContainer">
        <topNav id="topNavContainer"></topNav>
        <div class="outside">
          <el-row :gutter="24" id="searchContainer">
            
            <el-col class="mb-3" :xl="7" :lg="8" :md="6" :sm="6" :xs="24" id="iptContainer">
              <el-input prefix-icon="el-icon-search" id="orderNumIpt" placeholder="商店代號查詢" v-model="storeId"
                suffix-icon="el-icon-circle-close">
              </el-input>
              <span class="circle-close" @click="clickCircleClose()"></span>
            </el-col>
            <el-col class="mb-3" :xl="7" :lg="5" :md="6" :sm="5" :xs="12">
              <el-date-picker id="el-date-picker" class="w-100" v-model="inqTxnTimeStart" type="date"
                placeholder="交易日期（起）">
              </el-date-picker>
            </el-col>
            <el-col class="mb-3" :xl="7" :lg="5" :md="6" :sm="5" :xs="12">
              <el-date-picker id="el-date-picker" class="w-100 endDate" v-model="inqTxnTimeEnd" type="date"
                placeholder="交易日期（迄）">
              </el-date-picker>
            </el-col>
            <el-col class="text-right mb-3" :xl="3" :lg="5" :md="6" :sm="8" :xs="24">
              <div id="searchBtnContainer">
                <el-button icon="el-icon-search" type="info" @click="getData()" id="searchBtn">
                  搜尋
                </el-button>
              </div>
            </el-col>
          </el-row>
          <button @click="handlerShowRowDialogBtn" class="setTitleShow"><i class="zi zi_circleComponents"></i></button>
          <button @click="handlerLightOrDark" class="lightOrDark">
            <i class="zi zi_bulbGlow" v-if="sun"></i>
            <i class="zi zi_moon" v-if="moon"></i>
          </button>
          <button @click="handlerDialogBtn" class="changeBackImgBtn"><i class="zi zi_pencilalt"></i> </button>
        </div>
  
        <!-- 訂單列表數據 -->
        <div class="dataLength phone-hide"> {{dataLength}} 筆</div>
        <el-table 
          stripe
          :header-cell-class-name="cellClass"
          id="tableContainer" 
          v-loading="loading" 
          element-loading-text="拼命加載中"
          element-loading-spinner="el-icon-loading" 
          element-loading-background="rgba(0, 0, 0, 0.8)" 
          class="phone-hide"
          :data="displayData" 
          style="width: 100%" 
          @click="toogleExpandCargo(scope.row)" 
          ref="cargoTable"
          @cell-mouse-enter="enter" 
          @cell-mouse-leave="leave">
          <el-table-column label="查詢結果" width="150">
            <el-table-column type="expand" @click="toogleExpandCargo(scope.row)">
              <template slot-scope="props">
                <el-descriptions title="訂單明細" class="mb-3 ml-5 mr-5">
                  <el-descriptions-item label="銀行端交易序號">
                    {{ props.row.txnSeqno }}
                  </el-descriptions-item>
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
                  <el-descriptions-item label="訂單編號" v-if="!showColumn.orderNumber">
                    {{ props.row.orderNumber }}
                  </el-descriptions-item>
                  <el-descriptions-item label="商店代號" v-if="!showColumn.storeId">
                    {{ props.row.storeId }}
                  </el-descriptions-item>
                  <el-descriptions-item label="執行結果說明" v-if="!showColumn.rtnMsg">
                    {{ props.row.rtnMsg }}
                  </el-descriptions-item>
                  <el-descriptions-item label="付款方式" v-if="!showColumn.payType">
                    {{ props.row.payType }}
                  </el-descriptions-item>
                  <el-descriptions-item label="建立日期" v-if="!showColumn.crtDate">
                    {{ props.row.crtDate }}
                  </el-descriptions-item>
                  <el-descriptions-item label="交易日期" v-if="!showColumn.acctDate">
                    {{ props.row.acctDate }}
                  </el-descriptions-item>
                  <el-descriptions-item label="訂單金額" v-if="!showColumn.txnAmt">
                    {{ props.row.txnAmt }}
                  </el-descriptions-item>
                </el-descriptions>
              </template>
            </el-table-column>
            <el-table-column sortable label="訂單編號" prop="orderNumber" align="center" v-if="showColumn.orderNumber">
              <template slot-scope="scope">
              <el-popover popper-class="popoverStyle" trigger="hover" placement="right-start" :ref="'popover' + scope.row.id" >
                <p>銀行端交易序號:<span class="popoverSpanStyle">{{ scope.row.txnSeqno }}</span></p>
                <p>交易時間: <span class="popoverSpanStyle">{{ scope.row.txnTime }}</span></p>
                <p>交易幣別: <span class="popoverSpanStyle">{{ scope.row.txnCurrency }}</span></p>
                <p>付款人帳號/卡號: <span class="popoverSpanStyle">{{ scope.row.txnAccNO }}</span></p>
                <p>載具顯碼 id: <span class="popoverSpanStyle">{{ scope.row.carrierId1 }}</span></p>
                <div slot="reference" class="name-wrapper">
                  {{ scope.row.orderNumber }}
                </div>
              </el-popover>
            </template>
            </el-table-column>
            <el-table-column sortable label="商店代號" prop="storeId" align="center" v-if="showColumn.storeId"></el-table-column>
            <el-table-column sortable label="執行結果說明" prop="rtnMsg" align="center" v-if="showColumn.rtnMsg">
              <template slot-scope="scope">
                <el-tag effect="dark" style="width: 110px;"
                  :type="scope.row.rtnMsg === '交易成功' ? 'success' : scope.row.rtnMsg === '交易失敗' ? 'danger' : 'primary'"
                  disable-transitions>
                  <span
                    :class="scope.row.rtnMsg === '交易成功' ? 'el-icon-check' : scope.row.rtnMsg === '交易失敗' ? 'el-icon-close' : 'el-icon-loading'"></span>
                  {{ scope.row.rtnMsg }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column sortable label="付款方式" prop="payType" align="center" v-if="showColumn.payType"></el-table-column>
            <el-table-column sortable label="建立日期" prop="crtDate" align="center" v-if="showColumn.crtDate"></el-table-column>
            <el-table-column sortable label="交易日期" prop="acctDate" align="center" v-if="showColumn.acctDate"> </el-table-column>
            <el-table-column sortable label="訂單金額" prop="txnAmt" align="center" v-if="showColumn.txnAmt"> </el-table-column>
           
          </el-table-column>
        </el-table>
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
        <div class="paginationContainer">
          <p class="paginationFont phone-hide">每頁筆數 - </p>
          <el-pagination 
            class="phone-hide" 
            @size-change="handleSizeChange" 
            @current-change="handleCurrentChange"
            :page-sizes="[5, 10, 15, 20]" 
            :page-size="pageSize" 
            layout="sizes, prev, pager, next, jumper" 
            :total="data.length">
          </el-pagination>
        </div>
      </el-card>

    </div>

    <!-- <div v-for="item in data" :key="item.orderNumber" class="listContainer web-hide">
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
    </div> -->


    <!-- 顯示欄位設定跳窗 -->
    <el-dialog title="自定義設定" :visible.sync="setRowdialog">
      <transition name="fade">
        <div class="setContainer">
          <div class="checkBoxWrap">
            <el-checkbox class="checkBox" v-model="showColumn.orderNumber">訂單編號</el-checkbox>
            <el-checkbox class="checkBox" v-model="showColumn.storeId">商店代號</el-checkbox>
            <el-checkbox class="checkBox" v-model="showColumn.rtnMsg">執行結果說明</el-checkbox>
            <el-checkbox class="checkBox" v-model="showColumn.payType">付款方式</el-checkbox>
            <el-checkbox class="checkBox" v-model="showColumn.crtDate">建立日期</el-checkbox>
            <el-checkbox class="checkBox" v-model="showColumn.acctDate">交易日期</el-checkbox>
            <el-checkbox class="checkBox" v-model="showColumn.txnAmt">訂單金額</el-checkbox>
          </div>
          <div class="colorWrap">
            <div class="colorPicker">
              <div class="colorFont">表頭文字顏色設定</div>
              <el-color-picker v-model="color" @active-change='handleChangeColor'></el-color-picker>
            </div>
            <div class="colorPicker">
              <div class="colorFont">表格文字顏色設定</div>
              <el-color-picker v-model="color" @active-change='handleChangeColor'></el-color-picker>
            </div>
          </div>
        </div>
      </transition>
      
      <template #footer>
        <span class="dialog-footer">
          <!-- <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="saveColumn">确 定</el-button> -->
        </span>
      </template>
    </el-dialog>

    <!-- 背景設定跳窗 -->
    <el-dialog
      title="背景設定"
      :visible.sync="dialogVisible"
      width="60%"
      >
      <!-- <div class="imgContainer" >
        <div class="imgWarp" v-for="img in backgroundImg" :key="img.id">
          <img :src="img.img" alt="" @click="changeBackImg(img.imgUrl)">
        </div>
      </div> -->
      <div>
        <el-tabs tab-position="left" style="height: 200px;">
          <el-tab-pane label="風景">
            <div class="imgContainer" >
              <div class="imgWarp" v-for="img in backgroundImg" :key="img.id">
                <img :src="img.img" alt="" @click="changeBackImg(img.imgUrl)">
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="純色">
            <div class="imgContainer" >
              <div class="imgWarp" v-for="img in backgroundImg2" :key="img.id">
                <img :src="img.img" alt="" @click="changeBackImg(img.imgUrl)">
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
      </span>
    </el-dialog>
  </div>
</template>
 
<script>
import { mapState } from 'vuex';
import topNav from './topNav.vue'
export default {
  components:{
    topNav
  },
  data() {
    return {
      color:'#8b8e93',
      changeColor:'rgb(139, 142, 147)',
      sun:false,
      moon:true,
      dark:'brightness(80%)',
      light:'brightness(100%)',
      backgroundColor:'',
      backgroundImg:[
        {
          id:1,
          img:require('../assets/images/暗圖.jpg'),
          imgUrl:'images/暗圖.jpg',

        },
        {
          id:4,
          img:require('../assets/images/暗圖2.jpg'),
          imgUrl:'images/暗圖2.jpg'
        },
        {
          id:5,
          img:require('../assets/images/亮圖2.jpg'),
          imgUrl:'images/亮圖2.jpg'
        },
        {
          id:6,
          img:require('../assets/images/暗圖3.jpg'),
          imgUrl:'images/暗圖3.jpg'
        },
        {
          id:7,
          img:require('../assets/images/巴黎亮圖2.jpg'),
          imgUrl:'images/巴黎亮圖2.jpg'
        },
      ],
      backgroundImg2:[
        {
          id:2,
          img:require('../assets/images/亮圖.jpg'),
          imgUrl:'images/亮圖.jpg'
        },
        {
          id:3,
          img:require('../assets/images/純白.jpg'),
          imgUrl:'images/純白.jpg'
        },
        {
          id:8,
          img:require('../assets/images/暗圖4.jpg'),
          imgUrl:'images/暗圖4.jpg'
        },
        {
          id:9,
          img:require('../assets/images/亮圖3.jpg'),
          imgUrl:'images/亮圖3.jpg'
        },
      ],
      defaultImg:'',
      setRowdialog: false,
      showColumn:{
        orderNumber:true,
        storeId:true,
        rtnMsg:true,
        payType:true,
        crtDate:true,
        acctDate:true,
        txnAmt:true,
      },
      dialogVisible: false,
      loading: true,
      pageSize: 5,
      page: 1,
      radio: '文字搜尋',
      flex: '',
      successImgUrl: require('../assets/images/交易成功.jpg'),
      falseImgUrl: require('../assets/images/交易失敗.jpg'),
      inProcessImgUrl: require('../assets/images/交易進行中.jpg'),
      searchText: '',
      storeId: '',
      inqTxnTimeStart: '',
      inqTxnTimeEnd: '',
      data: [
        {
          "txnDir": "RQ",
          "storeId": "test1231",
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
          "rtnMsg": "交易進行中",
          "sign": ""
        },
        {
          "txnDir": "RQ",
          "storeId": "test1232",
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
          "txnAmt": "20000",
          "carrierType": "",
          "carrierId1": "",
          "storeMemo": "max測試",
          "rtnCode": "0000",
          "rtnMsg": "交易成功",
          "sign": ""
        },
        {
          "txnDir": "RQ",
          "storeId": "test1233",
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
          "txnAmt": "30000",
          "carrierType": "",
          "carrierId1": "",
          "storeMemo": "max測試",
          "rtnCode": "0000",
          "rtnMsg": "交易進行中",
          "sign": ""
        },
        {
          "txnDir": "RQ",
          "storeId": "test1234",
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
          "txnAmt": "40000",
          "carrierType": "",
          "carrierId1": "",
          "storeMemo": "max測試",
          "rtnCode": "0000",
          "rtnMsg": "交易成功",
          "sign": ""
        },
        {
          "txnDir": "RQ",
          "storeId": "test1235",
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
          "txnAmt": "50000",
          "carrierType": "",
          "carrierId1": "",
          "storeMemo": "max測試",
          "rtnCode": "0000",
          "rtnMsg": "交易成功",
          "sign": ""
        },
        {
          "txnDir": "RQ",
          "storeId": "test1236",
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
          "txnAmt": "60000",
          "carrierType": "",
          "carrierId1": "",
          "storeMemo": "max測試",
          "rtnCode": "0000",
          "rtnMsg": "交易失敗",
          "sign": ""
        },
        {
          "txnDir": "RQ",
          "storeId": "test1237",
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
          "txnAmt": "70000",
          "carrierType": "",
          "carrierId1": "",
          "storeMemo": "max測試",
          "rtnCode": "0000",
          "rtnMsg": "交易失敗",
          "sign": ""
        },
        {
          "txnDir": "RQ",
          "storeId": "test1238",
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
          "txnAmt": "50000",
          "carrierType": "",
          "carrierId1": "",
          "storeMemo": "max測試",
          "rtnCode": "0000",
          "rtnMsg": "交易失敗",
          "sign": ""
        },
        {
          "txnDir": "RQ",
          "storeId": "test1239",
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
          "txnAmt": "60000",
          "carrierType": "",
          "carrierId1": "",
          "storeMemo": "max測試",
          "rtnCode": "0000",
          "rtnMsg": "交易失敗",
          "sign": ""
        },
        {
          "txnDir": "RQ",
          "storeId": "test12310",
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
          "txnAmt": "70000",
          "carrierType": "",
          "carrierId1": "",
          "storeMemo": "max測試",
          "rtnCode": "0000",
          "rtnMsg": "交易失敗",
          "sign": ""
        },
        {
          "txnDir": "RQ",
          "storeId": "test12311",
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
          "txnAmt": "80000",
          "carrierType": "",
          "carrierId1": "",
          "storeMemo": "max測試",
          "rtnCode": "0000",
          "rtnMsg": "交易進行中",
          "sign": ""
        },
        {
          "txnDir": "RQ",
          "storeId": "test12312",
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
          "txnAmt": "90000",
          "carrierType": "",
          "carrierId1": "",
          "storeMemo": "max測試",
          "rtnCode": "0000",
          "rtnMsg": "交易成功",
          "sign": ""
        },
        {
          "txnDir": "RQ",
          "storeId": "test12313",
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
          "rtnMsg": "交易進行中",
          "sign": ""
        },
        {
          "txnDir": "RQ",
          "storeId": "test12314",
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
  mounted() {
    this.getData()
    //localStorage.clear();

    //判斷光暗模式
    console.log(JSON.parse(localStorage.showColumn))
    this.showColumn = JSON.parse(localStorage.showColumn)
    
    if(localStorage.sun == 'true'){
      this.sun = true;
      this.moon = false;
    }else if(localStorage.sun == undefined){
      this.sun = false;
      this.moon = true;
    }else{
      this.sun = false;
      this.moon = true;
    }

    let darkModel = document.querySelector('.el-card__body')
    darkModel.style.filter = localStorage.backgroundColor;

    //背景圖
    let imgs = document.querySelector('.el-card__body');
    imgs.style.backgroundImage=`url(${require(`@/assets/${localStorage.backgroundImg}`)})`;
    setTimeout(()=>{
      this.changeBackImg(localStorage.backgroundImg)
    },0)

    //欄位顯示隱藏
    

    // setTimeout(()=>{
    // this.loading = false
    // }, 2000)
  },
  computed: {
    ...mapState(['examination']),
    dataLength() {
      return this.data.length
    },
    displayData() {
      if (!this.data || this.data.length === 0) return [];
      return this.data.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
    }
  },
  methods: {
    
    handleChangeColor(value){
      console.log(value)
      this.changeColor = value;

      //將色碼轉16進位
      const reg = /[0-9]\d+/g
      const getArr =  this.changeColor.match(reg)
      let hexStr = '#'+((getArr[0] << 16) | (getArr[1]  << 8) | getArr[2] ).toString(16);

      setTimeout(()=>{
        let thColor = document.querySelectorAll('.el-table th.el-table__cell>.cell')
        for(let i = 2; i<thColor.length; i++){
          thColor[i].style.color = hexStr;
        }
      },0)

    },
    handlerShowRowDialogBtn(){
      this.setRowdialog = true;
    },
    handlerLightOrDark(){
      this.sun = !this.sun;

      localStorage.sun = this.sun;

      this.moon = !this.moon;

      localStorage.moon = this.moon;

      let darkModel = document.querySelector('.el-card__body');

      if(this.moon == false){
        localStorage.backgroundColor = this.dark;
        darkModel.style.filter="brightness(80%)";
      }else{
        localStorage.backgroundColor = this.light;
        darkModel.style.filter="brightness(100%)";
      }
    },
    handlerDialogBtn(){
      this.dialogVisible = true;
    },
    changeBackImg(img) {
      this.defaultImg = img
      let imgs = document.querySelector('.el-card__body');
      imgs.style.backgroundImage=`url(${require(`@/assets/${img}`)})`;
      localStorage.backgroundImg = img;
      if(img == 'images/暗圖.jpg' || img == 'images/暗圖2.jpg' || img == 'images/暗圖3.jpg' || img == 'images/暗圖4.jpg'){
        let activ = document.querySelectorAll('.activ');
        for(let i = 0; i<activ.length; i++){
          activ[i].classList.remove('activ')
        }
      }else{
        let input = document.querySelectorAll('.el-input__inner');
        let inputIcon = document.querySelectorAll('.el-input__icon');
        let  tableStyle = document.querySelectorAll('.tableStyle > .cell')
        let dataLength = document.querySelector('.dataLength')
        let tableContainer = document.querySelector('#tableContainer')
        let tableBorder = document.querySelector('.el-table--border th.el-table__cell')
        let elTableGroup = document.querySelector('.el-table--group')
        let paginationFont = document.querySelector('.paginationFont')
        let pagination__jump = document.querySelector('.el-pagination__jump')
        let setTitleShow = document.querySelector('.setTitleShow')
        let lightOrDark = document.querySelector('.lightOrDark')
        let changeBackImgBtn = document.querySelector('.changeBackImgBtn')
        for(let i = 0; i<input.length ;i++){
          input[i].classList.add('activ');
          inputIcon[i].classList.add('activ');
          tableStyle[0].classList.add('activ');
          dataLength.classList.add('activ');
          tableContainer.classList.add('activ');
          tableBorder.classList.add('activ');
          elTableGroup.classList.add('activ');
          paginationFont.classList.add('activ');
          pagination__jump.classList.add('activ');
          setTitleShow.classList.add('activ');
          lightOrDark.classList.add('activ');
          changeBackImgBtn.classList.add('activ');
        }
  
        let td = document.querySelectorAll('.el-table td')
        for(let i = 0; i<td.length ;i++){
          td[i].classList.add('activ');
        }
  
        let elTableTh = document.querySelectorAll('.el-table--border th')
        for(let i = 0; i<elTableTh.length ;i++){
          elTableTh[i].classList.add('activ');
        }
  
        let ascending = document.querySelectorAll('.ascending')
        let descending = document.querySelectorAll('.descending')
        for(let i = 0; i<ascending.length ;i++){
          ascending[i].classList.add('activ');
          descending[i].classList.add('activ');
        }
  
        let arrowRight = document.querySelectorAll('.el-icon-arrow-right') 
        for(let i = 0; i<arrowRight.length ;i++){
          arrowRight[i].classList.add('activ');
        }
  
        let tdFont = document.querySelectorAll('.el-table__body-wrapper .el-table__cell .cell') 
        for(let i = 0; i<tdFont.length ;i++){
          tdFont[i].classList.add('activ');
        }

        let number = document.querySelectorAll('.number')
        for(let i = 0; i<number.length ;i++){
          number[i].classList.add('activ2');
        }

        let select__caret = document.querySelector('.el-select__caret')
        select__caret.classList.add('activ');
        
      }
    },
    cellClass() {
      setTimeout(()=>{
        let dom = document.querySelectorAll(".is-group tr")[0]
        dom.classList.add('headerStyle')

        let dom2 = document.querySelectorAll(".is-group tr")[1]
        dom2.classList.add('headerStyle2')
        //console.log(dom)
      },1000)
      return 'tableStyle'
    },
    enter() {
      //console.log(row)
      //this.$refs['popover'+row.storeId].showPopper = true
    },
    leave() {
      //console.log(row)
      //this.$refs['popover'+row.storeId].showPopper = false
    },
    www(a, b) {
      console.log(a, b)
       let dleActive = document.getElementsByClassName('domActive')
       setTimeout(()=>{
          dleActive[0].classList.remove('domActive')
        },0)
       console.log(dleActive)
      let storeId = document.getElementsByClassName('cell')
      // for(let i = 0; i<storeId.length; i++){
      //   if(storeId[i].innerText !== a.storeId){
      //     let addActive = storeId[i].parentNode.parentNode
      //     addActive.style.backgroundColor = "";
      //   }
      // }
      for(let i = 0; i<storeId.length; i++){
        if(storeId[i].innerText == a.storeId){
          let addActive = storeId[i].parentNode.parentNode
          //addActive.style.backgroundColor = "#69b2ee";
          console.log(addActive)
          setTimeout(()=>{
            addActive.classList.add('domActive')
            console.log(addActive)
          },0)
        }
      }
    },
    toogleExpandCargo(row) {
      console.log(row)
      let $table = this.$refs.cargoTable;
      this.data.map(item => {
        if (row.storeId != item.storeId) {
          $table.toggleRowExpansion(item, false);
        }
      });
      $table.toggleRowExpansion(row);
    },
    testtt(row, expandedRows) {
      console.log(row, expandedRows)
    },
    // handle(row,column,cell,event) {
    // console.log(row)
    // console.log(column)
    // console.log(cell)
    // console.log(event)
    // },
    selectChange(value) {
      console.log(value);
    },
    getData() {
      if (this.examination) {
        return
      }
      this.loading = true
      let api = 'http://192.168.10.120/servlet/twpay/V1/controller/QueryServlet';
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
        this.data.forEach((item) => {
          item.crtDate = this.$moment(item.crtDate).format('YYYY-MM-DD')
          item.txnDate = this.$moment(item.txnDate).format('YYYY-MM-DD')
          item.acctDate = this.$moment(item.acctDate).format('YYYY-MM-DD')
        })
      });
      this.loading = false
    },
    // tableRowClassName({ row }) {
    //   if (row.rtnMsg === '交易失敗') {
    //     return 'warning-row';
    //   } else if (row.rtnMsg === '交易成功') {
    //     return 'success-row';
    //   } else if (row.rtnMsg === '交易進行中') {
    //     return 'succes-row';
    //   }
    //   return '';
    // },
    handlerItemBox(item) {
      this.$set(item, "isShow", !item.isShow)
    },
    clickCircleClose() {
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
  watch:{
    showColumn:{
      deep:true,
      handler(val){
        //this.handleChangeColor(this.changeColor)
        this.changeBackImg(this.defaultImg)
        localStorage.showColumn = JSON.stringify(val);
      },
    }
  }
};
</script>
 
<style lang="less" scoped>
@import url("https://ico.z01.com/zico.css");
/deep/ .el-tabs__item{
  font-size: 16px;
}
.mainContain{
  width: 100%;
  display: flex;
  flex-direction: column;
}
.colorWrap{
  display: flex;
  flex-direction: column;
  height: 100px;
  margin-top: 50px;
}

.colorPicker{
  display: flex;
  margin-bottom: 20px;
  align-items: center;
}

.colorFont{
  font-size: 16px;
  color:#303133;
  margin-right: 10px;
}

.outside{
  position: relative;
}

.lightOrDark{
  border-radius: 5px;
  display: inline-block;
  position: absolute;
  right: 80px;
  top: 1px;
  cursor: pointer;
  width: 35px;
  height: 35px;
  background-color: transparent;
  color: white;
}

.lightOrDark.activ{
  color: rgb(22, 21, 21);
}

.lightOrDark:hover{
  transition: .3s;
  background-color: #749bff;
}

.lightOrDark .zi_bulbGlow{
  font-size: 20px;
}

.setTitleShow{
  border-radius: 5px;
  display: inline-block;
  position: absolute;
  right: 40px;
  top: 1px;
  cursor: pointer;
  width: 35px;
  height: 35px;
  background-color: transparent;
  color: white;
}

.setTitleShow.activ{
  color: rgb(22, 21, 21);
}

.setTitleShow:hover{
  transition: .3s;
  background-color: #749bff;;
}

//跳窗
.imgContainer{
  width: 100%;
  height: 400px;
  display: flex;
}

.imgContainer .imgWarp{
  width: 20%;
  height: 20%;
  margin-right: 10px;
  border: 2px solid rgb(192, 192, 192);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 2px 2px .5px #979797;
  cursor: pointer;
}

.imgContainer .imgWarp img{
  width: 100%;
  height: 100%;
  object-fit:cover;
}

.checkBox{
  margin-top: 10px;
}

/deep/ .el-checkbox__label {
  font-size: 16px;
}

.changeBackImgBtn {
  border-radius: 5px;
  display: inline-block;
  position: absolute;
  right: 0;
  top:1px;
  cursor: pointer;
  width: 35px;
  height: 35px;
  background-color: transparent;
  color: white;
}

.changeBackImgBtn.activ{
  color: rgb(22, 21, 21);
}

.changeBackImgBtn:hover{
  transition: .3s;
  background-color: #749bff;
}

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
  height: 40px;
  background-color: #4177FF;
  position: relative;
  left: -140px;
}

@media screen and (max-width:767px) {
  .phone-hide {
    display: none;
  }

  .web-hide{
    color: #141a1a;
  }

  .setTitleShow{
    margin-top: 90px;
  }

  .lightOrDark{
    margin-top: 90px;
  }

  .changeBackImgBtn{
    margin-top: 90px;
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
// color: #A0A0A0;
// }

.el-input__inner::-webkit-input-placeholder {
  color: #A0A0A0;
}


@media screen and (max-width:1000px) {
  #searchBtnContainer {
    height: 70px;
    position: relative;
  }

  #searchBtn {
    position: absolute;
    //top: -59px;
    left: 100px;
  }

  .endDate {
    margin-left: 60px;
  }

  .dataLength {
    margin-top: 30px;
  }

  .setTitleShow{
    top:70px;
  }

  .lightOrDark{
    top:70px;
  }

  .changeBackImgBtn{
    top:70px;
  }
}

@media screen and (max-width:765px) {
  #searchBtnContainer {
    height: 70px;
    position: relative;
  }

  #searchBtn {
    position: absolute;
    //top: -59px;
    left: 0px;
  }

  .endDate {
    margin-left: 0px;
  }
}

@media screen and (max-width:535px) {

  #searchContainer {
    display: flex;
    flex-direction: column;

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
  height: 80%;
  position: relative;
  background: rgba(0, 0, 0, 0);
  color: #fff;
}

.dataLength {
  width: 40px;
  height: 40px;
  color: #c1c1c1;
  position: absolute;
  right: 6rem;
  top: 12.6rem;
  z-index: 999;
  line-height: 40px;
}

td {
  color: black;

}

.el-descriptions-item__container span {
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
  transition: .5s;
  border: 1px solid #c2bebe;
  border-radius: 3px;
  //background-color: red !important;
}

#searchContainer {
  margin-top: 10px;
}


.el-table--enable-row-hover .el-table__body tr:hover>td {
  background-color: rgba(0, 0, 0, 0)!important;
}

.paginationFont {
  margin-top: 5px;
  color: #909399;
  font-size: 13px;
}

.el-pagination .el-select .el-input .el-input__inner {
  padding-left: 20px;
  border: 1px solid rgb(201, 190, 190);
}

/deep/ .el-input--prefix .el-input__inner{
  color: rgb(255, 255, 255);
}

/deep/ .el-pagination__jump {
  color: #909399;
}

.el-pagination__jump .el-input__inner {
  border: 1px solid rgb(201, 190, 190);
}

.el-table .domActive>td {
  border: none;
}

.el-table .domActive {
  //background-color: #69b2ee;
  background-color: #e5f2ff;
}

.popoverStyle {
  background-color: #ffffff!important;
  border: 1px solid #bce6ff!important;
}

.popoverSpanStyle {
  margin-left: 10px;
  //font-family: Noto Sans SC;
  font-style: normal;
}

.popoverStyle[x-placement^="right-start"] .popper__arrow::after {
    border-bottom-color: #03204e !important;
}

.popoverStyle[x-placement^="right-start"] .popper__arrow {
    border-bottom-color: #0368f9 !important;
}

.el-pagination button, .el-pagination span:not([class*=suffix]){
  font-size: 15px!important;
  color: black;
}  

.el-pagination__sizes .el-input__suffix {
  display: none!important;
}

/deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
    background: #4177FF !important;
    border-radius: 50%!important;
}

.el-input--prefix .el-input__inner {
  border: 1px solid rgb(184, 184, 184);
}

.el-tag--primary {
  background-color: #4177FF !important;
  border: #4177FF !important;
  
}


.el-table th.el-table__cell.is-sortable{
  background-color: rgb(255, 255, 255) !important;
  border-bottom: #141a1a 1px solid !important;
}

/*最外层透明*/
.el-table, .el-table__expanded-cell{
    background-color: transparent;
}
/* 表格内背景颜色 */
.el-table th,
.el-table tr,
.el-table td {
    background-color: transparent;
}

/*最外层透明*/
/deep/ .el-table, /deep/ .el-table__expanded-cell{
  background-color: transparent;
}
/* 表格内背景颜色 */
/deep/ .el-table th,
/deep/ .el-table tr,
/deep/ .el-table td {
  background-color: transparent!important;
}

/deep/ .el-card__body{
  background-image: url(../assets/images/暗圖.jpg);
  //background-image: url(https://images.unsplash.com/photo-1589190632370-dcc9388aab4b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2640&q=80);
  //background-image: url(https://images.unsplash.com/photo-1623118176083-897933d9977f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80);
  //background-image: url(https://images.unsplash.com/photo-1607944023727-62f96d76b2d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80);
  background-position: center center;
  background-size: cover;
}
/deep/ .el-card__body .el-table--striped{
  backdrop-filter: blur(15px)!important;
}

/deep/ .headerStyle .tableStyle > .cell {
  color: #c1c1c1;
  padding-left: 100px!important;
}

/deep/ .el-table__body-wrapper .el-table__cell .cell{
  color: #fffdfd;
}

/deep/ .el-icon-arrow-right{
  color: #fdfeff;
  
}

/deep/ .el-input__inner{
  color: #c1c1c1;
}

/deep/ .number.active{
  color: #ffffff!important;
}

/deep/ .number{
  color:#8d8d8d!important;
}

//分頁

/deep/ .number.active.activ2{
  color: #141a1a!important;
}

/deep/ .number{
  color:#8d8d8d!important;
}

/deep/ .el-input__icon.el-select__caret.activ{
  color: #000000;
}

/deep/ .el-input__inner {
  border: 1px solid rgb(155, 155, 155);
  background-color: transparent;
  backdrop-filter: blur(5px);
}


/deep/ .el-input__inner.activ {
  border:1px solid rgb(155, 155, 155);
  color: #141a1a;
  background-color: transparent;
  backdrop-filter: blur(5px);
}


/deep/ .el-input__inner.activ::placeholder {
    color: rgb(37, 37, 37);
}

/deep/ .el-input__icon.activ {
  color: rgb(0, 0, 0);
}

/deep/ .btn-prev {
  //border: 1px solid rgb(255, 255, 255);
  background-color: transparent!important;
}
/deep/ .btn-next{
  //border: 1px solid rgb(255, 255, 255);
  background-color: transparent!important;
}
/deep/ .number{
  background-color: transparent!important;
}

/deep/ .el-pager li.active {
  background-color: transparent!important;
  color: #5c5c5c;
}

//table
/deep/  .headerStyle .tableStyle > .cell.activ{
  color:rgb(92, 92, 92);
}

.dataLength.activ{
  color:#5c5c5c;
}

#tableContainer.activ{
  border: 1px solid black;
}

/deep/  .tableStyle.el-table__cell.activ{
  border-bottom:1px solid black;
}

/deep/ .el-table--group.activ {
    border-color: rgb(155, 155, 155)!important;
}

/deep/ .el-table td.activ,
.el-table th.is-leaf {
        border-bottom: 1px solid rgb(155, 155, 155)!important;
}

/deep/ .el-table--border th.activ{
        border-bottom: 1px solid rgb(155, 155, 155)!important;
        border-right: 1px solid rgb(155, 155, 155)!important;
}

/deep/ .el-table--border td.activ,
.el-table--border th {
        border-right: 1px solid rgb(155, 155, 155)!important;
}

/deep/ .tableStyle.activ .cell{
  color: #5c5c5c;
}
/deep/ .el-table .sort-caret.ascending.activ{
  border-bottom-color: #5c5c5c;
}

/deep/ .el-table .sort-caret.descending.activ{
  border-top-color: #5c5c5c;
}

/deep/ .el-icon-arrow-right.activ{
  color: black;
}

/deep/ .el-table__body-wrapper .el-table__cell .cell.activ{
  color:rgb(0, 0, 0)
}

.paginationFont.activ{
  color: #5c5c5c;
}

/deep/ .el-pagination__jump.activ{
  color: #5c5c5c;
}


/deep/ .el-table--group {
    border-color: rgb(155, 155, 155)!important;
}

/deep/ .el-table td,
.el-table th.is-leaf {
        border-bottom: 1px solid rgb(155, 155, 155)!important;
}

/deep/ .el-table--border th{
        border-bottom: 1px solid rgb(155, 155, 155)!important;
        border-right: 1px solid rgb(155, 155, 155)!important;
}

/deep/ .el-table--border td,
.el-table--border th {
        border-right: 1px solid rgb(155, 155, 155)!important;
}

/deep/ .tableStyle .cell{
  color: #c1c1c1;
}
// /deep/ .el-table .sort-caret.ascending{
//   border-bottom-color: #5c5c5c;
// }

// /deep/ .el-table .sort-caret.descending{
//   border-top-color: #5c5c5c;
// }


</style>
<style id="css"></style>