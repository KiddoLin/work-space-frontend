import React from 'react'
import PropTypes from 'prop-types'
import { Tag, Input, DatePicker, Tooltip, Button } from 'antd'
import moment from 'moment'
import {sliceByByteLen} from '../../utils/string'

class EditableDates extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      dates: props.value || [],
      inputVisible: false,
      addVisible: true,
      edited: false
    };
  }

  componentWillReceiveProps(nextProps){
    //console.log('change....');
    if(this.state.edited)
       return;

    this.setState({dates: nextProps.value, inputVisible: false, addVisible: true});
  }

  handleClose = (removedDate) => {
    const dates = this.state.dates.filter(date => date !== removedDate);
    //console.log(tags);
    let addVisible = dates.length === this.props.maxLimit ? false : true;
    let edited = true;
    this.setState({ dates, addVisible });
    this.triggerChange(dates);
  }

  getValue(){
    return this.state.dates;
  }

  showInput = () => {
    this.setState({ inputVisible: true });
  }

  handleInputChange = (date, dateStr) => {
    //this.setState({ inputValue: dateStr });
    let inputValue = dateStr;
    let {dates} = this.state;
    let {maxLimit} = this.props;
    if(inputValue!=='' && dates.indexOf(inputValue)<0){
       dates = [...dates, inputValue];
    }
    let addVisible = dates.length === maxLimit ? false : true;
    this.setState({
      dates,
      inputVisible: false,
      inputValue: '',
      addVisible: addVisible,
      edited: true
    });
    this.triggerChange(dates);
  }

  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange([].concat(changedValue));
    }
  }

  render() {
    const { dates, inputVisible, addVisible, inputValue } = this.state;
    return (
      <div>
        {dates.map((date, index) => {
          const tagElem = (
            <Tag key={date} style={{fontSize: '15px'}} closable={true} afterClose={() => this.handleClose(date)}>
              {date}
            </Tag>
          );
          return tagElem;
        })}
        {inputVisible && (
          <DatePicker
            size="large"
            style={{ width: 100 }}
            format={this.props.format}
            disabledDate={this.props.disabledDate}
            open = {true}
            onChange={this.handleInputChange}
          />
        )}
        {!inputVisible && addVisible && <Button size="large" type="dashed" onClick={this.showInput}>+添加日期</Button>}
      </div>
    );
  }
}
EditableDates.propTypes = {
    value: PropTypes.arrayOf(PropTypes.string).isRequired,
    editable: PropTypes.bool,
    maxLimit: PropTypes.number,
    format: PropTypes.string,
    disabledDate: PropTypes.func
}

EditableDates.defaultProps = {
    value: [],
    editable: true,
    maxLimit: 4,
    format: 'YYYY-MM-DD'
}

export default EditableDates
