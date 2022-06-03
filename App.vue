<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
view,
scroll-view,
swiper,
button,
input,
textarea,
label,
navigator,
image {
  box-sizing: border-box;
}

button {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  border: none;
  line-height: 1;
  border-radius: 0;
  &::after {
    display: none;
  }
}

page {
  min-height: 100vh;
  height: auto;
  background-color: $uni-bg-color;
}

</style>
