
<template>
     <yl-toolbar class="yl-timebar">
            <div class="btn">
                <el-radio-group v-model="selectiton" size="small" >
                    <el-radio-button label="day" v-if="btnItems.day" >本日</el-radio-button>
                    <el-radio-button label="week" v-if="btnItems.week" >本周</el-radio-button>
                    <el-radio-button label="month" v-if="btnItems.month" >本月</el-radio-button>
                    <el-radio-button label="quarter" v-if="btnItems.quarter" >本季</el-radio-button>
                    <el-radio-button label="year" v-if="btnItems.year" >本年</el-radio-button>
                    <el-radio-button label="all" v-if="btnItems.all" >开累</el-radio-button>
                </el-radio-group>
            </div>
            <div class="timepick">
                <i class="el-icon-caret-left" @click="_back"></i>
                <el-date-picker style="width:190px"
                    class="date"
                    v-model="beginDate"
                    :type="dataPickOptions.type"
                    :format="dataPickOptions.format"
                    :readonly="dataPickOptions.readonly"
                    :size="dataPickOptions.size"
                    placeholder="开始日期"
                    @change="_beginChange">
                 </el-date-picker> -
                 <el-date-picker style="width:190px"
                    class="date"
                    v-model="endDate"
                    :type="dataPickOptions.type"
                    :format="dataPickOptions.format"
                    :readonly="dataPickOptions.readonly"
                    :size="dataPickOptions.size"
                    placeholder="结束日期"
                    @change="_endChange"
                    >
                 </el-date-picker>
                  <i class="el-icon-caret-right" @click="_forward"></i>
            </div>
     </yl-toolbar>
</template>

<script type="text/babel">
import dayjs from 'dayjs';
export default {
    name:"ylTimebar",
     data(){
        return {
            beginDate:'',
            endDate:'',
            selectiton:''
        }
    },
    props:{
        btnItems:{
            type:Object,
            default:function(){
                return  {
                    day:true,
                    week:true,
                    month:true,
                    quarter:true,
                    year:true,
                    all:true
                }
            }
        },
        currentValue:{
            type:String,
            default:'month'
        },
        dataPickOptions:{
            type:Object,
            default:function(){
                return {
                    format:'yyyy-MM-dd',
                    size:'small',
                    readonly:false,
                    clearable:false,
                    type:'date',
                }
            }
        },
        format:{
            type:String,
            default:'YYYY-MM-DD HH:mm:ss'
        },
        needSetDate:{
            type:Boolean,
            default:false
        }
    },
    methods:{
        _format(){
              this.beginDate=dayjs(this.beginDate).format(this.format);
                this.endDate=dayjs(this.endDate).format(this.format);
                this.$emit('change',{beginDate:this.beginDate,endDate:this.endDate})
        },
        _beginChange(node){
            node=dayjs(node).format(this.format)
            if(node>this.endDate){
                this.$message.warning('起始时间不能大于结束时间！');
                this.beginDate=this.endDate
                return
            }else{
              this._format()
            }
        },
        _endChange(node){
            node=dayjs(node).format(this.format)
             if(this.beginDate>node){
                this.$message.warning('结束时间不能小于开始时间！');
                this.endDate=this.beginDate
                return
            }else{
                this._format();
            }
        },
        _forward(){
            //前进
            if(this.selectiton==='day'){
                this.endDate=dayjs(this.beginDate).add(2, 'd');
                this.beginDate=dayjs(this.beginDate).add(1, 'd');
            }else if(this.selectiton==='week'){
                this.endDate=dayjs(this.beginDate).add(2, 'w');
                this.beginDate=dayjs(this.beginDate).add(1, 'w');
            }else if(this.selectiton==='month'){
                this.endDate=dayjs(this.beginDate).add(2, 'M');
                this.beginDate=dayjs(this.beginDate).add(1, 'M');
            }else if(this.selectiton==='quarter'){
                this.endDate=dayjs(this.beginDate).add(6, 'M');
                this.beginDate=dayjs(this.beginDate).add(3, 'M');
            }else if(this.selectiton==='year'){
                this.endDate=dayjs(this.beginDate).add(2, 'y');
                this.beginDate=dayjs(this.beginDate).add(1, 'y');
            }
            this._format();
        },
        _back(){
            //后退
            if(this.selectiton==='day'){
                this.beginDate=dayjs(this.beginDate).add(-1, 'd');
                this.endDate=dayjs(this.beginDate).add(1, 'd');
            }
            else if(this.selectiton==='week'){
                this.beginDate=dayjs(this.beginDate).add(-1, 'w');
                this.endDate=dayjs(this.beginDate).add(1, 'w');
            }else if(this.selectiton==='month'){
                this.beginDate=dayjs(this.beginDate).add(-1, 'M');
                this.endDate=dayjs(this.beginDate).add(1, 'M');
            }else if(this.selectiton==='quarter'){
                this.endDate=dayjs(this.beginDate).add(0, 'M');
                this.beginDate=dayjs(this.beginDate).add(-3, 'M');
            }else if(this.selectiton==='year'){
                this.beginDate=dayjs(this.beginDate).add(-1, 'y');
                this.endDate=dayjs(this.beginDate).add(1, 'y');
            }
            this._format();
        },
        _getDate(type,oldVal){
            this._initDate(type,oldVal);
            if(this.needSetDate){
                 this.$emit('change',{beginDate:this.beginDate,endDate:this.endDate})
            }
            else if(oldVal){
                this.$emit('change',{beginDate:this.beginDate,endDate:this.endDate})
            }
        },
        _initDate(type){
            if(type==='day'){
                this.selectiton='day';
                this.beginDate = dayjs().format('YYYY-MM-DD');
            }else if(type==='week'){
                this.selectiton='week';
                let weekOfday = 1-dayjs().day();
                this.beginDate= dayjs().add(weekOfday,'d').format('YYYY-MM-DD');
            }else if(type==='month'){
                 this.selectiton='month';
                 this.beginDate= dayjs().format('YYYY-MM')+'-01';
            }else if(type==='quarter'){
                 const quarter = (dayjs().month()+1)/4
                 this.selectiton='quarter';
                 if(quarter==0){
                     this.beginDate= dayjs().format('YYYY')+'-01-01';
                 }else if(quarter==1){
                     this.beginDate= dayjs().format('YYYY')+'-04-01';
                 }else if(quarter==2){
                     this.beginDate= dayjs().format('YYYY')+'-07-01';
                 }else if(quarter==3){
                     this.beginDate= dayjs().format('YYYY')+'-10-01';
                 }
            }else if(type==='year'){
                  this.selectiton='year';
                  this.beginDate= dayjs().format('YYYY')+'-01-01';
            }
            else if(type==='all'){
                 this.selectiton='all';
                  this.beginDate='1900-01-01';
            }
            this.beginDate=dayjs(this.beginDate).format(this.format);
            this.endDate=dayjs().format(this.format);
        },
        //对外方法
        getDate(){
            this.beginDate=dayjs(this.beginDate).format(this.format);
            this.endDate=dayjs(this.endDate).format(this.format);
            return {beginDate:this.beginDate,endDate:this.endDate}
        },
        setDate(beginDate,endDate){
            this.beginDate=dayjs(beginDate).format(this.format);
            this.endDate=dayjs(endDate).format(this.format);
           // this.$emit('change',{beginDate:this.beginDate,endDate:this.endDate})
        },
    },
    mounted(){
        if(!this.needSetDate){
            this.selectiton=this.currentValue;  
        }
    },
    watch:{
        selectiton:function(n,o){
            this._getDate(n,o)
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="postcss" scoped>
@import  '../../styl/var.pcss';
.yl-timebar {
    box-sizing:border-box;
    &> .timepick{
        padding-left:150px; 
        &> i{
            color:$color-text-regular;
            &:hover{
                cursor:pointer;
            } 
        } 
        &> .date{
            width:150px;
        }       
    }
}
</style>


