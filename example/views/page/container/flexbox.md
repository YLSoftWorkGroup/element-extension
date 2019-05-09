
#### flexbox

> 标签： `<yl-flexbox></yl-flexbox>` 


**功能：** 主要用于两栏弹性布局，嵌套使用可以处理复杂布局

**示例：**

:::demo  

```html

<template>
    <yl-flexbox style="height:300px" needFlod fixedWidth="180px">
    <div slot="fixed">
        我是固定区域
    </div>
    <div slot="flex">
        我是弹性区域
    </div>
    </yl-flexbox>

</template>
<script>
export default {
    data(){
        return {
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
  | fixedWidth| 固定区域宽度 | String|"50px" |--|
  | vertical| 是否垂直方向 | Boolean|false |false/true|
  | needFlod| 是否需要折叠 | Boolean|false |false/true|
  | isFlod| 折叠状态 | Boolean|false |false/true|
  | isReverse| 置换方向 | Boolean|false |false/true|

  **slot**
   
  | 名称        | 说明             |
  | ------------- |:-------------:|
  | fixed| flexbox固定区域 | 
  | flex| flexbox弹性区域 | 

---


