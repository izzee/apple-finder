import React from 'react'
import AutosizeInput from 'react-input-autosize';
import moment from 'moment'
import formatBytes from 'format-bytes'



export default class ContentRow extends React.Component {

  checkIfRenaming = () => {
    return this.props.data.renamingFile === parseInt(this.props.dataid,10) ?
      <AutosizeInput
        autoFocus
        maxLength="25"
        value={this.props.data.newFileName}
        placeholder={this.props.fileInfo.name}
        onChange={this.props.handleNameChange}
        inputStyle={{backgroundColor: this.props.data.newFileName ? 'White' : null}}/>
    : this.props.fileInfo.name
  }

  checkIfClicked = () => {
    if (this.props.data.clickedRow === this.props.index){
      return {backgroundColor: '#116cd6', color: 'white', border: '2px solid #116cd6'}
    }if (this.props.data.contextMenu.targetRow === this.props.index){
      return {backgroundColor: null,  color: null, border: '2px solid #116cd6'}
    }else {
      return {backgroundColor: null, color: null, border: null}
    }
  }

  tdStyling = () => {
    if (this.props.data.clickedRow === this.props.index){
      return {backgroundColor: '#116cd6', color: 'white', borderTop: null}
    }if (this.props.data.contextMenu.targetRow === this.props.index){
      return {backgroundColor: null,  color: null, borderTop: '2px solid #116cd6'}
    }else {
      return {backgroundColor: null, color: null, borderTop: null}
    }
  }

  renderFileType = () => {
    let fileType=this.props.fileInfo.filetype
    if(fileType){
      if(fileType.includes('image')){ return 'Image'}
      if(fileType.includes('document')
      || fileType.includes('pdf')){ return 'Document'}
      if(fileType.includes('video')){return 'Video'}
      if(fileType.includes('audio')){return 'Audio'}
      else{return 'Other'}
    }else{return '--'}
  }

  renderFileSize = () => {
    let fileSize = this.props.fileInfo.size
    return fileSize ? formatBytes(fileSize) : '--'
  }

  renderFileDate = () => {
    let fileDate = this.props.fileInfo.updated_at
    if (moment().format('D') === moment(fileDate).format('D')){
      return moment(fileDate).format('[Today at] h:mm A');
    }else if(moment().add(-1, 'days').format('D') === moment(fileDate).format('D')){
      return moment(fileDate).format('[Yesterday at] h:mm A');
    }else{
      return moment(fileDate).format('MMM D, YYYY [at] h:mm A');
    }
  }

  renderData = () => {
    return(
      <tr className="row" key={this.props.dataid} id={this.props.dataid} data-id={this.props.index} onClick={this.props.selectRow} onContextMenu={this.props.renderContextMenu} style={this.checkIfClicked()}>
        <td style={this.tdStyling()}>{this.checkIfRenaming()}</td>
        <td style={this.tdStyling()}>{this.renderFileDate()}</td>
        <td style={this.tdStyling()}>{this.renderFileSize()}</td>
        <td style={this.tdStyling()}>{this.renderFileType()}</td>
      </tr>
    )
  }

  render(){
    return(
      this.renderData()
    )
  }
}
