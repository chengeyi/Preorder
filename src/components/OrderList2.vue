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
          <el-input placeholder="請输入内容" clearable>
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
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="所属店铺">
                <span>{{ props.row.shop }}</span>
              </el-form-item>
              <el-form-item label="商品 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="店铺 ID">
                <span>{{ props.row.shopId }}</span>
              </el-form-item>
              <el-form-item label="商品分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.desc }}</span>
              </el-form-item>
              <el-form-item label="商品進度">
                <div style="width: 250px; height: 30px">
                  <el-progress
                    style="margin-top: 10px"
                    stroke-width="9"
                    :percentage="props.row.percentage"
                    :color="props.row.customColor"
                  ></el-progress>
                </div>
              </el-form-item>
              <el-descriptions title="用户信息">
                <el-descriptions-item label="商品名稱"
                  >{{ props.row.name }}</el-descriptions-item
                >
                <el-descriptions-item label="手机号"
                  >18100000000</el-descriptions-item
                >
                <el-descriptions-item label="居住地"
                  >苏州市</el-descriptions-item
                >
                <el-descriptions-item label="备注">
                  <el-tag size="small">学校</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="联系地址"
                  >江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item
                >
              </el-descriptions>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column sortable label="商品 ID" prop="id"> </el-table-column>
        <el-table-column sortable label="商品名称" prop="name">
        </el-table-column>
        <el-table-column sortable label="描述" prop="desc"> </el-table-column>
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
};
</script>