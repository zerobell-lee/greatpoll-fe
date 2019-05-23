import React, { Component } from 'react';

class MakeAnswer extends Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.handleChange.bind(this)
    }

    handleChange = (e) => {
        this.props.changeAnswerLabel(this.props.questionNo, this.props.answerNo, e.target.value)
    }

    render() {
        return (
            <div>
                Answer
                <input type="text" defaultValue={this.props.label} onChange={this.handleChange} />
            </div>
        )
    }
}

export default MakeAnswer;