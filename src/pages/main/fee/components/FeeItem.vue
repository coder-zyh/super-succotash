<template>
	<div class="feeItem">
		<van-cell-group v-if="item" inset>
			<van-cell :title="item.name" size="large" />
			<van-cell title="费用时间 :" :value="item.date" />
			<van-cell title="报销金额 :" :value="item.money">
				<template #right-icon>
					<span>&nbsp;元</span>
				</template>
			</van-cell>
			<van-cell title="报销科目 :" :value="item.feeType" />
			<van-cell title="报销时间 :" :value="item.date" />
		</van-cell-group>
	</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "FeeItem",
	props: {
		item: Object,
	},
});
</script>
<style lang="less" scoped>
.feeItem {
	padding: 5px 0;
}
</style>
