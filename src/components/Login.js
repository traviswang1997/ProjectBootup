import React, {Component} from 'react';
import firebase from 'firebase';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBNUKkktv8SnbHO51qI4YmIibmq9Pfk300",
    authDomain: "project-boostup.firebaseapp.com",
    projectId: "project-boostup",
    storageBucket: "project-boostup.appspot.com",
    messagingSenderId: "44394633587",
    appId: "1:44394633587:web:10d3bfbb9fd98071bacd06",
    measurementId: "G-83YMYHGN0G"
};

firebase.initializeApp(firebaseConfig);

class Login extends Component{
    
    constructor(){
        super();
        this.state = {
            isLogin: false,
            token: null,
            user: null
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit = () =>{
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive');
        firebase.auth().signInWithPopup(provider)
        .then((result) => {
            this.setState({
                token: result.credential.accessToken,
                user: result.user
            });
            console.log(this.state.user);
            axios.all([
                axios.post('http://localhost:8000/googledrive/token', JSON.stringify({token: this.state.token}), 
                {headers: {'content-type': 'application/json' }})
                    .then(() => console.log('Drive token Created'))
                    .catch(err => {
                    console.error(err);
                    }),
                axios.post('http://localhost:8000/spreadsheet/token', JSON.stringify({token: this.state.token}), 
                {headers: {'content-type': 'application/json' }})
                    .then(() => console.log('Spreadsheet token Created'))
                    .catch(err => {
                    console.error(err);
                    })
            ])
        })
        .catch(function(error){
            console.log(error.message);
        });
    }

    onLogout = () =>{
        firebase.auth().signOut()
        .then(function(){

        }).catch(function(error){

        });
    }

    componentDidMount = () =>{
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                console.log("signed in");
                this.setState({isLogin: true});
                
            }
            else{
                console.log("signed out");
                this.setState({isLogin: false});
            }
        });
    }

    render(){
        return(
            <div className = "googleLogin" align="center">
                {this.state.isLogin === false ? 
                <div>
                    <Button type="primary" onClick={this.onSubmit}>
                        Sign up
                    </Button>
                </div>
                :
                <div>
                    <Button type="primary" onClick={this.onLogout}>
                        Sign out
                    </Button>
                </div>
                }
            </div>
        )
    }
}

export default(Login);