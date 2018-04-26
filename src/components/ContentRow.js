import React from 'react'
import AutosizeInput from 'react-input-autosize';

export default class ContentRow extends React.Component {

  checkIfClicked = () => {
    if (this.props.data.clickedRow === this.props.index){
      return {backgroundColor: '#116cd6', color: 'white', border: '2px solid #116cd6'}
    }if (this.props.data.highlightedRow === this.props.index){
      return {backgroundColor: null,  color: null, border: '2px solid #116cd6'}
    }else {
      return {backgroundColor: null, color: null, border: null}
    }
  }

  checkIfRenaming = () => {
    if(this.props.data.renamingFile === this.props.dataid){
      return <td><AutosizeInput
        autoFocus
        maxLength="25"
        name="form-field-name"
        value={this.props.data.newFileName}
        placeholder={this.props.fileInfo.name}
        onChange={this.props.handleNameChange}
        inputStyle={{backgroundColor: this.props.data.newFileName ? 'White' : null}}/>
      </td>
    }else{
      return <td style={this.tdStyling()}>{this.props.fileInfo.name}</td>
    }
  }

  tdStyling = () => {
    if (this.props.data.clickedRow === this.props.index){
      return {backgroundColor: '#116cd6', color: 'white', borderTop: null}
    }if (this.props.data.highlightedRow === this.props.index){
      return {backgroundColor: null,  color: null, borderTop: '2px solid #116cd6'}
    }else {
      return {backgroundColor: null, color: null, borderTop: null}
    }
  }
  renderData = () => {
    return(
      <tr className={"row"} id={this.props.dataid} data-id={this.props.index} onClick={this.props.selectRow} onContextMenu={this.props.renderContextMenu} style={this.checkIfClicked()}>
        {this.checkIfRenaming()}
        <td style={this.tdStyling()}>Jan 1 2000</td>
        <td style={this.tdStyling()}>--</td>
        <td style={this.tdStyling()}>--</td>
      </tr>
    )
  }

  render(){
    return(
      this.renderData()
    )
  }
}
