import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Form, Spin, Input, InputNumber, Select, Row, Col, Button } from 'antd'
//import PicWall from '../../../components/Picture/PicWall.jsx'
//import EditableTags from '../../../components/Tag/EditableTags.jsx'
import styles from './Edit.less'
import categories from '../../../config/categories'
import {byteLenCheck} from '../../../utils/string'

const FormItem = Form.Item
const Option = Select.Option
//const InputGroup = Input.Group

//const TEL_REGEX = /(\d{0,14}$)|(^\+\d{0,13}$)/
const TEL_REGEX = /^\+?[0-9]{3,14}$/
const PWD_REGEX = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,20}$/
const SP_REGEX = /^[^ ]+$/ //不能包含空格
const SP_REGEX1 = /^\S.*\S$/
const Edit = ({ spaceAdmin,   dispatch, loading, form: { getFieldDecorator, getFieldsValue, setFieldsValue, validateFields, validateFieldsAndScroll }}) => {
  const { isNew, item, spaces } = spaceAdmin
  const {id, username, password, role, telephone, gender, title,
         space_id, status
        } = item;

  //const picList = picture || []

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

  const handleSubmit = (e) => {
    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {

          if(id && !isNew){
            dispatch({ type: 'spaceAdmin/update', payload: {id, ...values}});
          }
          else{
            dispatch({ type: 'spaceAdmin/create', payload: values});
          }
      }
    });
  }
  //console.log('LOADING:', loading);
  return (
    <div className="content-inner">
      <Spin size="large" spinning={loading}>
      <Form autoComplete="off">
        <input type="password" name="ugliyCodeToFixBroswerBug" className={styles.ugliyPwd}/>
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
        <FormItem {...formItemLayout} label="角色" hasFeedback>
          {getFieldDecorator('role',  { initialValue: role,
            rules: [{
              required: true, message: '必输项不能为空!',
            }]
          })(
            <Select size="large" style={{ width: '100%' }}>
            { categories.adminRole.map((val, i)=> <Option value={i}>{val}</Option>)}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="手机号" hasFeedback>
          {getFieldDecorator('telephone', { initialValue: telephone,
            rules: [{
              required: true, message: '必输项不能为空!',
            },{
              pattern: TEL_REGEX, message: '请输入合法的电话号码! ',
            }]
          })(
            <Input maxLength={14}/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="登录密码" hasFeedback>
          {getFieldDecorator('password', { initialValue: '',
            rules: [{
              pattern: PWD_REGEX, message: '密码由字母、数字和符号两种以上组合的6-20位字符'
            },{
              pattern: SP_REGEX, message: '不能包含空格'
            }]
          })(
            <Input maxLength={20} type="password" autoComplete="new-password"/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="姓名" hasFeedback>
          {getFieldDecorator('username', { initialValue: username,
            rules: [{
              required: true, message: '必输项不能为空!',
            },{
              validator: byteLenCheck,
              maxByteLen: 30,
              message: '最多只能输入15个汉字,30个英文字符'
            },{
              pattern: SP_REGEX1, message: '不能以空格开始或者结尾'
            }]
          })(
            <Input maxLength={30}/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="性别" hasFeedback>
          {getFieldDecorator('gender',  { initialValue: gender,
            rules: [{
              required: true, message: '必输项不能为空!',
            }]
          })(
            <Select size="large" style={{ width: '100%' }}>
            { categories.gender.map((val, i)=> <Option value={i}>{val}</Option>)}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="职位" hasFeedback>
          {getFieldDecorator('title', { initialValue: title,
            rules: [{
              validator: byteLenCheck,
              maxByteLen: 30,
              message: '最多只能输入15个汉字,30个英文字符'
            }]
          })(
            <Input maxLength={30}/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="状态" hasFeedback>
          {getFieldDecorator('status',  { initialValue: status,
            rules: [{
              required: true, message: '必输项不能为空!',
            }]
          })(
            <Select size="large" style={{ width: '100%' }}>
              <Option value={0}>正常</Option>
              <Option value={1}>禁用</Option>
            </Select>
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
  spaceAdmin: PropTypes.object,
  form: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ spaceAdmin, loading }) => ({ spaceAdmin, loading: loading.models.spaceAdmin }))(Form.create()(Edit))
