import React from 'react'

export default class ContentRow extends React.Component {

  checkIfClicked = () => {
    if (this.props.clickedRow === this.props.index){
      return {backgroundColor: '#116cd6', color: 'white'}
    }else {
      return {backgroundColor: null, color: null}
    }
  }
  logRightClick = (e) => {
    console.log(e.type)
  }

  renderData = () => {
    return(
      <tr id={this.props.dataid} data-id={this.props.index} onClick={this.props.selectRow} onContextMenu={this.props.renderContextMenu} style={this.checkIfClicked()}>
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
