<script>
import Vue from 'vue';

const idMap = {
    10: () => import('./system/seacher.vue'),
    11: () => import('./system/banner.vue'),
    12: () => import('./system/course.vue'),
    13: () => import('./system/task.vue'),
    14: () => import('./system/shortcut.vue')
};

export default {
    props: {
        name: {
            type: [String, Number],
            required: true,
        },
        routerParams: {
            type: Object,
            default() {
                return {};
            },
        },
        setting: {
            type: [Object, Array],
            default() {
                return {};
            },
        },
    },
    render(h) {
        const block = idMap[this.name];
        if (block) {
            return h(block, {
                on: this.$listeners,
                attrs: this.$attrs,
                scopedSlots: this.$scopedSlots,
                props: this.$props,
            });
        }
        if (Vue.config.productionTip) {
            return h('div', [`unrecongnized block "${this.name}"`]);
        }
        return null;
    },
};
</script>
