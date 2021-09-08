<template>
	<!-- 录音上传组件 -->
	<section class="component upload-record">
		<van-cell title="上传录音">
			<van-button
				v-if="!startFlag"
				type="primary"
				plain
				size="mini"
				:loading="recordLoading"
				loading-text="加载中"
				@click="startRecordClick"
			>
				开始录音
			</van-button>
			<van-button
				v-else
				type="primary"
				plain
				size="mini"
				:disabled="disabledStopRecord"
				@click="stopRecordClick"
			>
				停止录音
			</van-button>
		</van-cell>
		<van-cell-group v-if="showList">
			<van-cell
				v-for="(item, index) in recordList"
				:key="index"
				:title="`录音文件${index + 1}`"
			>
				<van-loading v-if="item.status !== 'done'" size="24px">
					{{ getStatusText(item.status) }}
				</van-loading>
				<template v-else>
					<!-- 停止按钮 -->
					<van-icon
						v-if="playStatus && currentPlayId === item.localId"
						name="stop-circle-o"
						:size="22"
						@click="stopClick(item)"
					/>
					<!-- 播放按钮 -->
					<van-icon
						v-else
						name="play-circle-o"
						:size="22"
						@click="playClick(item)"
					/>
					<!-- 删除按钮 -->
					<span class="upload-record-style">
						<van-icon name="close" :size="22" @click="closeClick(index)" />
					</span>
				</template>
			</van-cell>
		</van-cell-group>
	</section>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from "vue";
import { Toast } from "vant";
import { RecordInfo, UploadStatus, WxSDKService } from "../utils/wxSDK";
import { Subscription } from "rxjs";

export default defineComponent({
	name: "UploadImage",
	emits: ["recorddata"],
	setup(props, { emit }) {
		const recordLoading = ref(false);
		const service = new WxSDKService();
		const recordList = ref<RecordInfo[]>([]);
		const startFlag = ref(false);
		const disabledStopRecord = ref(false);
		// list
		emit("recorddata", recordList);
		const getStatusText = (status: UploadStatus) => {
			switch (status) {
				case "uploading":
					return "上传中...";
				case "failed":
					return "上传失败";
				default:
					return "上传成功";
			}
		};

		const showList = computed(() => recordList.value.length > 0);

		// 开始录音
		function startRecordClick() {
			recordLoading.value = true;
			disabledStopRecord.value = true;
			service.startRecord().subscribe({
				next: (value) => {
					recordLoading.value = false;
					if (typeof value === "boolean") {
						startFlag.value = true;
						setTimeout(() => {
							disabledStopRecord.value = false;
						}, 5000);
						console.log("录音开始");
					} else {
						disabledStopRecord.value = true;
						console.log(value, "next..");
						recordList.value.push({
							localId: value,
							status: "uploading",
							serverId: "",
						});
						uploadItem(value);
						setTimeout(() => {
							disabledStopRecord.value = false;
						}, 2000);
					}
				},
				error: (err) => {
					recordLoading.value = false;
					console.log(err);
					if (typeof err === "string") {
						Toast(err);
					} else {
						Toast(err.message || "录音失败");
					}
				},
			});
		}

		// 停止录音
		function stopRecordClick() {
			service.stopRecord().subscribe({
				error: (err) => {
					if (typeof err === "string") {
						Toast(err);
					} else {
						Toast(err.message || "停止失败");
					}
				},
				complete: () => {
					startFlag.value = false;
					// emit list to parent
				},
			});
		}

		// 上传录音文件
		function uploadItem(recordId: string) {
			const getItem = () =>
				recordList.value.find((x) => x.localId === recordId);
			service.uploadRecord(recordId).subscribe({
				next: ({ serverId }) => {
					const item = getItem();
					if (!item) return;
					item.status = "done";
					item.serverId = serverId;
				},
				error: (err) => {
					const item = getItem();
					if (!item) return;
					item.status = "failed";
					Toast(err);
				},
			});
		}

		// play
		const currentPlayId = ref("");
		const playStatus = ref(false);
		let playSubscription: Subscription | null = null;

		// 开始播放
		function playClick(item: RecordInfo) {
			if (startFlag.value) {
				Toast("请先结束录音再播放");
				return;
			}

			if (currentPlayId.value) {
				stopClick(item);
				return;
			}
			function playNext(id: string) {
				currentPlayId.value = id;
				playSubscription = service.playRecord(currentPlayId.value).subscribe({
					next: () => {
						playStatus.value = true;
					},
					error: (err) => {
						Toast(err);
					},
					complete: () => {
						// 查找下一条录音数据
						const index = recordList.value.findIndex((x) => x.localId === id);
						const nextItem = recordList.value[index + 1];
						// 没有下一条。则当前录音列表播放完毕
						if (!nextItem) {
							currentPlayId.value = "";
							playStatus.value = false;
						} else {
							// 有则继续下一次播放
							playNext(nextItem.localId);
						}
					},
				});
			}

			playNext(item.localId);
		}

		// 停止播放
		function stopClick(item: RecordInfo) {
			// 停止监听，防止继续播放下一条
			if (playSubscription) playSubscription.unsubscribe();
			service.playStop(item.localId).subscribe({
				error: (err) => Toast(err),
				complete: () => {
					// 停止
					currentPlayId.value = "";
					playStatus.value = false;
				},
			});
		}
		// 删除当前条录音
		function closeClick(index) {
			recordList.value.splice(index, 1);
		}
		return {
			recordLoading,
			// data
			startFlag,
			recordList,
			showList,
			currentPlayId,
			playStatus,
			disabledStopRecord,
			// function
			startRecordClick,
			stopRecordClick,
			getStatusText,
			playClick,
			stopClick,
			closeClick,
		};
	},
});
</script>
<style lang="less">
.upload-record-style {
	display: inline-block;
	margin-left: 10px;
}
</style>
