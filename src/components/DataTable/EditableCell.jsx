import React from 'react'
import PropTypes from 'prop-types'
import { Input, Icon } from 'antd';
import styles from './EditableCell.less';

class EditableCell extends React.Component {
  state = {
    value: this.props.value,
    editable: false,
  }
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  }
  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }
  edit = () => {
    this.setState({ editable: true });
  }
  render() {
    const { value, editable } = this.state;
    const { maxLength } = this.props;
    return (
      <div className={styles.cell}>
        {
          editable ?
            <div className={styles.cellInputWrapper}>
              <Input
                value={value}
                maxLength={maxLength}
                onChange={this.handleChange}
                onPressEnter={this.check}
              />
              <Icon
                type="check"
                className={styles.cellIconCheck}
                onClick={this.check}
              />
            </div>
            :
            <div className={styles.cellTextWrapper}>
              {value || ' '}
              <Icon
                type="edit"
                className={styles.cellIcon}
                onClick={this.edit}
              />
            </div>
        }
      </div>
    );
  }
}

EditableCell.propTypes = {
  maxLength: PropTypes.number
}

EditableCell.defaultProps = {
  maxLength: 30
}

export default EditableCell;
