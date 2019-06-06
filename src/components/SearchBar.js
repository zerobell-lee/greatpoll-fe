import React, { Component } from 'react';
import config from '../global-config';
import { withRouter } from 'react-router-dom';
import './SearchBar.css';
import { AutoComplete, Input, Button, Icon } from 'antd';


class SearchBar extends Component {

    constructor(props) {
        super(props)
        this.state = { value: '', dataSource : [] }
    }

    requestSuggestion = async (value) => {
        
        if (value.length < 2) this.setState({dataSource: []})

        const dataSource = await fetch(config.host + '/api/suggest?query=' + value)
        .then(res => res.json())
        .catch(err => { console.log(err); return [] });

        this.setState({value, dataSource})
    }

    handleSearch = () => {
        const {value} = this.state;
        this.props.history.push({pathname: `/search/${value}`});
    }

    render() {

        const { dataSource } = this.state;

        return(<div className='searchBar'>
            <AutoComplete
            dataSource={dataSource}
            size='large'
            onSearch={this.requestSuggestion}
            placeholder='search poll...'
            style={
                {
                    width: '100%',
                    marginTop: '5%',
                    paddingLeft: '10%',
                    paddingRight: '10%'
                }
            }
            >
             <Input suffix={
                 <Button className='search-btn' size='large' type='primary' onClick={this.handleSearch}>
                     <Icon type='search' />
                 </Button>
             }
             style={
                 {
                     marginRight: '0px'
                 }
             }
              />
             </AutoComplete>
             </div>
        )
    }
}

export default withRouter(SearchBar);