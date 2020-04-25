<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-if="!showEdit">
      <div class="header"><div class="title">用户列表</div></div>
      <!-- 表格 -->
      <lin-table
        :tableColumn="tableColumn"
        :tableData="tableData"
        :operate="operate"
        @handleEdit="handleEdit"
        @handleDelete="handleDelete"
        @row-click="rowClick"
        v-loading="loading"
      ></lin-table>
      <div style="padding:20px 0;">
        <el-pagination
        background
        layout="prev, pager, next"
        :current-page="page"
        @current-change="pagechange"
        :total="total">
       </el-pagination>
      </div>
    </div>

    <!-- 编辑页面 -->
    <book-edit v-else @editClose="editClose" :editBookID="editBookID"></book-edit>
  </div>
</template>

<script>
import book from '@/models/book'
import LinTable from '@/components/base/table/lin-table'
import BookEdit from './edit'

export default {
  components: {
    LinTable,
    BookEdit,
  },
  data() {
    return {
      tableColumn: [
      { prop: 'id', label: '商品Id' },
        { prop: 'name', label: '商品名' },
        { prop: 'pepertory', label: '库存量' },
        { prop: 'salesVolum', label: '销售量' },
      ],
      tableData: [],
      operate: [],
      showEdit: false,
      editBookID: 1,
      page:1,
      total:50,
      option:{
        pageNumber:1
      }
    }
  },
  async created() {
    this.loading = true
    await this.getBooks()
    this.operate = [
      { name: '编辑', func: 'handleEdit', type: 'primary' },
      {
        name: '删除',
        func: 'handleDelete',
        type: 'danger',
        auth: '删除商品',
      },
    ]
    this.loading = false
  },
  methods: {
    async getBooks() {
      try {
        const books = await book.getBooks(this.option)
        this.tableData = books.data
        this.total=books.total
      } catch (error) {
        if (error.error_code === 10020) {
          this.tableData = []
        }
      }
    },
    pagechange(e){
        this.option.pageNumber=e
        this.getBooks()
    },
    handleEdit(val) {
      console.log('val', val)
      this.showEdit = true
      this.editBookID = val.row.id
    },
    handleDelete(val) {
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const res = await book.delectBook(val.row.id)
        if (res.error_code === 0) {
          this.getBooks()
          this.$message({
            type: 'success',
            message: `${res.msg}`,
          })
        }
      })
    },
    rowClick() {},
    editClose() {
      this.showEdit = false
      this.getBooks()
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  padding: 0 30px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      height: 59px;
      line-height: 59px;
      color: $parent-title-color;
      font-size: 16px;
      font-weight: 500;
    }
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin: 20px;
  }
}
</style>
