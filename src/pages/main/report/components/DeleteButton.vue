<template>
	<div class="component delete-button">
		<van-button
			v-if="!hidden"
			type="primary"
			plain
			size="mini"
			@click="$emit('click')"
		>
			删除
		</van-button>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
	name: "DeleteButton",
	props: {
		hidden: Boolean,
	},
	emits: ["click"],
});
</script>

<style lang="less" scoped></style>
