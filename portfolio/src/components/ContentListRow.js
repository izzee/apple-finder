import React from 'react'

export default class ContentListRow extends React.Component {

  checkIfClicked = () => {
    if(parseInt(this.props.clickedRow) === this.props.dataid){
      return {backgroundColor: '#116cd6', color: 'white'}
    }else {
      return {backgroundColor: null, color: null}
    }
  }

  renderData = () => {
    return(
      <tr id={this.props.dataid} onClick={this.props.selectRow}style={this.checkIfClicked()}>
        <td>
          <span style={this.checkIfClicked()}>►</span>
          {this.props.data.name}
        </td>
        <td>{this.props.data.name}</td>
        <td>{this.props.data.name}</td>
        <td>{this.props.data.name}</td>
      </tr>
    )
  }



  render(){
    return(
      this.renderData()
    )
  }
}
