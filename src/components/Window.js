import React from 'react'
// import {files} from '../Data'
import Topbar from './Topbar'
import Sidebar from './Sidebar'
import ContentList from './ContentList'
const URL = 'http://localhost:3000/api/v1/folders'

export default class Window extends React.Component {

  constructor(){
    super()
    this.state = {
      folders : [],
      activeContent : 'Documents',
      clickedRow : null,
      sortBy : null,
      ascending : false
    }
  }

  componentDidMount = () => {
    fetch(URL)
    .then(res => res.json())
    .then(res => this.setState({folders: res }))
  }

  handleKeydown = e => {
    var elem = document.getElementsByClassName("window-container");
    let row = this.state.clickedRow
    let allRows = this.state.folders.find(folder => folder.name === this.state.activeContent).documents
    if(e.keyCode === 38){this.setState({clickedRow : row > 0 ? row-1 : allRows.length-1})}
    if(e.keyCode === 40){this.setState({clickedRow : row < allRows.length-1 ? row+1 : 0})}
  }

  selectRow = e => {
    let id = parseInt(e.currentTarget.id, 10)
    if(id === this.state.clickedRow){console.log('2x clicked')}
    this.setState({clickedRow: id})
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

  renderContents = () => {
    if (this.state.folders.length !== 0) {
      document.addEventListener("keydown", this.handleKeydown)
      return <div className="window-container">
        <Topbar activeContent={this.state.activeContent}/>
        <ContentList data={this.state} selectRow={this.selectRow} selectSortBy={this.selectSortBy}/>
        <Sidebar data={this.state} selectFileset={this.selectFileset}/>
      </div> }
    else { return null }
  }

  render() {
    return(this.renderContents()
    )
  }
}
