<template>
  <div class="app-container">
    <TableList
      :table-data="userList"
      :handle-size-change="handleSizeChange"
      :handle-current-change="handleCurrentChange"
      :columns="columns"
      :page-size="pageNum"
      :total-num="total"
    />
  </div>
</template>

<script>
import { getList } from '@/api/table';
import TableList from '@/components/Table/index';
export default {
  components: {
    TableList
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      listLoading: true,
      // 列表设置
      columns: [
        {
          prop: 'phoneNumber',
          label: '手机',
          align: 'center',
          width: '120'
        },
        {
          prop: 'name',
          label: '用户名',
          align: 'center',
          width: '120'
        },
        {
          prop: 'stage',
          label: '可看活动阶段',
          align: 'center'
        },
        {
          prop: 'group',
          label: '可看组别',
          align: 'center',
          class: 'line-clamp-3',
          title: true
        },
        {
          prop: 'canDivision',
          label: '操作',
          align: 'center',
          width: '240',
          render: (h, params) => {
            // console.log(params.row);
            // 展示自定义内容按钮
            const buttonJson = [
              h(
                'el-button',
                {
                  props: {
                    type: 'primary',
                    size: 'mini'
                  },
                  on: {
                    click: () => {
                      this.userInfo = params.row;
                      this.editDialogShow = true;
                    }
                  }
                },
                '编辑'
              ),
              h(
                'el-button',
                {
                  props: {
                    type: 'danger',
                    size: 'mini'
                  },
                  on: {
                    click: () => {
                      console.log('删除');
                      this.$confirm(
                        '此操作将永久删除该用户, 是否继续?',
                        '提示',
                        {
                          confirmButtonText: '确定',
                          cancelButtonText: '取消',
                          type: 'warning'
                        }
                      )
                        .then(() => {
                          this.delUser(params.row.phoneNumber);
                        })
                        .catch(() => {
                          this.$message({
                            type: 'info',
                            message: '已取消删除'
                          });
                        });
                    }
                  }
                },
                '删除'
              )
            ];
            return h('span', buttonJson);
            // return h('span', params.row.name);
            // return h('el-progress', {
            //   props: {
            //     textInside: true,
            //     strokeWidth: 18,
            //     percentage: params.row.name
            //   }
            // });
          }
        }
      ],
      // 列表数据
      userList: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // 获取列表数据
    async getData() {
      try {
        this.listLoading = true;
        // 查询数据信息
        // const prams = { page: this.page, pageNum: this.pageNum };
        // const res = await getUserInfo(prams);
        const res = {
          data: {
            count: 100,
            userList: [
              {
                phoneNumber: '189912312',
                name: 'jame,d',
                stage: '学校',
                group: '组别'
              }
            ]
          }
        };
        console.log('数据查询完成', res);
        if (this.page === 1) {
          this.total = res.data.count;
        }

        this.userList = res.data.userList;
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
