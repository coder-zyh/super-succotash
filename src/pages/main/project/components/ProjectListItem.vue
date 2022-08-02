<template>
	<div class="project_item item">
		<div v-if="item" class="approval-item_content">
			<div class="approval-item_title">{{ item.name }}</div>
			<div class="approval-item_info">
				<span class="approval-item_info__label">项目编码：</span>
				{{ item.id }}
			</div>
			<div class="approval-item_info">
				<span class="approval-item_info__label">工时：</span>
				{{ item.day }}
			</div>
			<div class="approval-item_info">
				<span class="approval-item_info__label">预估费用：</span>
				{{ item.createdy }}
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
defineProps({
	item: Object,
});
</script>
