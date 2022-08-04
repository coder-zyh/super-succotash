<template>
	<div class="project-item">
		<div v-if="item" class="project-item_content">
			<div class="project-item_title">{{ item.projectName }}</div>
			<div v-if="item" class="project-item_info">
				<span class="project-item_info__label">项目编码：</span>
				<span class="project-item_info__value">{{ item.code }}</span>
			</div>
			<div v-if="item" class="project-item_info">
				<span class="project-item_info__label">项目经理：</span>
				<span class="project-item_info__value">{{ item.ownerid }}</span>
			</div>
			<div v-if="item" class="project-item_info">
				<span class="project-item_info__label">项目状态：</span>
				<span class="project-item_info__value">{{ status }}</span>
			</div>
			<div v-if="item" class="project-item_info">
				<span class="project-item_info__label">项目起始时间：</span>
				<span class="project-item_info__value">{{ date }}</span>
			</div>
			<div v-if="item" class="project-item_info">
				<span class="project-item_info__label">项目总预算：</span>
				<span class="project-item_info__value">{{ item.budget }} 元</span>
			</div>
			<div v-if="item" class="project-item_info">
				<span class="project-item_info__label">项目总成本：</span>
				<span class="project-item_info__value">{{ item.totalCost }} 元</span>
			</div>
			<div v-if="item" class="project-item_info">
				<span class="project-item_info__label">总人力成本：</span>
				<span class="project-item_info__value">
					{{ item.totalManpower }} 元
				</span>
			</div>
			<div v-if="item" class="project-item_info">
				<span class="project-item_info__label">总报销成本：</span>
				<span class="project-item_info__value">
					{{ item.totalReimbursement }} 元
				</span>
			</div>
			<div v-if="item" class="project-item_info">
				<span class="project-item_info__label">预估报销费用：</span>
				<span class="project-item_info__value">{{ item.amount }} 元</span>
			</div>
			<van-divider />
			<div class="project-item_date">{{ foo }}</div>
		</div>
	</div>
</template>
<script setup lang="ts">
const value = defineProps({
	item: {
		type: Object,
		default() {
			return {};
		},
	},
});
const date = value.item.createdate.split(" ")[0];
const endDate = value.item.endDate.split(" ")[0];
const status = value.item.status === 1 ? "启用" : "停用";

const foo = value.item.status === 1 ? `${date} ~ 至今` : `${date} ~ ${endDate}`;
</script>
<style lang="less" scoped>
.project-item {
	margin: 10px;
	background-color: #fff;
	border-radius: 4px;
	.project-item {
		&_content {
			font-size: 16px;
			padding: 8px 12px;
		}
		&_title {
			font-size: 20px;
			margin-bottom: 6px;
		}
		&_info {
			margin-top: 6px;
			display: flex;
			justify-content: space-between;
			&__label {
				color: #999;
				display: inline-block;
				width: 120px;
			}
			&__value {
			}
		}
		&_date {
			padding-left: 12px;
			color: #ccc;
			text-align: right;
			font-size: 15px;
			height: 20px;
			line-height: 20px;
		}
	}
}
</style>
