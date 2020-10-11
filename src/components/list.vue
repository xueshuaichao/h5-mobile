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
import axios from '@/libs/axios';

export default {
    name: 'List',
    
    props: {
        url: {
            required: true,
            type: String,
            default: '',
        },

        params: {
            type: Object,
            default() {
                return {};
            }
        },

        method: {
            type: String,
            default: 'get',
        }
    },

    data(){
        return {
            loading: false,
            finished: false,
            pageNum: 1,
            pageSize: 10,
        }
    },

    methods: {
        async getList() {
            const res = await axios[this.method](`${this.url}?pageNum=${this.pageNum}&pageSize=${this.pageSize}`, this.params)
            console.log(res);
        },
    }
}
</script>>