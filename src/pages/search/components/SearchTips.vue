<template>
	<div class="component search-tips">
		<p class="search-tips__placeholder">搜索定制内容</p>
		<p>
			<span
				v-if="personalNoStatus"
				class="search-tips__field"
				@click="$emit('tipsClick', 'personalNo')"
			>
				客户编号
			</span>
			<span v-if="personalNoStatus" class="search-tips__split"></span>
			<span
				v-if="detailStatus"
				class="search-tips__field"
				@click="$emit('tipsClick', 'detail')"
			>
				客户地址
			</span>
			<span
				v-if="detailStatus && personalNameStatus"
				class="search-tips__split"
			></span>
			<span
				v-if="personalNameStatus"
				class="search-tips__field"
				@click="$emit('tipsClick', 'personalName')"
			>
				客户姓名
			</span>
		</p>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "SearchTips",
	props: {
		personalNoStatus: {
			type: Boolean,
			defult: true,
		},
		detailStatus: {
			type: Boolean,
			defult: true,
		},
		personalNameStatus: {
			type: Boolean,
			defult: false,
		},
	},
	emits: ["tipsClick"],
});
</script>

<style lang="less" scoped>
.component.search-tips {
	text-align: center;
	.search-tips {
		&__placeholder {
			color: rgb(187, 187, 187);
			font-size: 12px;
		}
		&__split {
			margin: 0 10px;
			display: inline-block;
			height: 20px;
			border-left: solid 1px black;
		}
		&__field {
			vertical-align: top;
			font-size: 14px;
			color: rgb(0, 98, 173);
		}
	}
}
</style>
