<template>
    <div 
        class="page-course-list page-container"
        :class="{ 'has-bottom-tabbar': tabbar.show }"
    >
        <named-layout :name="config.templateId">
            <template
                v-for="item in layout"
                v-slot:[item.aid]
            >
                <block
                    v-for="block in item.blocks"
                    :key="block.blockInstanceId"
                    :name="block.blockId"
                    :setting="block.setting"
                    :router-params="routerParams"
                />
            </template>
        </named-layout>
        <van-tabbar
            v-model="tabbar.active"
            v-show="tabbar.show"
            active-color="#E85A3A"
            inactive-color="#A7ADBB"
        >
            <van-tabbar-item name="home" :to="{ name: 'home' }">
                <img
                    src="../assets/app/home-active.png"
                    class="nav-icon"
                    v-if="$route.name == 'home'"
                />
                <img src="../assets/app/home.png" class="nav-icon" v-else />

                <br />首页
            </van-tabbar-item>
            <van-tabbar-item name="course" :to="{ name: 'course' }">
                <img
                    src="../assets/app/course-active.png"
                    class="nav-icon"
                    v-if="$route.name == 'course'"
                />
                <img src="../assets/app/course.png" class="nav-icon" v-else />
                <br />课程中心
            </van-tabbar-item>
            <van-tabbar-item name="learning" :to="{ name: 'learning' }">
                <img
                    src="../assets/app/learning-active.png"
                    class="nav-icon"
                    v-if="$route.name == 'learning'"
                />
                <img src="../assets/app/learning.png" class="nav-icon" v-else />
                <br />学习计划
            </van-tabbar-item>
            <van-tabbar-item name="account" :to="{ name: 'account' }">
                <img
                    src="../assets/app/account-active.png"
                    class="nav-icon"
                    v-if="$route.name == 'account'"
                />
                <img src="../assets/app/account.png" class="nav-icon" v-else />
                <br />我的
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
import NamedLayout from '../layouts/index.vue';
import Block from '../blocks/index.vue';
import store from '../store/index';
import { mapState } from "vuex";

export default {
    components: {
        NamedLayout,
        Block,
    },
    data() {
        return {
            config: {},
            routerParams: {},
        };
    },
    computed: {
        ...mapState(["tabbar"]),
        layout() {
            try {
                const json = JSON.parse(this.config.layout);
                json.forEach((item) => {
                    // eslint-disable-next-line no-param-reassign
                    item.blocks = item.block_id.map((id, index) => {
                        const instanceId = item.block_instance_id
                            ? item.block_instance_id[index]
                            : id;
                        return {
                            blockId: id,
                            blockInstanceId: instanceId,
                            setting: this.settings[instanceId],
                        };
                    });
                });
                return json;
            } catch (e) {
                console.error(e);
                return [];
            }
        },
        settings() {
            const ret = {};
            this.config.setting.forEach((item) => {
                ret[item.bid] = JSON.parse(item.setting);
            });
            return ret;
        },
    },
    watch: {
        $route() {
            // this.routerParams = this.$routes.params;
            this.renderPage();
        },
    },
    created() {
        this.renderPage();
    },

    methods: {
        renderPage() {
            const { meta, params } = this.$route;
            this.config = store.getters.getConfigByPage(
                meta.moduleId,
                meta.name,
            );
            console.log(this.config, this.layout, params);
            this.routerParams = params;
        },
    },
};
</script>
