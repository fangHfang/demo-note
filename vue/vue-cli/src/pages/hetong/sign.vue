<template>
	<view class='contents'>
		<template v-if="isQianMing">
			<view class="qmTit">签名信息</view>
			<view class="qmInfo">
				<image :src="QianMingInfo.Autograph"></image>
			</view>
		</template>
		<template v-else>
			<canvas class='firstCanvas' canvas-id="firstCanvas" @touchmove='move' @touchstart='start($event)' @touchend='end'
			 @touchcancel='cancel' @longtap='tap' disable-scroll='true' @error='error'>
			</canvas>
			<view class="caozuo">
			    <view class="chongqian" @tap='clearClick'>
			        重签
			    </view>
			    <view class="over" @tap="overSign">
			        完成签名
			    </view>
			</view>
		</template>
    </view>
</template>

<script>
	var content = null;
    var touchs = [];
    var canvasw = 0;
    var canvash = 0;
    var _that;
	import serverHttp from '@/api/tour.js'
    //获取系统信息
    uni.getSystemInfo({
        success: function(res) {
			console.log(res)
            canvasw = res.windowWidth;
			console.log(canvasw)
            canvash = res.windowHeight;
        },
    })
    export default {
        data() {
            return {
				OrderId: '',
				QianMingId: '',
				QianMingInfo:{},
				isQianMing:0,
                isEnd: false // 是否签名
            }
        },
        methods: {
            overSign: function() {
                if (this.isEnd) {
					uni.showModal({
						content: '确定签名？签名后不可修改',
						success: res => {
							uni.showLoading({
								title:"加载中"
							})
							setTimeout(function(){
								if(res.confirm){
									uni.canvasToTempFilePath({
									    canvasId: 'firstCanvas',
									    success: function(res) {
											serverHttp.getContractSign({
												OrderId: _that.OrderId,
												QianMingId: _that.QianMingId,
												QianMing: res.tempFilePath
											}).then(ress => {
												uni.hideLoading();
												uni.showToast({
												    title: '签名完成',
												    icon: "none"
												})
												setTimeout(function(){
													uni.navigateBack()
												},1500)
											})
									    }
									})
								}
							},500)
						}
					});
                } else {
                    uni.showToast({
                        title: '请先完成签名',
                        icon: "none",
                        duration: 1500,
                        mask: true
                    })
                }
            },

            // 画布的触摸移动开始手势响应
            start: function(event) {
                // console.log(event)
                //获取触摸开始的 x,y
                let point = {
                    x: event.changedTouches[0].x,
                    y: event.changedTouches[0].y
                }
                // console.log(point)
                touchs.push(point);
            },
            // 画布的触摸移动手势响应
            move: function(e) {
                let point = {
                    x: e.touches[0].x,
                    y: e.touches[0].y
                }
                // console.log(point)
                touchs.push(point)
                if (touchs.length >= 2) {
                    this.draw(touchs)
                }
            },

            // 画布的触摸移动结束手势响应
            end: function(e) {
                console.log("触摸结束" + e)
                // 设置为已经签名
                this.isEnd = true
                // 清空轨迹数组
                for (let i = 0; i < touchs.length; i++) {
                    touchs.pop()
                }

            },

            // 画布的触摸取消响应
            cancel: function(e) {
                console.log("触摸取消" + e)
            },

            // 画布的长按手势响应
            tap: function(e) {
                console.log("长按手势" + e)
            },

            error: function(e) {
                console.log("画布触摸错误" + e)
            },

            //绘制
            draw: function(touchs) {
                let point1 = touchs[0]
                let point2 = touchs[1]
                touchs.shift()
                content.moveTo(point1.x, point1.y)
                content.lineTo(point2.x, point2.y)
                content.stroke()
                content.draw(true)
            },
            //清除操作
            clearClick: function() {
                // 设置为未签名
                this.isEnd = false
                //清除画布
                content.clearRect(0, 0, canvasw, canvash)
                content.draw(true)
            },
			getSignInfo(){
				serverHttp.getQianMingInfo({
					MingDanId: this.QianMingId,
				}).then(res => {
					this.QianMingInfo = res.data.data;
				})
			}
        },
		
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad(options) {
		    _that = this
		    //获得Canvas的上下文
		    content = wx.createCanvasContext('firstCanvas')
		    //设置线的颜色
		    content.setStrokeStyle("#000")
		    //设置线的宽度
		    content.setLineWidth(5)
		    //设置线两端端点样式更加圆润
		    content.setLineCap('round')
		    //设置两条线连接处更加圆润
		    content.setLineJoin('round')
			this.OrderId = options.OrderId;
			this.QianMingId = options.QianMingId;
			this.isQianMing = options.isQianMing;
			if(this.isQianMing){
				this.getSignInfo();
			}
		},

    }

</script>

<style lang="scss">
	.qmTit{
		padding:0 20upx 20upx;
		color: #868585;
		font-size: 28upx;
	}
	.qmInfo{
		background-color: #fff;
		padding:40upx;
		image{
			width: 400upx;
			margin:0 auto;
			display: block;
		}
	}
	.ts {
        color: #FF485D;
        font-size: 30upx;
        height: 100upx;
        line-height: 100upx;
        padding-left: 20upx;
    }
    canvas {
        background-color: #DDDDDD;
        width: 96%;
        margin: 0 2%;
        height: calc(100vh - 220upx);
    }

    .contents {
        padding-top: 20upx;
        padding-bottom: 100upx;
        box-sizing: border-box;
    }

    #signatureImg {
        background-color: #EEEEEE;
    }

    .caozuo {
        display: flex;
        height: 100upx;
        width: 750upx;
        position: fixed;
        left: 0;
        bottom: 0;
    }

    .caozuo view {
        width: 375upx;
        text-align: center;
        height: 100upx;
        line-height: 100upx;
        color: #FFFFFF;
    }

    .caozuo view:active {
        background-color: #CCCCCC;
        color: #333333;
    }

    .chongqian {
        background-color: #FF8F58;
    }

    .over {
        background-color: #0599D7;
    }
</style>
