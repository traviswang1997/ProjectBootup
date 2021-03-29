import React, {Component} from 'react';
import axios from 'axios';


class Slack extends Component {
    constructor(props) {
        super(props);
    
        this.state = {access_token: null, isAuthenticated: false, user: null, token: ''};
        this.slackLogin = this.slackLogin.bind(this);
    }
    //curl -F code=1833659972213.1834164440278.84b519c0feb0eb9291d55c6d3cb57c9aa847e3dbdecc8c7da5f2231cf38f7ec3 -F client_id=1833659972213.1836953205635 -F client_secret=baf62d9108b6eab2002929b16bd3c3d5 https://slack.com/api/oauth.v2.access

    componentDidMount() {
      if(window.location.href.includes('code=')){
        console.log('ok')
        let params = window.location.href.split('?');
        let codeParam = params[1].split('&')
        if (codeParam.length > 0 && codeParam[0].startsWith('code=')) {
          let key = decodeURIComponent(codeParam[0].replace('code=', ''));
          //console.log(key)
          const body = new FormData();
          body.append('code', key);
          body.append('client_id','1833659972213.1836953205635');
          body.append('client_secret','baf62d9108b6eab2002929b16bd3c3d5');
          axios.post(
            'https://slack.com/api/oauth.v2.access',
            body,
            {headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
            //https://traviswang.builtwithdark.com/oauth-redirect
          )
          .then((response) => {
            this.setState({access_token: response.data.access_token})
            console.log(response)
            axios.post('http://localhost:8000/slack/token', JSON.stringify({access_token: this.state.access_token}), 
              {headers: {'content-type': 'application/json' }})
              .then(() => console.log('slack token Created'))
              .catch(err => {
                console.error(err);
              })
          }).catch(err => console.error(err));
        }
      }
      
    }

    slackLogin(){
        let key = '1833659972213.1836953205635';
        window.location = 'https://slack.com/oauth/v2/authorize?client_id=1833659972213.1836953205635&scope=channels:manage,chat:write,chat:write.public&user_scope=channels:write,groups:write,chat:write';
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
            <button onClick={this.slackLogin} className="button">
              Slack Login
            </button>
          </div>
        );
      }
}


export default Slack;