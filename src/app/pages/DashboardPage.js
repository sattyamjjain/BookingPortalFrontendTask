import * as React from "react";
import DashboardContainer from '../components/DashboardContainer';
import withLayout from '../HOC/withLayout';

class DashboardPage extends React.Component{
  render(){
    return (
      <div>
        <DashboardContainer/>
      </div>
    );
  }
};

export default withLayout(DashboardPage);