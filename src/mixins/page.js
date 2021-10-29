export default {
  name: 'pageMixins',
  data() {
    return {
      pageNum: 10, // 每页条数
      page: 1, // 页码
      total: null // 总数
    };
  },
  methods: {
    // 切换每页条数
    handleSizeChange(num) {
      this.pageNum = num;
      this.getData();
    },
    // 切换页码
    handleCurrentChange(num) {
      this.page = num;
      this.getData(this.page);
    }
  }
};
