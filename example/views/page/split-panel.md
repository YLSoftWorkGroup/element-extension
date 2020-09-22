<!--
 * @Description: 未描述
 * @Author: danielmlc
 * @Date: 2020-01-09 22:10:28
 * @LastEditTime: 2020-02-20 16:16:35
 -->

  #### splitPanel

  > 标签： `<yl-split-panel></yl-split-panel>` 

  **功能：**  提供弹性布局面板

  **示例：**
:::demo
  ```html

   <template>
    <div style="height:300px;border:1px #ccc solid">
      <yl-splitPanel @resize="resize" :min-percent='20' :default-percent='30' split="vertical">
        <template slot="paneL">
          A
        </template>
        <template slot="paneR">
          <yl-splitPanel split="horizontal" :min-percent='20' :default-percent='50'>
            <template slot="paneL">
            B
            </template>
            <template slot="paneR">
              C
            </template>
          </yl-splitPanel>
        </template>
      </yl-splitPanel>
      </div>
   </template>
   <script>
   export default {
     data(){
       return {
       }
     },
     methods:{
       resize(percent) {
         console.log('拖动了...' + percent)
       }
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
  | min-percent| 最小分割百分比 | number | 10 |--|
  | default-percent| 默认分割百分比 | number|50 |--|

 **事件**

| 事件        | 说明           |参数   |
| ------------- |:-------------:| -----:|
| resize| 拖动区域时触发 |percent|

---

