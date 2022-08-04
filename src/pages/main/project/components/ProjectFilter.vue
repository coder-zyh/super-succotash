<template>
	<van-dropdown-menu>
		<van-dropdown-item ref="item" title="项目名称">
			<div v-for="i of projectList" :key="i.value">
				<van-cell clickable @click="itemClick(i.value)">
					<div class="project-item_name">{{ i.text }}</div>
					<div class="project-item_code">
						<span>{{ i.value }}</span>
						<span>{{ i.createdate }}</span>
					</div>
				</van-cell>
			</div>
			<div class="btn">
				<van-button plain size="large" @click="itemClick('')">
					取消选择
				</van-button>
			</div>
		</van-dropdown-item>
	</van-dropdown-menu>
</template>
<script lang="ts" setup>
import { AppService } from "@/api/services/app.service.js";
import { onBeforeMount, ref } from "vue";

const projectList = ref<{ text: string; value: string; createdate?: string }[]>(
	[]
);
const item = ref<any>(null);
const getList = () => {
	new AppService().getPullProject().subscribe({
		next: (data) => {
			projectList.value = data.map((x) => {
				return {
					value: x.code,
					text: x.name,
					createdate: x.createdate,
				};
			});
		},
	});
};
onBeforeMount(() => {
	getList();
});

const emits = defineEmits(["chooseProject"]);
const itemClick = (i: string) => {
	item.value.toggle();

	emits("chooseProject", i);
};
</script>
<style lang="less" scoped>
.project-item {
	&_name {
		font-size: 16px;
		color: black;
	}
	&_code {
		font-size: 14px;
		color: #ccc;
		display: flex;
		justify-content: space-between;
	}
}
</style>
