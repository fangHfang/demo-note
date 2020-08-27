<template>
	<view class="container">
		<view class="list-head" style="padding-top:0;">客户信息</view>
		<view class="list">
			<view class="li">
				<text class="title">客户姓名：</text>
				<text class="info">{{detail.YouKe.UserName}}</text>
			</view>
			<view class="li">
				<text class="title">手机号码：</text>
				<text class="info">{{detail.YouKe.Telephone}}</text>
			</view>
		</view>
		<view class="list-head">签名信息</view>
		<view class="qmInfo" v-if="showQianMing">
			<template v-if="detail.CustomerHasAutograph">
				<image :src="detail.CustomerAutograph" mode="widthFix"></image>
			</template>
			<template v-else>
				<text>你还没有签名，请签名</text>
				<button type="primary" @click="sign">立即签名</button>
			</template>
		</view>
	</view>
</template>

<script>
	import serverHttp from '@/api/tour.js'
	export default {
		components: {
			 
		},
		data() {
			return {
				OrderId:'',
				detail:{
					YouKe:{
						UserName:'',
						Telephone:''
					}
				},
				showQianMing:false
			}
		},
		onLoad:function(options){
			this.OrderId = options.OrderId;
			this.getSign();
		},
		onShow:function(){
			this.getSign();
		},
		methods: {
			getSign(){
				uni.showLoading({
					title:"加载中"
				})
				serverHttp.getSign({
					OrderId: this.OrderId,
				}).then(res => {
					this.detail = res.data.Tag;
					this.showQianMing = true;
					uni.hideLoading();
				})
			},
			sign(){
				uni.navigateTo({
					url:'sign?OrderId='+this.OrderId
				})
			}
		}
	}
</script>

<style lang="scss">
	@import url("../../../static/uni.css");
	.container{
		padding-top:20upx;
	}
	.list-head{
		padding:20upx;
		color: #868585;
	}
	.list{
		.li{
			position: relative;
			display: flex;
			height:90upx;
			line-height: 90upx;
			background-color: #fff;
			color: #555;
			.title{
				width: 180upx;
				text-align: right;
			}
			.info{
				flex: 1;
			}
			&:after{
				position: absolute;
				left:30upx;
				right:30upx;
				bottom:0;
				content: '';
				height:1px;
				background-color: #efefef;
				transform: translateY(.5)
			}
			&:last-child:after{
				height:0;
			}
		}
	}
	
	.qmInfo{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding:40upx;
		background-color: #fff;
		image{
			width:400upx;
		}
		text{
			color: #989898;
			font-size:32upx;
		}
		button{
			width:100%;
			margin-top:20upx;
			background-color: #ec8021;
			&.button-hover{
				background-color: #e27a1f;
			}
		}
	}
</style>
