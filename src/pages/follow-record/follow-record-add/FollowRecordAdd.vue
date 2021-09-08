<template>
	<div class="page follow-record-add">
		<ZwNavBar />
		<div class="page_content">
			<van-form @submit="onSubmit">
				<van-field
					v-model="followRecordView.relationship"
					readonly
					clickable
					name="relationship"
					label="催收对象"
					placeholder="点击选择催收对象"
					required
					:rules="[{ required: true, message: '请选择催收对象' }]"
					@click="fieldClick('relationship')"
				/>
				<van-field
					v-model="followRecordView.targetName"
					name="targetName"
					label="姓名"
					placeholder="请输入姓名"
					required
					:rules="[{ required: true, message: '请填写姓名' }]"
				/>
				<van-field
					v-model="followRecordView.addressStatus"
					readonly
					clickable
					name="addressStatus"
					label="地址状态"
					placeholder="点击选择地址状态"
					required
					:rules="[{ required: true, message: '请选择地址状态' }]"
					@click="fieldClick('addressStatus')"
				/>
				<van-field
					v-model="followRecordView.addressType"
					readonly
					clickable
					name="addressType"
					label="地址类型"
					placeholder="点击选择地址类型"
					required
					:rules="[{ required: true, message: '请选择地址类型' }]"
					@click="fieldClick('addressType')"
				/>
				<van-field
					v-model="followRecordView.addressDetail"
					name="addressDetail"
					label="详细地址"
					placeholder="请输入详细地址"
					maxlength="500"
					required
					:rules="[{ required: true, message: '请填写详细地址' }]"
					right-icon="location-o"
					@click-right-icon="onLocationClick"
				/>
				<van-field
					v-model="followRecordView.collectionProgress"
					rows="2"
					autosize
					maxlength="500"
					label="跟进内容"
					type="textarea"
					show-word-limit
					placeholder="请输入跟进内容"
					required
					:rules="[{ required: true, message: '请输入跟进内容' }]"
				/>
				<UploadImage @imgdata="imageClick" />
				<UploadRecord @recorddata="recordClick" />
				<van-popup v-model:show="state.showPicker" position="bottom">
					<van-picker
						:columns="columns"
						@confirm="onConfirm"
						@cancel="state.showPicker = false"
					/>
				</van-popup>
				<div style="margin: 16px">
					<van-button
						round
						block
						type="primary"
						native-type="submit"
						:loading="btnloading"
					>
						提交
					</van-button>
				</div>
			</van-form>
		</div>
	</div>
</template>
<script lang="ts">
//新增跟进记录
import { AppService } from "@/api/services/app.service";
import { RequestParams } from "@gopowerteam/http-request";
import { FollowRecordView } from "@/types/followRecordView.interface";
import { defineComponent, ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { StringMust } from "@/utils/usePropType";
import UploadImage from "@/components/UploadImage.vue";
import UploadRecord from "@/components/UploadRecord.vue";
import { useDict } from "@/utils/hook.service";
import { WxSDKService, ImageInfo } from "@/utils/wxSDK";
import { Dialog, Toast } from "vant";
import { WxService } from "@/api/services/wx.service";
export default defineComponent({
	name: "RepairInfo",
	components: {
		UploadImage,
		UploadRecord,
	},
	props: {
		caseId: StringMust,
	},
	setup(props) {
		const imageList = ref<ImageInfo[]>([]);
		const recordList = ref([]);
		const state = reactive({
			selectData: "",
			value: "",
			showPicker: false,
			relationship: false,
			addressStatus: false,
			addressType: false,
		});
		const newfollowRecordView = reactive({
			addressStatus: null,
			addressType: null,
			relationship: null,
		});
		const columns = ref([]);
		const dataSource = ref([]);
		const service = new AppService();
		const followRecordView = reactive<FollowRecordView>({
			relationship: null,
			targetName: null,
			addressDetail: null,
			addressStatus: null,
			collectionProgress: null,
			mediaIds: null,
			addressType: null,
			caseId: props.caseId,
		});
		const router = useRouter();
		const message = ref("");
		const btnloading = ref(false);
		const onSubmit = (values) => {
			if (imageList.value.some((x) => x.status !== "done")) {
				Toast("请等待上传完毕");
				return;
			}
			if (recordList.value.some((x) => x.status !== "done")) {
				Toast("请等待上传完毕");
				return;
			}
			const imageListData = imageList.value.map((item) => item.serverId) || [];
			const recordListData =
				recordList.value.map((item) => item.serverId) || [];
			if (imageListData.length == 0 && recordListData.length == 0) {
				message.value = "录音和图片未上传，确认要提交吗？";
			} else if (imageListData.length > 0 && recordListData.length == 0) {
				message.value = "录音未上传，确认要提交吗？";
			} else if (imageListData.length == 0 && recordListData.length > 0) {
				message.value = "图片未上传，确认要提交吗？";
			} else {
				message.value = "确认要提交吗？";
			}
			Dialog.confirm({
				message: message.value,
			})
				.then(() => {
					btnloading.value = true;
					service
						.addAppCaseFollowupRecord(
							new RequestParams({
								...followRecordView,
								...newfollowRecordView,
								pictureMediaIds: imageListData,
								luYinMediaIds: recordListData,
							})
						)
						.subscribe({
							next: (value: any) => {
								btnloading.value = false;
								router.push({
									path: `/case-detail/${props.caseId}`,
									query: { currentTab: "record" },
								});
							},
							error: (err) => {
								btnloading.value = false;
							},
						});
				})
				.catch(() => {
					return;
				});
		};
		function imageClick(item) {
			imageList.value = item.value;
		}
		function recordClick(item) {
			recordList.value = item.value;
		}
		function fieldClick(val: any) {
			let param = "";
			// Relationship
			switch (val) {
				case "relationship":
					param = "Relationship";
					break;
				case "addressStatus":
					param = "AddressStatus";
					break;
				case "addressType":
					param = "AddressType";
					break;
			}
			const dictService = useDict();
			dataSource.value = dictService.getDictData(param);
			columns.value = dataSource.value.map((item) => item.name);
			state.showPicker = true;
			state.selectData = val;
		}
		const onConfirm = (value: any, index) => {
			followRecordView[state.selectData] = value;
			newfollowRecordView[state.selectData] = dataSource.value[index].code;
			state.showPicker = false;
		};
		const sdkService = new WxSDKService();
		const wxAuthService = new WxService();
		function onLocationClick() {
			sdkService.getLocation().subscribe({
				next: (location) => {
					// todo 调用服务端API 获取详细地址等
					console.log(location.longitude, location.latitude);
					wxAuthService
						.getLatAndLngToAddress(
							new RequestParams({
								location: location.latitude + "," + location.longitude,
							})
						)
						.subscribe({
							next: (value: any) => {
								followRecordView.addressDetail = value;
							},
						});
				},
			});
		}
		return {
			state,
			columns,
			onConfirm,
			followRecordView,
			fieldClick,
			onSubmit,
			onLocationClick,
			imageClick,
			recordClick,
			imageList,
			recordList,
			btnloading,
		};
	},
});
</script>

<style lang="less" scoped></style>
