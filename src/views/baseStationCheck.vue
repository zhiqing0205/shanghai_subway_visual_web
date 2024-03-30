<template>
  <div id="baseStationCheck">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="chart-line" class="text-icon"></icon>
        </span>
        <div class="d-flex">
          <span class="">轨旁基站智能巡检</span>
        </div>
      </div>
      <div class="d-flex jc-center body-box">
        <dv-scroll-board class="dv-scr-board" :config="config" ref="scrollBoard"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
	props: {
		iteClassifyData: {
        type: Object,
        default: () => {}
      },
    },
	methods: {
		updateData() {
			let rows = this.iteClassifyData.all.map((item, index) => {
				// 判断 this.iteClassifyData.all[i][4] 的值
				let rowColor = item[4] === 'A' ? "color: rgb(35, 208, 226);" : "color: rgb(255, 255, 255);";
				return [
					'<span style="' + rowColor + '">' + (index + 1) + '</span>',
					'<span style="color: rgb(0, 255, 0)">■</span>',
					'<span style="' + rowColor + '">' + item[0] / 1000000 + 'M</span>',
					'<span style="' + rowColor + '">' + item[1] + '</span>',
					'<span style="' + rowColor + '">' + item[2] + '</span>',
					'<span style="' + rowColor + '">' + item[3] + '</span>',
				]
		})

			this.$refs['scrollBoard'].updateRows(rows)
	}
	},
  data() {
    return {
			config:  {
				header: ['序号', '状态', '频率', 'cellID', 'RSRP', 'SINR'],
				data: [],
				rowNum: 10, //表格行数
				headerHeight: 35,
				headerBGC: '#0f1325', //表头
				oddRowBGC: '#0f1325', //奇数行
				evenRowBGC: '#171c33', //偶数行
				columnWidth: [64, 64, 128, 128, 128, 64],
				align: ['center', "center", "center", "center"],
				// waitTime: 1000
			}
    }
  },
}
</script>

<style lang="scss" scoped>
$box-height: 480px;
$box-width: 300px;
#baseStationCheck {
  padding: 16px;
  padding-top: 20px;
  height: 100%;
  width: 100%;
  border-radius: 5px;
  .bg-color-black {
    height: $box-height;
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
      height: $box-height - 30px;
    }
  }
}
</style>
