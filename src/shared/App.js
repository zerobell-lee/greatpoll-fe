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
            myId: null,
            infiniteScrollHandler: {
                enabled: true,
                fetchFunc: () => { console.log('infinite') }
            }
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
                    <Route exact path="/" render={() => <Home onAuthed={this.setMyPage} changeInfiniteScrollHandler={this.changeInfiniteScrollHandler}/>}/>
                    <Route exact path="/view/:pollNo" component={ViewPoll}/>
                    <Route exact path="/user/:userId" render={({match}) => <UserPage match={match} myId={this.state.myId} changeInfiniteScrollHandler={this.changeInfiniteScrollHandler}/>} />
                    <Route exact path="/write" component={MakePoll}/>
                    <Route exact path="/search/:query" render={({match}) => <SearchResult match={match} changeInfiniteScrollHandler={this.changeInfiniteScrollHandler} />} />
                </div>
            </div>
        )
    }

    _infiniteScroll = () => {
        if (this.state.infiniteScrollHandler.enabled === false) return;
        let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        let clientHeight = document.documentElement.clientHeight;
        
        if (scrollTop + clientHeight === scrollHeight) {
            this.state.infiniteScrollHandler.fetchFunc()
        }
    }

    changeInfiniteScrollHandler = (enabled, fetchFunc) => {
        this.setState({infiniteScrollHandler: {enabled, fetchFunc}})
    }

    componentDidMount() {
        window.addEventListener('scroll', this._infiniteScroll, true)
    }
}

export default App;