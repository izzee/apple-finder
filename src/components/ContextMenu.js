import React from 'react'
import Arrow from 'react-icons/lib/io/ios-play'
import Check from 'react-icons/lib/io/checkmark'

export default class ContextMenu extends React.Component {

  setPosition = () => {
    if (this.props.info.target){
      return {display: 'block', left: this.props.info.x-2, top: this.props.info.y-2, opacity: '1'}
    }else{
      return {display: 'none', left: null, top: null, opacity: null}
    }

  }

  handleClick = (e) => {
    if(e.currentTarget.innerText === 'Rename'){
      this.props.renameFile()
    }
  }

  hoverSecondaryMenu = (e) => {
    this.props.renderSecondaryMenu(e)
  }

  secondaryMenuStyle = () => {
    if(this.props.info.secondary === 'View'){
      return {display: 'block', left: this.props.info.x+123, top: this.props.info.y+35}
    }if(this.props.info.secondary === 'Arrange By'){
      return {display: 'block', left: this.props.info.x+123, top: this.props.info.y+53}
    }
  }



  hoverStyle = (target) => {
    return target === this.props.info.secondary ?
      {backgroundColor: '#5296fa', color: 'white'} : null
  }

  checkMark = (target) => {
    if(!this.props.sorted.by && target === 'None'){ return <Check />}
    return target === this.props.sorted.by ?
    <Check /> : <Check style={{visibility: 'hidden'}}/>
  }

  secondaryMenuContent = () => {
    if(this.props.info.secondary === 'Arrange By'){
      return <ul>
        <li onClick={this.props.selectSortBy}>{this.checkMark('Name')}<span>Name</span></li>
        <li onClick={this.props.selectSortBy}>{this.checkMark('Date Modified')}<span>Date Modified</span></li>
        <li onClick={this.props.selectSortBy}>{this.checkMark('Size')}<span>Size</span></li>
        <li onClick={this.props.selectSortBy}>{this.checkMark('None')}<span>None</span></li>
      </ul>
    }
  }

  renderContextMenu = () => {
    if(this.props.info.target === 'folder'){
      return <ul>
        <li onMouseEnter={this.hoverSecondaryMenu}>New Folder</li>
        <hr></hr>
        <li onMouseEnter={this.hoverSecondaryMenu} onMouseOut={this.hoverSecondaryMenu} style={this.hoverStyle('View')}>
          View <Arrow /></li>
        <li onMouseEnter={this.hoverSecondaryMenu} onMouseOut={this.hoverSecondaryMenu} style={this.hoverStyle('Arrange By')}>
          Arrange By<Arrow /></li>
        <hr></hr>
        <li onMouseEnter={this.hoverSecondaryMenu}>Upload a File</li>
      </ul>
    }else{
      return <ul>
        <li onClick={this.handleClick}>Open</li>
        <hr></hr>
        <li onClick={this.handleClick}>Rename</li>
        <li onClick={this.handleClick}>Download</li>
        <li onClick={this.handleClick}>Copy Link</li>
        <hr></hr>
        <li onClick={this.handleClick}>Move to Trash</li>
      </ul>
    }
  }

  render(){
    return(
      <div>
        <div className="context-menu" style={this.setPosition()}
        onContextMenu={(e) => e.preventDefault()}>
        {this.renderContextMenu()}</div>
        <div className="secondary-context-menu" style={this.secondaryMenuStyle()}>
          {this.secondaryMenuContent()}
        </div>
      </div>
    )
  }
}
