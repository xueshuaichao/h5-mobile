<template>
    <van-panel> 
        <h2>我的任务</h2>
        <van-tabs v-model="active" title-active-color="#E85A3A" title-inactive-color="#A7ADBB">
            <van-tab title="全部任务">
                <Task-List :userTaskStatus="0"></Task-List>
            </van-tab>
            <van-tab title="进行中">
                <Task-List :userTaskStatus="1"></Task-List>
            </van-tab>
            <van-tab title="已通过">
                <Task-List :userTaskStatus="3"></Task-List>
            </van-tab>
            <van-tab title="未通过">
                <Task-List :userTaskStatus="2"></Task-List> 
            </van-tab>
        </van-tabs>
    </van-panel>
</template>
<script>
import TaskList from "./taskList.vue"
export default {
    data() {
        return {
            active: 0
        }
    },
    components:{
        TaskList
    }
}  
</script>
<style>
.van-cell::after{
   border-bottom: none; 
}
.van-tab{
   color: #A7ADBB !important ;  
}
.van-tab--active{        
    color: #E85A3A !important;
}
.van-tabs__line{
    width: 48px !important;
    height: 4px;
    background: #E85A3A;
    border-radius: 2px;   
}
</style>