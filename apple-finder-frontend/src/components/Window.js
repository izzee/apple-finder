import React from 'react'
import {files} from '../Data'
import Topbar from './Topbar'
import Sidebar from './Sidebar'
import ContentList from './ContentList'

export default class Window extends React.Component {

  constructor(){
    super()
    this.state = {
      files : files,
      activeContent : 'Documents',
      clickedRow : null,
      sortBy : null,
      ascending : false
    }
  }

  componentDidMount = () => {
    document.addEventListener("keydown", this.handleKeydown)
  }

  handleKeydown = e => {
    let row = this.state.clickedRow
    let activeFiles = this.state.files[this.state.activeContent]
    if(e.keyCode === 38){this.setState({clickedRow : row>0 ? row-1 : activeFiles.length-1})}
    else if(e.keyCode === 40){this.setState({clickedRow : row<activeFiles.length-1 ? row+1 : 0})}
  }

  selectRow = e => {
    if(parseInt(e.currentTarget.id, 10) === this.state.clickedRow){console.log('2x clicked')}
    this.setState({clickedRow: parseInt(e.currentTarget.id)})
  }

  selectFileset = e => {
    if(e.currentTarget.id !== this.state.activeContent){this.setState({clickedRow : null, sortBy : null})}
    this.setState({activeContent: e.currentTarget.id})
  }

  selectSortBy = e => {
    let category = e.currentTarget.querySelector('span').innerText
    if (this.state.sortBy === category){
      this.setState({ascending : !this.state.ascending})
    }else{
      this.setState({sortBy: category})
    }
  }

  render() {
    return(
      <div className="window-container">
        <Topbar activeContent={this.state.activeContent}/>
        <div className="main-content">
          <Sidebar data={this.state} selectFileset={this.selectFileset}/>
          <ContentList data={this.state} selectRow={this.selectRow} selectSortBy={this.selectSortBy}/>
        </div>
      </div>
    )
  }
}
