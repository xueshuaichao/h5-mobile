<template>
    <div class="parent-element-center">
        <div class="svg-wrap">
            <svg :width="diameterShow" :height="diameterShow" :viewbox="viewbox">
                <!--第一个细细的圆环-装饰作用-->
                <circle 
                    :cx="size" 
                    :cy="size" 
                    :r="size-1" 
                    stroke-width="2" 
                    :stroke-dasharray="strokeDasharrayLine"
                    :transform="transform" 
                    stroke-linecap="round" 
                    stroke="#FEE7DF"
                    fill="none"
                />
                <!--第二个粗圆环 作为进度的底部颜色-->
                <circle 
                    :cx="size" 
                    :cy="size" 
                    :r="raduisActual" 
                    :stroke-width="strokeWidth" 
                    :stroke-dasharray="strokeDasharrayRing"
                    :transform="transform" 
                    stroke-linecap="round" 
                    stroke="#FFECE8"
                    fill="none"
                />
                <!--第三个圆环： 实际进度-->
                <circle
                    v-if="rate" 
                    :cx="size" 
                    :cy="size" 
                    :r="raduisActual" 
                    :stroke-width="strokeWidth" 
                    :stroke="strokeColor" 
                    :transform="transform" 
                    :stroke-dasharray="strokeDasharray" 
                    stroke-linecap="round" 
                    fill="none"
                />
            </svg>
        </div>
        <!--刻度单独用svg,目的是专门的旋转角度-->
        <svg :width="diameterShow" :height="diameterShow" :viewbox="viewbox" class="tick-path">
            <template v-for="item in 40">
                <line
                    :id="'line-'+item"
                    :key="item"
                    :x1="setTicks(item, 'x1')" 
                    :y1="setTicks(item, 'y1')" 
                    :x2="setTicks(item, 'x2')" 
                    :y2="setTicks(item, 'y2')"
                    v-bind:style="{stroke:'#A7ADBB',strokeWidth: item == curline ?4:2}"
                />
            </template>
        </svg>
        <slot name="txt"></slot>
    </div>
</template>

<script>
export default {
    props: {
        // 圆环的宽度
        strokeWidth: {
            default: 12,
            type: Number,
        },
        // 圆环的颜色
        strokeColor: {
            type: String,
            default: '#F67B53'
        },
        // 圆环显示的百分比 这边是小数
        rate: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            size: 100, // 圆环半径
            curline: 0,
        }
    },
    watch: {
        rate(val) {
            this.curline = 40-Math.floor(val * 40);
            console.log(this.curline, val)
        }
    },
    computed: {
        raduisActual() {
            return this.size - this.strokeWidth - 3;
        },
        diameterShow() {
            return 2 * this.size;
        },
        viewbox() {
            return `0 0 ${this.diameterShow} ${this.diameterShow}`;
        },
        strokeDasharrayLine() {
            const perimeter = Math.PI * 2 * (this.size - 1);
            const showLength = 0.65 * perimeter - 3;
            return `${showLength} 1000`;
        },
        strokeDasharrayRing() {
            const perimeter = Math.PI * 2 * this.raduisActual;
            const showLength = 0.65 * perimeter - 3;
            return `${showLength} 1000`;
        },
        strokeDasharray() {
            const perimeter = Math.PI * 2 * this.raduisActual;
            const showLength = this.rate * 0.65 * perimeter - 3;
            return `${showLength} 1000`;
        },
        transform() {
            return `matrix(0,-1,1,0,0,${this.diameterShow})`;
        },
    },
    methods: {
        setTicks(i, key) {
            //  以60个刻度线段
            let angle = 1 - i * (6/180*Math.PI);
            let temp_angle = Math.PI+angle;
            let width = 200;
            let height = 200;
            let obj = {
                x1: 0,
                x2: 0,
                y1: 0,
                y2: 0,
            };

            obj.x1 = width / 2 + 74 * Math.cos(angle),
            obj.y1 = height / 2 + 74 * Math.sin(angle);

            obj.x2= obj.x1+(i === this.curline ? 6:4)*Math.cos(temp_angle);
            obj.y2= obj.y1+(i === this.curline ? 6:4)*Math.sin(temp_angle);

            return obj[key];

        }
    }
}
</script>

<style scoped lang="less">
.parent-element-center {
    position: relative;
    width: 400px;
    height: 400px;
    display: inline-block;
    .svg-wrap {
        transform: rotate(-116deg);
        width: 100%;
        height: 100%;
    }
    .tick-path {
        position: absolute;
        left: 0;
        top: 0;
        transform: rotate(-24deg);
    }
    @media screen and (min-width: 400px) {
        .tick-path {
            top: 28px;
        }
    }
}
</style>