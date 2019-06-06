import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Home, UserPage, MakePoll, ViewPoll, SearchResult } from '../pages';
import Header from '../components/Header';
import './App.css';
import SearchBar from '../components/SearchBar';


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
                <SearchBar/>
                <Header myId={this.state.myId}/>
                <div id="App-container">
                    <Route exact path="/" render={() => <Home onAuthed={this.setMyPage}/>}/>
                    <Route exact path="/view/:pollNo" component={ViewPoll}/>
                    <Route exact path="/user/:userId" component={UserPage}/>
                    <Route exact path="/write" component={MakePoll}/>
                    <Route exact path="/search/:query" component={SearchResult} />
                </div>
            </div>
        )
    }
}

export default App;