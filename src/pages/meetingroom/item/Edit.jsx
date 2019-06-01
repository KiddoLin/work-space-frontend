import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Form, Spin, Input, InputNumber, Cascader, Select, Checkbox, Row, Col, Button } from 'antd'
import PicWall from '../../../components/Picture/PicWall.jsx'
import EditableTags from '../../../components/Tag/EditableTags.jsx'
import EditableDates from '../../../components/Tag/EditableDates.jsx'
import styles from './Edit.less'
import categories from '../../../config/categories'
//import RemoteSelect from '../../../components/Select/RemoteSelect.jsx';


const FormItem = Form.Item
const Option = Select.Option
const InputGroup = Input.Group
const CheckboxGroup = Checkbox.Group
//const TEL_REGEX = /(\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/

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

const excludedModelOptions = [
  {label: '周末', value: 'W'},
  {label: '法定假日', value: 'H'}
]
const setExcludedModel = (vals) => {
  const model = vals.excluded_model;
  vals.is_weekend_excluded = model.indexOf('W')<0 ? 0 : 1;
  vals.is_holiday_excluded = model.indexOf('H')<0 ? 0 : 1;

  delete vals['excluded_model'];
}
const Edit = ({ meetingroom,   dispatch, loading, form: { getFieldDecorator, getFieldValue, getFieldsValue, setFieldsValue, validateFields, validateFieldsAndScroll }}) => {
  const { isNew, item, qiniu, spaces } = meetingroom
  const {id, name, category, tags, picture,
         space_id, space_name, price_per_hour, capacity, workday_time_start,
         workday_time_end, nonworkday_time_start, nonworkday_time_end, min_rent_hours,
         is_weekend_excluded, is_holiday_excluded, dates_excluded
        } = item;

  //const picList = !picture || picture==='' ? [] : [{url: picture, uid:1}]
  const picList = picture || []

  let excludedModel = [];
  if(is_weekend_excluded===1) excludedModel.push('W');
  if(is_holiday_excluded===1) excludedModel.push('H');

  let tagsRef;//https://stackoverflow.com/questions/37266411/react-stateless-component-this-refs-value
  let datesRef;
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {

          const newTags = tagsRef.getValue() || [];
          values.tags = newTags;
          values.dates_excluded = datesRef.getValue() || [];
          setExcludedModel(values);
          if(id && !isNew){
            dispatch({ type: 'meetingroom/update', payload: {id, ...values}});
          }
          else{
            dispatch({ type: 'meetingroom/create', payload: values});
          }
      }
    });
  }

  const checkWorkTimeRange = (rule, value, callback) => {
    //const form = this.props.form;
    const start = getFieldValue('workday_time_start');
    const end = getFieldValue('workday_time_end');
    //console.log(start);
    //console.log(end);
    if(start && end && start >= end ){
      callback('开始时间必须早于结束时间');
    }
    else{
      callback();
    }
  }

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
            { categories.meetingroom.map((val, i)=> <Option value={i}>{val}</Option>)}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="自定义标签" hasFeedback>
           <EditableTags value={tags} ref={ el => tagsRef = el } maxLimit={10} maxCharLen={12}/>
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
                  //console.log('******>>', e);
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
        <FormItem {...formItemLayout} label="价格(元/小时)" hasFeedback>
          <InputGroup size="large">
          <Col span={12}>
          {getFieldDecorator('price_per_hour',  { initialValue: price_per_hour,
              rules: [{
                    required: true, message: '必填项不能为空!',
              }]
          })(
            <InputNumber style={{ width: '100%' }} min={0} max={99999} precision={2} maxLength={5}/>
          )}
          </Col>
          <Col span={12}>
          {getFieldDecorator('min_rent_hours',  { initialValue: min_rent_hours || 1,
              rules: []
            })(
            <InputNumber style={{ width: '100%' }} min={1} max={9999} precision={0} formatter={value => `${value} 小时起租`}/>
          )}
          </Col>
          </InputGroup>
        </FormItem>
        <FormItem {...formItemLayout} label="容纳人数" hasFeedback>
          {getFieldDecorator('capacity',  { initialValue: capacity,
              rules: [{
                    required: true, message: '必填项不能为空!',
              }]
          })(
            <InputNumber style={{ width: '100%' }} min={1} max={999} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="可预定时间段(工作日)">
            <InputGroup size="large">
              <Col span={12}>
              {getFieldDecorator('workday_time_start', { initialValue: workday_time_start,
                  rules: [{
                    required: true, message: '必填项不能为空!',
                  }]
              })(
              <InputNumber min={0} max={24} style={{ width: '100%' }} precision={0} placeholder="开始时间(0-24)"/>
              )}
              </Col>
              <Col span={12}>
              {getFieldDecorator('workday_time_end', { initialValue: workday_time_end,
                  rules: [{
                    required: true, message: '必填项不能为空!',
                  }]
              })(
              <InputNumber min={1} max={24} style={{ width: '100%' }} precision={0} placeholder="结束时间(0-24)"/>
              )}
              </Col>
            </InputGroup>
        </FormItem>
        <FormItem {...formItemLayout} label="可预定时间段(非工作日)">
            <InputGroup size="large">
              <Col span={12}>
              {getFieldDecorator('nonworkday_time_start', { initialValue: nonworkday_time_start,
                  rules: [{
                    required: true, message: '必填项不能为空!',
                  }]
              })(
              <InputNumber min={0} max={24} style={{ width: '100%' }} placeholder="开始时间(0-24)"/>
              )}
              </Col>
              <Col span={12}>
              {getFieldDecorator('nonworkday_time_end', { initialValue: nonworkday_time_end,
                  rules: [{
                    required: true, message: '必填项不能为空!',
                  }]
              })(
              <InputNumber min={1} max={24} style={{ width: '100%' }} placeholder="结束时间(0-24)"/>
              )}
              </Col>
            </InputGroup>
        </FormItem>
        <FormItem {...formItemLayout} label="节假日不可预定" hasFeedback>
          {getFieldDecorator('excluded_model',  { initialValue: excludedModel,
                    rules: []
            })(
              <CheckboxGroup options={excludedModelOptions} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="指定不可预定日期" hasFeedback>
            <EditableDates value={dates_excluded} ref={ el => datesRef = el } maxLimit={10}/>
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
  meetingroom: PropTypes.object,
  form: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ meetingroom, loading }) => ({ meetingroom, loading: loading.models.meetingroom }))(Form.create()(Edit))
