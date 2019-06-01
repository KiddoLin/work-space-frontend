import React from 'react'
import PropTypes from 'prop-types'
//import moment from 'moment'
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

  const { status, role, keyword } = filter

  return (
    <Row gutter={16}>
      <Col {...ColProps} xl={{ span: 6 }} md={{ span: 6 }} sm={{ span: 12 }}>
        {getFieldDecorator('status', { initialValue: status })(
          <Select size="large" style={{ width: '100%' }} placeholder="账号状态"
            onChange={handleChange.bind(null, 'status')}>
              <Option value={''}>全部状态</Option>
              <Option value="0">正常</Option>
              <Option value="1">禁用</Option>
          </Select>
        )}
      </Col>
      <Col {...ColProps} xl={{ span: 6 }} md={{ span: 6 }}>
        {getFieldDecorator('role', { initialValue: role })(
          <Select size="large" style={{ width: '100%' }} placeholder="用户角色"
            onChange={handleChange.bind(null, 'role')}>
            <Option value={''}>全部角色</Option>
            { categories.adminRole.map((val, i)=> <Option value={i+''}>{val}</Option>)}
          </Select>
        )}
      </Col>
      <Col {...ColProps} xl={{ span: 12 }} md={{ span: 12 }}>
        {getFieldDecorator('keyword', { initialValue: keyword })(
          <Search placeholder="孵化器名称/用户名称/电话" size="large" onSearch={handleSubmit} />
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
