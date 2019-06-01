import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Form, Spin, Input, Select, Row, Col, Button } from 'antd'
import EditableDates from '../../../components/Tag/EditableDates.jsx'
import styles from './Edit.less'
import categories from '../../../config/categories'


const FormItem = Form.Item
const Option = Select.Option
const InputGroup = Input.Group

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
const buildNextYears = (n)=>{
  n = n || 5;
  let years = [];
  let y = new Date().getFullYear();
  for(let i=0; i<n; i++){
    years.push((y+i).toString());
  }
  //console.log(years);
  return years;
}

const Edit = ({ holiday,   dispatch, loading, form: { getFieldDecorator, getFieldValue, getFieldsValue, setFieldsValue, validateFields, validateFieldsAndScroll }}) => {
  const { isNew, item } = holiday
  const {id, year, name, idx, dates, dates_onduty} = item;
  //const id_name = {id: order, name: name};
  //https://stackoverflow.com/questions/37266411/react-stateless-component-this-refs-value
  //let datesOndutyRef;
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {
          //values.dates= datesRef.getValue() || [];
          //values.dates_onduty= datesOndutyRef.getValue() || [];
          values.year = parseInt(values.year);
          //console.log(values);
          values.name = categories.cnHolidays[values.idx];
          if(id && !isNew){
            dispatch({ type: 'holiday/update', payload: {id, ...values}});
          }
          else{
            dispatch({ type: 'holiday/create', payload: values});
          }
      }
    });
  }

  const disabledDate = (c) => {
      const year = getFieldValue('year');
      return c && c.year()!=year;//disable
  }

  const disabledOndutyDate = (c) => {
      return c && c.day()!==0 && c.day()!==6;//disable mon to fri
  }

  const checkDates = (rule, value, callback) => {
    if (value && value.length > 0) {
      callback();
      return;
    }
    callback('必输项不能为空!');
  }

  return (
    <div className="content-inner">
      <Spin size="large" spinning={loading}>
      <Form>
        <FormItem {...formItemLayout} label="年份" hasFeedback>
          {getFieldDecorator('year', { initialValue: year || new Date().getFullYear(),
            rules: [{
              required: true, message: '必输项不能为空!',
            }]
          })(
            <Select size="large" style={{ width: '100%' }} showSearch={true}
              filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
            >
                { buildNextYears(10).map((val)=> <Option value={val}>{val}</Option>)}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="节假日" hasFeedback>
          {getFieldDecorator('idx',  { initialValue: idx,
            rules: [{ required: true, message: '必输项不能为空!' }]
          })(
            <Select size="large" style={{ width: '100%' }}>
            { categories.cnHolidays.map((val, i)=> <Option value={i}>{val}</Option>)}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="休假" hasFeedback>
          {getFieldDecorator('dates',  { initialValue: dates,
              rules: [{ required: true, validator: checkDates }]
          })(
          <EditableDates maxLimit={20} disabledDate={disabledDate}/>
          )}
        </FormItem>
         <FormItem {...formItemLayout} label="补班" hasFeedback>
          {getFieldDecorator('dates_onduty',  { initialValue: dates_onduty,
              rules: []
          })(
            <EditableDates value={dates_onduty} disabledDate={disabledOndutyDate} maxLimit={10}/>
          )}
        </FormItem>
        <FormItem wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" icon="save" htmlType="submit" onClick={handleSubmit}>保存</Button>
          <Button className={styles.optBtn} icon="left" onClick={e => history.go(-1)}>返回</Button>
        </FormItem>
      </Form>
      </Spin>
    </div>
  )
}

Edit.propTypes = {
  holiday: PropTypes.object,
  form: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ holiday, loading }) => ({ holiday, loading: loading.models.holiday }))(Form.create()(Edit))
