import React from 'react'

export default class ContextMenu extends React.Component {
  //
  setPosition = () => {
    if (this.props.info){
      return {display: 'block', left: this.props.info.x-2, top: this.props.info.y-2, opacity: '1'}
    }else{
      return {display: null, left:null, top: null, opacity: null}
    }

  }

  handleClick = e => {
    console.log(e.currentTarget.innerText)
    console.log(this.props.info.target)
  }

  render(){
    return(
      <div className="context-menu" style={this.setPosition()}>
        <ul>
          <li onClick={this.handleClick}>Open</li>
          <hr></hr>
          <li onClick={this.handleClick}>Rename</li>
          <li onClick={this.handleClick}>Download</li>
          <li onClick={this.handleClick}>Copy Link</li>
          <hr></hr>
          <li onClick={this.handleClick}>Move to Trash</li>
        </ul>
      </div>
    )
  }
}
