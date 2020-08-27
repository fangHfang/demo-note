<template>
  <div id="allmap" style="width: 100%;height: 100%;"></div>
</template>

<script type="text/javascript">
export default {
  name: 'addressShow',
  props: {
    coordinate: {
      type: Array
    }
  },
  mounted () {
    this.init()
    this.init()
  },
  data () {
    return {
      coord: []
    }
  },
  watch: {
    'coordinate': {
      handler (val) {
        this.coordinate = val
        this.init()
      },
      deep: true
    }
  },
  methods: {
    MP () {
      let ak = 'tIqudWbS5oI5emdWCyBfFFXO9ywNvGA4'
      return new Promise(function (resolve, reject) {
        window.onload = function () {
          resolve(BMap)
        }
        var script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'http://api.map.baidu.com/api?v=2.0&ak=' + ak + '&callback=init'
        script.onerror = reject
        document.head.appendChild(script)
      })
    },
    init () {
      if (!window.onload) {
        this.MP().then(BMap => {
          let map = new BMap.Map('allmap')
          // map.centerAndZoom(new BMap.Point(112.563284, 37.818645), 8)
          var dataInfo
          this.coordinate ? dataInfo = this.coordinate : dataInfo = [
            [116.417854, 39.921988, '地址：北京市东城区王府井大街88号乐天银泰百货八层'],
            [116.406605, 39.921585, '地址：北京市东城区东华门大街'],
            [116.412222, 39.912345, '地址：北京市东城区正义路甲5号']
          ]
          setZoom(dataInfo)
          var opts = {
            // 信息窗口宽度
            width: 250,
            // 信息窗口高度
            height: 80,
            // 信息窗口标题
            title: '酒店地址',
            // 设置允许信息窗发送短息
            enableMessage: true
          }
          map.enableScrollWheelZoom()
          for (var i = 0; i < dataInfo.length; i++) {
            // 创建标注
            var marker = new BMap.Marker(new BMap.Point(dataInfo[i][0], dataInfo[i][1]))
            var content = dataInfo[i][2]
            // 将标注添加到地图中
            map.addOverlay(marker)
            addClickHandler(content, marker)
          }

          function addClickHandler (content, marker) {
            marker.addEventListener('click', function (e) {
              window.onload(openInfo(content, e))
            })
          }

          function openInfo (content, e) {
            var p = e.target
            var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat)
            var infoWindow = new BMap.InfoWindow(content, opts) // 创建信息窗口对象
            map.openInfoWindow(infoWindow, point) // 开启信息窗口
          }

          // 根据原始数据计算中心坐标和缩放级别，并为地图设置中心坐标和缩放级别
          function setZoom (points) {
            let newArr = []
            points.forEach(item => {
              let childArr = []
              childArr.push(item[1])
              childArr.push(item[0])
              childArr.push(item[2])
              newArr.push(childArr)
            })
            newArr.sort()
            if (points.length > 0) {
              var maxLng = points[0][0]
              var minLng = points[0][0]
              var maxLat = newArr[0][0]
              var minLat = newArr[0][0]
              var cenLng = (parseFloat(maxLng) + parseFloat(minLng)) / 2
              var cenLat = (parseFloat(maxLat) + parseFloat(minLat)) / 2
              var zoom = getZoom(maxLng, minLng, maxLat, minLat)
              map.centerAndZoom(new BMap.Point(cenLng, cenLat), zoom)
            } else {
              map.centerAndZoom(new BMap.Point(103.388611, 35.563611), 5)
            }
          }

          // 根据经纬极值计算绽放级别
          function getZoom (maxLng, minLng, maxLat, minLat) {
            var zoom = ['50', '100', '200', '500', '1000', '2000', '5000', '10000', '20000', '25000', '50000', '100000', '200000', '500000', '1000000', '2000000']
            var pointA = new BMap.Point(maxLng, maxLat)
            var pointB = new BMap.Point(minLng, minLat)
            var distance = map.getDistance(pointA, pointB).toFixed(1)
            for (var i = 0, zoomLen = zoom.length; i < zoomLen; i++) {
              if (zoom[i] - distance > 0) {
                return 11 + i
              }
            }
          }
        })
      } else {
        window.onload(this.MP().then(BMap => {
          let map = new BMap.Map('allmap')
          // map.centerAndZoom(new BMap.Point(112.563284, 37.818645), 8)
          var dataInfo = this.coordinate
          setZoom(dataInfo)
          var opts = {
            // 信息窗口宽度
            width: 250,
            // 信息窗口高度
            height: 80,
            // 信息窗口标题
            title: '酒店地址',
            // 设置允许信息窗发送短息
            enableMessage: true
          }
          map.enableScrollWheelZoom()
          for (var i = 0; i < dataInfo.length; i++) {
            // 创建标注
            var marker = new BMap.Marker(new BMap.Point(dataInfo[i][0], dataInfo[i][1]))
            var content = dataInfo[i][2]
            // 将标注添加到地图中
            map.addOverlay(marker)
            addClickHandler(content, marker)
          }

          function addClickHandler (content, marker) {
            marker.addEventListener('click', function (e) {
              window.onload(openInfo(content, e))
            })
          }

          function openInfo (content, e) {
            var p = e.target
            var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat)
            var infoWindow = new BMap.InfoWindow(content, opts) // 创建信息窗口对象
            map.openInfoWindow(infoWindow, point) // 开启信息窗口
          }

          // 根据原始数据计算中心坐标和缩放级别，并为地图设置中心坐标和缩放级别
          function setZoom (points) {
            let newArr = []
            points.forEach(item => {
              let childArr = []
              childArr.push(item[1])
              childArr.push(item[0])
              childArr.push(item[2])
              newArr.push(childArr)
            })
            newArr.sort()
            if (points.length > 0) {
              var maxLng = points[0][0]
              var minLng = points[0][0]
              var maxLat = newArr[0][0]
              var minLat = newArr[0][0]
              var cenLng = (parseFloat(maxLng) + parseFloat(minLng)) / 2
              var cenLat = (parseFloat(maxLat) + parseFloat(minLat)) / 2
              var zoom = getZoom(maxLng, minLng, maxLat, minLat)
              map.centerAndZoom(new BMap.Point(cenLng, cenLat), zoom)
            } else {
              map.centerAndZoom(new BMap.Point(103.388611, 35.563611), 5)
            }
          }

          // 根据经纬极值计算绽放级别
          function getZoom (maxLng, minLng, maxLat, minLat) {
            var zoom = ['50', '100', '200', '500', '1000', '2000', '5000', '10000', '20000', '25000', '50000', '100000', '200000', '500000', '1000000', '2000000']
            var pointA = new BMap.Point(maxLng, maxLat)
            var pointB = new BMap.Point(minLng, minLat)
            var distance = map.getDistance(pointA, pointB).toFixed(1)
            for (var i = 0, zoomLen = zoom.length; i < zoomLen; i++) {
              if (zoom[i] - distance > 0) {
                return 11 + i
              }
            }
          }
        }))
      }
    }
  }
}
</script>

<style lang="scss">

</style>
