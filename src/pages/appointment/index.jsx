import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Button, message } from 'antd'
import moment from 'moment'
import List from './List.jsx'
import Filter from './Filter.jsx'
import config from '../../config/config'
const { api } = config

const Appointments = ({ location, dispatch, appointment, loading }) => {
  const { list, pagination } = appointment
  const { pageSize } = pagination
  const listProps = {
    dataSource: list,
    loading: loading.effects['appointment/query'],
    pagination,
    location,
    isMotion: false,
    onChange (page) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        },
      }))
    }
  }

  const filterProps = {
    filter: {
      purpose: '',
      keyword: '',
      ...location.query,
    },
    onFilterChange (criteria) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...criteria,
          page: 1,
          pageSize,
        },
      }))
    }
  }

  const handleExport = () => {
    window.location = api.moneyTransesExportExcel + location.search;
  }
  return (
    <div className="content-inner">
      <Filter {...filterProps}/>
      <List {...listProps} />
    </div>
  )
}

Appointments.propTypes = {
  appointment: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ appointment, loading }) => ({ appointment, loading }))(Appointments)
