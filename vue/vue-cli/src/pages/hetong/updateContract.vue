<template>
	<view class="updateContract">
		<view class="title">第七章: 协议条款</view>
		<view class="li">
			<view class="li-title">第二十三条: 成团人数与不成团的约定</view>
			<view class="li-con">
				<label class="left-title">成团人数: </label>
				<view class="right-con">成团的最低人数 <input type="number" v-model="submitData.RenShu" style="width: 100upx;display: inline-block;"/>人</view>
			</view>
			<view class="li-con">
				<label class="left-title">不成团约定: </label>
				<view>
					<view class="right-con special">1、同意旅行社委托其他旅行社履行合同;</view>
					<view class="right-con special">2、
						<radio-group @change="radioChange" data-type="1">
							<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in radios" :key="item.value">
								<view>
									<radio :value="item.value" :checked="item.value == submitData.Delay" />
								</view>
								<view>{{item.name}}</view>
							</label>
						</radio-group>
					</view>
					<view class="right-con special">3、
						<radio-group @change="radioChange" data-type="2">
							<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in radios1" :key="item.value">
								<view>
									<radio :value="item.value" :checked="item.value == submitData.ChangeLine" />
								</view>
								<view>{{item.name}}</view>
							</label>
						</radio-group>
					</view>
					<view class="right-con special">4、
						<radio-group @change="radioChange"  data-type="3">
							<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in radios2" :key="item.value">
								<view>
									<radio :value="item.value" :checked="item.value == submitData.Relieve" />
								</view>
								<view>{{item.name}}</view>
							</label>
						</radio-group>
					</view>
				</view>
			</view>
		</view>
		<view class="li" v-if="IsTaiWanYou == false">
			<view class="li-title">第二十四条: 拼团约定</view>
			<view class="li-con">
				<label class="left-title">拼团约定: </label>
				<view class="right-con special special1">
					<view>
						<radio-group @change="radioChange" data-type="4">
							<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in radios3" :key="item.value">
								<view>
									<radio :value="item.value" :checked="item.value == submitData.PinTuan" />
								</view>
								<view>{{item.name}}</view>
							</label>
						</radio-group>
					</view>
				</view>
			</view>
		</view>
		<view class="li">
			<view class="li-title">附加条款</view>
			<view class="li-con">
				<label class="left-title">附加条款: </label>
				<view class="right-con special">
					<view>
						<radio-group @change="radioChange" data-type="5">
							<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in radios4" :key="item.value">
								<view>
									<radio :value="item.value" :checked="item.value == submitData.HasFuJiaTiaoKuan" />
								</view>
								<view>{{item.name}}</view>
							</label>
						</radio-group>
					</view>
				</view>
			</view>
			<view v-if="submitData.HasFuJiaTiaoKuan == 1">
				<textarea v-model="submitData.FuJiaTiaoKuanBody" style="width: 85%;border: 2upx solid #efefef;padding: 20upx;font-size: 28upx;border-radius: 12upx;" @blur="bindTextAreaBlur"/>
			</view>
		</view>
		<view class="li">
			<view class="li-title">供应商</view>
			<view class="li-con">
				<label class="left-title">供应商: </label>
				<view class="right-con special">
					<view>
						<radio-group @change="radioChange" data-type="6">
							<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in radios5" :key="item.value">
								<view>
									<radio :value="item.value" :checked="item.value == submitData.IsShowMy" />
								</view>
								<view>{{item.name}}</view>
							</label>
						</radio-group>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import serverHttp from '@/api/tour.js'
	export default{
		data () {
			return {
				IsTaiWanYou: false,
				radios: [
					{
						value: '0',
						name: '不同意'
					},
					{
						value: '1',
						name: '同意 延期出团'
					}
				],
				radios1: [
					{
						value: '0',
						name: '不同意'
					},
					{
						value: '1',
						name: '同意 改变其他线路出团'
					}
				],
				radios2: [
					{
						value: '0',
						name: '不同意'
					},
					{
						value: '1',
						name: '同意 解除合同'
					}
				],
				radios3: [
					{
						value: '0',
						name: '旅游者不同意'
					},
					{
						value: '1',
						name: '旅游者同意 采用拼团方式拼至供应商旅行社成团'
					}
				],
				radios4: [
					{
						value: '0',
						name: '无附加条款'
					},
					{
						value: '1',
						name: '有附加条款'
					}
				],
				radios5: [
					{
						value: '1',
						name: '显示自己'
					},
					{
						value:'0',
						name: '显示供应商'
					}
				],
				submitData: {
					RenShu: 0,
					Delay: 0,
					ChangeLine: 0,
					Relieve: 0,
					PinTuan: 0,
					HasFuJiaTiaoKuan: 0,
					IsShowMy: 0,
					FuJiaTiaoKuanBody: ''
				},
				allData: '',
				OrderId: ''
			}
		},
		onNavigationBarButtonTap (e) {
			this.saveInfo()
		},
		onLoad(option) {
			this.OrderId = option.OrderId
			this.getData()
		},
		onShow() {
		},
		methods: {
			showToat(type, obj) {
				type == 1 ? uni.showLoading({
					title: '加载中'
				}) : type == 2 ? uni.hideLoading() : uni.showToast({
					icon: obj.icon,
					title: obj.title,
					duration: 1500
				});;
			},
			radioChange: function(evt) {
				let type = evt.target.dataset.type
				if (type == '1') {
					this.submitData.Delay = evt.target.value
				} else if (type == '2') {
					this.submitData.ChangeLine = evt.target.value
				} else if (type == '3') {
					this.submitData.Relieve = evt.target.value
				} else if (type == '4') {
					this.submitData.PinTuan = evt.target.value
				} else if (type == '5') {
					if (evt.target.value == '0') {
						this.submitData.FuJiaTiaoKuanBody = ''
					}
					this.submitData.HasFuJiaTiaoKuan = evt.target.value
				} else {
					this.submitData.IsShowMy = evt.target.value
				}
				console.log(this.submitData)
			},
			bindTextAreaBlur: function (e) {
				this.submitData.FuJiaTiaoKuanBody = e.detail.value
			},
			getData () {
				this.showToat(1)
				serverHttp.getEditContractInfo({
					OrderId: this.OrderId
				}).then(res => {
					this.showToat(2)
					if (res.data.Status == 1) {
						this.submitData = res.data.Tag.HtEdit
						this.IsTaiWanYou = res.data.Tag.IsTaiWanYou
						this.allData = res.data.Tag
					} else {
						this.showToat(3, {icon: 'none', title: res.data.Info})
					}
				})
			},
			saveInfo () {
				this.showToat(1)
				serverHttp.saveEditContractInfo({
					OrderId: this.OrderId,
					HeTongId: this.allData.HeTongId,
					...this.submitData
				}).then(res => {
					this.showToat(2)
					if (res.data.Status == 1) {
						uni.navigateBack()
					} else {
						this.showToat(3, {icon: 'none', title: res.data.Info})
					}
				})
			}
		},
	}
</script>

<style lang="scss">
	.updateContract{
		height: calc(100vh - 88upx);
		background: #fff;
		padding-left: 30upx;
		overflow-y: scroll;
		#editor {
			width: 100%;
			height: 300px;
			background-color: #CCCCCC;
		}
		.title{
			padding: 100upx 0 60upx;
			text-align: center;
			font-size: 46upx;
			font-weight: 600;
		}
		.li{
			margin-bottom: 30upx;
			.li-title{
				font-size: 34upx;
				font-weight: 600;
				margin-bottom: 16upx;
			}
			.li-con{
				font-size: 28upx;
				margin-bottom: 16upx;
				.left-title{
					width: 25%;
					display: inline-block;
					line-height: 56upx;
				}
				.right-con{
					width: 75%;
					display: inline-block;
					margin-top: 20upx;
					uni-input{
						vertical-align: middle;
						border: 2upx solid #ddd;
						margin: 0 8upx;
						text-align: center;
					}
					uni-radio-group{
						display: inline-block;
						.uni-list-cell-pd{
							margin-right: 16upx;
							view{
								display: inline-block;
							}
						}
					}
				}
				.special{
					width: 100%;
					margin-top: 20upx;
					box-sizing: border-box;
					padding-left: 20upx;
				}
				.special1{
					uni-radio-group{
						.uni-list-cell-pd{
							// width: 100%;
							display: block;
							overflow: hidden;
							view{
								display: inline-block;
							}
						}
					}
				}
				text{
					display: block;
					padding-left: 30upx;
				}
				uni-radio{
					transform: scale(0.7, 0.7)
				}
			}
		}
	}
</style>
