import React from 'react'

export default class Topbar extends React.Component {
  render(){
    return(
      <div className="topbar">
        <div className="topbar-row-1">
          <div className="left-buttons">
            <div className="close-button"></div>
            <div className="min-button"></div>
            <div className="max-button"></div>
          </div>
          <div className="topbar-title">{this.props.activeContent}</div>
        </div>
        <div className="topbar-row-2">
          <div className="forward-back">
            <div className="back-button">&lt;</div>
            <div className="forward-button">&gt;</div>
          </div>
          <div className="display-modes">

          </div>
          <form>
            <input className="search-field" placeholder="Search"></input>
          </form>
        </div>

      </div>
    )
  }
}
