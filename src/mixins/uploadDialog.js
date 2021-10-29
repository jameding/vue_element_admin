export default {
  name: 'UploadDialogMixins',
  data() {
    return {
      uploadData: {}, // 新增编辑的数据
      uploadDialogShow: false // 表格编辑
    };
  },
  methods: {
    // 编辑某一条数据
    changeUploadDialogShow(data) {
      // 有id为编辑 否则为新增
      // data.id ? this.editData = { ...data } : this.editData = {};
      this.uploadDialogShow = true;
    }
  }
};
