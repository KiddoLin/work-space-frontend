import React from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Input, Select } from 'antd'

const FormItem = Form.Item
const Search = Input.Search
const Option = Select.Option

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  }
}

const buildYears = (n)=>{
  n = n || 5;
  let years = [];
  let y = new Date().getFullYear();
  for(let i=n; i>=0; i--){
     years.push((y-i).toString());
  }
  for(let i=1; i<n; i++){
    years.push((y+i).toString());
  }
  //console.log(years);
  return years;
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
    onFilterChange(fields)
  }

  const handleChange = (key, value) => {
    let fields = getFieldsValue()
    fields[key] = value
    //console.log(fields);
    onFilterChange(fields)
  }

  const { year } = filter
  //console.log(filter);

  return (
    <Row gutter={16}>
      <Col {...ColProps} xl={{ span: 8 }} md={{ span: 8 }} sm={{ span: 12 }}>
        {getFieldDecorator('year', { initialValue: year })(
          <Select size="large" style={{ width: '100%' }} placeholder="年份"
            onChange={handleChange.bind(null, 'year')}>
              <Option value={''}>全部年份</Option>
              { buildYears(5).map((val)=> <Option value={val}>{val}</Option>) }
          </Select>
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
