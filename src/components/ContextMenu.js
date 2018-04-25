import React from 'react'

export default class ContextMenu extends React.Component {
  // 
  // renderData = () => {
  //   let props = this.props
  //   return console.log(props)
  // }

  render(){
    return(
      <div className="context-menu">
        {this.renderData()}
      </div>
    )
  }
}
