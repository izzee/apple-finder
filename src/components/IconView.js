import React from 'react'
import pdfIcon from '../icons/pdf-file-icon.png'
import audioIcon from '../icons/audio-file-icon.png'
import imageIcon from '../icons/image-file-icon.png'
import otherIcon from '../icons/other-file-icon.png'
import AutosizeInput from 'react-input-autosize';

export default class IconView extends React.Component {

  renderIcons = () => {
    let files = this.props.sortRows()
    return files.map(file => {
      return <a key={file.id} className={this.styleActiveFile(files.indexOf(file))} data-id={files.indexOf(file)} id={file.id}>
        <div className="icon-zone">
          <img className='icon-handle' src={this.selectFileIcon(file.filetype)} id={file.id} data-id={files.indexOf(file)} onClick={this.props.selectRow} onContextMenu={this.handleContextMenu} alt={file.filetype}></img>
        </div>
        <span id={file.id} data-id={files.indexOf(file)}  className='icon-handle' onClick={this.props.selectRow} onContextMenu={this.handleContextMenu} style={this.styleRenamingFile(file)}>
          {this.checkIfRenaming(file)}</span>
      </a>}
    )
  }

  getNumRows = () => {
    let width = Math.round(this.props.data.window.width*.55-180)
    return Math.floor(width/130)
  }


  styleIconWrapper = () => {
    let numRows = this.getNumRows()
    if(numRows > 3){return {width: numRows*130}}
  }

  styleRenamingFile = (file) => {
      return this.props.data.renamingFile === file.id ? {border: '3px solid #95bce6'} : null
  }

  checkIfRenaming = (file) => {
    return this.props.data.renamingFile === file.id ?
      <AutosizeInput
        autoFocus
        maxLength="10"
        value={this.props.data.newFileName}
        placeholder={file.name}
        onChange={this.props.handleNameChange}
        inputStyle={{backgroundColor: this.props.data.newFileName ? 'White' : null}}/>
    : file.name
  }

  handleContextMenu = (e) => {
    this.props.selectRow(e)
    this.props.renderContextMenu(e)
  }

  styleActiveFile = (id) => {
    return id === this.props.data.clickedRow ? "file-icon active-file-icon" : "file-icon"
  }

  selectFileIcon = (filetype) => {
    if(filetype){
      if(filetype.includes('audio')){ return audioIcon }
      if(filetype.includes('pdf')){ return pdfIcon }
      if(filetype.includes('image')){ return imageIcon }
      else{ return otherIcon }
    }else{ return otherIcon }
  }

  preventScroll = () =>{
    return (this.props.data.contextMenu.target) ? {overflow: 'hidden'} : {overflow: null}
  }


  render(){
    return(
      <div className="icon-view-window" onContextMenu={this.props.renderContextMenu} style={this.preventScroll()}>
        <nav className="icon-view-wrapper" style={this.styleIconWrapper()}>{this.renderIcons()}</nav>
      </div>
    )
  }

}
