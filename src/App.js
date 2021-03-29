import './App.css';
import Login from './components/Login.js';
import Home from './components/Home.js';
import ClientForm from './components/ClientForm.js';
import Bitbucket from './components/Bitbucket.js';
import Slack from './components/Slack.js';



import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import SideMenu from './components/SideMenu.js';
import {Layout} from 'antd';
import 'antd/dist/antd.css';

import React, {Component} from 'react';



/*
login
top menu
client informationls
1.harvest
2.KPI tracker
3.invocing
4.bitbucket 
5.google drive folder
6.issue log
7.trello
8.risk assessment
9.xero contact
10.slack channel
11.requirement register
12.issue register
13.(post everything to slack)
14.google calendar
15.developer/designer briefing
16.checklist
17.schedule document
18.
*/

const { Header, Footer, Content } = Layout;


class App extends Component {

  constructor(props){
    super(props);
    this.state={apiResponse:"null"};
    
  }

  callAPI(){
    fetch("http://localhost:8000/harvest")
    .then(res =>res.text())
    .then(res => this.setState({apiResponse:res}));
  }

  componentWillMount(){
    this.callAPI();
  }


  render() {
    return (
      <div className='App'>
        
        <Layout>
          <Layout style={{ minHeight: '100vh' }}>
            <Router> 
              <SideMenu/>
              <Layout>
                <Header>
                  <h2 style={{color: 'darkgray'}}>James Anthony Consulting - Project Boostup</h2>
                </Header>
                <Content>
                  <Switch>
                    <Route exact path="/home" render={props => <Home {...props} />} /> 
                    <Route exact path="/login" render={props => <Login {...props} />} /> 
                    <Route exact path="/project" render={props => <ClientForm {...props} />} /> 
                    <Route exact path="/bitbucket" render={props => <Bitbucket {...props} />} /> 
                    <Route exact path="/slack" render={props => <Slack {...props} />} /> 
                  </Switch>
                </Content>
                <Footer>
                  <h1>Harvest Template Without Access</h1>
                  <p>{this.state.apiResponse}</p>
                </Footer>
              </Layout>
            </Router>
          </Layout>
        </Layout>
        
      </div>
    );
  }
}

export default App;
