<template>
	<view>
		<Tab :list="list" :active="active" @changeActive="changeActive"/>
	</view>
</template>

<script>
import { Tab } from "@/components/Tab";
	export default {
		components:{
			Tab
		},
		data() {
			return {
				list: ['已通过','已拒绝'],
				active: 0
			}
		},
		onLoad() {

		},
		methods: {
			changeActive(index){
				this.active = index
			}
		}
	}
</script>

<style>
</style>
