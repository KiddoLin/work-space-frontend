import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from '../../../components'
import { Form, Row, Col, Input, Select, Tooltip} from 'antd'
import categories from '../../../config/categories';
import statuses from '../../../config/statuses';

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

  const { status, category, source, price, keyword } = filter

  return (
    <Row gutter={16}>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 4 }} sm={{ span: 12 }}>
        {getFieldDecorator('status', { initialValue: status })(
          <Select size="large" style={{ width: '100%' }} placeholder="订单状态"
            onChange={handleChange.bind(null, 'status')}>
            <Option value={''}>全部状态</Option>
            { statuses.order.map((item)=> <Option value={item.val+''}>{item.text}</Option>)}
          </Select>
        )}
      </Col>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 4 }}>
        {getFieldDecorator('category', { initialValue: category })(
          <Select size="large" style={{ width: '100%' }} placeholder="场地类型"
            onChange={handleChange.bind(null, 'category')}>
            <Option value={''}>全部类型</Option>
            { categories.office.map((val, i)=> <Option value={i+''}>{val}</Option>)}
          </Select>
        )}
      </Col>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 4 }}>
        {getFieldDecorator('source', { initialValue: source })(
          <Select size="large" style={{ width: '100%' }} placeholder="订单来源"
            onChange={handleChange.bind(null, 'source')}>
            <Option value={''}>全部来源</Option>
            { categories.orderSource.map((val, i)=> <Option value={i+''}>{val}</Option>)}
          </Select>
        )}
      </Col>
      <Col {...ColProps} xl={{ span: 12 }} md={{ span: 12 }}>
        {getFieldDecorator('keyword', { initialValue: keyword })(
          <Search placeholder="场地名称/孵化器名称" size="large" onSearch={handleSubmit} />
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
