<template>
	<view class="container">
		<view class="list-head">签名信息</view>
		<view class="list" style="margin:0;">
			<view class="li">
				<text class="title">签名信息：</text>
				<text class="info">已签名{{hasSignList.length}}，未签名<text class="uni_red">{{signNum - Number(hasSignList.length)}}</text></text>
			</view>
		</view>
		<view class="list-head">游客信息</view>
		<block v-for="(item,index) in signDetail.QianMingList" :key="index">
			<view class="list">
				<view class="li" @click="sign()">
					<text class="title">游客1：</text>
					<view class="info">{{item.XingMing}}</view>
				</view>
				<view class="li" v-if="item.ShenFenZhengNum">
					<text class="title">身份证号：</text>
					<view class="info">{{item.ShenFenZhengNum}}</view>
				</view>
				<view class="li" v-if="item.HuZhaoHaoMa">
					<text class="title">护照号码：</text>
					<view class="info">{{item.HuZhaoHaoMa}}</view>
				</view>
				<view class="li" v-if="item.QiTaHaoMa">
					<text class="title">其他证件：</text>
					<view class="info">{{item.QiTaHaoMa}}</view>
				</view>
				<view class="li qmli">
					<text class="title">签名状态：</text>
					<view class="info img" v-if="item.HasAutograph"><image :src="item.Autograph" mode="widthFix"></image></view>
					<view class="info txt" v-else>当前游客未签名</view>
				</view>
			</view>
		</block>
		<uni-popup :show="type === 'middle-img'" position="middle" mode="fixed" @hidePopup="togglePopup('')">
			<view class="imgCode">
				<image class="image" src="../../../static/logo.png" />
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import serverHttp from '@/api/tour.js'
	import uniPopup from '@/components/uni-popup/uni-popup'
	export default {
		components: {
			 uniPopup
		},
		data() {
			return {
				type: '',
				OrderId:'',
				signNum:0,
				signDetail:{},
				hasSignList:[],
				showList:false,
				youkeList: []
			}
		},
		onLoad:function(options){
			this.OrderId = options.OrderId;
			this.UserId = options.UserId;
			this.getSign();
		},
		methods: {
			togglePopup(type) {
				this.type = type
			},
			getSign(){
				uni.showLoading({
					title:"加载中"
				})
				serverHttp.getSign({
					OrderId: this.OrderId,
				}).then(res => {
					this.signDetail = res.data.Tag;
					this.signNum = this.signDetail.QianMingList.length;
					for(let i=0;i<this.signDetail.QianMingList.length;i++){
						if(this.signDetail.QianMingList[i].HasAutograph){
							this.hasSignList.push(this.signDetail.QianMingList[i])
						}
					}
					this.showList = true;
					uni.hideLoading();
				})
			},
			sign(){
				uni.navigateTo({
					url:'verifySign?OrderId='+this.OrderId
				})
			}
		},
		onNavigationBarButtonTap(e) {
			this.togglePopup('middle-img')
		}
	}
</script>

<style lang="scss">
	@import url("../../../static/uni.css");
	.uni_red{color: #e74c3c;}
	.list-head{
		padding:20upx;
		color: #868585;
	}
	.list{
		margin-bottom:20upx;
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
				line-height: 90upx;
				text{
					line-height: initial;
					vertical-align: baseline;
				}
				image{
					margin:10upx 0;
					width:200upx;
				}
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
			&.qmli{
				height:auto;
				.info{
					line-height: initial;
					&.txt{
						line-height: 90upx;
						color: #e74c3c;
					}
				}
			}
		}
	}
	.imgCode{
		.image{
			width:360upx;
			height:360upx;
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
	}
</style>
