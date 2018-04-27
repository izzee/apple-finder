import React from 'react'
import ChevronLeft from 'react-icons/lib/md/chevron-left'
import ChevronRight from 'react-icons/lib/md/chevron-right';
import TH from 'react-icons/lib/ti/th-large-outline'

export default class Topbar extends React.Component {



  historyButton = e => {
    console.log(e.currentTarget.className)
    if(e.currentTarget.className === 'back-button'){
      this.props.updateHistory('back')
    }if(e.currentTarget.className === 'forward-button'){
      this.props.updateHistory('forward')
    }
  }

  historyButtonStyle = (direction) => {
    return this.props.data.history[direction].length > 0 ? {color : '#808080'} : null
  }

  blurStyling = () => {
    return !this.props.data.window.focused ? {background: '#f6f6f6', color: '#acacac', boxShadow: '0 0 .5px inset'} : null
  }

  render(){
    return(
      <div className="topbar" style={this.blurStyling()}>
          <div className="left-buttons">
            <div className="close-button" style={this.blurStyling()}></div>
            <div className="min-button" style={this.blurStyling()}></div>
            <div className="max-button" style={this.blurStyling()}></div>
          </div>
          <div className="topbar-title">{this.props.data.search ? 'Searching...' : this.props.data.activeContent}</div>
          <div className="forward-back">
            <div className="back-button" onClick={this.historyButton} style={this.historyButtonStyle('back')}><ChevronLeft/></div>
            <div className="forward-button" onClick={this.historyButton} style={this.historyButtonStyle('forward')}><ChevronRight/></div>
          </div>
          {/* <nav className="view-options">
            <div><TH/></div>
            <div></div>
            <div></div>
          </nav> */}
          <form>
            <input className="search-field" placeholder="Search" onChange={this.props.handleSearch} value={this.props.data.search} style={this.blurStyling()}></input>
          </form>
      </div>
    )
  }
}
