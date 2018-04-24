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
    console.log('future: ', this.props.data.future)
    console.log('history: ', this.props.data.history)

    let asc = this.props.data.ascending
    let folders = this.props.data.folders.find(folder => folder.name === this.props.data.activeContent).documents
    switch(this.sorted()) {
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
        key={file.id} dataid={files.indexOf(file)}
        data={file} clickedRow={this.props.data.clickedRow} selectRow={this.props.selectRow}/>
    })
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
        </tbody></table></div>
      </div>
    )
  }
}
