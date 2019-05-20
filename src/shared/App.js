import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Home, UserPage, MakePoll, ViewPoll } from '../pages';
import Header from '../components/Header';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            myId: null
        }
        this.setMyPage.bind(this)
    }

    setMyPage = (userId) => {
        this.setState({myId: userId})
    }

    render() {
        return (
            <div className="App">
                <Header myId={this.state.myId}/>
                <div>
                    <Route exact path="/" render={() => <Home onAuthed={this.setMyPage}/>}/>
                    <Route exact path="/view/:pollNo" component={ViewPoll}/>
                    <Route exact path="/user/:userId" component={UserPage}/>
                    <Route exact path="/write" component={MakePoll}/>
                </div>
            </div>
        )
    }
}

export default App;