import React, { Component } from 'react';

class MakePoll extends Component {

    constructor(props) {
        super(props)
        this.state = { data: 
            {
                title: "",
                questions: [
                    {
                        label: "",
                        answers: [
                            {label: ""},
                            {label: ""},
                            {label: ""}
                        ]
                    }]
            }}
        this.handleQnAChange.bind(this)
        this.handleTitleChange.bind(this)
        this.submit.bind(this)
    }

    handleQnAChange = e => {
        const { state } = this;
        const info = e.target.id.split('-');

        if (info.length === 2) {
            state.questions[parseInt(info[1]) - 1].label = e.target.value
        }
        else {
            state.questions[parseInt(info[1]) - 1].answers[parseInt(info[3]) - 1].label = e.target.value
        }

        this.setState(state);
    }

    handleTitleChange = e => {
        this.setState({...this.state, title: e.target.value})
    }

    submit = e => {
        console.log(this.state)
    }

    render() {
        return (
            <div>
                <form>
                    <h1>Poll Title</h1>
                    <input type="test" placeholder="input title here" value={this.state.title} onChange={this.handleTitleChange} />
                    <h2>Question 1</h2>
                    <input type="text" id="q-1" placeholder="input your question" value={this.state.questions[0].label} onChange={this.handleQnAChange}/>
                    <p>Answer 1</p>
                    <input type="text" id="q-1-a-1" placeholder="input your answer" value={this.state.questions[0].answers[0].label} onChange={this.handleQnAChange}/>
                    <p>Answer 2</p>
                    <input type="text" id="q-1-a-2" placeholder="input your answer" value={this.state.questions[0].answers[1].label} onChange={this.handleQnAChange}/>
                    <p>Answer 3</p>
                    <input type="text" id="q-1-a-3" placeholder="input your answer" value={this.state.questions[0].answers[2].label} onChange={this.handleQnAChange}/>
                    <br/>
                    <input type="button" value="submit" onClick={this.submit} />
                </form>
            </div>
        )
    }
}

export default MakePoll;