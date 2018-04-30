import React from 'react'
import ChevronLeft from 'react-icons/lib/io/ios-arrow-back'
import ChevronRight from 'react-icons/lib/io/ios-arrow-forward'
import Upload from 'react-icons/lib/io/plus'

export default class Topbar extends React.Component {

  historyButtonStyle = (direction) => {
    return this.props.data.history[direction].length > 0 ? {color : '#808080'} : null
  }

  blurStyling = () => {
    return !this.props.data.window.focused ? {background: '#f6f6f6', color: '#acacac', boxShadow: '0 0 .5px inset'} : {background: null, color: null, boxShadow: null}
  }

  testUpload=()=>{
    console.log('upload')
  }

  render(){
    return(
      <div className="topbar">
          <div className="left-buttons">
            <div className="close-button" style={this.blurStyling()}></div>
            <div className="min-button" style={this.blurStyling()}></div>
            <div className="max-button" style={this.blurStyling()}></div>
          </div>
          <div className="topbar-title">{this.props.data.search ? 'Searching...' : this.props.data.activeFileset.name}</div>
          <div className="forward-back">
            <div className="back" onClick={this.props.updateHistory} style={this.historyButtonStyle('back')}><ChevronLeft/></div>
            <div className="forward" onClick={this.props.updateHistory} style={this.historyButtonStyle('forward')}><ChevronRight/></div>
          </div>
          <a className="upload-botton" onClick={this.testUpload}><Upload /></a>
          <form>
            <input className="search-field" placeholder="Search" onChange={this.props.handleSearch} value={this.props.data.search} style={this.blurStyling()}></input>
          </form>
      </div>
    )
  }
}
