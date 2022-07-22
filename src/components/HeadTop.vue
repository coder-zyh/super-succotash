<template>
	<div class="head">
		<div class="left"><slot name="left"></slot></div>
		<div class="mid"><slot></slot></div>
		<div class="right"><slot name="right"></slot></div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "HeadTop",
});
</script>
<style scoped>
.head {
	position: fixed;
	display: flex;
	top: 0;
	z-index: 9;
	justify-content: space-between;

	width: 100%;
	background-color: #fff;
	line-height: 50px;
}
.mid {
	font-size: 20px;
	font-weight: 600;
}
</style>
