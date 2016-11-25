<template>

<div class='example'></div>

</template>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<script lang='coffee'>
</script>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<style>

body {
	padding: 0;
	margin: 0;
	font-size: 0;
	line-height: 0;
}

.example {
	height: calc(100vh - 50px);
	width: 100vw;
	background: red;
	box-sizing: border-box;

	/**
	 * This 20+1 on the margin was needed because otherwise the second one gets
	 * marked by scroll monitor as initially visible.
	 */
	margin-bottom: 51px;
}

.example.in-viewport {
	background: orange;
}

.example.fully-in-viewport {
	background: green;
}

.example.above-viewport {
	border-top: 10vh dotted black;
}

.example.below-viewport {
	border-bottom: 10vh dotted black;
}

</style>
