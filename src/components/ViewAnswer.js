import React, { Component } from 'react';

class ViewAnswer extends Component {
    constructor(props) {
        super(props);
    }

    handleClick = (e) => {
        this.props.onSelected(this.props.answerNo, !this.props.checked)
    }

    render() {
        return (
            <div className="no-drag answer" onClick={this.handleClick}>
                {this.props.checked && "Checked "}
                {this.props.answerLabel}
            </div>
        )
    }
}

export default ViewAnswer;