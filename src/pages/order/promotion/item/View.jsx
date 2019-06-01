import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Col, Form, Radio, Input, Modal } from 'antd'
import { Link } from 'dva/router'
import styles from './View.less'
import categories from '../../../../config/categories';

const FormItem = Form.Item
const RadioGroup = Radio.Group;
const confirm = Modal.confirm;
const { TextArea } = Input;

const showStatus = (s) => {
  switch(s){
    case 0: return '待处理';
    case 1: return '已处理(申请成功)';
    case 2: return '已处理(申请失败)';
    default: return '未知状态';
  }
}

const View = ({ promotionOrder, dispatch, form: {getFieldDecorator, getFieldsValue, getFieldValue, validateFieldsAndScroll} }) => {
  const { item } = promotionOrder

  const onSave = (e) => {
    const data = getFieldsValue(['status', 'remark']);
    confirm({
        title: `您确认要提交此订单处理吗？`,
        onOk () {
          dispatch({ type: 'promotionOrder/update', payload: {id: item.id, ...data}});
        },
    });
  }

  return (
    <div className="content-inner">
    <div className={styles.content}>
      <div className={styles.item}>
          <div>使用时间</div><div>{item.use_date}</div>
      </div>
      <div className={styles.item}>
          <div>联系人</div><div>{item.contact_name}</div>
      </div>
      <div className={styles.item}>
          <div>联系电话</div><div>{item.contact_phone}</div>
      </div>
      <div className={styles.item}>
          <div>申请孵化器</div><div>{item.space_name}</div>
      </div>
      <div className={styles.item}>
          <div>场地类型</div><div>{item.type===1 ? categories.office[item.category] : categories.meetingroom[item.category]}</div>
      </div>
      <div className={styles.item}>
          <div>场地名称</div><div>{item.booking_name}</div>
      </div>
      <div className={styles.item}>
          <div>活动主题</div><div><Link to={`/promotions/${item.promotion_id}`}>{item.promotion ? item.promotion.title : ''}</Link></div>
      </div>
      { item.status!==0 && (
        <div>
          <div className={styles.item}>
              <div>状态</div><div>{showStatus(item.status)}</div>
          </div>
          <div className={styles.item}>
              <div>处理备注</div><div>{item.remark}</div>
          </div>
          <div className={styles.item}>
              <div>处理时间</div><div>{item.processed_at}</div>
          </div>
          <div className={styles.opt}>
              <Button type="primary" icon="left" onClick={e => history.go(-1)}>返回</Button>
          </div>
        </div>
      )}
      { item.status===0 && (
        <Form>
          <div className={styles.item}>
              <div>处理结果</div>
              <FormItem>
              {getFieldDecorator('status', {initialValue: 1})(
              <RadioGroup>
                <Radio value={1}>申请成功</Radio>
                <Radio value={2}>申请失败</Radio>
              </RadioGroup>
              )}
              </FormItem>
          </div>
          <div className={styles.item}>
              <div>处理备注</div>
              <FormItem>
              {getFieldDecorator('remark')(
                <TextArea className={styles.ta} placeholder="请补充说明处理结果" autosize={{ minRows: 4, maxRows: 10 }}/>
              )}
              </FormItem>
          </div>
          <div className={styles.opt}>
              <Button icon="left" onClick={e => history.go(-1)}>返回</Button>
              <Button type="primary" icon="save" className={styles.optEdit} onClick={onSave}>确定</Button>
          </div>
        </Form>
      )}
    </div>
  </div>)
}

View.propTypes = {
  promotionOrder: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ promotionOrder, loading }) => ({ promotionOrder, loading: loading.models.officeOrder }))(Form.create()(View))
