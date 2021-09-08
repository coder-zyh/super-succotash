<template>
	<!-- 上传图片组件 -->
	<section class="component upload-image">
		<van-cell title="上传图片">
			<van-button type="primary" plain size="mini" @click="chooseImageClick">
				选择图片
			</van-button>
		</van-cell>
		<!-- 图片列表 -->
		<van-uploader v-model="imageList" :show-upload="false"></van-uploader>
	</section>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { Toast } from "vant";
import { WxSDKService, ImageInfo } from "../utils/wxSDK";

export default defineComponent({
	name: "UploadImage",
	emits: ["imgdata"],
	setup(props, { emit }) {
		const imageList = ref<ImageInfo[]>([]);
		const service = new WxSDKService();
		function chooseImageClick() {
			emit("imgdata", imageList);
			service.chooseImages().subscribe({
				next: (data) => {
					if (!!getImageInfo(data.localId)) {
						Toast("已过滤重复图片");
					}

					// 图片列表添加图片
					imageList.value.push({
						status: "uploading",
						message: "上传中",
						content: data.data,
						serverId: "",
						name: data.localId,
					});

					service.uploadImage(data.localId).subscribe({
						next: (uploadInfo) => {
							const item = getImageInfo(uploadInfo.localId);
							if (!item) return;
							item.serverId = uploadInfo.serverId;
							item.status = "done";
							item.message = "";
						},
						error: (msg) => {
							Toast(msg || "上传错误");
							console.log(msg, "error");
							const item = getImageInfo(data.localId);
							if (!item) return;
							item.status = "failed";
							item.message = "上传错误";
						},
					});
				},
				error: (msg) => Toast(msg || "获取图片出错"),
			});
		}

		function getImageInfo(id) {
			return imageList.value.find((x) => x.name === id);
		}

		return {
			// data
			imageList,
			// function
			chooseImageClick,
		};
	},
});
</script>

<style lang="less">
.van-uploader {
	&__wrapper {
		gap: 5px;
		padding: 0 5px;
	}
	&__preview {
		margin: 0;
	}
}
</style>
