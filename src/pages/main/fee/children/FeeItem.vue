<template>
	<div class="feeItem">
		<van-cell-group v-if="item" inset>
			<van-cell :value="item.name" />
			<van-cell title="费用时间" :value="item.date" />
			<van-cell title="报销金额" :value="item.money" />
			<van-cell title="报销科目" :value="item.feeType" />
			<van-cell title="报销时间" :value="item.date" />
		</van-cell-group>
	</div>
</template>
<script>
export default {
	name: "FeeItem",
	props: {
		item: Object,
	},
};
</script>
<style scoped>
.feeItem {
	padding: 10px 0;
}
</style>
