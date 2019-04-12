<!--
This box doesn't use "once"
-->

<template>

<div class='box' v-in-viewport='{ margin, disabled }'></div>

</template>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<script>
import Vue from 'vue'
import directive from '../../index.coffee'
directive.defaults.root = '.viewport'
Vue.directive('in-viewport', directive)
export default {
	props: {
		margin: String,
		disabled: Boolean,
	}
}
</script>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<style scoped src='./styles.css'></style>