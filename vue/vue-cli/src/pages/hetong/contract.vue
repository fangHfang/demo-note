<template>
	<view class="container">
		<!--游客名单  -->
		<view class="list">
			<view class="title">
				<img src="~@/static/toroom.png" class="message"></img>
				<text>基本信息</text>
			</view>
			<view class="to_room">
				<view class="li">
					<text>订单编号：</text>
					<text>{{val.OrderCode}}</text>
				</view>
				<view class="li">
					<text>线路名称：</text>
					<text style="line-height: 38upx;padding: 26upx 0;">{{val.ResourceName}}</text>
				</view>
				<view class="li">
					<text>预定客户：</text>
					<text>{{val.CustomerName}} {{val.CustomerContactUserTelephone}}</text>
				</view>
				<view class="li">
					<text>合同编号：</text>
					<text>{{val.HtCode}} <i class="uni-link" v-if="!val.HtCode" @click="getContractCode">(生成合同)</i><!-- <i class="uni-link" @click="updateContract">(修改合同)</i> --></text>
				</view>
			</view>
		</view>
		<view class="list">
			<view class="title">
				<img src="~@/static/toroom.png" class="message"></img>
				<text>合同信息</text>
			</view>
			<view class="to_room">
				<view class="li arrow-right">
					<text>客户签名：</text>
					<text class="info uni_green" v-if="signDetail.CustomerHasAutograph">已签名</text>
					<text class="info uni_red" v-else>未签名</text>
					<text class="uni-link" @click="signInfo">查看</text>
				</view>
				<view class="li arrow-right">
					<text>游客签名：</text>
					<text class="info">已签名{{hasSignList.length}}，未签名<text class="uni_red">{{signNum - hasSignList.length}}</text></text>
					<text class="uni-link" @click="signInfoList">查看</text>
				</view>
				<view class="li">
					<text>电子合同：</text>
					<text style="line-height: 60upx;padding: 26upx 0;">
						<i class="uni-link" @click="contractLook('', val.HtType)">(查看打印合同)</i>
						<i class="uni-link" style="margin-left: 26upx;" @click="contractLook('/pages/public/hetong/personList')">(附件1: 旅游报名表)</i>
						<i class="uni-link" style="margin-left: 26upx;" @click="contractLook('/pages/public/hetong/tourList')">(附件2: 旅游行程单)</i>
						<i class="uni-link" style="margin-left: 26upx;" @click="contractLook('/pages/public/hetong/book')">(附件3: 授权委托书)</i>
						<i class="uni-link" style="margin-left: 26upx;" @click="contractLook('/pages/public/hetong/changeTuan')">(附件4: 转并团书面证明)</i>
						<i class="uni-link" style="margin-left: 26upx;" @click="contractLook('/pages/public/hetong/FuJia')">(附件5: 附加资源)</i>
					</text>
				</view>
			</view>
		</view>
		<view class="footer" v-if="!type">
			<!-- #ifdef H5 -->
				<view @click="submit" style="background: #ff6815;color: #ffffff;">查看</view>
			<!-- #endif -->
			<!-- <view @click="toDetail" style="background: #ff6815;color: #ffffff;" v-else>查看详情</view> -->
		</view>
	</view>
	<!-- http://192.168.253.246:8081/#/pages/public/hetong/contract?OrderId=a7cf3fa50e6849ab8d50679d6792e310&UserId=16711920c7229492ae1874d7a02ee7ac -->
</template>

<script>
	import serverHttp from '@/api/tour.js'
	export default{
		data(){
			return{
				val: {
					XingMing: 'zzz',
					Telephone: 'zzzz'
				},
				OrderId: '',
				UserId: '',
				token: '',
				type:'',
				signDetail:{},
				signNum:0,
				hasSignList:[]
			}
		},
		onLoad(option) {
			this.OrderId = option.OrderId || '';
			this.UserId = option.UserId || '';
			this.token = uni.getStorageSync('token') || '';
			this.getData();
			this.getSign();
			this.type = option.type;
		},
		onShow() {
			// this.getData()
		},
		methods:{
			// 查看订单
			submit () {
				uni.redirectTo({
					url: '/pages/order/tourOrder/index?type=all'
				})
			},
			/**
			 * 获取合同和签名数据
			 */
			getData () {
				uni.showLoading({
					title: '加载中'
				})
				serverHttp.getContractInfo({
					OrderId: this.OrderId,
					UserId: this.UserId,
					token: this.token
				}).then(res => {
					uni.hideLoading()
					if (res.data.code == 1) {
						this.val = res.data.data
					}
				})
			},
			getSign(){
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
				})
			},
			/**
			 * 跳转合同
			 */
			contractLook (path, type) {
				if (!path) {
					if (type == 1) {
						uni.navigateTo({
							url: '/pages/public/hetong/GN?OrderId='+this.OrderId
						})
						
					} else if (type == 2) {
						uni.navigateTo({
							url: '/pages/public/hetong/GJ?OrderId='+this.OrderId
						})
					} else if (type == 3) {
						uni.navigateTo({
							url: '/pages/public/hetong/TW?OrderId='+this.OrderId
						})
					} else {
						uni.navigateTo({
							url: '/pages/public/hetong/index?OrderId='+this.OrderId
						})
					}
				} else {
					uni.navigateTo({
						url: path + '?OrderId='+this.OrderId
					})
				}
			},
			// 生成合同
			getContractCode () {
				serverHttp.getContractCode({
					OrderId: this.OrderId,
					UserId: this.UserId,
					token: this.token
				}).then(res => {
					if (res.data.Status == 1) {
						this.getData()
					}
				})
			},
			signInfo () {
				uni.navigateTo({
					url:'signInfo?OrderId='+this.OrderId
				})
			},
			signInfoList(){
				uni.navigateTo({
					url:'signInfoList?OrderId='+this.OrderId
				})
			},
			updateContract () {
				uni.navigateTo({
					url: '/pages/public/hetong/updateContract?OrderId=' + this.OrderId
				})
			},
			toDetail() {
				uni.navigateTo({
					url: '/pages/order/tourOrder/orderDealis?Id='+this.OrderId
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '../../yl_hotel/scss/order.scss';
	@import '../../tour/scss/order.scss';
	.container{
		padding-top:20upx;
	}
	.arrow-right{
		.info{
			flex: 1;
			text{
				line-height: initial;
				vertical-align: baseline;
			}
		}
		.uni-link{
			color: #bfbfbf;
			padding-right:44upx;
		}
		&:after{
			position: absolute;
			right:10upx;
			font-family: iconfont;
			content: '\e6b4';
			color: #bdbdbd;
			font-size: 40upx;
		}
	}
	.uni-link{
		color: #007AFF
	}
	.uni_red{color: #e74c3c;}
	.uni_green{color: #27ae60;}
	i{
		font-style: normal;
		margin-left: 6upx;
	}
</style>