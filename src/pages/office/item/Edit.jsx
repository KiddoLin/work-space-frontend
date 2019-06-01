import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Form, Spin, Input, InputNumber, Cascader, Select, Row, Col, Button, Checkbox } from 'antd'
import PicWall from '../../../components/Picture/PicWall.jsx'
import EditableTags from '../../../components/Tag/EditableTags.jsx'
import EditableDates from '../../../components/Tag/EditableDates.jsx'
import styles from './Edit.less'
import categories from '../../../config/categories'


const FormItem = Form.Item
const Option = Select.Option
const InputGroup = Input.Group
const CheckboxGroup = Checkbox.Group
//const TEL_REGEX = /(\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/

// const Edit = ({ office,   dispatch, loading, form: { getFieldDecorator, getFieldsValue, setFieldsValue, validateFields, validateFieldsAndScroll }}) => {
//   const { isNew, item, qiniu, spaces } = office
//   const {id, name, category, tags, picture,
//          space_id, space_name, price_per_day, num_of_unit
//         } = item;

//   //const picList = !picture || picture==='' ? [] : [{url: picture, uid:1}]
//   const picList = picture || []

//   const formItemLayout = {
//       labelCol: {
//         xs: { span: 24 },
//         sm: { span: 6 },
//       },
//       wrapperCol: {
//         xs: { span: 24 },
//         sm: { span: 14 },
//       },
//   }

//   //const facilityIds = facilities ? facilities.map((val) => val.id) : [];
//   let tagsRef;//https://stackoverflow.com/questions/37266411/react-stateless-component-this-refs-value
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     validateFieldsAndScroll((err, values) => {
//       if (!err) {
//           const newTags = tagsRef.getValue() || [];
//           values.tags = newTags;

//           if(id && !isNew){
//             dispatch({ type: 'office/update', payload: {id, ...values}});
//           }
//           else{
//             dispatch({ type: 'office/create', payload: values});
//           }
//       }
//     });
//   }
//   //console.log('LOADING:', loading);
//   return (
//     <div className="content-inner">
//       <Spin size="large" spinning={loading}>
//       <Form>
//         <FormItem {...formItemLayout} label="所属孵化器" hasFeedback>
//           {getFieldDecorator('space_id', { initialValue: space_id,
//             rules: [{
//               required: true, message: '必输项不能为空!',
//             }]
//           })(
//             <Select size="large" style={{ width: '100%' }} showSearch={true}
//               filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
//             >
//                 { spaces.map((val)=> <Option value={val.id}>{val.name}</Option>)}
//             </Select>
//           )}
//         </FormItem>
//         <FormItem {...formItemLayout} label="场地名称" hasFeedback>
//           {getFieldDecorator('name', { initialValue: name,
//             rules: [{
//               required: true, message: '必输项不能为空!',
//             }]
//           })(
//             <Input maxLength={25}/>
//           )}
//         </FormItem>
//         <FormItem {...formItemLayout} label="场地类型" hasFeedback>
//           {getFieldDecorator('category',  { initialValue: category,
//             rules: [{
//               required: true, message: '必输项不能为空!',
//             }]
//           })(
//             <Select size="large" style={{ width: '100%' }}>
//             { categories.office.map((val, i)=> <Option value={i}>{val}</Option>)}
//             </Select>
//           )}
//         </FormItem>
//         <FormItem {...formItemLayout} label="自定义标签" hasFeedback>
//            <EditableTags value={tags} ref={ el => tagsRef = el } maxLimit={10} maxCharLen={12}/>
//         </FormItem>
//         <FormItem {...formItemLayout} label="场地相册" hasFeedback>
//            {getFieldDecorator('picture',  { initialValue: picList, valuePropName: 'fileList',
//               rules: [{
//                  required: true, message: '必输项不能为空!',
//               }],
//               getValueFromEvent: (e) => {
//                   if (Array.isArray(e)) {
//                       return e;
//                   }
//                   //console.log('******>>', e);
//                   let resFiles = e.fileList.map((file)=>{
//                       if(file.status==='done'){
//                          return {uid: file.uid, url: qiniu.url + '/' + file.response.key};
//                       }
//                       return file;
//                   })
//                   return resFiles;
//               }
//            })(
//            <PicWall accept="image/jpg,image/jpeg,image/png,image/bmp" action="http://upload.qiniu.com" maximum={6} data={{token: qiniu.token}}/>
//            )}
//         </FormItem>

//         <FormItem {...formItemLayout} label="价格(按天)" hasFeedback>
//           {getFieldDecorator('price_per_day',  { initialValue: price_per_day,
//               rules: [{
//                     required: true, message: '必填项不能为空!',
//               }]
//           })(
//             <InputNumber style={{ width: '100%' }} max={99999} maxLength={5}/>
//           )}
//         </FormItem>
//         <FormItem {...formItemLayout} label="库存数量" hasFeedback>
//           {getFieldDecorator('num_of_unit',  { initialValue: num_of_unit,
//               rules: [{
//                   required: true, message: '必填项不能为空!',
//               },{
//                   pattern: /^\+?[1-9][0-9]*$/, message: '必须为大于1的数字'
//               }]
//           })(
//             <InputNumber style={{ width: '100%' }} min={1} max={9999} maxLength={4}/>
//           )}
//         </FormItem>

//         <FormItem wrapperCol={{ span: 12, offset: 6 }}>
//           <Button type="primary" icon="save" htmlType="submit" onClick={handleSubmit}>保存</Button>
//           <Button className={styles.optBtn} icon="left" onClick={e => history.go(-1)}>返回</Button>
//         </FormItem>
//       </Form>
//       </Spin>
//     </div>
//   )
// }

// Edit.propTypes = {
//   office: PropTypes.object,
//   form: PropTypes.object,
//   loading: PropTypes.bool,
// }

// export default connect(({ office, loading }) => ({ office, loading: loading.models.office }))(Form.create()(Edit))

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
}
const rentModelOptions = [
  {label: '可日租', value: 0},
  {label: '可月租', value: 1}
]
const excludedModelOptions = [
  {label: '周末', value: 'W'},
  {label: '法定假日', value: 'H'}
]
const getRentModelFromEnum = (val) =>{
  if(val===1) return [1];
  if(val===2) return [0,1];
  return [0];//default
}
const getRentModelToEnum = (vals) =>{
  if(!vals || vals.length===0) return -1;
  if(vals.length===1 && vals[0]===0) return 0;
  if(vals.length===1 && vals[0]===1) return 1;
  if(vals.indexOf(0)>=0 && vals.indexOf(1)>=0) return 2;
  return -1;
}
const setExcludedModel = (vals) => {
  const model = vals.excluded_model;
  vals.is_weekend_excluded = model.indexOf('W')<0 ? 0 : 1;
  vals.is_holiday_excluded = model.indexOf('H')<0 ? 0 : 1;

  delete vals['excluded_model'];
}
class Edit extends React.Component {
    constructor(props) {
      super(props);
      this.state = {rentModel: getRentModelFromEnum(this.props.office.item.rent_model)};
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleRentModelChanged = this.handleRentModelChanged.bind(this);

      console.log('constructor', this.props.office.item);
    }
    componentWillReceiveProps(nextProps){
      console.log('componentWillReceiveProps...');
      const item = this.props.office.item;
      const nextItem = nextProps.office.item;
      const {id, rent_model} = item;
      if(nextItem.id!==id || nextItem.rent_model!==rent_model){
         this.setState({rentModel: getRentModelFromEnum(nextItem.rent_model)});
      }

      //const id = this.props.office.item.id;
      //const nextId = nextProps.office.item.id;
      //const rentModel = this.props.item.rent_model;
      //const nextRentModel = nextProps.item.rent_model;
      // if(id!==nextId || rentModel!==nextRentModel){
      //     //console.log(id + ',' + rentModel);
      //     //console.log(nextId + ',' + nextRentModel);
      //    //this.setState({rentModel: getRentModelFromEnum(nextRentModel)});
      // }
      //if(this.props.office.item.id===nextProps.office)
      //this.setState({rentModel: getRentModelFromEnum(nextProps.office.item.rent_model)});
    }
    handleSubmit(e) {
      e.preventDefault();
      const {dispatch, form, office} = this.props;
      const {validateFieldsAndScroll} = form;
      const {isNew, item} = office;
      let id = item.id;
      validateFieldsAndScroll((err, values) => {
        if (!err) {
            const newTags = this.refs.tags.getValue() || [];
            values.tags = newTags;
            values.dates_excluded = this.refs.dates_excluded.getValue() || [];
            values.rent_model = getRentModelToEnum(values.rent_model);
            setExcludedModel(values);

            console.log(values);
            if(id && !isNew){
              dispatch({ type: 'office/update', payload: {id, ...values}});
            }
            else{
              dispatch({ type: 'office/create', payload: values});
            }
        }
      });
    }
    handleRentModelChanged(checkedValues){
       //console.log(checkedValues);
       this.setState({rentModel: checkedValues});
    }
    render(){
        const {loading, form, office} = this.props;
        const {getFieldDecorator, resetFields} = form;
        const {isNew, item, qiniu, spaces } = office;
        const {id, name, category, tags, picture, space_id, space_name, price_per_day, price_per_month,
              min_rent_days, min_rent_months,num_of_unit, is_weekend_excluded, is_holiday_excluded,
              dates_excluded } = item;
        const picList = picture || [];
        const {rentModel} = this.state;
        let excludedModel = [];
        if(is_weekend_excluded===1) excludedModel.push('W');
        if(is_holiday_excluded===1) excludedModel.push('H');
        console.log(rentModel);
        return (
          <div className="content-inner">
            <Spin size="large" spinning={loading}>
            <Form>
              <FormItem {...formItemLayout} label="所属孵化器" hasFeedback>
                {getFieldDecorator('space_id', { initialValue: space_id,
                  rules: [{
                    required: true, message: '必输项不能为空!',
                  }]
                })(
                  <Select size="large" style={{ width: '100%' }} showSearch={true}
                    filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                  >
                      { spaces.map((val)=> <Option value={val.id}>{val.name}</Option>)}
                  </Select>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="场地名称" hasFeedback>
                {getFieldDecorator('name', { initialValue: name,
                  rules: [{
                    required: true, message: '必输项不能为空!',
                  }]
                })(
                  <Input maxLength={25}/>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="场地类型" hasFeedback>
                {getFieldDecorator('category',  { initialValue: category,
                  rules: [{
                    required: true, message: '必输项不能为空!',
                  }]
                })(
                  <Select size="large" style={{ width: '100%' }}>
                  { categories.office.map((val, i)=> <Option value={i}>{val}</Option>)}
                  </Select>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="自定义标签" hasFeedback>
                 <EditableTags value={tags} ref="tags" maxLimit={10} maxCharLen={12}/>
              </FormItem>
              <FormItem {...formItemLayout} label="场地相册" hasFeedback>
                 {getFieldDecorator('picture',  { initialValue: picList, valuePropName: 'fileList',
                    rules: [{
                       required: true, message: '必输项不能为空!',
                    }],
                    getValueFromEvent: (e) => {
                        if (Array.isArray(e)) {
                            return e;
                        }
                        let resFiles = e.fileList.map((file)=>{
                            if(file.status==='done'){
                               return {uid: file.uid, url: qiniu.url + '/' + file.response.key};
                            }
                            return file;
                        })
                        return resFiles;
                    }
                 })(
                 <PicWall accept="image/jpg,image/jpeg,image/png,image/bmp" action="http://upload.qiniu.com" maximum={6} data={{token: qiniu.token}}/>
                 )}
              </FormItem>
              <FormItem {...formItemLayout} label="租赁模式" hasFeedback>
                {getFieldDecorator('rent_model',  { initialValue: rentModel,
                    rules: [{
                          required: true, message: '请选择租赁模式!',
                    }]
                })(
                  <CheckboxGroup options={rentModelOptions} onChange={this.handleRentModelChanged} />
                )}
              </FormItem>
              {rentModel.indexOf(0)>=0 && (
              <FormItem {...formItemLayout} label="价格(元/天)" hasFeedback>
                <InputGroup size="large">
                <Col span={12}>
                {getFieldDecorator('price_per_day',  { initialValue: price_per_day,
                    rules: [{
                          required: true, message: '请输入日租价格!',
                    }]
                })(
                  <InputNumber style={{ width: '100%' }} min={0} max={9999.99} precision={2} maxLength={7}/>
                )}
                </Col>
                <Col span={12}>
                {getFieldDecorator('min_rent_days',  { initialValue: min_rent_days || 1,
                    rules: []
                })(
                  <InputNumber style={{ width: '100%' }} min={1} max={9999} precision={0} formatter={value => `${value} 天起租`}/>
                )}
                </Col>
                </InputGroup>
              </FormItem>
              )}
              {rentModel.indexOf(1)>=0 && (
              <FormItem {...formItemLayout} label="价格(元/月)" hasFeedback>
                <InputGroup size="large">
                <Col span={12}>
                {getFieldDecorator('price_per_month',  { initialValue: price_per_month,
                    rules: [{
                          required: true, message: '请输入月租价格!',
                    }]
                })(
                  <InputNumber style={{ width: '100%' }} min={0} max={999999.99} precision={2} maxLength={7}/>
                )}
                </Col>
                <Col span={12}>
                {getFieldDecorator('min_rent_months',  { initialValue: min_rent_months || 1,
                    rules: []
                })(
                  <InputNumber style={{ width: '100%' }} min={1} max={9999} precision={0} formatter={value => `${value} 月起租`}/>
                )}
                </Col>
                </InputGroup>
              </FormItem>
              )}
              <FormItem {...formItemLayout} label="库存数量" hasFeedback>
                {getFieldDecorator('num_of_unit',  { initialValue: num_of_unit,
                    rules: [{
                        required: true, message: '必填项不能为空!',
                    }]
                })(
                  <InputNumber style={{ width: '100%' }} min={0} max={9999} precision={0} maxLength={4}/>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="节假日不可预定" hasFeedback>
                {getFieldDecorator('excluded_model',  { initialValue: excludedModel,
                    rules: []
                })(
                  <CheckboxGroup options={excludedModelOptions} />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="指定不可预定日期" hasFeedback>
                 <EditableDates value={dates_excluded} ref="dates_excluded" maxLimit={10}/>
              </FormItem>
              <FormItem wrapperCol={{ span: 12, offset: 6 }}>
                <Button type="primary" icon="save" htmlType="submit" onClick={this.handleSubmit}>保存</Button>
                <Button className={styles.optBtn} icon="left" onClick={e => history.go(-1)}>返回</Button>
              </FormItem>
            </Form>
            </Spin>
          </div>
        )
    }
}

Edit.propTypes = {
  office: PropTypes.object,
  form: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ office, loading }) => ({ office, loading: loading.models.office }))(Form.create()(Edit))
