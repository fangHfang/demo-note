<template>
	<view class="container">
		<uni-notice-bar :show-close="true" text="请输入预订游客名单中填写的游客信息"/>
		<view class="list">
			<view class="li">
				<text class="title">游客姓名</text>
				<input v-model="XingMing" placeholder="游客姓名" value="" />
			</view>
			<view class="li">
				<text class="title">身份证号</text>
				<input v-model="ShenFenZhengNum" placeholder="身份证号码" value="" />
			</view>
			<view class="li">
				<text class="title">护照号码</text>
				<input v-model="HuZhaoHaoMa" placeholder="护照号码" value="" />
			</view>
			<view class="li">
				<text class="title">其他证件</text>
				<input v-model="QiTaHaoMa" placeholder="其他证件" value="" />
			</view>
		</view>
		<button type="primary" class="startBtn" @click="startSign">开始签名</button>
	</view>
</template>

<script>
	import serverHttp from '@/api/tour.js'
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	export default {
		components: {
			uniNoticeBar
		},
		data() {
			return {
				OrderId:'',
				Id:'',
				XingMing:'',
				ShenFenZhengNum:'',
				HuZhaoHaoMa:'',
				QiTaHaoMa:'',
			}
		},
		onLoad:function(options){
			this.OrderId = options.OrderId;
		},
		methods: {
			startSign(){
				if(!this.XingMing){
					return uni.showToast({
						title:"姓名不能为空",
						icon:"none"
					})
				}
				if(this.ShenFenZhengNum == '' && this.HuZhaoHaoMa == '' && this.QiTaHaoMa == ''){
					return uni.showToast({
						title: "证件号码必须填一项",
						icon:"none"
					});
				}
				uni.showLoading({
					title:"加载中"
				})
				serverHttp.verifyQianming({
					OrderId: this.OrderId,
					XingMing: this.XingMing,
					ShenFenZhengNum: this.ShenFenZhengNum,
					HuZhaoHaoMa: this.HuZhaoHaoMa,
					QiTaHaoMa: this.QiTaHaoMa,
				}).then(res => {
					if(res.data.code){
						if(res.data.data.HasAutograph !="0"){
							uni.showModal({
								content: '当前游客已签名',
								confirmText: '查看签名',
								success: ress => {
									if(ress.confirm){
										uni.navigateTo({
											url:'sign?OrderId='+this.OrderId + '&QianMingId=' + res.data.data.Id+"&isQianMing=1"
										})
									}
								}
							});
						}else{
							uni.navigateTo({
								url:'sign?OrderId='+this.OrderId + '&QianMingId=' + res.data.data.Id
							})
						}
					}else{
						uni.showToast({
							title:"请输入正确的游客信息",
							icon:"none"
						})
					}
					setTimeout(function(){
						uni.hideLoading();
					},1500)
				})
				
			}
		}
	}
</script>

<style lang="scss">
	@import url("../../../static/uni.css");
	.uni-noticebar{
		padding:20upx 24upx;
		.uni-noticebar__content-inner{
			font-size: 28upx;
		}
	}
	.list{
		padding-top:20upx;
		.li{
			position: relative;
			display: flex;
			height:90upx;
			line-height: 90upx;
			background-color: #fff;
			color: #555;
			.title{
				width: 200upx;
				padding-right:30upx;
				text-align: right;
			}
			input{
				flex: 1;
				margin: auto 0;
			}
			&:after{
				position: absolute;
				left:30upx;
				right:0;
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
	.startBtn{
		width:92%;
		margin-top:40upx;
		background-color: #ec8021;
		&.button-hover{
			background-color: #e27a1f;
		}
	}
</style>
