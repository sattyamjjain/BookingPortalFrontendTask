import * as React from "react";
import LoginContainer from '../components/LoginContainer';
import withLayout from '../HOC/withLayout';

class LoginPage extends React.Component{
  render(){
    return (
      <div>
        <LoginContainer/>
      </div>
    );
  }
};

export default withLayout(LoginPage);