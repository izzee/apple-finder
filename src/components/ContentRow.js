import React from 'react'

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
      <tr id={this.props.dataid} data-id={this.props.index} onClick={this.props.selectRow} onContextMenu={this.props.renderContextMenu} style={this.checkIfClicked()}>
        <td className="row" style={this.tdStyling()}>
          {this.props.fileInfo.name}
        </td>
        <td className="row" style={this.tdStyling()}>Jan 1 2000</td>
        <td className="row" style={this.tdStyling()}>--</td>
        <td className="row" style={this.tdStyling()}>--</td>
      </tr>
    )
  }

  render(){
    return(
      this.renderData()
    )
  }
}
