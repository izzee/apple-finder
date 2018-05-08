import React from 'react'
import docIcon from '../icons/doc.ico'
import picIcon from '../icons/pics.ico'
import folderIcon from '../icons/folder.ico'
import musicIcon from '../icons/music.ico'

export default class Sidebar extends React.Component {

  checkIfSelected = (folder) => {
    if(this.props.data.contextMenu.targetRow === folder){
      return {backgroundColor: null, border: '2px solid 365cc8', borderRadius: '5px'}
    }
    else if(this.props.data.activeFileset.name === folder){
      return {backgroundColor: '#d8dfe8', border: '2px solid #d8dfe8'}
    } else {
      return {backgroundColor: null}
    }
  }

  selectIcon = (folder) => {
    if(folder === 'Documents'){
      return <img src={docIcon} alt="doc"></img>
    }if(folder === 'Pictures'){
      return <img src={picIcon} alt="pics"></img>
    }if(folder === 'Music'){
      return <img src={musicIcon} alt="music"></img>
    }else{
      return <img src={folderIcon} alt="folder"></img>
    }
  }

  renderSidebar = () => {
    return this.props.data.folders.map(folder => {
      return <li
        key={folder.id}
        id={folder.name}
        onClick={this.props.selectFileset}
        onContextMenu={this.props.renderContextMenu}
        style={this.checkIfSelected(folder.name)}>
          {this.selectIcon(folder.name)}
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
