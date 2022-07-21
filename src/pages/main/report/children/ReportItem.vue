<template>
	<div class="item">
		<van-cell-group>
			<van-field
				v-model="project"
				is-link
				readonly
				label="项目名称"
				placeholder="选择项目"
				@click="showPicker = true"
			/>
			<van-popup v-model:show="showPicker" round position="bottom">
				<van-picker
					:columns="columns"
					input-align="right"
					@cancel="showPicker = false"
					@confirm="onConfirm"
				/>
			</van-popup>
			<van-field
				v-model="time"
				label="工时"
				placeholder="填写数字,保留1位小数,0-24区间"
				input-align="right"
			/>
		</van-cell-group>
	</div>
</template>
<script>
import { ref, watch } from "vue";
export default {
	props: {
		index: String,
	},
	emits: ["chooseProject"],
	setup(props, context) {
		// 请求本地存储push进columns
		const columns = JSON.parse(localStorage.getItem("projectList"));
		//组件项目需要
		// let current = ref(true);?
		const project = ref("");
		const showPicker = ref(false);

		const onConfirm = (value) => {
			project.value = value;
			showPicker.value = false;

			// current = ref(false);?
			choose(value);
		};
		// 时间
		const time = ref();
		// 发射事件改变父组件name-code
		const choose = (value) => {
			watch(time, (before, after) => {
				const obj = {
					index: props.index,
					code: value.split("-")[1],
					name: value.split("-")[0],
					time: time.value,
				};
				context.emit("chooseProject", obj);
			});
		};
		return {
			project,
			columns,
			onConfirm,
			showPicker,
			time,
		};
	},
};
</script>
<style scoped>
.item {
	margin-top: 15px;
}
</style>
