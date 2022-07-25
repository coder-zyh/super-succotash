<template>
	<div class="item"><input v-model="model" type="text" /></div>
</template>
<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
	title: String,
});

const emit = defineEmits(["update:title"]);
const model = computed({
	get: () => props.title,
	set: (val) => emit("update:title", val),
});
</script>
<style lang="less"></style>
