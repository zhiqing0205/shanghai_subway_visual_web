<template>
	<div>
		<Echart
				:options="options"
				id="centreLeft1Chart"
				height="480px"
				width="100%"
		></Echart>
	</div>
</template>

<script>
import Echart from '@/common/echart'
export default {
	computed: {
		envScanData() {
			return this.$store.state.envScanData
		},
		options() {
			return {
				grid: {
					left: 90,
					right: 80,
					bottom: 40,
					top: '10%'
				},
				xAxis: {
					name: '频率',
					nameLocation: 'end',
					nameGap: 24,
					nameTextStyle: {
						color: 'rgba(255,255,255,.5)',
						fontSize: 14
					},
					type: 'category',
					position: 'bottom',
					axisLine: true,
					axisLabel: {
						color: 'rgba(255,255,255,.8)',
						fontSize: 12,
						formatter(value) {
							return value / 1000000 + ' MHz'
						}
					},
					data: this.envScanData.freqData
				},
				yAxis: {
					name: '信号强度',
					nameLocation: 'end',
					nameGap: 24,
					nameTextStyle: {
						color: 'rgba(255,255,255,.5)',
						fontSize: 14
					},
					max: this.envScanData.maxRsrp,
					splitNumber: 4,
					axisLine: {
						lineStyle: {
							opacity: 0
						}
					},
					splitLine: {
						show: true,
						lineStyle: {
							color: '#fff',
							opacity: 0.1
						}
					},
					axisLabel: {
						color: 'rgba(255,255,255,.8)',
						fontSize: 12
					}
				},
				series: [
					{
						name: '',
						type: 'line',
						smooth: true,
						symbol: 'emptyCircle',
						symbolSize: 8,
						itemStyle: {
							normal: {
								color: '#fff'
							}
						},
						lineStyle: {
							normal: {
								color: this.colorList.linearBtoG,
								width: 3
							}
						},
						areaStyle: {
							normal: {
								color: this.colorList.areaBtoG
							}
						},
						data: this.envScanData.rsrpData,
						// markLine: {
						// 	silent: true,
						// 	data: [
						// 		{
						// 			type: 'average',
						// 			name: '平均值'
						// 		}
						// 	],
						// 	label: {
						// 		normal: {
						// 			formatter: '平均值: \n {c}'
						// 		}
						// 	},
						// 	lineStyle: {
						// 		normal: {
						// 			color: 'rgba(248,211,81,.7)'
						// 		}
						// 	}
						// },
						tooltip: {
							position: 'top',
							formatter: '{c} m',
							backgroundColor: 'rgba(28,152,232,.2)',
							padding: 6
						}
					}
				]
			};
		}
	},
	data() {
		return {
			colorList: {
				linearBtoG: {
					type: 'linear',
					x: 0,
					y: 0,
					x2: 1,
					y2: 0,
					colorStops: [
						{
							offset: 0,
							color: '#1c98e8'
						},
						{
							offset: 1,
							color: '#28f8de'
						}
					]
				},
				areaBtoG: {
					type: 'linear',
					x: 0,
					y: 0,
					x2: 0,
					y2: 1,
					colorStops: [
						{
							offset: 0,
							color: 'rgba(35,184,210,.2)'
						},
						{
							offset: 1,
							color: 'rgba(35,184,210,0)'
						}
					]
				}
			}
		}
	},
	components: {
		Echart
	},
	mounted() {
	}
}
</script>
