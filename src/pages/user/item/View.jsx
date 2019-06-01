import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button } from 'antd'
import styles from './View.less'
import categories from '../../../config/categories'

const View = ({ user }) => {
  const { item } = user

  return (
    <div className="content-inner">
    <div className={styles.content}>
      <div className={styles.item}>
          <div>用户ID</div><div>{item.id}</div>
      </div>
      <div className={styles.item}>
          <div>用户名称</div><div>{item.username}</div>
      </div>
       <div className={styles.item}>
          <div>状态</div><div>{item.status===0? '正常' : '已禁用'}</div>
      </div>
      <div className={styles.item}>
          <div>用户类型</div><div>{item.type===0? '普通用户' : '孵化器用户'}</div>
      </div>
      <div className={styles.item}>
          <div>所属行业</div><div>{item.tags}</div>
      </div>
      <div className={styles.item}>
          <div>入驻孵化器</div><div>{item.space ? item.space.name : item.space_name}</div>
      </div>
      <div className={styles.item}>
          <div>手机号号码</div><div>{item.telephone}</div>
      </div>
      <div className={styles.item}>
          <div>来源场景</div><div>{item.scene}</div>
      </div>
      <div className={styles.item}>
          <div>注册时间</div><div>{item.create_time}</div>
      </div>
      <div className={styles.opt}>
          <Button type="primary" icon="left" onClick={e => history.go(-1)}>返回</Button>
      </div>
    </div>
  </div>)
}

View.propTypes = {
  user: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ user, loading }) => ({ user, loading: loading.models.user }))(View)
