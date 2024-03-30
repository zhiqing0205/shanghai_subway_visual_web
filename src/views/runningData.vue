<template>
  <div id="runningData">
    <dv-border-box-1>
      <div class="up">
<!--	      {{runningInfo}}-->
      <div
        class="bg-color-black item"
        v-for="item in titleItem"
        :key="item.title"
      >
        <p class="ml-3 colorBlue fw-b">{{ item.title }}</p>
        <div>
          <dv-digital-flop
            class="dv-dig-flop ml-1 mt-2 pl-3"
            :config="item.number"
          />
        </div>
      </div>
    </div>
    </dv-border-box-1>
    
  </div>
</template>

<script>

export default {
	props: {
		runningInfo: {
			type: Object
		}
	},
  data() {
    return {

    }
  },
	computed: {
		titleItem() {
			return [
				{
					title: '车号',
					number: {
						number: [],
						toFixed: 0,
						textAlign: 'left',
						content: this.runningInfo.id,
						style: {
							fontSize: 23
						}
					}
				},
				{
					title: '方向',
					number: {
						number: [],
						toFixed: 0,
						textAlign: 'left',
						content: this.runningInfo.direction,
						style: {
							fontSize: 23
						}
					}
				},
				{
					title: '速度',
					number: {
						number: [this.runningInfo.speed],
						toFixed: 2,
						textAlign: 'left',
						content: '{nt} km/h',
						style: {
							fontSize: 23
						}
					}
				},
				{
					title: '位置',
					number: {
						number: [],
						toFixed: 1,
						textAlign: 'left',
						content: this.runningInfo.position,
						style: {
							fontSize: Math.max(32 - this.runningInfo.position.toString().length * 1.5, 13),
						}
					}
				},
				{
					title: '信号强度(RSRP)',
					number: {
						number: [this.runningInfo.rsrp],
						toFixed: 2,
						textAlign: 'left',
						content: '{nt}',
						style: {
							fontSize: 23
						}
					}
				},
				{
					title: '信噪比(Sinr)',
					number: {
						number: [this.runningInfo.sinr],
						toFixed: 2,
						textAlign: 'left',
						content: '{nt}',
						style: {
							fontSize: 23
						}
					}
				},
				{
					title: '频率',
					number: {
						number: [this.runningInfo.freq / 1000000],
						toFixed: 1,
						textAlign: 'left',
						content: '{nt}M',
						style: {
							fontSize: 23
						}
					}
				},
				{
					title: '信号质量(RSRQ)',
					number: {
						number: [this.runningInfo.rsrq],
						toFixed: 2,
						textAlign: 'left',
						content: '{nt}',
						style: {
							fontSize: 23
						}
					}
				},
				{
					title: '总功率(RSSI)',
					number: {
						number: [this.runningInfo.rssi],
						toFixed: 2,
						textAlign: 'left',
						content: '{nt}',
						style: {
							fontSize: 23
						}
					}
				}
			]
		}
	}
}
</script>

<style lang="scss" scoped>
#runningData {
  display: flex;
  flex-direction: column;
  .up {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 15px;
    .item {
      border-radius: 6px;
      padding-top: 8px;
      margin-top: 8px;
      width: 32%;
      height: 70px;
      .dv-dig-flop {
        width: 150px;
        height: 30px;
      }
    }
  }
}
</style>
