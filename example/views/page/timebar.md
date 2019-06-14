
  #### timebar

  > 标签： `<yl-timebar></yl-timebar>` 


  **功能：** 提供时间段的过滤器控件

  **示例：**

:::demo
  ```html

   <template>
     <yl-timebar 
         ref ="timebar"
        :dataPickOptions="dataPickOptions"
        :currentValue="currentValue"
        :btnItems="btnItems"
        @change="change"
     >
    </yl-timebar>
   </template>
   <script>
   export default {
     data(){
       return {
           dataPickOptions:{
               format:"yyyy-MM-dd HH:mm:ss",
               size:'small',
               clearable:false,
               type:'datetime'
           },
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
       console.log(this.$refs.timebar.getDate())
       // this.$refs.timebar.setDate('2019-01-01','2019-12-01')
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