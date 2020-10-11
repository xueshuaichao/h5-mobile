<template>
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getList"
    >
        <slot/>
    </van-list>
</template>

<script>
export default {
    name: 'List',
    
    props: {
        url: {
            required: true,
            type: String,
            default: '',
        }
    },

    data(){
        return {
            loading: false,
            finished: false,
            params: {
                pageNum: 1,
                pageSize: 10,
            }
        }
    },

    methods: {
        getList() {
            
        },
    }
}
</script>>