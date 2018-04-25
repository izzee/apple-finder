import React from 'react'
import ContentRow from './ContentRow'
import ChevronUp from 'react-icons/lib/fa/chevron-up';
import ChevronDown from 'react-icons/lib/fa/chevron-down';


export default class ContentList extends React.Component {

  upOrDown = (category) => {
    if(category === this.props.data.sortBy){
      if(this.props.data.ascending){ return <ChevronUp/>} else { return <ChevronDown/> }
    }
  }

  searchRows = () => {
    let filtered = []
    let folders = this.props.data.folders
    let search = this.props.data.search
    folders.forEach(folder => {folder.documents.forEach(doc => {
      if(doc.name.toLowerCase().includes(search)){filtered.push(doc)}
    })})
    return filtered
  }

  sortRows = () => {
    let asc = this.props.data.ascending
    let folders = this.props.data.folders.find(folder => folder.name === this.props.data.activeContent).documents
    if(this.props.data.search){folders = this.searchRows()}
    switch(this.props.data.sortBy) {
      case 'Name':
        return folders.sort((a,b) => {
          if(a.name > b.name){if(asc){return 1}else{return -1}}
          if(a.name < b.name){if(asc){return -1}else{return 1}}
          else{ return 0 }
        })
      // case 'Date Modified':
      //   return folders.sort((a,b) => {
      //     if(a.dateModified > b.dateModified){if(asc){ return 1 }else{ return -1}}
      //     if(a.dateModified < b.dateModified){if(asc){ return -1 }else{return 1}}
      //     else{ return 0 }
      //   })
      default:
        return folders;
    }
  }

  renderRows = () => {
    let files = this.sortRows()
    return files.map(file => {
      return <ContentRow
        key={file.id} index={files.indexOf(file)} dataid={file.id}
        data={file} clickedRow={this.props.data.clickedRow} selectRow={this.props.selectRow} renderContextMenu={this.props.renderContextMenu}/>
    })
  }

  renderPlaceholderRows = () => {
    let emptySpace = (Math.floor(((this.props.data.height*.7-76)/20) - this.sortRows().length))
    if (emptySpace > 0){
      let i=0;
      return [...Array(emptySpace)].map(row => { return <tr key={i++}><td></td><td></td><td></td><td></td></tr>})
    }
  }

  render(){
    return(
      <div className="content-list">
        <div className="header-table"><table><thead>
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
              <span className="header-border">{this.upOrDown('Kind')}</span>
            </th>
          </tr>
        </thead></table></div>
        <div className="body-table"><table><tbody>
          {this.renderRows()}
          {this.renderPlaceholderRows()}
        </tbody></table></div>
      </div>
    )
  }
}
