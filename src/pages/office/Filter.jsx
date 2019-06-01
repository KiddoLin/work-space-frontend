import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from '../../components'
import { Form, Row, Col, Input, Select, Cascader, InputNumber} from 'antd'
import categories from '../../config/categories';
import { CityFilterDict } from '../../utils/city';

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

  const changeValue = (fields) =>{
    let {region} = fields;
    if(region && Array.isArray(region)){
      fields['region'] = region.join(',');
    }
  }
  const handleSubmit = () => {
    let fields = getFieldsValue();
    changeValue(fields);
    //console.log(fields);
    onFilterChange(fields)
  }



  const handleChange = (key, value) => {
    let fields = getFieldsValue();
    fields[key] = value;
    changeValue(fields);
    onFilterChange(fields)
  }

  const handleOnKeyDown = (e) => {
    e = e || window.event;
    let key = e.keyCode || e.which || e.charCode;
    if(e.keyCode==13){
       handleSubmit();
    }
  }

  let { status, category, region, rent_model, priceLte, priceGte, keyword } = filter
  if((typeof region)==='string') region = region.split(',');

  return (
    <div>
    <Row gutter={16}>
      <Col {...ColProps} xl={{ span: 8 }} md={{ span: 8 }} sm={{ span: 12 }}>
        {getFieldDecorator('status', { initialValue: status })(
          <Select size="large" style={{ width: '100%' }} placeholder="状态"
            onChange={handleChange.bind(null, 'status')}>
              <Option value="">全部</Option>
              <Option value="1">已上架</Option>
              <Option value="0">已下架</Option>
          </Select>
        )}
      </Col>
      <Col {...ColProps} xl={{ span: 8 }} md={{ span: 8 }}>
        {getFieldDecorator('category', { initialValue: category })(
          <Select size="large" style={{ width: '100%' }} placeholder="场地类型"
            onChange={handleChange.bind(null, 'category')}>
            <Option value={''}>全部</Option>
            { categories.office.map((val, i)=> <Option value={i+''}>{val}</Option>)}
          </Select>
        )}
      </Col>
      <Col {...ColProps} xl={{ span: 8 }} md={{ span: 8 }}>
        {getFieldDecorator('region', { initialValue: region})(
          <Cascader size="large"  style={{ width: '100%' }} options={CityFilterDict} placeholder="所在地区" onChange={handleChange.bind(null, 'region')}/>
        )}
      </Col>
    </Row>
    <Row gutter={16}>
      <Col {...ColProps} xl={{ span: 8 }} md={{ span: 8 }}>
        {getFieldDecorator('rent_model', { initialValue: rent_model })(
          <Select size="large" style={{ width: '100%' }} placeholder="租赁模式"
            onChange={handleChange.bind(null, 'rent_model')}>
              <Option value='0,2'>可日租</Option>
              <Option value='1,2'>可月租</Option>
          </Select>
        )}
      </Col>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 4 }}>
        {getFieldDecorator('priceGte', { initialValue: priceGte })(
          <InputNumber style={{ width: '100%' }} placeholder="价格(大于等于)" min={0} max={99999} size="large" onKeyDown={handleOnKeyDown}/>
        )}
      </Col>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 4 }}>
        {getFieldDecorator('priceLte', { initialValue: priceLte })(
          <InputNumber style={{ width: '100%' }} placeholder="价格(小于等于)" min={0} max={99999} size="large" onKeyDown={handleOnKeyDown}/>
        )}
      </Col>
      <Col {...ColProps} xl={{ span: 8 }} md={{ span: 8 }}>
        {getFieldDecorator('keyword', { initialValue: keyword })(
          <Search placeholder="场地名称/孵化器名称" size="large" onSearch={handleSubmit}/>
        )}
      </Col>
    </Row>
    </div>
  )
}

Filter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
