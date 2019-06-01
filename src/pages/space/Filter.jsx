import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from '../../components'
import { Form, Row, Col, Input, Select } from 'antd'
import categories from '../../config/categories';

const Search = Input.Search
const Option = Select.Option
const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  }
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
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

  const { status, category, keyword } = filter

  return (
    <Row gutter={16}>
      <Col {...ColProps} xl={{ span: 6 }} md={{ span: 6 }} sm={{ span: 12 }}>
        {getFieldDecorator('status', { initialValue: status })(
          <Select size="large" style={{ width: '100%' }} placeholder="状态"
            onChange={handleChange.bind(null, 'status')}>
              <Option value="">全部</Option>
              <Option value="1">已上架</Option>
              <Option value="0">已下架</Option>
          </Select>
        )}
      </Col>
      <Col {...ColProps} xl={{ span: 6 }} md={{ span: 6 }}>
        {getFieldDecorator('category', { initialValue: category })(
          <Select size="large" style={{ width: '100%' }} placeholder="孵化器类型"
            onChange={handleChange.bind(null, 'category')}>
             <Option value={''}>全部类型</Option>
            { categories.space.map((val, i)=> <Option value={i+''}>{val}</Option>)}
          </Select>
        )}
      </Col>
      <Col {...ColProps} xl={{ span: 12 }} md={{ span: 12 }}>
        {getFieldDecorator('keyword', { initialValue: keyword })(
          <Search placeholder="孵化器名称／行业领域" size="large" onSearch={handleSubmit} />
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
