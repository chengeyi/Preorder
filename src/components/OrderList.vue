<template>
    <div>
    <!--導航區-->
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首頁</el-breadcrumb-item>
        <el-breadcrumb-item>訂單管理</el-breadcrumb-item>
        <el-breadcrumb-item>訂單列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片區-->
    <el-card>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-input placeholder="請输入内容"  clearable >
                <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </el-col>
        </el-row>
        <!-- 訂單列表數據 -->
        <el-table :data="orderList" border stripe empty-text="暫無資料">
            <el-table-column sortable type="index" label="#"></el-table-column>
            <el-table-column sortable label="訂單編號" prop="order_number"></el-table-column>
            <el-table-column sortable label="訂單價格" prop="order_price"></el-table-column>
            <el-table-column sortable label="是否付款" prop="pay_status">
                <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.pay_status == 1">已付款</el-tag>
                    <el-tag type="danger" v-else>未付款</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="是否出貨" prop="is_send"></el-table-column>
            <el-table-column label="下單時間" prop="create_time">
                <template slot-scope="scope">
                    {{scope.row.create_time*1000 | dateFormat}}
                </template>
            </el-table-column>
            <el-table-column label="操作" >
                <template>
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="showBox"></el-button>
                    <el-button type="success" icon="el-icon-location" size="mini" @click="showProgressBox"></el-button>
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
            :total="total" background>
        </el-pagination>

    </el-card>
    <!--修改地址的對話框-->
        <el-dialog
            title="修改地址"
            :visible.sync="addressVisible"
            width="50%" @close="addressDialogClosed">
            <!--内容區-->
            <el-form :model="addressForm" :rules="addressFormRules" ref="addressFormRef" label-width="100px" >
                <el-form-item label="縣/市" prop="address1">
                    <el-cascader :options="cityData" v-model="addressForm.address1"></el-cascader>
                </el-form-item>
                <el-form-item label="詳細地址" prop="address2">
                    <el-input v-model="addressForm.address2"></el-input>
                </el-form-item>
            </el-form>
            <!--底部區-->
            <span slot="footer" class="dialog-footer">
                <el-button @click="addressVisible = false">取 消</el-button>
                <el-button type="primary" @click="addressVisible = false">確 定</el-button>
            </span>
        </el-dialog>
        <!--物流進度-->
        <el-dialog
            title="物流進度"
            :visible.sync="progressVisible"
            width="50%" >
            <!-- 時間線 -->
            <el-timeline>
                <el-timeline-item
                v-for="(activity, index) in progressInfo"
                :key="index"
                :timestamp="activity.time">
                {{activity.context}}
                </el-timeline-item>
            </el-timeline>
        </el-dialog>

    </div>
</template>

<script>
// import cityData from './citydata.js'
export default {
    data () {
        return {
            // cityData,
            // 訂單查詢對象
            queryInfo:{
                query: '',
                pagenum: 1,
                pagesize: 10
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
            addressForm:{
                address1: [

                ],
                address2: ''
            },
             // 驗證規則
            addressFormRules: {
                address1: [
                    {required: true,message: '請選擇縣/市',trigger: 'blur'},
                ],
                address2: [
                    {required: true,message: '請輸入詳細地址',trigger: 'blur'},
                ],
            },
            //物流信息列表
            progressInfo: []
            
        }
    },

    computed:{
        orderList(){
            return this.$store.state.orderList
        }
    },

    created(){
        // 獲取訂單清單
        // this.getOrderList()
    },
    methods: {
        // async getOrderList(){
        //     const {data:res} = await this.$http.get('orders', {params: this.queryInfo})
        //     if(res.meta.status !== 200) return this.$message.error('獲取訂單失敗！')
        //     console.log(res.data)
        //     this.orderList = res.data.goods
        //     this.total = res.data.total
        // },
        // 分頁監聽
        handleSizeChange(newSize){
            this.queryInfo.pagesize = newSize
            // this.getOrderList()
        },
        // 當前頁碼變化時呼叫
        handleCurrentChange(newPage){
            this.queryInfo.pagenum = newPage
            // this.getOrderList()
        },
        // 展示修改地址的對話框
        showBox(){
            this.addressVisible = true
        },
        // 修改地址對話框關閉事件
        addressDialogClosed(){
            this.$refs.addressFormRef.resetFields()
        },
        // 展示物流進度
        async showProgressBox(){
            const {data:res} = await this.$http.get('/kuaidi/804909574412544580')
            if(res.meta.status !== 200) return this.$message.error('或去物流進度失敗！')
            this.progressInfo = res.data
            this.progressVisible = true
            console.log(this.progressInfo)
        }
    },
}

</script>
<style lang='less' scoped>
// 引入timeline樣式
// @import '../../plugins/timeline/timeline.css';
// @import '../../plugins/timeline-item/timeline-item.css';

.el-cascader{
    width: 100%;
}

</style>