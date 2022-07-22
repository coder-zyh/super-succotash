<template>
	<div class="item">
		<input :value="title" type="text" @change="update($event.target.value)" />
	</div>
</template>
<script setup>
const props = defineProps({
	title: String,
});

const emit = defineEmits(["update:title"]);

const update = (value) => {
	console.log(value);
	emit("update:title", value);
};
</script>
