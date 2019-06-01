import React from 'react'
import PropTypes from 'prop-types'
import { Tag, Input, Tooltip, Button } from 'antd'
import {sliceByByteLen} from '../../utils/string'

class EditableTags extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      tags: props.value || [],
      inputVisible: false,
      inputValue: '',
      addVisible: true,
      edited: false
    };
  }

  componentWillReceiveProps(nextProps){
    //console.log('change....');
    if(this.state.edited)
       return;

    this.setState({tags: nextProps.value, inputVisible: false, inputValue: '', addVisible: true});
  }

  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    //console.log(tags);
    let addVisible = tags.length === this.props.maxLimit ? false : true;
    let edited = true;
    this.setState({ tags, addVisible });
  }

  getValue(){
    //console.log(this.state);
    return this.state.tags;
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  handleInputConfirm = () => {
    let {inputValue, tags} = this.state;
    let {maxCharLen, maxLimit} = this.props;

    let newValue = sliceByByteLen(inputValue.trim(), maxCharLen);

    if (newValue && tags.indexOf(newValue) === -1) {
      tags = [...tags, newValue];
    }
    //console.log(tags);
    let addVisible = tags.length === maxLimit ? false : true;
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
      addVisible: addVisible,
      edited: true
    });
  }

  saveInputRef = input => this.input = input

  render() {
    const { tags, inputVisible, addVisible, inputValue } = this.state;

    return (
      <div>
        {tags.map((tag, index) => {
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag key={tag} style={{fontSize: '14px'}} closable={true} afterClose={() => this.handleClose(tag)}>
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          );
          return isLongTag ? <Tooltip title={tag}>{tagElem}</Tooltip> : tagElem;
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text" maxLength={this.props.maxCharLen}
            size="large"
            style={{ width: 100 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && addVisible && <Button size="large" type="dashed" onClick={this.showInput}>+添加标签</Button>}
      </div>
    );
  }
}
EditableTags.propTypes = {
    value: PropTypes.arrayOf(PropTypes.string).isRequired,
    editable: PropTypes.bool,
    maxLimit: PropTypes.number,
    maxCharLen: PropTypes.number
}

EditableTags.defaultProps = {
    value: [],
    editable: true,
    maxLimit: 4,
    maxCharLen: 12
}

export default EditableTags
