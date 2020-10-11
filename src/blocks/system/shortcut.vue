<template>
    <div class="shortcut-menu">
        <van-grid :border="false" clickable >
            <van-grid-item v-for="item in menuList" :key="item.icon" :text="item.text" :url="item.url">
                <img :src="item.icon" alt="" slot="icon" width="40">
            </van-grid-item>
        </van-grid>
    </div>
    
</template>

<script>
export default {
    name: 'Shortcut',
    data() {
        return {
            menuList: [
                {
                    text: '我的任务',
                    icon: require('../../assets/app/menu-1.png'),
                    url: '/mytask',
                },
                {
                    text: '我的选学',
                    icon: require('../../assets/app/menu-2.png'),
                    url: '/mychosecourse',
                },
                {
                    text: '题库练习',
                    icon: require('../../assets/app/menu-3.png'),
                    url: '/paperlist',
                },
                {
                    text: '个人评估',
                    icon: require('../../assets/app/menu-4.png'),
                    url: '/assessment',
                }
            ],
        }
    }
}    
</script>

<style lang="less">
.shortcut-menu {
    .van-grid-item__text {
        color: #272F55;
    }
}

</style>

