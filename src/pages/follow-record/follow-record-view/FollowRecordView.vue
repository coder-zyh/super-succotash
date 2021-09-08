<template>
	<div class="page follow-record-view">
		<ZwNavBar current-tab="record" />
		<div class="page_content">
			<van-cell-group>
				<van-cell title="催收对象" :value="followRecordView.relationship" />
				<van-cell title="姓名" :value="followRecordView.targetName" />
				<!-- <van-cell title="催收反馈" :value="followRecordView.region" /> -->
				<van-cell title="地址状态" :value="followRecordView.addressStatus" />
				<van-cell title="地址类型" :value="followRecordView.addressType" />
				<van-cell title="详细地址" :value="followRecordView.addressDetail" />
				<van-cell
					title="跟进内容"
					:value="followRecordView.collectionProgress"
				/>
				<div class="page_content-img">
					<div v-show="imgData" class="page_content-img__access">附件</div>
					<div class="page_content-img__conter">
						<van-uploader
							v-model="imgData"
							:show-upload="false"
							:deletable="false"
							preview-size="100px"
						></van-uploader>
					</div>
				</div>
				<div class="page_content-record">
					<div v-show="recordData" class="page_content-record__access">
						录音
					</div>
					<div class="page_content-record__conter">
						<audio
							v-for="(item, index) in recordData"
							:key="index"
							:src="item"
							controls
							preload
						></audio>
					</div>
				</div>
			</van-cell-group>
		</div>
	</div>
</template>
<script lang="ts">
//查看跟进记录
import { AppService } from "@/api/services/app.service";
import { RequestParams } from "@gopowerteam/http-request";
import { CommonService } from "@/utils/common.service";
import { FollowRecordView } from "@/types/followRecordView.interface";
import { StringMust } from "@/utils/usePropType";
import { defineComponent, ref, reactive, onMounted } from "vue";
import { useDict } from "@/utils/hook.service";
import { useRoute } from "vue-router";
export default defineComponent({
	name: "FollowRecordView",
	props: {
		caseId: StringMust,
	},
	setup(props) {
		const audio = ref(null);
		const service = new AppService();
		const followRecordView = reactive<FollowRecordView>({
			relationship: "",
			targetName: "",
			addressDetail: "",
			addressStatus: "",
			collectionProgress: "",
			mediaIds: null,
			addressType: "",
			caseId: props.caseId,
		});
		const dataSource = ref([]);
		const imgData = ref([]);
		const recordData = ref([]);
		function getdictService() {
			const dictService = useDict();
			dataSource.value = dictService.getDictData(
				"Relationship",
				"AddressStatus",
				"AddressType"
			);
		}
		const route = useRoute();
		onMounted(() => {
			getdictService();
			service
				.viewAppCaseFollowupRecord(
					new RequestParams({ followupRecordId: route.query.followupRecordId })
				)
				.subscribe({
					next: (value: any) => {
						Object.keys(value).forEach((key) => {
							dataSource.value.forEach((item) => {
								if (item.code == value[key]) {
									value[key] = item.name;
								}
							});
						});
						CommonService.revertData(followRecordView, value);
						if (value.fileIds) {
							service
								.getFileUrl(
									new RequestParams({
										urls: value.fileIds,
										domainName: window.location.host,
									})
								)
								.subscribe({
									next: (value: any) => {
										if (value) {
											recordData.value = value["luYinUrlList"] || [];
											if (value["pictureUrlList"]) {
												value["pictureUrlList"].forEach((element) => {
													imgData.value.push({ url: element });
												});
											} else {
												imgData.value = [];
											}
										}
									},
								});
						}
					},
				});
		});
		return {
			followRecordView,
			getdictService,
			audio,
			imgData,
			recordData,
		};
	},
});
</script>

<style lang="less" scoped>
.page_content-img {
	// display: flex;
	font-size: 3.73333vw;
	color: #323233;
	line-height: 6.4vw;
	padding: 2.66667vw 4.26667vw;
	width: 90%;
	&__item {
		margin-right: 6px;
	}
}
.page_content-record {
	// display: flex;
	font-size: 3.73333vw;
	color: #323233;
	line-height: 6.4vw;
	padding: 2.66667vw 4.26667vw;
	width: 90%;
	&__conter {
		margin-bottom: 10px;
	}
	&__item {
		margin-right: 6px;
	}
}
</style>
