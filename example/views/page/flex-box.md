
#### FlexBox 弹性面板

> 标签： `<yl-flex-box></yl-flex-box>` 


**功能：** 主要用于两栏弹性布局，固定区域可折叠,也可以嵌套使用可以处理复杂布局

**示例：**

水平布局

:::demo  

```html

<template>
    <yl-flex-box 
        style="height:300px" 
        needFlod 
        fixedWidth="180px">
        <div slot="fixed" class="g-container-padding">
            我是固定区域
        </div>
        <div slot="flex" class="g-container-padding">
            我是弹性区域
        </div>
    </yl-flex-box>
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

垂直布局

:::demo  

```html

<template>
    <yl-flex-box 
        style="height:300px" 
        needFlod 
        vertical
        fixedWidth="80px">
        <div slot="fixed">
            我是固定区域
        </div>
        <div slot="flex">
            我是弹性区域
        </div>
    </yl-flex-box>
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

嵌套弹性布局

:::demo  

```html

<template>
    <yl-flex-box 
        style="height:300px" 
        vertical
        fixedWidth="80px">
        <div slot="fixed">
            区域一
        </div>
        <div slot="flex">
             <yl-flex-box 
                fixedWidth="180px">
                <div slot="fixed">
                    区域二
                </div>
                <div slot="flex">
                    <yl-flex-box 
                        vertical
                        fixedWidth="80px">
                        <div slot="fixed">
                            区域三
                        </div>
                        <div slot="flex">
                            区域四
                        </div>
                    </yl-flex-box>  
                </div>
             </yl-flex-box>   
        </div>
    </yl-flex-box>
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

左侧树面板弹性区域数据展示区



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


