<template>
  <div id="center">
      <div class="up">
      <div
        class="bg-color-black item"
        v-for="item in titleItem"
        :key="item.title"
      >
        <p class="ml-2 colorBlue fw-b">{{ item.title }}</p>
        <div>
          <dv-digital-flop
            class="dv-dig-flop ml-1 mt-2 pl-3"
            :config="item.number"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
	props: {
		lineData: {
			type: Array
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
					title: 'cellid',
					number: {
						number: [this.lineData[1]],
						toFixed: 2,
						textAlign: 'left',
						content: '{nt}',
						style: {
							fontSize: 23
						}
					}
				},
				{
					title: 'rsrp',
					number: {
						number: [this.lineData[1]],
						toFixed: 2,
						textAlign: 'left',
						content: '{nt}',
						style: {
							fontSize: 23
						}
					}
				},
				{
					title: 'sinr',
					number: {
						number: [this.lineData[2]],
						toFixed: 2,
						textAlign: 'left',
						content: '{nt} dB',
						style: {
							fontSize: 23
						}
					}
				},
			]
		}
	}
}
</script>

<style lang="scss" scoped>
#center {
  display: flex;
  flex-direction: column;
  .up {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 15px;
	  margin-top: 55px;
    .item {
      border-radius: 6px;
      padding-top: 8px;
      margin-top: 8px;
      width: 46%;
      height: 70px;
      .dv-dig-flop {
        width: 150px;
        height: 30px;
      }
    }
  }
}
</style>
