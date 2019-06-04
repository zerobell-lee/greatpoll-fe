import React, { Component } from 'react';
import { Input, Button, Col, Row } from 'antd';

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
                <Row>
                Answer {this.props.answerNo + 1}
                </Row>
                <Row type='flex' justify='center'>
                    <Col span={22}>
                        <Input size='large' type="text" defaultValue={this.props.label} onChange={this.handleChange} />
                    </Col>
                    <Col span={2}>
                        <Button type='danger' onClick={this.onDelete}>-</Button>
                    </Col>
                </Row>
                
            </div>
        )
    }
}

export default MakeAnswer;