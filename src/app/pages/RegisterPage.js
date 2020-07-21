import * as React from "react";
import RegisterContainer from '../components/RegisterContainer';
import withLayout from '../HOC/withLayout';

class RegisterPage extends React.Component{
  render(){
    return (
      <div>
        <RegisterContainer/>
      </div>
    );
  }
};

export default withLayout(RegisterPage);