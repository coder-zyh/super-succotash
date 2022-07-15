<template>
	<div class="component task-list">
		<van-list
			:finished="finished"
			:immediate-check="false"
			finished-text="没有更多了"
			@load="$emit('onLoad')"
		>
			<div v-for="(item, index) in list" :key="index" class="task-list-item">
				<div class="task-list-item__content">
					<div class="task-list-item__top" @click="$emit('taskPage', item)">
						<div class="task-list-item__top-style">
							<span class="task-list-item__top-bold">
								{{ item.personalName }}
							</span>
							<span>{{ item.sex }}</span>
							<span>{{ item.age }}</span>
							<span>{{ item.marital }}</span>
							<div class="task-list-item__top-icon">
								<van-icon name="arrow" size="16" />
							</div>
						</div>
						<div class="task-list-item__centre">
							<div>
								<span>逾期金额(元):</span>
								<span>{{ item.overdueAmount }}元</span>
							</div>
							<div>
								<span>逾期期数:</span>
								<span class="task-list-item__top-margin">
									{{ item.overduePeriod }}期
								</span>
								<span>逾期天数:</span>
								<span>{{ item.overdueDays }}天</span>
							</div>
							<div>
								<span>地址：</span>
								<span class="task-list-item__centre-detail">
									{{ item.detail }}
								</span>
							</div>
						</div>
					</div>
				</div>
				<div class="task-list-item__bottom-dashed"></div>
				<div v-if="showState" class="task-list-item__bottom">
					<span @click="phoneClick(item)">
						<van-icon name="phone-o" />
						拨打电话
					</span>
					<span
						v-show="index.toString() !== indexLoading"
						@click="unLocationClick(item, index)"
					>
						<van-icon name="location-o" />
						导航地址
					</span>
					<span v-show="index.toString() === indexLoading">
						<van-loading size="22px">加载中...</van-loading>
					</span>
				</div>
			</div>
		</van-list>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref } from "vue";
import { RequestParams } from "@gopowerteam/http-request";
import { WxSDKService } from "@/utils/wxSDK";
import { getLocationLocationInfo } from "@/utils/wxSDK";
import { WxService } from "@/api/services/wx.service";
import { Toast } from "vant";
export default defineComponent({
	name: "TaskList",
	props: {
		list: Array as PropType<any[]>,
		showState: {
			type: Boolean,
			default: true,
		},
		finished: {
			type: Boolean,
			default: false,
		},
	},
	emits: ["taskPage", "onLoad"],
	setup(props) {
		function phoneClick({ mobileNo }) {
			window.open("tel:" + mobileNo, "_blank");
		}
		const wxService = new WxService();
		const sdkService = new WxSDKService();
		const localtionInfo = reactive<getLocationLocationInfo>({
			latitude: null,
			longitude: null,
			name: null,
		});
		const indexLoading = ref("");
		function unLocationClick(item, index) {
			indexLoading.value = index;
			wxService
				.getAddressToLatitude(new RequestParams({ address: item.detail }))
				.subscribe({
					next: (value: any) => {
						indexLoading.value = "";
						if (value) {
							localtionInfo.latitude = value.lat;
							localtionInfo.longitude = value.lng;
							localtionInfo.name = item.detail;
						}
						sdkService.openLocation(localtionInfo).subscribe({
							next: (value: any) => {
								console.log(value);
							},
						});
					},
					error: (msg) => {
						indexLoading.value = "";
						Toast(msg || "获取地址失败");
					},
				});
		}
		return {
			phoneClick,
			unLocationClick,
			indexLoading,
			localtionInfo,
		};
	},
	computed: {},
});
</script>

<style lang="less" scoped>
.task-list {
	height: 100%;
}
.task-list-item {
	padding: 0;
	background-color: #fafafa;
	border-radius: 3px;
	box-shadow: 1px 1px 1px 1px rgba(40, 49, 62, 0.2);
	width: 96%;
	margin: 0 auto;
	margin-bottom: 10px;
	&__content {
		span {
			margin-right: 10px;
		}
	}
	&__top-bold {
		font-size: 18px;
		font-weight: bold;
		color: #3d3d3d;
		margin-left: 10px;
	}
	&__top-style {
		background-color: #fff;
		position: relative;
		height: 44px;
		line-height: 44px;
	}
	&__top-icon {
		position: absolute;
		right: 10px;
		top: 0;
	}
	&__top-margin {
		margin-right: 30px;
	}
	&__centre {
		padding: 10px;
		span {
			font-size: 12px;
			color: #666;
			line-height: 22px;
		}
		&-detail {
			display: inline-block;
			overflow: hidden;
			white-space: normal;
			word-break: break-all;
			vertical-align: top;
			width: 80%;
		}
	}
	&__bottom {
		display: flex;
		justify-content: space-around;
		padding: 15px 0;
		span:nth-child(1) {
			color: #0191da;
			font-size: 15px;
		}
		span:nth-child(2) {
			color: #4caf50;
			font-size: 15px;
		}
	}
	&__bottom-dashed {
		border-bottom: 1px dashed #ccc;
	}
}
</style>
