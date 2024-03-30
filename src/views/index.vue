<template>
  <div id="index" ref="appRef">
    <div class="bg">
      <dv-loading v-if="loading">Loading...</dv-loading>

      <div v-else class="host-body">
	      <baidu-map class="bm-view" :center="center" :zoom="zoom" :map-style="mapStyle" @ready="handler">
<!--		      <bm-marker v-for="(item, index) in stations" :key="index" :position="item.position">-->
<!--		      </bm-marker>-->
		      <bm-marker :position="subwayPos" :icon="{url: 'https://img.ziuch.top/i/2024/03/25/a73hpq-1709194236434.webp', size: {width: 300, height: 157}}"></bm-marker>
	      </baidu-map>
        <div class="d-flex jc-center">
          <dv-decoration-10 class="dv-dec-10" />
          <div class="d-flex jc-center">
            <dv-decoration-8 class="dv-dec-8" :color="decorationColor" />
            <div class="title">
	            <dv-decoration-11 style="width:360px;height:75px; bottom: unset !important;" class="title-text">车地通信无线智能检测</dv-decoration-11>
              <dv-decoration-6
                class="dv-dec-6"
                :reverse="true"
                :color="['#50e3c2', '#67a1e5']"
              />
            </div>
            <dv-decoration-8
              class="dv-dec-8"
              :reverse="true"
              :color="decorationColor"
            />
          </div>
          <dv-decoration-10 class="dv-dec-10-s" />
        </div>

        <div class="body-box">
          <!-- 第三行数据 -->
          <div class="content-box">
	          <div>
		          <dv-border-box-13>
			          <alarmList :outlierList="outlierList"/>
		          </dv-border-box-13>
	          </div>
            <!-- 中间 -->
            <div>
              <runningData :runningInfo.sync="runningInfo"/>
            </div>
            <!-- 中间 -->
            <div>
              <dv-border-box-13>
                <wifiDevice :wifiDeviceData="wifiDeviceData"/>
              </dv-border-box-13>
            </div>
          </div>

          <!-- 第四行数据 -->
          <div class="bottom-box">
	          <dv-border-box-12>
		          <baseStationCheck :iteClassifyData="iteClassifyData" ref="baseStationCheckRef"/>
	          </dv-border-box-12>
	          <div>
		          <div style="display: grid; grid-template-rows: 1fr 1fr; grid-template-columns: 1fr 1fr; height: 100%;">
			          <div style="grid-row-start: 2; grid-column-start: 1;">
				          <dv-border-box-11 title="A网">
					          <lineInfo :lineData="iteClassifyData.typeA" />
				          </dv-border-box-11>
			          </div>
			          <div style="grid-row-start: 2; grid-column-start: 2;">
				          <dv-border-box-11 title="B网">
					          <lineInfo :lineData="iteClassifyData.typeB" />
				          </dv-border-box-11>
			          </div>
		          </div>
	          </div>
            <dv-border-box-12>
              <bottomRight />
            </dv-border-box-12>
          </div>
        </div>
	      <dv-percent-pond :config.sync="processConfig" style="width:100%;height:55px" />
      </div>
    </div>
  </div>
</template>

<script>
import drawMixin from "../utils/drawMixin";
import bottomRight from './bottomRight'
import axios from "axios";
import {binarySearch, formatTimeStamp, getAverageAndStandardDeviation, isOutlier} from "@/utils";
import alarmList from "@/views/alarmList.vue";
import BaseStationCheck from "@/views/baseStationCheck.vue";
import LineInfo from "@/views/lineInfo.vue";
import RunningData from "@/views/runningData.vue";
import WifiDevice from "@/views/wifiDevice.vue";

export default {
  mixins: [ drawMixin ],
  data() {
    return {
      timing: null,
      loading: true,
      decorationColor: ['#568aea', '#000000'],
	    center: {lng: 121.577275 + 0.010721, lat: 31.2030265 + 0.0040875},
	    zoom: 18,
	    mapStyle: {
				style: 'midnight',
		    styleJson: [
			    {
				    "featureType": "all",
				    "elementType": "geometry",
				    "stylers": {
					    "hue": "#007fff",
					    "saturation": 89
				    }
			    },
			    {
				    "featureType": "water",
				    "elementType": "all",
				    "stylers": {
					    "color": "#ffffff"
				    }
			    }
		    ]
	    },
	    stations: [],
	    runningData: [],
	    runningDataIndex: -1,
	    subwayPos: {
		    lng: 121.577275 + 0.0119,
		    lat: 31.2030265 + 0.00363
	    },
	    iteData: [],
	    iteDataIndex: 0,
	    runningInfo: {
				id: '0242',
		    direction: 'down',
		    speed: 0,
		    position: ' - ',
		    rsrp: 0,
		    sinr: 0,
		    freq: 0,
		    rsrq: 0,
		    rssi: 0
	    },
	    sinrAvg: 0,
	    sinrStd: 0,
	    rsrpAvg: 0,
	    rsrpStd: 0,
	    envScanData: {
				maxRsrp: 0,
		    freqData: [],
		    rsrpData: [],
	    },
	    outlierList: [],
	    processConfig: {
		    value: 0,
		    borderWidth: 5,
		    borderRadius: 10,
		    borderGap: 5
	    },
	    process: 0,
	    wifiDeviceData: {
				deviceId: 'WXJC-0242',
		    subwayId: '0242',
		    status: '在线',
		    internal: '张江高科 - 龙阳路',
	    },
	    processInTowStation: [],
	    iteClassifyData: {
		    typeA: [0, 0, 0],
		    typeB: [0, 0, 0],
		    all: []
	    },
	    stationNowId: -1
    }
  },
  components: {
	  WifiDevice,
	  RunningData,
	  LineInfo,
	  BaseStationCheck,
    bottomRight,
	  alarmList
  },
	created() {
		// this.mapStyle.styleJson = styleJson
		axios.get('/api/get_all_data/').then(res => {
			this.stations = res.data.stations
			this.runningData = res.data.running_data
			this.iteData = res.data.ite_data
		})
	},
	mounted() {
    this.cancelLoading()
  },
  beforeDestroy () {
    clearInterval(this.timing)
  },
  methods: {
    cancelLoading() {
      setTimeout(() => {
        this.loading = false
      }, 500)
    },
	  handler ({BMap, map}) {
		  console.log(BMap, map)
		  this.center.lng = 121.577275 - 0.0012 + 0.0119
		  this.center.lat = 31.2030265 - 0.0006 + 0.00363
		  this.zoom = 18
		  // map.setMapStyleV2(this.mapStyle)
		  map.setMapStyleV2({
			  styleId: '347a73d69d7a31b653d27496496ee37e'
		  });

			setTimeout(() => {
				this.getAvgAndStd()
				this.getProcess()
				this.envScanData.maxRsrp = this.iteData[0].rsrp
				for (let i = 1; i < this.iteData.length; i++) {
					if(this.iteData[i].rsrp > this.envScanData.maxRsrp) {
						this.envScanData.maxRsrp = this.iteData[i].rsrp
					}
				}
				this.timing = setInterval(() => {
					this.updateData()
				}, 1000)
			}, 1500)

	  },
	  getAvgAndStd() {
			let sinrData = [], rsrpData = []
		  for(let i = 0; i < this.iteData.length; i++) {
				sinrData.push(this.iteData[i].sinr)
			  rsrpData.push(this.iteData[i].rsrp)
		  }
		  const { average: rsrpAverage, standardDeviation: rsrpStandardDeviation } = getAverageAndStandardDeviation(rsrpData)
		  this.rsrpAvg = rsrpAverage
		  this.rsrpStd = rsrpStandardDeviation
			const { average: sinrAverage, standardDeviation: sinrStandardDeviation } = getAverageAndStandardDeviation(sinrData)
		  this.sinrAvg = sinrAverage
		  this.sinrStd = sinrStandardDeviation
	  },
	  getProcess() {
		  this.processInTowStation = []; // 初始化进度数组
		  let nowId = this.runningData[0].station_from;
			for (let i = 0; i <= nowId; i++) {
				this.processInTowStation.push(0);
			}

		  let cnt = 0; // 移动次数计数器
		  let processed = false; // 标记是否已处理到站逻辑

		  // 遍历runningData数组
		  for (let i = 0; i < this.runningData.length; i++) {
			  let data = this.runningData[i];
			  if (data.station_from === nowId) {
				  // 如果速度大于零或（速度等于零但未处理到站逻辑）
				  if (data.speed > 0 || (!processed && data.speed === 0)) {
					  cnt++; // 累加计数器
					  processed = data.speed === 0; // 如果速度为零，更新处理标记
				  }
			  } else {
				  // 如果是新的站点ID或者已到数组末尾，计算并更新前一站点的进度
				  if (cnt > 0) { // 避免除以零
					   // 计算平均进度
					  this.processInTowStation[nowId] = 100 / cnt; // 更新进度数组
					  nowId = data.station_from; // 更新站点ID
					  cnt = 1; // 重置计数器
					  processed = false; // 重置处理标记
				  }
			  }
		  }

		  // 处理最后一个站点的进度
		  if (cnt > 0) {
			  this.processInTowStation[nowId] = 100 / cnt;
		  }

			console.log(this.processInTwoStation)
	  },
	  updateData() {
			// --------------------- 运行数据每秒迭代 ----------------------------
			this.runningDataIndex += 1
		  if(this.runningDataIndex >= this.runningData.length) {
				this.runningDataIndex = this.iteDataIndex = this.wifiDataIndex = 0
			  this.envScanData.freqData = this.envScanData.rsrpData = []
			  this.$store.commit('setEnvScanData', this.envScanData)
			  this.outlierList = []
			  this.iteClassifyData.all = []
		  }
			this.subwayPos = this.runningData[this.runningDataIndex].position
		  this.center = {
				lng: this.runningData[this.runningDataIndex].position.lng - 0.0012,
				lat: this.runningData[this.runningDataIndex].position.lat - 0.0006
		  }

			// --------------------- 更新当前站点 和 运行进度 ------------------------
		  // console.log('stationNowId', this.stationNowId)
		  // console.log('process', this.processConfig.value)
			if (this.runningData[this.runningDataIndex].station_from !== this.stationNowId) {
				this.stationNowId = this.runningData[this.runningDataIndex].station_from
				this.processConfig.value = this.process = 0
				this.processConfig = {...this.processConfig}
			} else if(this.runningData[this.runningDataIndex].speed !== 0 || this.process > 90){
				// console.log('this.processInTowStation[this.stationNowId]', this.processInTowStation[this.stationNowId])
				this.process += this.processInTowStation[this.stationNowId]
				// 向上取整
				this.processConfig.value = Math.ceil(this.process)
				this.processConfig.value = Math.min(this.processConfig.value, 100)
				this.processConfig = {...this.processConfig}
			}

		  while(this.iteDataIndex < this.iteData.length && this.iteData[this.iteDataIndex].timestamp <= this.runningData[this.runningDataIndex].timestamp) {
			  //------------------- 异常信噪比 信号强度 表格 ---------------------------
			  let interval = `${this.stations[this.runningData[this.runningDataIndex].station_from].name} - ${this.stations[this.runningData[this.runningDataIndex].station_to].name}`
			  if(isOutlier(this.iteData[this.iteDataIndex].sinr, this.sinrAvg, this.sinrStd)) {
				  this.outlierList.push([formatTimeStamp(this.iteData[this.iteDataIndex].timestamp), '信噪比(Sinr)', this.iteData[this.iteDataIndex].sinr, interval])
			  }

			  if(isOutlier(this.iteData[this.iteDataIndex].rsrp, this.rsrpAvg, this.rsrpStd)) {
				  this.outlierList.push([formatTimeStamp(this.iteData[this.iteDataIndex].timestamp), '信号强度(RSRP)', this.iteData[this.iteDataIndex].rsrp, interval])
			  }

				this.iteDataIndex += 1
		  }


			// ---------------------- 地铁运行信息 地图 ----------------------------
			let interval = `${this.stations[this.runningData[this.runningDataIndex].station_from].name} - ${this.stations[this.runningData[this.runningDataIndex].station_to].name}`
		  let deviceId = this.runningData[this.runningDataIndex].alias
		  let subwayId = deviceId.split('-')[1]
			this.runningInfo = {
				id: subwayId,
				direction: this.runningData[this.runningDataIndex].direction,
				speed: this.runningData[this.runningDataIndex].speed,
				position: interval,
				rsrp: this.iteData[this.iteDataIndex].rsrp,
				sinr: this.iteData[this.iteDataIndex].sinr,
				freq:this.iteData[this.iteDataIndex].freq,
				rsrq: this.iteData[this.iteDataIndex].rsrq,
				rssi: this.iteData[this.iteDataIndex].rssi
			}


			//-------------------- 信号强度-频率折线图 ------------------------------
		  const newFreq = this.iteData[this.iteDataIndex].freq;
		  const newRsrp = this.iteData[this.iteDataIndex].rsrp;

		  // 找到freqData中应插入新频率数据的位置
		  const freqIndex = binarySearch(this.envScanData.freqData, newFreq);

		  // 将新频率数据插入到freqData中正确的位置
		  this.envScanData.freqData.splice(freqIndex, 0, newFreq);

		  // 同步在rsrpData中插入相应的rsrp数据，保持与freqData的对应关系
		  this.envScanData.rsrpData.splice(freqIndex, 0, newRsrp);
		  this.$store.commit('setEnvScanData', this.envScanData)



			// ----------------------- 无线设备表格 -------------------------------
			this.wifiDeviceData =  {
				deviceId: deviceId,
				subwayId: subwayId,
				status: '在线',
				internal: interval,
		  }


			// ------------------------ AB线数据表格 --------------------------------------
		  this.iteClassifyData.all.push([this.iteData[this.iteDataIndex].freq, this.iteData[this.iteDataIndex].cellid, this.iteData[this.iteDataIndex].rsrp, this.iteData[this.iteDataIndex].sinr, this.iteData[this.iteDataIndex].type])
			if(this.iteData[this.iteDataIndex].type === 'A') {
				this.iteClassifyData.typeA = [this.iteData[this.iteDataIndex].cellid, this.iteData[this.iteDataIndex].rsrp, this.iteData[this.iteDataIndex].sinr]
			} else {
				this.iteClassifyData.typeB = [this.iteData[this.iteDataIndex].cellid, this.iteData[this.iteDataIndex].rsrp, this.iteData[this.iteDataIndex].sinr]
			}
			this.$refs.baseStationCheckRef.updateData()
	  }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/index.scss';
.bm-view {
	width: 100%;
	height: 100vh;
	z-index: 0;
	position: absolute;
}
</style>
