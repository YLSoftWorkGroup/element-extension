<!--
 * @Description: 未描述
 * @Author: danielmlc
 * @Date: 2019-08-22 11:35:09
 * @LastEditTime: 2020-03-09 15:37:23
 -->

  #### TimeBar 时间过滤器

  > 标签： `<yl-time-bar></yl-time-bar>` 


  **功能：** 提供时间段的过滤器控件

  **示例：**

:::demo
  ```html

   <template>
     <yl-time-bar 
         ref ="timebar"
        :dataPickOptions="dataPickOptions"
        :currentValue="currentValue"
        :btnItems="btnItems"
        :format = "format"
        @change="change"
     >
    </yl-time-bar>
   </template>
   <script>
   export default {
     data(){
       return {
           dataPickOptions:{
               format:"yyyy-MM-dd",
               size:'small',
               clearable:false,
               type:'month'
           },
           format:"YYYY-MM-DD",
           btnItems:{
              day:true,
              week:true,
              month:true,
              quarter:true,
              year:true
           },
           currentValue:'month'
       }
     },
     methods:{
         change(date){
             console.log(date)
         },
         
     },
     mounted(){
       console.log('父组件')
       this.$nextTick(()=>{
         console.log('父组件')
         console.log(this.$refs.timebar.getDate())
       })
       
     }
   }
   </script>
   <style lang="css" >
   </style>

  ```
:::
  **属性**

  | 参数        | 说明           |类型   |默认值|可选值|
  | ------------- |:-------------:| -----:|---:|---:|
  | btnItems| 时间段选项 | Object|{ day:true, week:true, month:true, quarter:true, year:true, all:true } ||
  | currentValue| 当前默认时间段 | String|'month' |'day'、'week'、'month'、'quarter'、'year'、'all'|
  | dataPickOptions| 时间控件配置 | Boolean|{format:'yyyy-MM-dd', size:'small',readonly:false, clearable:false, type:'date',} |false/true|
  | format| 格式化 | String|'YYYY-MM-DD' ||
  | needSetDate| 是否在初始化时设置初始值 | Boolean|false |false/true|

 **方法**

  | 名称        | 说明           |参数   |返回值|
  | ------------- |:-------------:| -----:|---:|
  | getDate| 获取当前控件开始时间和结束时间 | {beginDate:'',endDate:''}|
  | setDate| 设置当前控件开始时间和结束时间 | (beginDate,endDate)||

 **事件**

| 事件        | 说明           |参数   |
| ------------- |:-------------:| -----:|
| change| 选择时间或选择时间段或者前进后退时触发 | {beginDate:'',endDate:''}|

---