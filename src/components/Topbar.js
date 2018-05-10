import React from 'react'
import ChevronLeft from 'react-icons/lib/io/ios-arrow-back'
import ChevronRight from 'react-icons/lib/io/ios-arrow-forward'
import Upload from 'react-icons/lib/io/plus'
import iconView from '../icons/icon.svg'
import listView from '../icons/list-view.svg'
import columnView from '../icons/column-view.svg'
import ReactSVG from 'react-svg'
export default class Topbar extends React.Component {

  buttonStyle = (direction) => {
    return this.props.data.history[direction].length > 0 ? 'active' : 'inactive'
  }

  viewModeButtonStyle = (target) => {
    if(target === this.props.data.viewMode){
      return "svg-div-clicked"
    }else{
      return "svg-div"
    }
  }

  blurStyling = () => {
    return !this.props.data.window.focused ? {background: '#f6f6f6', color: '#acacac', boxShadow: '0 0 .5px inset'} : {background: null, color: null, boxShadow: null}
  }

  handleUploadClick = () => {
    document.getElementById('getFile').click()
  }

  render(){
    return(
      <div className="topbar" style={this.blurStyling()} onContextMenu={(e) => e.preventDefault()}>
          <div className="left-buttons">
            <div className="close-button" style={this.blurStyling()}></div>
            <div className="min-button" style={this.blurStyling()}></div>
            <div className="max-button" style={this.blurStyling()}></div>
          </div>
          <div className="topbar-title">{this.props.data.search ? 'Searching...' : this.props.data.activeFileset.name}</div>
          <div className="forward-back">
            <a className={this.buttonStyle('back')} id="back" onClick={this.props.updateHistory}><ChevronLeft/></a>
            <a className={this.buttonStyle('forward')} id="forward" onClick={this.props.updateHistory}><ChevronRight/></a>
          </div>
          <form>
            <input id="getFile" type="file" accept={'image/*, audio/*, text/plain, application/pdf'}style={{display: 'none'}} onChange={this.props.uploadButton}></input>
          </form>
          <a className="upload-botton active" onClick={this.handleUploadClick}><Upload /></a>
          <div className="view-mode-nav">
            <div className={this.viewModeButtonStyle("iconView")}><ReactSVG id="iconView" svgClassName="topbar-icon" path={iconView}  onClick={this.props.selectViewMode}/></div>
            <div className={this.viewModeButtonStyle("listView")}><ReactSVG id="listView"svgClassName="topbar-icon" path={listView}  onClick={this.props.selectViewMode}/></div>
            <div className={this.viewModeButtonStyle("columnView")}><ReactSVG id="columnView" svgClassName="topbar-icon" path={columnView}  onClick={this.props.selectViewMode}/></div>
          </div>
          <form>
            <input className="search-field" placeholder="Search" onChange={this.props.handleSearch} value={this.props.data.search} style={this.blurStyling()}></input>
          </form>
      </div>
    )
  }
}
