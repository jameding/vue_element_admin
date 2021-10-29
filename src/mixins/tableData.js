
export default {
  name: 'tableDataMixins',

  data() {
    return {
      searchData: {}, // 查询数据
      searchDataLoading: false, // 查询时加载中
      editData: {}, // 新增编辑的数据
      editDialogShow: false, // 表格编辑
      tableData: []
    };
  },
  created() {
    // this.getData();
  },
  methods: {
    // fn || num
    async getData(fnOrNum, arrKey, searchData) {
      let page = 1;
      let fn = this.requireData && this.requireData.getDataFn;
      const config = {};
      arrKey = arrKey || this.requireData.arrKey;
      searchData = searchData || this.searchData;
      console.log({ ...searchData });
      // 导出
      if (typeof fnOrNum === 'function') {
        page = 0;
        fn = fnOrNum;
        config.timeout = 3600000;
      }
      // 翻页
      if (typeof fnOrNum === 'number') {
        page = fnOrNum;
      }
      try {
        this.searchDataLoading = true;
        const { data } = await fn({
          ...searchData,
          page: page,
          pageNum: this.pageNum || 0
        }, config);
        console.log(data);
        this.page = page;
        this.searchDataLoading = false;
        console.log('获取到查询数据', data);
        this.total = data.total;
        this.tableData = data[arrKey];
        return data[arrKey];
      } catch (error) {
        console.log(error);
        this.searchDataLoading = false;
      }
    },
    // 清空查询数
    clearSearchData() {
      this.searchData = {};
    },
    // 编辑某一条数据
    changeEditDialogShow(data, formName) {
      console.log(data, this.$refs);
      // 有id为编辑 否则为新增
      if (data.phoneNumber && data.phoneNumber !== '--') {
        data.hasPhoneNumber = true;
      }
      data.id
        ? (this.editData = { ...data })
        : (this.editData = { id: 0, type: this.type });
      if (this.$refs[formName]) this.$refs[formName].resetFields();
      this.editDialogShow = true;
    },
    // 删除一条数据
    handleDelete(id) {
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deleteData(id);
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    // 校验数据
    validate(formName = 'editForm') {
      let formValid = true;
      this.$refs[formName].validate(valid => {
        if (!valid) {
          formValid = false;
        }
      });
      if (!formValid) return false;
      return true;
    }
  }
};
