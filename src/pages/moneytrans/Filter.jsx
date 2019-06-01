import React from 'react'
import PropTypes from 'prop-types'
//import moment from 'moment'
//import { FilterItem } from '../../components'
import { Form, Row, Col, Input, Select, DatePicker } from 'antd'
import moment from 'moment'
import categories from '../../config/categories'

const FormItem = Form.Item
const Search = Input.Search
const Option = Select.Option
const RangePicker = DatePicker.RangePicker

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  }
}

// const TwoColProps = {
//   ...ColProps,
//   xl: 96,
// }

const Filter = ({
  onFilterChange,
  filter,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {

  const handleSubmit = () => {
    let fields = getFieldsValue()
    //console.log(fields);
    let range = fields['time_range'];
    if(range.length===2){
      fields['start'] = range[0].format('YYYY-MM-DD');
      fields['end'] = range[1].format('YYYY-MM-DD');
    }
    delete fields['time_range'];
    onFilterChange(fields)
  }

  const handleChange = (key, value) => {
    let fields = getFieldsValue()
    fields[key] = value
    //console.log(fields);
    let range = fields['time_range'];
    if(range.length===2){
      fields['start'] = range[0].format('YYYY-MM-DD');
      fields['end'] = range[1].format('YYYY-MM-DD');
    }
    delete fields['time_range'];
    onFilterChange(fields)
  }

  const handleRangeChange = (values, valueStrs) => {
    let fields = getFieldsValue()
    fields['start'] = valueStrs[0];
    fields['end'] = valueStrs[1];
    delete fields['time_range'];
    //console.log(fields);
    onFilterChange(fields)
  }

  const { type, category, start, end, space_name } = filter
  //console.log(filter);

  let time_range = start && end && start!=='' && end!=='' ? [moment(start), moment(end)] : [];

  // console.log('2222222222S');
  // console.log(filter);
  // console.log('2222222222E');
  return (
    <Row gutter={16}>
      <Col {...ColProps} xl={{ span: 6 }} md={{ span: 6 }} sm={{ span: 12 }}>
        {getFieldDecorator('type', { initialValue: type })(
          <Select size="large" style={{ width: '100%' }} placeholder="交易类型"
            onChange={handleChange.bind(null, 'type')}>
              <Option value={''}>全部</Option>
              { categories.transType.map((val, i)=> <Option value={i+''}>{val}</Option>) }
          </Select>
        )}
      </Col>
      <Col {...ColProps} xl={{ span: 6 }} md={{ span: 6 }}>
        {getFieldDecorator('category', { initialValue: category })(
          <Select size="large" style={{ width: '100%' }} placeholder="场地类型"
            onChange={handleChange.bind(null, 'category')}>
            <Option value={''}>全部</Option>
            { categories.office.map((val, i)=> <Option value={'1-' + i}>{val}</Option>)}
            { categories.meetingroom.map((val, i)=> <Option value={'2-' + i}>{val}</Option>)}
          </Select>
        )}
      </Col>
      <Col {...ColProps} xl={{ span: 6 }} md={{ span: 6 }}>
        {getFieldDecorator('time_range', { initialValue: time_range})(
            <RangePicker size="large" style={{ width: '100%' }} format="YYYY-MM-DD" onChange={handleRangeChange}/>
        )}
      </Col>
      <Col {...ColProps} xl={{ span: 6 }} md={{ span: 6 }}>
        {getFieldDecorator('space_name', { initialValue: space_name })(
          <Search placeholder="孵化器名称" size="large" onSearch={handleSubmit} />
        )}
      </Col>
    </Row>
  )
}

// class Filter extends React.Component {

//   componentDidMount(){
//     console.log('Did....');

//   }
//   componentWillReceiveProps(nextProps){
//     console.log('Will....');
//     console.log(nextProps);
//   }

//   // shouldComponentUpdate(nextProps, nextState){
//   //   const nf = nextProps.filter;
//   //   const tf = this.props.filter;
//   //   return nf.type!==tf.type || nf.category!==tf.category || nf.space_name!==tf.space_name;
//   // }

//   componentDidUpdate(prevProps, prevState){
//     //const {form} = this.props;
//     //const {getFieldsValue} = form;
//     //let fields = getFieldsValue()
//     console.log('Updated....');
//     //console.log(prevState);
//   }

//   handleSubmit = () => {
//     const {form, onFilterChange} = this.props;
//     const {getFieldsValue} = form;

//     let fields = getFieldsValue()
//     //console.log(fields);
//     let range = fields['time_range'];
//     if(range.length===2){
//       fields['start'] = range[0].format('YYYY-MM-DD');
//       fields['end'] = range[1].format('YYYY-MM-DD');
//     }
//     delete fields['time_range'];
//     onFilterChange(fields);
//   }

//   handleChange = (key, value) => {
//     const {form, onFilterChange} = this.props;
//     const {getFieldsValue} = form;

//     let fields = getFieldsValue();
//     fields[key] = value;
//     let range = fields['time_range'];
//     if(range.length===2){
//       fields['start'] = range[0].format('YYYY-MM-DD');
//       fields['end'] = range[1].format('YYYY-MM-DD');
//     }
//     delete fields['time_range'];

//     onFilterChange(fields)
//   }

//   handleRangeChange = (values, valueStrs) => {
//     const {form, onFilterChange} = this.props;
//     const {getFieldsValue} = form;

//     let fields = getFieldsValue()
//     fields['start'] = valueStrs[0];
//     fields['end'] = valueStrs[1];
//     delete fields['time_range'];
//     //console.log(fields);
//     onFilterChange(fields)
//   }

//   render(){
//     const {form, filter} = this.props;
//     const {getFieldDecorator, resetFields} = form;

//     const { type, category, start, end, space_name } = filter;

//     let time_range = start && end && start!=='' && end!=='' ? [moment(start), moment(end)] : [];

//     return (
//       <Row gutter={16}>
//         <Col {...ColProps} xl={{ span: 6 }} md={{ span: 6 }} sm={{ span: 12 }}>
//           {getFieldDecorator('type', {initialValue: type})(
//             <Select size="large" style={{ width: '100%' }} placeholder="交易类型"
//               onChange={this.handleChange.bind(null, 'type')}>
//                 <Option value={''}>全部</Option>
//                 { categories.transType.map((val, i)=> <Option value={i+''}>{val}</Option>) }
//             </Select>
//           )}
//         </Col>
//         <Col {...ColProps} xl={{ span: 6 }} md={{ span: 6 }}>
//           {getFieldDecorator('category', {initialValue: category})(
//             <Select size="large" style={{ width: '100%' }} placeholder="场地类型"
//               onChange={this.handleChange.bind(null, 'category')}>
//               <Option value={''}>全部</Option>
//               { categories.office.map((val, i)=> <Option value={'1-' + i}>{val}</Option>)}
//               { categories.meetingroom.map((val, i)=> <Option value={'2-' + i}>{val}</Option>)}
//             </Select>
//           )}
//         </Col>
//         <Col {...ColProps} xl={{ span: 6 }} md={{ span: 6 }}>
//           {getFieldDecorator('time_range', {initialValue: time_range})(
//               <RangePicker size="large" style={{ width: '100%' }} format="YYYY-MM-DD" onChange={this.handleRangeChange}/>
//           )}
//         </Col>
//         <Col {...ColProps} xl={{ span: 6 }} md={{ span: 6 }}>
//           {getFieldDecorator('space_name', {initialValue: space_name})(
//             <Search placeholder="孵化器名称" size="large" onSearch={this.handleSubmit} />
//           )}
//         </Col>
//       </Row>
//     );
//   }
// }

Filter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

// const formOpts = {
//   mapPropsToFields(props){
//     console.log('XXXX');
//     const { type, category, start, end, space_name } = props.filter;
//     let time_range = start && end && start!=='' && end!=='' ? [moment(start), moment(end)] : [];
//     console.log({type, category, space_name, time_range});
//     return {type, category, space_name, time_range};
//   }
// }

export default Form.create()(Filter)
