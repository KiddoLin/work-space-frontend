//广东_广州
const GD_GZ = {
  label: '广州',
  value: '广州',
  children: [
    {label: '荔湾区', value: '荔湾区'},
    {label: '越秀区', value: '越秀区'},
    {label: '海珠区', value: '海珠区'},
    {label: '天河区', value: '天河区'},
    {label: '白云区', value: '白云区'},
    {label: '黄埔区', value: '黄埔区'},
    {label: '番禺区', value: '番禺区'},
    {label: '花都区', value: '花都区'},
    {label: '南沙区', value: '南沙区'},
    {label: '萝岗区', value: '萝岗区'},
    {label: '增城', value: '增城'},
    {label: '从化', value: '从化'},
    {label: '其它区', value: '其它区'}
  ]
}
//广东_深圳
const GD_SZ = {
  label: '深圳',
  value: '深圳',
  children: [
    {label: '罗湖区', value: '罗湖区'},
    {label: '福田区', value: '福田区'},
    {label: '南山区', value: '南山区'},
    {label: '宝安区', value: '宝安区'},
    {label: '龙岗区', value: '龙岗区'},
    {label: '盐田区', value: '盐田区'},
    {label: '光明新区', value: '光明新区'},
    {label: '坪山新区', value: '坪山新区'},
    {label: '大鹏新区', value: '大鹏新区'},
    {label: '龙华新区', value: '龙华新区'},
    {label: '其它区', value: '其它区'}
  ]
}
//香港_香港
const HK_HK = {
  label: '香港',
  value: '香港',
  children: [
    {label: '香港岛', value: '香港岛'},
    {label: '九龙', value: '九龙'},
    {label: '新界', value: '新界'}
  ]
}

const CityDict = [{
  label: '广东省',
  value: '广东省',
  children: [GD_GZ, GD_SZ]
},{
  label: '香港特别行政区',
  value: '香港特别行政区',
  children: [HK_HK]
},{
  label: '海外',
  value: '海外',
  children: [
    {label: '美国', value: '美国'},
    {label: '新加坡', value: '新加坡'},
    {label: '马来西亚', value: '马来西亚'},
    {label: '印度尼西亚', value: '印度尼西亚'},
    {label: '印度', value: '印度'},
    {label: '泰国', value: '泰国'},
    {label: '越南', value: '越南'},
    {label: '韩国', value: '韩国'},
    {label: '澳洲', value: '澳洲'},
    {label: '新西兰', value: '新西兰'}
  ]
}]

const genCityDictForFilter = function(){
  return CityDict.map((province)=>{
    let p = {label: province.label, value: province.value};
    p.children = province.children.map((city)=> {
        let c = {label: city.label, value: city.value};
        if(city.children){
          c.children = [{label: '全部', value: '*'}].concat(city.children);
        }
        return c;
    });
    p.children = [{label: '全部', value: '*'}].concat(p.children);
    return p;
  })
}

const CityFilterDict = genCityDictForFilter();

module.exports = {
  CityDict,
  CityFilterDict
}
