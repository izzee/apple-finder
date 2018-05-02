import React from 'react'
import docicon from '../icons/docs.png'
import picicon from '../icons/pics.png'

export default class Sidebar extends React.Component {

  checkIfSelected = (folder) => {
    if(this.props.data.activeFileset.name === folder.name){
      return {backgroundColor: '#d8dfe8'}
    }else {
      return {backgroundColor: null}
    }
  }

  selectFolderIcon = (id) => {
  //   if(id === 1){
  //     return <img src={docicon}></img>
  //   })
  //
  //   console.log(id)
}

  renderSidebar = () => {
    return this.props.data.folders.map(folder => {
      return <li
        key={folder.id}
        id={folder.name}
        onClick={this.props.selectFileset}
        style={this.checkIfSelected(folder)}>
          {this.selectFolderIcon(folder.id)}
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
