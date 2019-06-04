import React, {Component} from 'react';
import MakeAnswer from './MakeAnswer';
import { Input, InputNumber, Button, Row, Col } from 'antd';

class MakeQuestion extends Component {

    constructor(props) {
        super(props)
        console.log(props)
        this.handleChange.bind(this)
        this.addAnswer.bind(this)
    }

    handleChange = (e) => {
        this.props.changeQuestionLabel(this.props.questionNo, e.target.value)
    }

    addAnswer = (e) => {
        this.props.addAnswer(this.props.questionNo)
    }

    deleteQuestion = (value) => {
        this.props.deleteQuestion(this.props.questionNo)
    }

    handleShouldSelectChange = (value) => {
        this.props.changeShouldSelect(this.props.questionNo, value)
    }

    render() {
        return (
            <div className="question-container">
                <Row justify='space-around' align='middle'>
                    <Col span={1}>
                        <h3>Q{this.props.questionNo + 1}.</h3>
                    </Col>
                    <Col span={22}>
                        <Input size='large' defaultValue={this.props.questionLabel} onChange={this.handleChange}/>
                    </Col>
                    <Col span={1}>
                        <Button type='danger' onClick={this.deleteQuestion}>
                            -
                        </Button>
                    </Col>
                </Row>
                Should Select
                <InputNumber size='large' min={1} max={this.props.answers.length - 1} defaultValue={this.props.shouldSelect} onChange={this.handleShouldSelectChange} />
                
                {this.props.answers.map(e => {
                    return (
                        <MakeAnswer 
                        questionNo={this.props.questionNo} 
                        answerNo={e.answerNo} 
                        key={e.uuid}
                        label={e.label} 
                        changeAnswerLabel={this.props.changeAnswerLabel}
                        deleteAnswer={this.props.deleteAnswer}/>
                    )
                })}
                <Button onClick={this.addAnswer}>
                    Add answer
                </Button>
                
            </div>
            
        )
    }

}

export default MakeQuestion;