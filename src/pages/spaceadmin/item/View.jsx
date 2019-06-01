import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button,Icon } from 'antd'
import { Link } from 'dva/router'
import styles from './View.less'
import categories from '../../../config/categories'

const View = ({ spaceAdmin }) => {
  const { item } = spaceAdmin

  return (
    <div className="content-inner">
    <div className={styles.content}>
      <div className={styles.item}>
          <div>管理员ID</div><div>{item.id}</div>
      </div>
      <div className={styles.item}>
          <div>所属孵化器</div><div>{item.space ? item.space.name : item.space_name}</div>
      </div>
      <div className={styles.item}>
          <div>姓名</div><div>{item.username}</div>
      </div>
      <div className={styles.item}>
          <div>手机号</div><div>{item.telephone}</div>
      </div>
      <div className={styles.item}>
          <div>性别</div><div>{item.gender==0 || item.gender==1 ? categories.gender[item.gender] : ''}</div>
      </div>
      <div className={styles.item}>
          <div>职位</div><div>{item.title}</div>
      </div>
      <div className={styles.item}>
          <div>角色</div><div>{categories.adminRole[item.role]}</div>
      </div>
       <div className={styles.item}>
          <div>状态</div><div>{item.status===0? '正常' : '已禁用'}</div>
      </div>
      <div className={styles.item}>
          <div>创建时间</div><div>{item.create_time}</div>
      </div>
      <div className={styles.item}>
          <div>更新时间</div><div>{item.update_time}</div>
      </div>
      <div className={styles.item}>
          <div>打开次数</div><div>{item.active_cnt}</div>
      </div>
         <div className={styles.item}>
          <div>最近打开时间</div><div>{item.last_active_time || '无'}</div>
      </div>
      <div className={styles.opt}>
          <Button type="primary" icon="left" onClick={e => history.go(-1)}>返回</Button>
          <Link to={`/space_admins/${item.id}/edit`}><Button className={styles.optEdit} icon="edit">编辑</Button></Link>
      </div>
    </div>
  </div>)
}

View.propTypes = {
  spaceAdmin: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ spaceAdmin, loading }) => ({ spaceAdmin, loading: loading.models.spaceAdmin }))(View)
