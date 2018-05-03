import React from 'react'
import docicon from '../icons/docs.png'
import picicon from '../icons/pics.png'

export default class Sidebar extends React.Component {

  checkIfSelected = (folder) => {
    if(this.props.data.contextMenu.targetRow === folder.name){
      return {backgroundColor: null, border: '2px solid 365cc8', borderRadius: '5px'}
    }
    else if(this.props.data.activeFileset.name === folder.name){
      return {backgroundColor: '#d8dfe8', border: '2px solid #d8dfe8'}
    } else {
      return {backgroundColor: null}
    }
  }

  renderSidebar = () => {
    return this.props.data.folders.map(folder => {
      return <li
        key={folder.id}
        id={folder.name}
        onClick={this.props.selectFileset}
        onContextMenu={this.props.renderContextMenu}
        style={this.checkIfSelected(folder)}>
          {folder.name}
        </li>
    })
  }

  render(){
    return(
      <div className="sidebar" onContextMenu={this.props.renderContextMenu}>
        <h5>Favorites</h5>
        <ul className='folders'>{this.renderSidebar()}</ul>
      </div>
    )
  }
}
