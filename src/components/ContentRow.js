import React from 'react'

export default class ContentRow extends React.Component {

  checkIfClicked = () => {
    if (this.props.clickedRow === this.props.dataid){
      return {backgroundColor: '#116cd6', color: 'white'}
    }else {
      return {backgroundColor: null, color: null}
    }
  }

  renderData = () => {
    return(
      <tr id={this.props.dataid} onClick={this.props.selectRow} style={this.checkIfClicked()}>
        <td style={this.checkIfClicked()}>
          {this.props.data.name}
        </td>
        <td>Jan 1 2000</td>
        <td>--</td>
        <td>--</td>
      </tr>
    )
  }

  render(){
    return(
      this.renderData()
    )
  }
}
