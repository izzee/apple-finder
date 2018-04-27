import React from 'react'

export default class Sidebar extends React.Component {

  checkIfSelected = (folder) => {
    if(this.props.data.activeContent === folder.name){
      return {backgroundColor: '#d8dfe8'}
    }else {
      return {backgroundColor: null}
    }
  }

  renderSidebar = () => {
    return this.props.data.folders.map(folder => {
      return <li
        key={folder.id}
        id={folder.name}
        onClick={this.props.selectFileset}
        style={this.checkIfSelected(folder)}>
          {folder.name}
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
