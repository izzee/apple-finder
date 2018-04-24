import React from 'react'

export default class Sidebar extends React.Component {

  checkIfSelected = (key) => {
    if(this.props.data.activeContent === key){
      return {backgroundColor: '#d8dfe8'}
    }else {
      return {backgroundColor: null}
    }
  }

  renderSidebar = () => {
    let filesets = Object.keys(this.props.data.files)
    return filesets.map(key => {
      return <li
        key={filesets.indexOf(key)}
        id={key}
        onClick={this.props.selectFileset}
        style={this.checkIfSelected(key)}>
          {key}
        </li>
    })

  }

  render(){
    return(
      <div className="sidebar">
        <h5>Favorites</h5>
        <ul>{this.renderSidebar()}</ul>
      </div>
    )
  }
}
