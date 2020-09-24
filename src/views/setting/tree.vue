// <script>
// export default {
//     name: 'Tree',
    
//     props: {
//         items: {
//             type: Array,
//             default() {
//                 return [];
//             },
//         }
//     },

//     data() {
//         return {
//             isOpen: false,
//             currentItems: [],
//         }
//     },

//     render(){
//         return (
//             <div class="tree">
//                 {
//                     this.items.map((v, i) => (<div class="tree-item" on-click= { this.handleClickItem.bind(this, v, i) }> { v.text } </div>))
//                 }
//                 {
//                     this.isOpen ? <Tree items = {this.currentItems} /> : ''
//                 }
//             </div>
//         )
//     },

//     methods: {
//         handleClickItem(v, i) {
//             const data = this.items[i];

//             if (data.children) {
//                 this.isOpen = true;
//                 this.currentItems = data.children;
//             }
//         },
//     }
// }
// </script>

// <style lang="less" scoped>
// .tree {
//     text-align: center;
//     .tree-item {
//         text-align: left;
//     }
// }
// </style>
<template>
<div>
<van-picker show-toolbar title="标题" :columns="columns" />
</div>

</template>
<script>
export default {
  data() {
    return {
      columns: [
        {
          text: '浙江',
          children: [
            {
              text: '杭州',
              children: [{ text: '西湖区' }, { text: '余杭区' , children: [{ text: '11111' }]}],
            },
            {
              text: '温州',
              children: [{ text: '鹿城区' }, { text: '瓯海区' }],
            },
          ],
        },
        {
          text: '福建',
          children: [
            {
              text: '福州',
              children: [{ text: '鼓楼区' }, { text: '台江区' }],
            },
            {
              text: '厦门',
              children: [{ text: '思明区' }, { text: '海沧区' }],
            },
          ],
        },
      ],
    };
  },
};
</script>
