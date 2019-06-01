import React from 'react'
import PropTypes from 'prop-types'
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

  const { purpose, start, end, keyword } = filter
  //console.log(filter);

  let time_range = start && end && start!=='' && end!=='' ? [moment(start), moment(end)] : [];

  return (
    <Row gutter={16}>
      <Col {...ColProps} xl={{ span: 6 }} md={{ span: 6 }} sm={{ span: 12 }}>
        {getFieldDecorator('purpose', { initialValue: purpose })(
          <Select size="large" style={{ width: '100%' }} placeholder="拜访目的"
            onChange={handleChange.bind(null, 'purpose')}>
              <Option value={''}>全部</Option>
              { categories.aptmPurposes.map((val, i)=> <Option value={i+''}>{val}</Option>) }
          </Select>
        )}
      </Col>
      <Col {...ColProps} xl={{ span: 6 }} md={{ span: 6 }}>
        {getFieldDecorator('time_range', { initialValue: time_range})(
            <RangePicker size="large" style={{ width: '100%' }} format="YYYY-MM-DD" onChange={handleRangeChange}/>
        )}
      </Col>
      <Col {...ColProps} xl={{ span: 12 }} md={{ span: 12 }}>
        {getFieldDecorator('keyword', { initialValue: keyword })(
          <Search placeholder="孵化器名称/联系人/联系电话" size="large" onSearch={handleSubmit} />
        )}
      </Col>
    </Row>
  )
}

Filter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
