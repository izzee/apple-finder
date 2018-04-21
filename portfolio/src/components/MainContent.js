import React from 'react'
import Sidebar from './Sidebar'
import ContentList from './ContentList'

export default class MainContent extends React.Component {


  render(){
    return(
      <div className="main-content">
        <Sidebar data={this.props.data} selectFileset={this.props.selectFileset}/>
        <ContentList data={this.props.data} selectRow={this.props.selectRow}/>
      </div>
    )
  }
}
