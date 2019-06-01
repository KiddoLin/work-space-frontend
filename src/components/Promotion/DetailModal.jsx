import React from 'react'
import PropTypes from 'prop-types'
import { Form, Modal, Input, Select } from 'antd'
import categories from '../../config/categories';

const FormItem = Form.Item
const { Option, OptGroup } = Select

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const getOfficePrice = (office) => {
    switch(office.rent_model){
      case 0:
      case 2:
        return office.price_per_day + '元/天';
      case 1:
        return office.price_per_month + '元/月';
      default:
        return '';
    }
}

const getOfficeDesc = (office) => {
    let category = categories.office[office.category];
    let price = getOfficePrice(office);
    return category + ', ' + price;
}

const getMeetingroomDesc = (meetingroom) => {
    let category = categories.meetingroom[meetingroom.category];
    return category + ', ' + meetingroom.price_per_hour + '元/小时';
}

const getSpaceValStr = ({id, name}) => {
   return JSON.stringify({id, name});
}

const getOfficeValStr = (office) => {
    const {id, name, category, rent_model, price_per_day, price_per_month} = office;
    const price = rent_model===1 ? price_per_month: price_per_day;
    const unit_of_time = rent_model===1 ? 'M' : 'D';
    const val = {type: 1, office_id: id, meetingroom_id: 0, booking_name: name, category, price: price, unit_of_time};
    return JSON.stringify(val);
}

const getMeetingroomValStr = (meetingroom) => {
    const {id, name, category, price_per_hour} = meetingroom;
    const unit_of_time = 'H';
    const val = {type: 2, office_id: 0, meetingroom_id: id, booking_name: name, category, price: price_per_hour, unit_of_time};
    return JSON.stringify(val);
}


const DetailModal = ({
  spaces = [],
  omrs = {offices:[], meetingrooms:[]},
  onSpaceChanged,
  onDetailOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    setFieldsValue,
    resetFields,
  },
  ...modalProps
}) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const {space_json, omr_json, remark} = getFieldsValue();
      const space = JSON.parse(space_json);
      const omr = JSON.parse(omr_json);
      const space_id = space.id;
      const space_name = space.name;
      const data = {space_id, space_name, ...omr, remark};
      //console.log(data);
      onDetailOk(data)
    })
  }

  const handleSpaceChanged = (val) => {
    setFieldsValue({omr: ''});
    if(val && val!=='' && onSpaceChanged){
       onSpaceChanged(val);
    }
  }

  const handleAfterClose = () => {
     resetFields();
  }

  const modalOpts = {
    ...modalProps,
    title: '新增场地',
    onOk: handleOk,
    afterClose: handleAfterClose
  }

  //console.log(omrs);
  let {offices, meetingrooms} = omrs;
  //let {id, space_id, office_id, meetingroom_id, remark }= detail;
  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="孵化器" hasFeedback {...formItemLayout}>
          {getFieldDecorator('space_json', {
            rules: [{
              required: true, message: '必输项不能为空!',
            }]
          })(
            <Select size="large" style={{ width: '100%' }} showSearch={true} onChange={handleSpaceChanged}
              filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
            >
                { spaces.map((val)=> <Option value={getSpaceValStr(val)}>{val.name}</Option>)}
            </Select>
          )}
        </FormItem>
        <FormItem label="场地" hasFeedback {...formItemLayout}>
          {getFieldDecorator('omr_json', {
            rules: [{
              required: true, message: '必输项不能为空!',
            }]
          })(
            <Select size="large" style={{ width: '100%' }} allowClear={true}>
              { offices.length>0 && (
              <OptGroup label="办公场地">
                { offices.map((val)=> <Option value={getOfficeValStr(val)}>{val.name}({getOfficeDesc(val)})</Option>)}
              </OptGroup>
              )}
              { meetingrooms.length>0 && (
              <OptGroup label="会议与活动场地">
                { meetingrooms.map((val)=> <Option value={getMeetingroomValStr(val)}>{val.name}({getMeetingroomDesc(val)})</Option>)}
              </OptGroup>
              )}
            </Select>
          )}
        </FormItem>
        <FormItem label="使用说明" hasFeedback {...formItemLayout}>
          {getFieldDecorator('remark', {
            rules: [{
              required: true, message: '必输项不能为空!',
            }]
          })(
            <Input maxLength={30}/>
          )}
        </FormItem>
      </Form>
    </Modal>
  )
}

DetailModal.propTypes = {
  form: PropTypes.object.isRequired,
  spaces: PropTypes.arrayOf(PropTypes.object).isRequied,
  omrs: PropTypes.shape({
    offices: PropTypes.arrayOf(PropTypes.object).isRequied,
    meetingrooms: PropTypes.arrayOf(PropTypes.object).isRequied
  }),
  detail: PropTypes.object,
  onSpaceChanged: PropTypes.func.isRequied,
  onDetailOk: PropTypes.func.isRequied,
}

export default Form.create()(DetailModal)
