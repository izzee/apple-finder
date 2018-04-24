import React from 'react'
import ContentRow from './ContentRow'
import ChevronUp from 'react-icons/lib/fa/chevron-up';
import ChevronDown from 'react-icons/lib/fa/chevron-down';


export default class ContentList extends React.Component {

  sorted = () => {
    return this.props.data.sortBy
  }

  upOrDown = (category) => {
    if(category === this.sorted()){
      if(this.props.data.ascending){ return <ChevronUp/>} else { return <ChevronDown/> }
    }
  }

  sortRows = () => {
    let asc = this.props.data.ascending
    let files = this.props.data.files[this.props.data.activeContent]
    switch(this.props.data.sortBy) {
      case 'Name':
        return files.sort((a,b) => {
          if(a.name > b.name){if(asc){return 1}else{return -1}}
          if(a.name < b.name){if(asc){return -1}else{return 1}}
          else{return 0}
        })
      case 'Date Modified':
      return files.sort((a,b) => {
        if(a.dateModified > b.dateModified){if(asc){return 1}else{return -1}}
        if(a.dateModified < b.dateModified){if(asc){return -1}else{return 1}}
        else{return 0}
      })
      default:
        return files;
    }
  }

  renderRows = () => {
    let files = this.sortRows()
    return files.map(file => {
      return <ContentRow
        key={files.indexOf(file)} dataid={files.indexOf(file)}
        data={file} clickedRow={this.props.data.clickedRow} selectRow={this.props.selectRow}/>
    })
  }

  render(){
    return(
      <div className="content-list">
        <table>
          <thead>
          <tr>
            <th onClick={this.props.selectSortBy}>
              <span>Name</span>
              <span className="header-border">{this.upOrDown('Name')}</span>
            </th>
            <th onClick={this.props.selectSortBy}>
              <span>Date Modified</span>
              <span className="header-border">{this.upOrDown('Date Modified')}</span>
            </th>
            <th onClick={this.props.selectSortBy}>
              <span>Size</span>
              <span className="header-border">{this.upOrDown('Size')}</span>
            </th>
            <th onClick={this.props.selectSortBy}>
              <span>Kind</span>
              <span>{this.upOrDown()}</span>
            </th>
          </tr>
          </thead>
          <tbody>
            {this.renderRows()}
          </tbody>
        </table>
      </div>
    )
  }
}
