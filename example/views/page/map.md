
  #### map

  > 标签： `<yl-map></yl-map>` 

  **功能：** 提供高德地图展示

  **示例：**
:::demo
  ```html

   <template>
      <yl-map></yl-map>

   </template>
   <script>
   export default {
     data(){
       return {
       }
     },
     
     methods:{
     }
   }
   </script>
   <style lang="css" >
   </style>

  ```
:::
 **静态属性**
   | 参数        | 说明           |类型   |默认值|可选值|
  | ------------- |:-------------:| -----:|---:|---:|
  |style|尺寸大小 |string|width:100%  height:300px|--|
  | vid| 地图容器节点的ID | String| -- |--|
  | isHotspot| 是否开启地图热点 | Boolean|fasle |false/true|
  | showIndoorMap| 是否在有矢量底图的时候自动展示室内地图| Boolean|true |false/true|
  | expandZoomRange| 是否支持可以扩展最大缩放级别 | Boolean|true |false/true|
  | dragEnable| 地图是否可通过鼠标拖拽平移 | Boolean|true |false/true|
  | zoomEnable| 地图是否可缩放 | Boolean|true |false/true|
  | doubleClickZoom| 地图是否可通过双击鼠标放大地图 | Boolean|true |false/true|
  | keyboardEnable| 地图是否可通过键盘控制，方向键控制地图平移，"+"和"-"可以控制地图的缩放，Ctrl+“→”顺时针旋转，Ctrl+“←”逆时针旋转 | Boolean|true |false/true|
  | jogEnable| 地图是否使用缓动效果 | Boolean|true |false/true|
  | scrollWheel| 地图是否可通过鼠标滚轮缩放浏览 | Boolean|true |false/true|

 **动态属性**
   | 参数        | 说明           |类型   |默认值|可选值|
  | ------------- |:-------------:| -----:|---:|---:|
  | mapStyle| 设置地图显示样式，目前支持normal（默认样式）、dark（深色样式）、light（浅色样式）、fresh(osm清新风格样式)四种 | String|normal |--|
  | center| 地图中心点坐标值 | Array|[108.94371, 34.35384] |--|
 **备注**

  1.查看package.json中是否已经含有vue-amap，如没有先安装vue-amap包

  2.在入口处注册 如：

  import VueAMap from 'vue-amap'

  Vue.use(VueAMap)

  VueAMap.initAMapApiLoader({

      key: '6ee9a3644c56a3b842a2ac09d3b2b24d',

      plugin: [

        'AMap.Autocomplete',

        'AMap.PlaceSearch',

        'AMap.Scale',

        'AMap.OverView',

        'AMap.ToolBar',

        'AMap.MapType',

        'AMap.PolyEditor',

        'AMap.CircleEditor',

        'AMap.Geocoder',

        'AMap.Geolocation'
      ],

      //  默认高德 sdk 版本为 1.4.4

      v: '1.4.4'

  })

---

