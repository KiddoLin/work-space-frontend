import React from 'react'
import PropTypes from 'prop-types'
import { Table, Icon, Button, Popconfirm, message } from 'antd'
import EditableCell from '../DataTable/EditableCell.jsx'
import DetailModal from './DetailModal.jsx'
import styles from './EditableDetails.less'
import categories from '../../config/categories';

const compareWithKeys = (l,r)=>{
  return l.space_id===r.space_id && l.office_id===r.office_id && l.meetingroom_id===r.meetingroom_id;
}

class EditableDetails extends React.Component {
    constructor(props) {
      super(props);
      this.columns = [{
        title: '孵化器',
        dataIndex: 'space_name',
        width: '18%',
      },{
        title: '场地名称',
        dataIndex: 'booking_name',
        width: '18%',
      },{
        title: '类型',
        dataIndex: 'category',
        width: '10%',
        render: (t, r) => r.type===1 ? categories.office[r.category] : categories.meetingroom[r.category]
      },{
        title: '价格',
        dataIndex: 'price',
        width: '8%',
        render: (t, r) => {
          switch(r.unit_of_time){
            case 'H': return r.price + '元/小时';
            case 'D': return r.price + '元/天';
            case 'M': return r.price + '元/月';
            default: return r.price + '元';
          }
        }
      },{
        title: '使用说明',
        dataIndex: 'remark',
        width: '36%',
        render: (t, r) => (
        <EditableCell
          value={t}
          maxLength={30}
          onChange={this.onCellChange(r, 'remark')}/>
        )
      },{
        title: '操作',
        width: '10%',
        render: (t, r) => {
          return (
            <Popconfirm title="确定要删除吗?" onConfirm={() => this.onDelete(r)}>
              <a href="#">删除</a>
            </Popconfirm>
          );
        }
      }];
      this.state = {values: props.values, showModal: false};
    }
    componentWillReceiveProps(nextProps){
      const {isNew, values} = this.props;
      if(!isNew && values.length!=nextProps.values.length){
         this.setState({values: nextProps.values});
      }
    }

    onCellChange = (record, dataIndex) => {
      return (value) => {
          const values = [...this.state.values];
          const target = values.find(item => compareWithKeys(item, record));
          if (target) {
            target[dataIndex] = value;
            this.setState({ values });
          }
      };
    }
    onDelete = (r) => {
        const values = this.state.values;
        const {isNew, onDetailDelete} = this.props;
        if(isNew){
          const newValues = values.filter(item => !compareWithKeys(item, r));
          this.setState({ values: newValues});
        }
        else if(r.id && r.promotion_id) {
          onDetailDelete(r);
        }
    }
    onAddShow = (e) => {
       this.setState({showModal: true});
    }

    onMoalOk = (detail) => {
      //this.setState({showModal: false});
      //console.log(detail);
      let values = this.state.values;
      const {isNew, onDetailAdd} = this.props;
      //console.log(values);
      //check if exists;
      const exists = values.some(v => compareWithKeys(v, detail));
      if(exists){
        message.warning('该场地已经添加');
        return;
      }
      if(isNew){
        values = [...values, detail];
        console.log(values);
        this.setState({values: values, showModal: false});
      }
      else{
        onDetailAdd(detail);
        this.setState({showModal: false});
      }
    }

    onModalCancel = (e) => {
      this.setState({showModal: false});
    }
    getValues(){
      return this.state.values;
    }
    render(){
      const {maximum, spaces, omrs, onSpaceChanged} = this.props;
      const {values, showModal} = this.state;
      return (
        <div className={styles.details}>
        { maximum>values.length && <Button className={styles.addBtn} icon="plus" onClick={this.onAddShow}>新增场地</Button> }
        <DetailModal visible={showModal} spaces={spaces} omrs={omrs} onSpaceChanged={onSpaceChanged} onDetailOk={this.onMoalOk} onCancel={this.onModalCancel}/>
        <Table bordered dataSource={values} columns={this.columns} pagination={false}/>
        </div>
      );
    }
}

EditableDetails.propTypes = {
  maximum: PropTypes.number,
  isNew: PropTypes.bool,
  spaces: PropTypes.arrayOf(PropTypes.object).isRequied,
  omrs: PropTypes.shape({
    offices: PropTypes.arrayOf(PropTypes.object).isRequied,
    meetingrooms: PropTypes.arrayOf(PropTypes.object).isRequied
  }),
  values: PropTypes.arrayOf(PropTypes.object).isRequied,
  onSpaceChanged: PropTypes.func,
  onDetailDelete: PropTypes.func,
  onDetailAdd: PropTypes.func
}

EditableDetails.defaultProps = {
  maximum: 5,
  isNew: true,
  spaces: [],
  omrs:{offices:[], meetingrooms:[]},
  values: []
}

export default EditableDetails
