import React from 'react'
import ChevronLeft from 'react-icons/lib/md/chevron-left'
import ChevronRight from 'react-icons/lib/md/chevron-right';

export default class Topbar extends React.Component {

  checkHistory = () => {
    if(this.props.data.history.length > 0){
      return {color : 'black'}
    }else{
      return null
    }
  }

  checkFuture = () => {
    if (this.props.data.future.length > 0){
      return {color : 'black'}
    }else{
      return null
    }
  }


  render(){
    return(
      <div className="topbar">
          <div className="left-buttons">
            <div className="close-button"></div>
            <div className="min-button"></div>
            <div className="max-button"></div>
          </div>
          <div className="topbar-title">{this.props.data.activeContent}</div>
          <div className="forward-back">
            <div className="back-button" onClick={this.props.historyBack} style={this.checkHistory()}><ChevronLeft/></div>
            <div className="forward-button" onClick={this.props.historyForward} style={this.checkFuture()}><ChevronRight/></div>
          </div>
          <form>
            <input className="search-field" placeholder="Search"></input>
          </form>
      </div>
    )
  }
}
