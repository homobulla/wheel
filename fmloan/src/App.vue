<template>
    <div id="app">
    	<router-view  v-wechat-title="$route.meta.title"></router-view>
    </div>
</template>

<script>
export default {
	name: 'App',
　　data() {
　　　　return {
　　　　　　
　　　　}
　　},
　　
　  
　}
</script>

<style lang="scss">
 #app {
     width: 100%;
     height: 100%;
 }

@media screen and(min-width:760px) and(max-width:1024px) {
  html {
    font-size: 76Px !important;
  }
}
@media screen and(min-width:1024px) {
  html {
    font-size: 101Px !important;
  }
}

</style>
