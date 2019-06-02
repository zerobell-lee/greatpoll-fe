import React, { Component } from 'react';
import { Input, Button } from 'antd';

class MakeAnswer extends Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.handleChange.bind(this)
    }

    handleChange = (e) => {
        this.props.changeAnswerLabel(this.props.questionNo, this.props.answerNo, e.target.value)
    }

    onDelete = (e) => {
        this.props.deleteAnswer(this.props.questionNo, this.props.answerNo)
    }

    render() {
        return (
            <div>
                Answer
                <Input size='large' type="text" defaultValue={this.props.label} onChange={this.handleChange} />
                <Button onClick={this.onDelete}>Delete This</Button>
            </div>
        )
    }
}

export default MakeAnswer;