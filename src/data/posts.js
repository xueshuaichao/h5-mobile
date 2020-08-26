
export const posts = [
    {
        title: '钢筋现场验收有哪些重点？',
        content: '请教请教请教钢筋现场验收有哪些重点？请教请教请教钢筋现场验收有哪些重点请教请教请, 教钢筋现场验收有哪些重点？教钢筋现场验收',
        comment_num: 124,
        thumb_num: 13,
        author: '张三'
    },
    {
        title: '怎么区分各种钢筋？',
        content: '怎么区分各种钢筋？',
        comment_num: 13,
        thumb_num: 12,
        author: '张三'
    },
    {
        title: '钢筋现场验收有哪些重点？',
        content: '进场所有钢筋必须具有质量证明书或试验报告单吗？谁有验收单模板呀？',
        comment_num: 124,
        thumb_num: 13,
        author: '李四'
    },
    {
        title: '钢筋进场验收的监理要点？',
        content: '像如何划分检验批，抽样的标准，检查时应注意的事项。 越详细越好',
        comment_num: 209,
        thumb_num: 13,
        author: '李四'
    }
].map((item, index) => ({ 
    id: '' + index,
    flag: index % 2 == 0,
    ...item,  
}));