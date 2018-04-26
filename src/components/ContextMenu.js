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

  render(){
    return(
      <div className="context-menu" style={this.setPosition()}>
        <p>{this.props.info.target}</p>
      </div>
    )
  }
}
