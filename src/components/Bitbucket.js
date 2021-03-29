import React, {Component} from 'react';
import axios from 'axios';


class Bitbucket extends Component {
    constructor(props) {
        super(props);
    
        this.state = {key: '', isAuthenticated: false, user: null, token: ''};
        this.bitbucketLogin = this.bitbucketLogin.bind(this);
    }

    componentDidMount() {
        let params = window.location.hash.split('&');
        
        if (params.length > 0 && params[0].startsWith('#access_token=')) {
          let key = decodeURIComponent(params[0].replace('#access_token=', ''));
          axios.post('http://localhost:8000/bitbucket/token', JSON.stringify({key}), 
            {headers: {'content-type': 'application/json' }})
                .then(() => console.log('bitbucket token Created'))
                .catch(err => {
                console.error(err);
            })
        }
    }

    bitbucketLogin(){
        let key = 'aXgAyMr67qNSdcnNkn';
        window.location = `https://bitbucket.org/site/oauth2/authorize?client_id=${key}&response_type=token`;
    }

    render() {
        // let content = !!this.state.isAuthenticated ?
        //   (
        //     <div>
        //       <p>Authenticated</p>
        //       <div>
        //         {this.state.user.email}
        //       </div>
        //       <div>
        //         <button onClick={this.logout} className="button" >
        //           Log out
        //         </button>
        //       </div>
        //     </div>
        //   ) :
        //   (
        //     <button onClick={this.bitbucketLogin} className="button">
        //       Bitbucket Login
        //     </button>);
    
        return (
          <div className="App">
            <button onClick={this.bitbucketLogin} className="button">
              Bitbucket Login
            </button>
          </div>
        );
      }
}


export default Bitbucket;