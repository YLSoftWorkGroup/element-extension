<!--
 * @Description: 未描述
 * @Author: danielmlc
 * @Date: 2019-09-11 09:26:19
 * @LastEditTime: 2020-02-17 10:54:02
 -->
<script>
    export default {
      data() {
        return {
          inputNumValue:0.001,
          tableData: [{
            date: '2016-05-02',
            name: '王小虎2',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎3',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎4',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎5',
            address: '上海市普陀区金沙江路 1516 弄'
          }],
          tabPosition: 'left',
          options: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }],
          value: '',
          dialogVisible: false,
          fullscreenLoading: false,
          url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          srcList: [
            'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
            'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
          ],
          drawer: false,
          innerDrawer: false,
          input1: '',
          input2: '',
          input3: '',
          input4: '',
          ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
        }
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              alert('submit!');
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        drawerDandleClose(done) {
          this.$confirm('还有未保存的工作哦确定关闭吗？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
        openFullScreen() {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
          });
          setTimeout(() => {
            loading.close();
          }, 2000);
        },
        openMsgB() {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
      }
    }
</script>
<style>
  .doc-block{
    height:100px;width:80%;margin:30px;padding:10px;text-align:center;border-radius:10px;
  }
  .doc-block-mid{
    height:50px;width:80%;margin-left:30px;padding:10px;text-align:center;;border-radius:10px;
  }
  .column-style{
    background-color:#ddd;
  }
</style>
组件样式重置

[[toc]]


### button

:::tip
1. 调整了button的整体大小。
:::

示例

:::demo
```html

常规样式
<div  style="margin: 20px 0">
  <el-button>默认按钮</el-button>
  <el-button type="primary">主要按钮</el-button>
  <el-button type="success">成功按钮</el-button>
  <el-button type="info">信息按钮</el-button>
  <el-button type="warning">警告按钮</el-button>
  <el-button type="danger">危险按钮</el-button>
</div>


附加样式

<div style="margin: 20px 0">
  <el-button icon="el-icon-edit" type="primary">主要按钮</el-button>
  <el-button type="primary" plain >朴素按钮</el-button>
  <el-button type="text">文字按钮</el-button>
  <el-button type="primary" round >圆角按钮</el-button>
  <el-button type="warning" circle icon="el-icon-edit"></el-button>
</div>


禁用状态

<div style="margin: 20px 0">
  <el-button icon="el-icon-edit" type="primary" disabled>主要按钮</el-button>
  <el-button type="primary" plain disabled>朴素按钮</el-button>
  <el-button type="text" disabled>文字按钮</el-button>
  <el-button type="primary" round disabled>圆角按钮</el-button>
  <el-button type="warning" circle icon="el-icon-edit" disabled></el-button>
</div>


大小型号

<el-row>
  <el-button type="primary">默认按钮</el-button>
  <el-button type="primary" size="medium">中等按钮</el-button>
  <el-button type="primary" size="small">小型按钮</el-button>
  <el-button type="primary" size="mini">超小按钮</el-button>
</el-row>
<el-row>
  <el-button round>默认按钮</el-button>
  <el-button type="primary" size="medium" round>中等按钮</el-button>
  <el-button type="primary" size="small" round>小型按钮</el-button>
  <el-button type="primary" size="mini" round>超小按钮</el-button>
</el-row>
<el-row>
  <el-button circle icon="el-icon-edit" ></el-button>
  <el-button size="medium" circle icon="el-icon-edit" ></el-button>
  <el-button size="small" circle icon="el-icon-edit" ></el-button>
  <el-button size="mini" circle icon="el-icon-edit" ></el-button>
</el-row>
<el-row>
  <el-button type="text">默认按钮</el-button>
  <el-button size="medium" type="text">中等按钮</el-button>
  <el-button size="small" type="text">小型按钮</el-button>
  <el-button size="mini" type="text">超小按钮</el-button>
</el-row>


按钮组    
<div style="margin: 20px 0">
<el-button-group>
  <el-button type="primary" icon="el-icon-arrow-left">上一页</el-button>
  <el-button type="primary">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
</el-button-group>
<br/>
<p>微小型</p>
<el-button-group>
  <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
  <el-button type="info" size="mini" icon="el-icon-share">分享</el-button>
  <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
</el-button-group>
</div>


```
:::



---


### input

:::tip
1. 调整尺寸。
:::

示例

 :::demo
```html
<el-row :gutter="20">
  <el-col :span="6"> 
    <el-input
      placeholder="请输入内容"
      suffix-icon="el-icon-date"
      v-model="input1">
    </el-input>
  </el-col>
  <el-col :span="6"> 
    <el-input
      size="medium"
      placeholder="请输入内容"
      suffix-icon="el-icon-date"
      v-model="input2">
    </el-input>
  </el-col>
  <el-col :span="6"> 
    <el-input
      size="small"
      placeholder="请输入内容"
      suffix-icon="el-icon-date"
      v-model="input3">
    </el-input>
  </el-col>
  <el-col :span="6"> 
    <el-input
      size="mini"
      placeholder="请输入内容"
      suffix-icon="el-icon-date"
      v-model="input4">
    </el-input>
  </el-col>
</el-row>

<script>
export default {
  data() {
    return {
      input1: '',
      input2: '',
      input3: '',
      input4: ''
    }
  }
}
</script>

```
::: 

---

### form表单


:::tip
1. 调整样式
:::

示例

 :::demo
```html

<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small" status-icon style="width:500px;">
  <el-form-item label="活动名称" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="活动区域" prop="region">
    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="活动时间" required>
    <el-col :span="11">
      <el-form-item prop="date1">
        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
      </el-form-item>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-form-item prop="date2">
        <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
      </el-form-item>
    </el-col>
  </el-form-item>
  <el-form-item label="活动性质" prop="type">
    <el-checkbox-group v-model="ruleForm.type">
      <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
      <el-checkbox label="地推活动" name="type"></el-checkbox>
      <el-checkbox label="线下主题活动" name="type"></el-checkbox>
      <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
  <el-form-item label="特殊资源" prop="resource">
    <el-radio-group v-model="ruleForm.resource">
      <el-radio label="线上品牌商赞助"></el-radio>
      <el-radio label="线下场地免费"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="活动形式" prop="desc">
    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
<script>
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

```
::: 

---

### dialog

:::tip
1. 调整了dialog的padding边距。
2. 调整了dialog的header文字大小。
3. 添加了header背景色。
:::

示例

 :::demo
```html

<el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="75%"
  :before-close="handleClose"
  >
  <div style="height:60vh;">
     <span>这是一段信息</span>
     
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button size="small" @click="dialogVisible = false">取 消</el-button>
    <el-button size="small" type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>

<script>
  export default {
    data() {
      return {
        dialogVisible: false
      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
  };
</script>

```
::: 

---



### messageBox

:::tip

1. 调整了messageBox的padding边距。
2. messageBox
:::

示例

 :::demo
```html

 <el-button type="text" @click="openMsgB">点击打开 Message Box</el-button>

<script>
  export default {
    methods: {
      openMsgB() {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    }
  }
</script>

```
::: 

---



### select

:::tip
2. 调整了select hover的背景色。
:::

:::demo 
```html
<template>
  <el-select v-model="value" clearable placeholder="请选择" size="small">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      }
    }
  }
</script>
```
:::

### table

:::tip
1. 更新2.13.0版本的table组件
:::

:::demo 
```html
<template>
    <el-table
      size="small"
      border
      :data="tableData"
      style="width: 100%">   
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="姓名">
              <span>{{ props.row.name }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column> 
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
  </template>

  <script>
    export default {
      data() {
        return {
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎1',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎2',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎3',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
        }
      }
    }
  </script>
```
:::






### tabs

:::tip
1. 给el-tabs__content类添加了flex:1属性。
使用时如果要让内容区域完全填充，给tabs最外层给`display:flex`属性,如果是上下:`flex-direction：column` 如果是左右:`flex-direction：row`
:::

:::demo 
```html
<template>
  <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
    <el-radio-button label="top">top</el-radio-button>
    <el-radio-button label="right">right</el-radio-button>
    <el-radio-button label="bottom">bottom</el-radio-button>
    <el-radio-button label="left">left</el-radio-button>
  </el-radio-group>
   <div style="height:300px;">
    <el-tabs :tab-position="tabPosition" style="height:100%;display:flex;flex-direction:column">
      <el-tab-pane label="用户管理">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tabPosition: 'left'
      };
    }
  };
</script>

```
:::





### loading

:::tip
1. 改变loding遮罩层的透明度
:::

:::demo 
```html
<template>
  <el-button
    type="primary"
    @click="openFullScreen"
    v-loading.fullscreen.lock="fullscreenLoading">
    指令方式
  </el-button>
  <el-button
    type="primary"
    @click="openFullScreen">
    服务方式
  </el-button>
</template>

<script>
export default {
    data() {
      return {
        fullscreenLoading: false
      }
    },
    methods: {
      openFullScreen() {
        this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
        }, 2000);
      },
      openFullScreen() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          loading.close();
        }, 2000);
      }
    }
  }
</script>

```
:::


### input-number

:::tip
1. 更新样式
:::

:::demo 
```html
<template>
 <el-input-number v-model="inputNumValue" :precision="2" :step="0.1" :max="10"></el-input-number>
</template>

<script>
  export default {
     data() {
      return {
        inputNumValue: 0.001
      }
    }
  }
</script>

```
:::



### drawer

:::tip
1. 新增了2.13.0版本的抽屉组件
:::

:::demo 
```html
<template>
<el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
  点我打开
</el-button>

<el-drawer
  title="我是外面的 Drawer"
  :visible.sync="drawer"
  size="50%">
  <div>
    <el-button @click="innerDrawer = true">打开里面的!</el-button>
    <el-drawer
      :append-to-body="true"
      :with-header="false"
      :before-close="drawerDandleClose"
      :visible.sync="innerDrawer">
      <p>_(:зゝ∠)_</p>
    </el-drawer>
  </div>
</el-drawer>
</template>

<script>
  export default {
     data() {
      return {
        drawer: false,
        innerDrawer: false,
      };
    },
    methods: {
      drawerDandleClose(done) {
        this.$confirm('还有未保存的工作哦确定关闭吗？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
  }
</script>

```
:::
