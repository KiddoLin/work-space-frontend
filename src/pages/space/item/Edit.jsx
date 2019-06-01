import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Form, Spin, Input, InputNumber, Cascader, Select, Row, Col, Button ,Tooltip, Icon, Checkbox} from 'antd'
import PicWall from '../../../components/Picture/PicWall.jsx'
import EditableTags from '../../../components/Tag/EditableTags.jsx'
import styles from './Edit.less'
import categories from '../../../config/categories'
import { CityDict } from '../../../utils/city'
import PicCropper from '../../../components/Picture/PicCropper.jsx'

const FormItem = Form.Item
const Option = Select.Option
const InputGroup = Input.Group
const TEL_REGEX = /(\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/

const Edit = ({ space,   dispatch, loading, refs, form: { getFieldDecorator, getFieldsValue, getFieldValue, setFieldsValue, validateFields, validateFieldsAndScroll }}) => {
  const { isNew, item, qiniu } = space
  const {id, name, category, industry, tags, pictures, summary,
         office_intro, meetingrm_intro,
         operation_time_workday, operation_time_nonworkday,
         telephone, province, city, district, zone, address, latitude, longitude,
         area_in_sqm, num_of_fixed_desk, num_of_nonfixed_desk, num_of_office_room,
         num_of_meeting_room, num_of_event_room, facilities, usage, is_nearby_mtr,
         traffic_desc, mgr_avatar
        } = item;

  const picList = pictures || []
  //const avatarList = mgr_avatar && mgr_avatar!=='' ? [{uid: 1, url: mgr_avatar}] : []

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

  let tagsRef;//

  const facilityIds = facilities ? facilities.map((val) => val.id) : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {
          let {addr_prefix, facilityIds, mgr_avatar} = values;
          if(addr_prefix && addr_prefix.length>=2){
            values['province'] = addr_prefix[0];
            values['city'] = addr_prefix[1];
            if(addr_prefix.length==3) {
               values['district'] = addr_prefix[2];
            }
          }
          if(facilityIds){
            values['facilities'] = categories.facilities.filter(item => facilityIds.indexOf(item.id)>-1);
          }
          delete values.addr_prefix;
          delete values.facilityIds;

          const newTags = tagsRef.getValue() || [];
          values.tags = newTags;

          console.log(mgr_avatar);
          if(Array.isArray(mgr_avatar)){
             values.mgr_avatar = mgr_avatar.length>0 ? mgr_avatar[0].url : '';
          }
          //console.log('tags: ', tagsRef.getValue());
          //console.log('Save Values: ', values);

          if(id && !isNew){
            dispatch({ type: 'space/update', payload: {id, ...values}});
          }
          else{
            dispatch({ type: 'space/create', payload: values});
          }
      }
    });
  }
  const checkIndustry = (rule, value, callback) =>{
      let values = getFieldValue("industry");
      if(values && values.length>4){
        callback('最多只能选择4个不同行业');
      }
      callback();
  }
  const locLabel= (
      <span>
        地址经纬度&nbsp;
        <Tooltip title="点击我,帮你方便找到经纬度, 复制粘贴你总该会吧😄">
            <a target="_blank" href="http://lbs.qq.com/tool/getpoint/index.html"><Icon type="question-circle-o"/></a>
        </Tooltip>
      </span>
  )

  const imageuploaded = (res)=>{
     console.log('XXX');
     console.log(res);
  }
  //console.log('LOADING:', loading);
  return (
    <div className="content-inner">
      <Spin size="large" spinning={loading}>
      <Form>
        <FormItem {...formItemLayout} label="孵化器名称" hasFeedback>
          {getFieldDecorator('name', { initialValue: name,
            rules: [{
              required: true, message: '必输项不能为空!',
            }]
          })(
            <Input maxLength={25}/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="孵化器类型" hasFeedback>
          {getFieldDecorator('category',  { initialValue: category,
            rules: [{
              required: true, message: '必输项不能为空!',
            }]
          })(
            <Select size="large" style={{ width: '100%' }}>
            { categories.space.map((val, i)=> <Option value={i}>{val}</Option>)}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="行业领域" hasFeedback>
          {getFieldDecorator('industry',  { initialValue: industry,
            rules: [{
              required: true, message: '必输项不能为空!',
            },{
              validator: checkIndustry
            }]
          })(
            <Select size="large" mode="multiple" style={{ width: '100%' }}>
            { categories.industry.slice(1).map((val, i)=> <Option value={val}>{val}</Option>)}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="孵化器相册" hasFeedback>
           {getFieldDecorator('pictures',  { initialValue: picList, valuePropName: 'fileList',
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
        <FormItem {...formItemLayout} label="一句话描述" hasFeedback>
          {getFieldDecorator('summary',  { initialValue: summary })(
            <Input maxLength={15} placeholder="比如：1天起租,免押金"/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="自定义标签" hasFeedback>
           <EditableTags value={tags} ref={ el => tagsRef = el } maxLimit={20}/>
        </FormItem>
        <FormItem {...formItemLayout} label="营业时间(工作日)" hasFeedback>
          {getFieldDecorator('operation_time_workday',  { initialValue: operation_time_workday })(
            <Input maxLength={15} placeholder="比如：9:00-18:00"/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="营业时间(非工作日)" hasFeedback>
          {getFieldDecorator('operation_time_nonworkday',  { initialValue: operation_time_nonworkday })(
            <Input maxLength={15} placeholder="比如：9:00-12:00"/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="联系电话" hasFeedback>
          {getFieldDecorator('telephone',  { initialValue: telephone,
            rules: [{
               required: true, message: '必填项不能为空!',
            },{
              pattern: TEL_REGEX, message: '请输入合法的电话号码! 比如11位手机号码,或者(区号)-(号码)-(分机号|如有)',
            }]
          })(
            <Input maxLength={25}/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="管家头像" hasFeedback>
           {getFieldDecorator('mgr_avatar',  { initialValue: mgr_avatar, valuePropName: 'picUrl',
              rules: []
           })(
            <PicCropper accept="image/jpg,image/jpeg,image/png,image/bmp"
                        url="http://upload.qiniu.com"  data={{token: qiniu.token}}
                        getPicUrl={(data)=> qiniu.url + '/' + data.key}/>
           )}
        </FormItem>
        <FormItem {...formItemLayout} label="省/市/区或海外/国家" hasFeedback>
          {getFieldDecorator('addr_prefix', { initialValue: isNew ?  [] : [province,city,district],
            rules: [{
              required: true, message: '必填项不能为空!',
            }]
          })(
          <Cascader
            size="large"
            style={{ width: '100%' }}
            options={CityDict}
            placeholder="请选择省/市/区"
          />)}
        </FormItem>
        <FormItem {...formItemLayout} label="所在商圈" hasFeedback>
          {getFieldDecorator('zone',  { initialValue: zone,
            rules: [{
              required: true, message: '必填项不能为空!',
            }]
          })(
            <Input maxLength={20}/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="详细地址">
          {getFieldDecorator('address',  { initialValue: address,
            rules: [{
              required: true, message: '必填项不能为空!',
            }]
          })(
            <Input maxLength={150}/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label={locLabel}>
            <InputGroup size="large">
              <Col span={12}>
              {getFieldDecorator('latitude', { initialValue: latitude,
                  rules: [{
                    required: true, message: '必填项不能为空!',
                  }]
              })(
              <InputNumber step={0.000001} precision={6} style={{ width: '100%' }} placeholder="纬度" />
              )}
              </Col>
              <Col span={12}>
              {getFieldDecorator('longitude', { initialValue: longitude,
                  rules: [{
                    required: true, message: '必填项不能为空!',
                  }]
              })(
              <InputNumber step={0.000001} precision={6} style={{ width: '100%' }} placeholder="经度"/>
              )}
              </Col>
            </InputGroup>
        </FormItem>
        <FormItem {...formItemLayout} label="空间面积(平方米)" hasFeedback>
          {getFieldDecorator('area_in_sqm',  { initialValue: area_in_sqm })(
            <InputNumber style={{ width: '100%' }} min={0} max={999999} precision={0}/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="固定工位数" hasFeedback>
          {getFieldDecorator('num_of_fixed_desk',  { initialValue: num_of_fixed_desk })(
            <InputNumber style={{ width: '100%' }} min={0} max={9999} precision={0}/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="移动工位数" hasFeedback>
          {getFieldDecorator('num_of_nonfixed_desk',  { initialValue: num_of_nonfixed_desk })(
            <InputNumber style={{ width: '100%' }} min={0} max={9999} precision={0}/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="办公室数" hasFeedback>
          {getFieldDecorator('num_of_office_room',  { initialValue: num_of_office_room })(
            <InputNumber style={{ width: '100%' }} min={0} max={9999} precision={0}/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="会议室数" hasFeedback>
          {getFieldDecorator('num_of_meeting_room',  { initialValue: num_of_meeting_room })(
            <InputNumber style={{ width: '100%' }} min={0} max={9999} precision={0}/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="活动场地数" hasFeedback>
          {getFieldDecorator('num_of_event_room',  { initialValue: num_of_event_room })(
            <InputNumber style={{ width: '100%' }} min={0} max={9999} precision={0}/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="服务与配套" hasFeedback>
          {getFieldDecorator('facilityIds',  { initialValue: facilityIds,
              rules: [{
                  required: true, message: '必填项不能为空!',
              }]
          })(
            <Select size="large" mode="multiple" style={{ width: '100%' }}>
            { categories.facilities.map((val, i)=> <Option value={val.id}>{val.name}</Option>)}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="孵化器简介" hasFeedback>
          {getFieldDecorator('office_intro',  { initialValue: office_intro,
            rules: [{
                required: true, message: '必填项不能为空!',
            }]
          })(
            <Input type="textarea" rows={6} maxLength={300}/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="会议/活动场地简介" hasFeedback>
          {getFieldDecorator('meetingrm_intro',  { initialValue: meetingrm_intro })(
            <Input type="textarea" rows={6} maxLength={300}/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="场地使用说明" hasFeedback>
          {getFieldDecorator('usage',  { initialValue: usage })(
            <Input type="textarea" rows={6} maxLength={300} placeholder="请输入场地使用规则，如入驻注意事项，收费服务和免费服务等"/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="交通说明">
          <InputGroup size="large">
            <Col span={6}>
            {getFieldDecorator('is_nearby_mtr',  { initialValue: is_nearby_mtr, valuePropName: 'checked'})(
              <Checkbox>是否地铁沿线</Checkbox>
            )}
            </Col>
            <Col span={18}>
            {getFieldDecorator('traffic_desc',  { initialValue: traffic_desc})(
              <Input maxLength={150} placeholder="一句话补充描述地铁沿线优势,如：步行11分钟到1号线-深大站"/>
            )}
            </Col>
          </InputGroup>
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
  space: PropTypes.object,
  form: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ space, loading }) => ({ space, loading: loading.models.space }))(Form.create()(Edit))
