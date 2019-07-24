<template>
    <div class="amap-wrapper" :style="styl" >
      <el-amap-search-box v-if="searchBox"
      class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
      <el-amap :ref="name"    class="amap-box"
        :vid="id"
        :cursor="cursor"
        :isHotspot="isHotspot"
        :showIndoorMap="showIndoorMap"
        :expandZoomRange="expandZoomRange"
        :dragEnable="dragEnable"
        :zoomEnable="zoomEnable"
        :doubleClickZoom="doubleClickZoom"
        :keyboardEnable="keyboardEnable"
        :jogEnable="jogEnable"
        :scrollWheel="scrollWheel"
        :mapStyle="mapStyle"
        :center="mapCenter"
        :plugin="plugin"
        :events="events"
        >
        <el-amap-marker  v-for="(marker,index) in markers" :key="index" :position="marker" ></el-amap-marker>
        </el-amap>
    </div>
</template>

<script>
export default {
  name:"ylMap",
  data () {
    let self = this;
    return {
        loaded:true,
        mapCenter:this.center,
        mapzooms:[],
        markers:[],
        searchOption:{},
        events: {
            click(e) {
              let { lng, lat } = e.lnglat;
              // 这里通过高德 SDK 完成。
              var geocoder = new AMap.Geocoder({
                radius: 1000,
                extensions: "all"
              });        
              geocoder.getAddress([lng ,lat], function(status, result) {
                if (status === 'complete' && result.info === 'OK') {
                  if (result && result.regeocode) {
                    self.$emit('getInfo',result)
                  }
                }
              });        
            }
          },
        
    }
  },
  props:{
      styl:{
          type:Object,
          default:function(){
              return {}
          }
      },
      id:{
          type:String,
          default:function(){
              return 'amapId'
          }
      },
      name:{
           type:String,
          default:'map'
      },
      cursor:{
           type:String,
          default:'pointer'
      },
      isHotspot:{
           type:Boolean,
          default:false
      },
       showIndoorMap:{
           type:Boolean,
          default:true
      },
       expandZoomRange:{
           type:Boolean,
          default:true
      },
       dragEnable:{
           type:Boolean,
          default:true
      },
       zoomEnable:{
           type:Boolean,
          default:true
      },
       doubleClickZoom:{
           type:Boolean,
          default:true
      },
      keyboardEnable:{
           type:Boolean,
          default:true
      },
      jogEnable:{
           type:Boolean,
          default:true
      },
      scrollWheel:{
           type:Boolean,
          default:true
      },
      mapStyle:{
          type:String,
          default:'normal'
      },
      searchBox:{
          type:Boolean,
          default:true
      },
      center:{
          type:Array,
          default:function(){
              return [108.94371, 34.35384]
          }
      },
      plugin:{
          type:Array,
          default:function(){
              return [
                  {  //比例尺插件
                    pName: 'Scale',
                  },
                  { //工具条插件
                    pName: 'ToolBar',
                  },
                  { //鹰眼插件
                    pName: 'OverView',
                },
                {  //类型
                    pName: 'MapType',
                    defaultType: 0,
                },
                {  //自动补全
                    pName: 'Autocomplete',
                },
                {  //搜索
                    pName: 'PlaceSearch',
                },
              ]
          }
      }
  },
  methods:{
        onSearchResult(pois) {
          let latSum = 0;
          let lngSum = 0;
          this.markers=[];
          if (pois.length > 0) {
            pois.forEach(poi => {
              let {lng, lat} = poi;
              lngSum += lng;
              latSum += lat;
              this.markers.push([poi.lng, poi.lat]);
            });
            let center = {
              lng: lngSum / pois.length,
              lat: latSum / pois.length
            };
            this.mapCenter = [center.lng, center.lat];
          }
        },
        setCenter(lng,lat){
            this.markers=[];
            this.markers.push([lng, lat]);
            this.mapCenter = [lng, lat];
        }
  },
  mounted(){
  }
}
</script>

<style>
.amap-wrapper {width: 100%; height: 300px;position:relative ;}
.search-box { position:absolute !important; top: 15px;left: 40px;}
.amap-box {width:100%;height:100%;}
.amap-toolbar {top:60px !important;}
.amap-geolocation-con {bottom:40px !important;}
</style>