import React from 'react'
import ChevronLeft from 'react-icons/lib/md/chevron-left'
import ChevronRight from 'react-icons/lib/md/chevron-right';
import TH from 'react-icons/lib/ti/th-large-outline'

export default class Topbar extends React.Component {

  checkHistory = () => {
    if(this.props.data.history.length > 0){
      return {color : '#808080'}
    }else{
      return null
    }
  }

  checkFuture = () => {
    if (this.props.data.future.length > 0){
      return {color : '#808080'}
    }else{
      return null
    }
  }

  renderMobileVersion = () => {
    if(this.props.mobileVersion()){
      return {gridColumn: '1/4'}
    }else{
      return {gridColumn : null}
    }
  }

  blurStyling = () => {
    if(!this.props.data.focused){
      return {background: '#f6f6f6', color: '#acacac', boxShadow: '0 0 .5px inset'}
    }else{
      return {background: null, color: null, boxShadow: null}
    }
  }

  render(){
    return(
      <div className="topbar" style={this.renderMobileVersion(), this.blurStyling()}>
          <div className="left-buttons">
            <div className="close-button" style={this.blurStyling()}></div>
            <div className="min-button" style={this.blurStyling()}></div>
            <div className="max-button" style={this.blurStyling()}></div>
          </div>
          <div className="topbar-title">{this.props.data.search ? 'Searching...' : this.props.data.activeContent}</div>
          <div className="forward-back">
            <div className="back-button" onClick={this.props.historyBack} style={this.checkHistory()}><ChevronLeft/></div>
            <div className="forward-button" onClick={this.props.historyForward} style={this.checkFuture()}><ChevronRight/></div>
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
