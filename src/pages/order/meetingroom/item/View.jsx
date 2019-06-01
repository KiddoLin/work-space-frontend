import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Col } from 'antd'
import { Link } from 'dva/router'
import styles from './View.less'
import categories from '../../../../config/categories';
import statuses from '../../../../config/statuses';
import {formatDate} from '../../../../utils/date'

const View = ({ meetingroomOrder }) => {
  const { item } = meetingroomOrder

  //const order_date = formatDate('yyyy-MM-dd', item.year, item.month, item.day);
  //const order_to = formatDate('yyyy-MM-dd', item.to_year, item.to_month, item.to_day);
  const status = statuses.order.find(st => st.val==item.status);
  let pay_amount = item.source===1 ? 0 : item.payment_amount;

  return (
    <div className="content-inner">
    <div className={styles.content}>
      <Row type="flex" justify="center">
        <Col span={12} className={styles.title}>订单信息</Col>
      </Row>
      <Row type="flex" justify="center">
        <Col span={4} className={styles.label}>订单编号：</Col>
        <Col span={4} className={styles.value}> {item.order_no}</Col>
        <Col span={4} className={styles.label}>订单状态：</Col>
        <Col span={4} className={styles.value}>{status ? status.text : '未知状态'}</Col>
      </Row>
      <Row type="flex" justify="center">
        <Col span={4} className={styles.label}>场地价格：</Col>
        <Col span={4} className={styles.value}>¥{item.price}/小时</Col>
        <Col span={4} className={styles.label}></Col>
        <Col span={4} className={styles.value}></Col>
      </Row>
      <Row type="flex" justify="center">
        <Col span={4} className={styles.label}>开始使用：</Col>
        <Col span={4} className={styles.value}>{item.from_date}</Col>
        <Col span={4} className={styles.label}>结束使用：</Col>
        <Col span={4} className={styles.value}>{item.to_date}</Col>
      </Row>
      <Row type="flex" justify="center">
        <Col span={4} className={styles.label}>预定小时数：</Col>
        <Col span={4} className={styles.value}>{item.total_time}</Col>
        <Col span={4} className={styles.label}>支付总金额：</Col>
        <Col span={4} className={styles.value}>¥{pay_amount}</Col>
      </Row>
      <Row type="flex" justify="center">
        <Col span={4} className={styles.label}>订单来源：</Col>
        <Col span={4} className={styles.value}>{categories.orderSource[item.source]}</Col>
        <Col span={4} className={styles.label}>创建人：</Col>
        <Col span={4} className={styles.value}><Link to={`/users/${item.user_id}`}>查看</Link></Col>
      </Row>
      <Row type="flex" justify="center">
        <Col span={4} className={styles.label}>创建时间：</Col>
        <Col span={4} className={styles.value}>{item.created_at}</Col>
        <Col span={4} className={styles.label}>支付时间：</Col>
        <Col span={4} className={styles.value}>{item.payed_at}</Col>
      </Row>
      {
        item.canceled_at && (
          <Row type="flex" justify="center">
            <Col span={4} className={styles.label}>取消时间：</Col>
            <Col span={4} className={styles.value}>{item.canceled_at}</Col>
            <Col span={4} className={styles.label}></Col>
            <Col span={4} className={styles.value}></Col>
          </Row>
        )
      }
      {
        item.status==3 && (
          <Row type="flex" justify="center">
            <Col span={4} className={styles.label}>扣除金额：</Col>
            <Col span={4} className={styles.value}>¥{item.cancel_fee}</Col>
            <Col span={4} className={styles.label}>退款金额：</Col>
            <Col span={4} className={styles.value}>¥{(item.payment_amount-item.cancel_fee).toFixed(2)}</Col>
          </Row>
        )
      }
      <Row type="flex" justify="center">
        <Col span={12} className={styles.title}>用户信息</Col>
      </Row>
      <Row type="flex" justify="center">
        <Col span={4} className={styles.label}>联系人：</Col>
        <Col span={4} className={styles.value}>{item.contact_name}</Col>
        <Col span={4} className={styles.label}>联系电话：</Col>
        <Col span={4} className={styles.value}>{item.contact_phone}</Col>
      </Row>
      <Row type="flex" justify="center">
        <Col span={12} className={styles.title}>场地信息</Col>
      </Row>
      <Row type="flex" justify="center">
        <Col span={4} className={styles.label}>所属孵化器：</Col>
        <Col span={4} className={styles.value}><Link to={`/spaces/${item.space_id}`}>{item.space_name}</Link></Col>
        <Col span={4} className={styles.label}>场地类型：</Col>
        <Col span={4} className={styles.value}>{categories.meetingroom[item.category]}</Col>
      </Row>
       <Row type="flex" justify="center">
        <Col span={4} className={styles.label}>场地名称：</Col>
        <Col span={4} className={styles.value}><Link to={`/meetingrooms/${item.meetingroom_id}`}>{item.booking_name}</Link></Col>
        <Col span={4} className={styles.label}></Col>
        <Col span={4} className={styles.value}></Col>
      </Row>
      <Row type="flex" justify="center">
        <Col span={12} className={styles.title}>验证信息</Col>
      </Row>
      <Row type="flex" justify="center">
        <Col span={4} className={styles.label}>验证码：</Col>
        <Col span={4} className={styles.value}>{item.vcode}</Col>
        <Col span={4} className={styles.label}>验证时间：</Col>
        <Col span={4} className={styles.value}>{item.verified_at}</Col>
      </Row>
      {
        item.verifier_id && (
          <Row type="flex" justify="center">
            <Col span={4} className={styles.label}>验证人：</Col>
            <Col span={4} className={styles.value}><Link to={`/space_admins/${item.verifier_id}`}>{item.verifier_name}</Link></Col>
            <Col span={4} className={styles.label}></Col>
            <Col span={4} className={styles.value}></Col>
          </Row>
        )
      }
      <div className={styles.opt}>
          <Button type="primary" icon="left" onClick={e => history.go(-1)}>返回</Button>
      </div>
    </div>
  </div>)
}

View.propTypes = {
  meetingroomOrder: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ meetingroomOrder, loading }) => ({ meetingroomOrder, loading: loading.models.meetingroomOrder }))(View)
