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
            <Option value={'0'}>待处理</Option>
            <Option value={'1,2'}>已处理</Option>
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
