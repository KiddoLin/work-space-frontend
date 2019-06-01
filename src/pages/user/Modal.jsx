import React from 'react'
import PropTypes from 'prop-types'
import { Form, Select, Modal } from 'antd'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const modal = ({
  spaces = [],
  item,
  onSpaceBind,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        id: item.id,
      }
      //console.log(data);
      onSpaceBind(data)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }
  const {space_id} = item;
  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="入驻孵化器" hasFeedback {...formItemLayout}>
          {getFieldDecorator('space_id', { initialValue: space_id===undefined || space_id===0 ? '' : space_id,
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
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  spaces: PropTypes.object,
  item: PropTypes.object,
  onSpaceBind: PropTypes.func,
}

export default Form.create()(modal)
