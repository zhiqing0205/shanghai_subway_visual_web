<template>
  <div id="alarmList">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="chart-line" class="text-icon"></icon>
        </span>
        <div class="d-flex">
          <span class="">告警列表</span>
        </div>
      </div>
      <div class="d-flex jc-center body-box">
        <dv-scroll-board class="dv-scr-board" :config="config" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
	props: {
		outlierList: {
			type: Array
		},
	},
  data() {
    return {}
  },
	computed: {
		config() {
			return {
				header: ['时间', '告警类型', '告警内容', '区间'],
				data: this.outlierList,
				rowNum: 7, //表格行数
				headerHeight: 35,
				headerBGC: '#0f1325', //表头
				oddRowBGC: '#0f1325', //奇数行
				evenRowBGC: '#171c33', //偶数行
				columnWidth: [180, 128, 128],
				align: ['center', "center", "center", "center"]
			}
		}
	}
}
</script>

<style lang="scss" scoped>
$box-height: 410px;
$box-width: 300px;
#alarmList {
  padding: 16px;
  padding-top: 20px;
  height: $box-height;
  width: 100%;
  border-radius: 5px;
  .bg-color-black {
    height: $box-height - 30px;
    border-radius: 10px;
  }
  .text {
    color: #c3cbde;
  }
  .body-box {
    border-radius: 10px;
    overflow: hidden;
    .dv-scr-board {
      width: 100%;
      height: 340px;
    }
  }
}
</style>
