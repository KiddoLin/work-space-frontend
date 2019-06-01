import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Card } from 'antd'
import { Link } from 'dva/router'
import { NumberCard }  from '../../components'
import styles from './index.less'
import { color } from '../../utils'

const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff',
  },
}

function Dashboard ({ dashboard }) {
  const { stat } = dashboard

  return (
    <Row gutter={24}>
      <Col lg={8} md={12}>
          <Link to="/spaces"><NumberCard title="孵化器" color={color.green} icon="api" number={stat.space}/></Link>
      </Col>
      <Col lg={8} md={12}>
          <Link to="/offices"><NumberCard title="办公场地" color={color.blue} icon="appstore-o" number={stat.office}/></Link>
      </Col>
      <Col lg={8} md={12}>
          <Link to="/meetingrooms"><NumberCard title="会议/活动场地" color={color.purple} icon="wallet" number={stat.meetingroom}/></Link>
      </Col>
      <Col lg={8} md={12}>
          <Link to="/orders/office"><NumberCard title="办公场地订单" color={color.yellow} icon="tags-o" number={stat.office_order}/></Link>
      </Col>
      <Col lg={8} md={12}>
          <Link to="/orders/meetingroom"><NumberCard title="会议与活动场地订单" color={color.red} icon="tags-o" number={stat.meetingroom_order}/></Link>
      </Col>
      <Col lg={8} md={12}>
          <Link to="/users"><NumberCard title="用户数" color={color.peach} icon="team" number={stat.user}/></Link>
      </Col>
    </Row>
  )
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
}

export default connect(({ dashboard }) => ({ dashboard }))(Dashboard)
