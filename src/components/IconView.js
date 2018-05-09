import React from 'react'
import pdfIcon from '../icons/pdf-file-icon.png'
import audioIcon from '../icons/audio-file-icon.png'
import imageIcon from '../icons/image-file-icon.png'
import otherIcon from '../icons/other-file-icon.png'

export default class IconView extends React.Component {

  renderIcons = () => {
    let files = this.props.sortRows()
    return files.map(file => {
      return <a key={file.id} className={this.styleActiveFile(files.indexOf(file))} onClick={this.props.selectRow} data-id={files.indexOf(file)} id={file.id} onContextMenu={this.props.renderContextMenu}>
        <div className="icon-zone">
          {this.selectFileIcon(file.filetype)}
        </div>
        <p>{file.name}</p>
      </a>}
    )
  }

  styleActiveFile = (id) => {
    if(id === this.props.data.clickedRow){
      return "file-icon active-file-icon"
    }else{
      return "file-icon"
    }
  }

  selectFileIcon = (filetype) => {
    if(filetype){
      if(filetype.includes('audio')){
         return <img src={audioIcon}></img>
      }if(filetype.includes('pdf')){
        return <img src={pdfIcon}></img>
      }if(filetype.includes('image')){
        return <img src={imageIcon}></img>
      }else{
        return <img src={otherIcon}></img>
      }
    }else{
      return <img src={otherIcon}></img>
    }
  }

  render(){
    return(
      <div className="icon-view-window" onContextMenu={this.props.renderContextMenu}>
        <nav className="icon-view-wrapper">{this.renderIcons()}</nav>
      </div>
    )
  }

}
