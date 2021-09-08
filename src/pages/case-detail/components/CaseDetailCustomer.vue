<template>
	<div class="component case-detail-customer">
		<div class="case-detail-customer__top">
			<span class="case-detail-customer__bold-style">个人信息</span>
			<div class="case-detail-customer__top-content">
				<div class="case-detail-customer__top-content__img">
					<van-image
						round
						width="4rem"
						height="4rem"
						:src="personal.sex == '女' ? femaleHead : maleHead"
					/>
				</div>
				<div class="case-detail-customer__top-content__info">
					<div>
						<span>{{ personal.personalName }}</span>
						<span>{{ personal.sex }}</span>
						<span>{{ personal.age }}</span>
						<span>{{ personal.marital }}</span>
						<span>{{ personal.education }}</span>
					</div>
					<div>
						<span>手机号:</span>
						<span>{{ personal.desenphone }}</span>
					</div>
					<div>
						<span>身份证号:</span>
						<span>
							{{ personal.idCard.replace(/^(.{6})(?:\d+)(.{4})$/, "$1****$2") }}
						</span>
					</div>
					<div class="case-detail-customer__top-content__info-detail">
						<span>家庭地址:</span>
						<span>{{ personal.detail }}</span>
					</div>
				</div>
			</div>
		</div>
		<van-collapse v-model="activeNames">
			<div class="case-detail-customer__centre">
				<van-collapse-item name="contacts">
					<template #title>
						<span class="case-detail-customer__bold">联系人信息</span>
					</template>
					<div class="case-detail-customer__centre-content">
						<div v-for="(item, index) in contacts" :key="index">
							<span>{{ item.relation }}</span>
							<span>{{ item.contName }}</span>
							<span @click="phoneClick(item)">
								{{ item.desenphone }}
							</span>
							<span>{{ item.phoneStatus }}</span>
							<span>{{ item.createTime }}</span>
						</div>
					</div>
				</van-collapse-item>
			</div>
			<div class="case-detail-customer__footer">
				<van-collapse-item name="address">
					<template #title>
						<span class="case-detail-customer__bold">地址信息</span>
					</template>
					<div class="case-detail-customer__footer-content">
						<div
							v-for="(item, index) in addressData"
							:key="index"
							class="case-detail-customer__footer-item"
						>
							<div class="case-detail-customer__footer-item-left">
								<div class="case-detail-customer__footer-item-left-top">
									<span>【{{ item.relation }}】</span>
									<span>{{ item.contName }}</span>
									<span>|</span>
									<span>{{ item.addressType }}</span>
									<span v-if="item.addressType">|</span>
									<span>{{ item.dataSource }}</span>
								</div>
								<div class="case-detail-customer__footer-item-left-detail">
									<span>【{{ item.addressStatus }}】</span>
									<span>{{ item.detail }}</span>
								</div>
							</div>
							<div class="case-detail-customer__footer-item-right">
								<span>{{ item.createTime }}</span>
								<van-icon
									name="location"
									color="#4caf50"
									@click="unLocationClick(item.detail)"
								/>
							</div>
						</div>
					</div>
				</van-collapse-item>
			</div>
			<div
				class="case-detail-customer__guarantee"
				v-if="guaranteeList.length > 0"
			>
				<van-collapse-item name="guarantee">
					<template #title>
						<span class="case-detail-customer__bold">抵质押物地址信息</span>
					</template>
					<div class="case-detail-customer__guarantee-content">
						<div
							v-for="(item, index) in guaranteeList"
							:key="index"
							class="case-detail-customer__guarantee-item"
						>
							<div class="case-detail-customer__guarantee-item-left">
								<span>【抵质押物权属人名称】</span>
								<span>{{ item.guaranteeName }}</span>
							</div>
							<div class="case-detail-customer__guarantee-item-left">
								<span>【抵质押物地址】</span>
								<span>{{ item.guaranteeAddress }}</span>
							</div>
							<div class="case-detail-customer__guarantee-item-right">
								<van-icon
									v-if="item.guaranteeAddress"
									name="location"
									color="#4caf50"
									@click="unLocationClick(item.guaranteeAddress)"
								/>
							</div>
						</div>
					</div>
				</van-collapse-item>
			</div>
		</van-collapse>

		<van-button
			v-if="taskState"
			type="primary"
			block
			class="case-detail-customer__btn"
			@click="repairClick"
		>
			新增信息
		</van-button>
	</div>
</template>
<script lang="ts">
//基本信息
import { AppService } from "@/api/services/app.service";
import { RequestParams } from "@gopowerteam/http-request";
import { defineComponent, ref, reactive, inject, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { CommonService } from "@/utils/common.service";
import { PersonalBase } from "@/types/personal.interface";
import { CustomerBase } from "@/types/customer.interface";
import { AddressBase } from "@/types/address.interface";
import { GuaranteeBase } from "@/types/guarantee.interface";
import femaleHead from "@/assets/imgs/femaleHead.png";
import maleHead from "@/assets/imgs/maleHead.png";
import { useDict, useFilter } from "@/utils/hook.service";
import { WxSDKService, ImageInfo } from "@/utils/wxSDK";
import { getLocationLocationInfo } from "@/utils/wxSDK";
import { WxService } from "@/api/services/wx.service";
export default defineComponent({
	name: "CaseDetailCustomer",
	setup() {
		const taskState = ref(true);
		const contacts = ref<CustomerBase[]>([]);
		const addressData = ref<AddressBase[]>([]);
		const guaranteeList = ref<GuaranteeBase[]>([]);
		const activeNames = ref(["contacts", "address", "guarantee"]);
		const router = useRouter();
		const caseId = inject("caseId") as string;
		const route = useRoute();
		const repairClick = () =>
			router.push({
				name: "repair",
				params: { caseId },
			});
		const wxService = new WxService();
		const appService = new AppService();
		const personal = reactive<PersonalBase>({
			personalName: "",
			sex: "",
			age: "",
			marital: "",
			education: "",
			mobileNo: "",
			idCard: "",
			detail: "",
			desenphone: "",
		});
		const dataSource = ref([]);
		function getdictService() {
			const dictService = useDict();
			dataSource.value = dictService.getDictData(
				"Relationship",
				"AddressStatus",
				"AddressType",
				"PhoneType",
				"Marital",
				"Sex",
				"DataSource",
				"PhoneStatus",
				"Education"
			);
		}
		const sdkService = new WxSDKService();
		const localtionInfo = reactive<getLocationLocationInfo>({
			latitude: null,
			longitude: null,
		});
		// 根据地址信息打开地图
		function unLocationClick(detail) {
			wxService
				.getAddressToLatitude(new RequestParams({ address: detail }))
				.subscribe({
					next: (value: any) => {
						if (value) {
							localtionInfo.latitude = value.lat;
							localtionInfo.longitude = value.lng;
							localtionInfo.name = detail;
						}
						sdkService.openLocation(localtionInfo).subscribe({
							next: (value: any) => {
								console.log(value);
							},
						});
					},
				});
		}
		function phoneClick({ phone }) {
			window.open("tel:" + phone, "_blank");
		}

		const filter = useFilter();

		onMounted(() => {
			getdictService();
			taskState.value = route.query.taskState == "settle" ? false : true;
			// 个人信息
			appService.getPersonalInfo(new RequestParams({ caseId })).subscribe({
				next: (value: any) => {
					Object.keys(value[0]).forEach((key) => {
						dataSource.value.forEach((item) => {
							if (item.code == value[0][key]) {
								value[0][key] = item.name;
							}
						});
						if (value[0]["mobileNo"]) {
							var pat = /(\d{3})\d*(\d{4})/;
							value[0]["desenphone"] = value[0]["mobileNo"].replace(
								pat,
								"$1****$2"
							);
						}
					});
					CommonService.revertData(personal, value[0]);
				},
			});
			// 联系人信息
			appService.getPersonalContacts(new RequestParams({ caseId })).subscribe({
				next: (value: any) => {
					value.forEach((element) => {
						Object.keys(element).forEach((key) => {
							dataSource.value.forEach((item) => {
								if (item.code == element[key]) {
									element[key] = item.name;
								}
								if (key == "createTime") {
									element[key] = filter.dateFormat(element[key]);
								}
							});
							if (element["phone"]) {
								var pat = /(\d{3})\d*(\d{4})/;
								element["desenphone"] = element["phone"].replace(
									pat,
									"$1****$2"
								);
							}
						});
					});
					contacts.value = value;
				},
			});
			// 地址信息
			appService.getPersonalAddress(new RequestParams({ caseId })).subscribe({
				next: (value: any) => {
					value.forEach((element) => {
						Object.keys(element).forEach((key) => {
							dataSource.value.forEach((item) => {
								if (item.code == element[key]) {
									element[key] = item.name;
								}
								if (key == "createTime") {
									element[key] = filter.dateFormat(element[key]);
								}
							});
						});
					});
					addressData.value = value;
				},
			});
			// 抵质押物地址信息
			appService.getGuaranteeAddress(new RequestParams({ caseId })).subscribe({
				next: (value: any) => {
					guaranteeList.value = value;
				},
			});
		});
		return {
			repairClick,
			personal,
			contacts,
			addressData,
			activeNames,
			femaleHead,
			maleHead,
			unLocationClick,
			guaranteeList,
			taskState,
			phoneClick,
		};
	},
});
</script>

<style lang="less">
.case-detail-customer {
	&__top {
		text-align: left;
		margin-top: 10px;
	}
	&__top-content {
		margin: 6px 0;
		display: flex;
		// justify-content: space-around;
		border-top: 1px solid #ebedf0;
		span {
			font-size: 14px;
			line-height: 30px;
			margin-right: 10px;
			color: #3d3d3d;
		}
		&__img {
			display: flex;
			align-items: center;
			width: 25%;
			padding-left: 12px;
		}
		&__info {
			width: 75%;
			&-detail {
				display: flex;
				span {
					display: inline-block;
					overflow: hidden;
					white-space: normal;
					word-break: break-all;
					vertical-align: top;
				}
				span:nth-child(1) {
					width: 28%;
				}
				span:nth-child(2) {
					width: 70%;
				}
			}
		}
	}
	&__centre-content {
		width: 100%;
		text-align: center;
		padding: 0 10px;
		span {
			line-height: 30px;
			display: inline-block;
			vertical-align: top;
		}
		div {
			border-bottom: 1px solid #ebedf0;
			span:nth-child(1) {
				width: 10%;
			}
			span:nth-child(2) {
				width: 20%;
			}
			span:nth-child(3) {
				width: 25%;
				color: #0191da;
			}
			span:nth-child(4) {
				width: 17%;
			}
			span:nth-child(5) {
				width: 28%;
				color: #bbb;
			}
		}
	}
	&__footer-content {
		width: 100%;
		margin: 6px 0;
		text-align: left;
	}
	&__footer-item {
		display: flex;
		margin: 0 8px;
		padding-bottom: 4px;
		border-bottom: 1px solid #ebedf0;
		justify-content: space-between;
		span {
			font-size: 13px;
			line-height: 30px;
			color: #494949;
		}
		span:nth-child(3) {
			color: #bbb;
		}
		span:nth-child(4) {
			color: #bbb;
		}
		span:nth-child(7) {
			color: #bbb;
		}
		&-right {
			width: 25%;
			text-align: right;
			display: flex;
			justify-content: space-between;
			flex-direction: column;
			padding-bottom: 2%;
			span {
				display: block;
			}
		}
		&-left {
			width: 75%;
			text-align: left;
			&-top {
				span {
					margin-right: 4px;
					display: inline-block;
					overflow: hidden;
					white-space: normal;
					word-break: break-all;
					vertical-align: top;
				}
				span:nth-child(2) {
					max-width: 25%;
				}
			}
			&-detail {
				span {
					display: inline-block;
					overflow: hidden;
					white-space: normal;
					word-break: break-all;
					vertical-align: top;
				}
				span:nth-child(1) {
					width: 37%;
				}
				span:nth-child(2) {
					width: 63%;
				}
			}
		}
	}
	&__guarantee-content {
		width: 100%;
		padding: 0 10px;
	}
	&__guarantee-item {
		padding-bottom: 4px;
		margin: 8px 0;
		border-bottom: 1px solid #ebedf0;
		position: relative;
		&-left {
			text-align: left;
			span {
				margin-right: 4px;
				display: inline-block;
				overflow: hidden;
				white-space: normal;
				word-break: break-all;
				vertical-align: top;
				color: #494949;
			}
			span:nth-child(2) {
				width: 54%;
			}
		}
		&-right {
			position: absolute;
			bottom: 5px;
			right: 18px;
		}
	}
	&__bold {
		font-weight: bold;
		font-size: 14px;
		border-left: 4px solid #0062ad;
		padding-left: 4px;
		&-style {
			margin-left: 17px;
			font-weight: bold;
			font-size: 14px;
			border-left: 4px solid #0062ad;
			padding-left: 4px;
		}
	}
	&__btn {
		margin: 70px 0 30px 0;
	}
}
.van-collapse-item__content {
	padding: 0;
	color: #3d3d3d;
}
</style>
