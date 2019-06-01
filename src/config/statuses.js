module.exports = {
   //0-待支付 1-待使用 10-使用中 2-已使用 3-已取消
  order: [
    {text: '待付款', val: 0},//0
    {text: '待使用', val: 1},//1
    {text: '使用中', val: 10},//10
    {text: '已使用', val: 2},//2
    {text: '已退款', val: 3},//3
    {text: '已取消', val: 5},
    {text: '交易关闭', val:11},
  ],
}
