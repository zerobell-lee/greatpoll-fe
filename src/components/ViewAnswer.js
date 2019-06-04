import React, { Component } from 'react';
import { Icon } from 'antd';

class ViewAnswer extends Component {
    constructor(props) {
        super(props);
    }

    handleClick = (e) => {
        if (this.props.canClick) {
            this.props.onSelected(this.props.answerNo, !this.props.checked)
        }
        
    }

    render() {
        return (
            <div className="no-drag answer" onClick={this.handleClick}>
                {this.props.checked && <Icon type="check" />}
                {this.props.answerLabel}
            </div>
        )
    }
}

export default ViewAnswer;