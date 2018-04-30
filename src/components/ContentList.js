import React from 'react'
import ContentRow from './ContentRow'
import ChevronUp from 'react-icons/lib/fa/chevron-up';
import ChevronDown from 'react-icons/lib/fa/chevron-down';


export default class ContentList extends React.Component {

  upOrDown = (category) => {
    if(category === this.props.data.sorted.by){
      return this.props.data.sorted.ascending ? <ChevronUp/> : <ChevronDown/>
    }
  }

  sortRows = () => {
    let asc = this.props.data.sorted.ascending
    let folders = this.props.data.activeFileset.documents
    switch(this.props.data.sorted.by) {
      case 'Name':
        return [...folders].sort((a,b) => {
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
        key={file.id} index={files.indexOf(file)} dataid={file.id} fileInfo={file} data={this.props.data} selectRow={this.props.selectRow} handleNameChange={this.props.handleNameChange} renderContextMenu= {this.props.renderContextMenu}/>
    })
  }

  renderPlaceholderRows = () => {
    let emptySpace = (Math.floor(((this.props.data.window.height*.7-76)/20) - this.sortRows().length))
    if (emptySpace > 0){
      let i=0;
      return [...Array(emptySpace)].map(row => { return <tr key={i++}><td></td><td></td><td></td><td></td></tr>})
    }
  }

  preventScroll = () =>{
    return this.props.data.contextMenu.target ? {overflow: 'hidden'} : {overflow: null}
  }

  render(){
    return(
      <div className="content-list">
        <div className="header-table"><table><thead>
          <tr>
            <th onClick={this.props.selectSortBy}>
              <span style={{fontWeight: this.upOrDown('Name') ? '500' : null}}>Name</span>
              <span className="header-border">{this.upOrDown('Name')}</span>
            </th>
            <th onClick={this.props.selectSortBy}>
              <span style={{fontWeight: this.upOrDown('Date Modified') ? '500' : null}}>Date Modified</span>
              <span className="header-border">{this.upOrDown('Date Modified')}</span>
            </th>
            <th onClick={this.props.selectSortBy}>
              <span style={{fontWeight: this.upOrDown('Size') ? '500' : null}}>Size</span>
              <span className="header-border">{this.upOrDown('Size')}</span>
            </th>
            <th onClick={this.props.selectSortBy}>
              <span style={{fontWeight: this.upOrDown('Kind') ? '500' : null}}>Kind</span>
              <span className="header-border">{this.upOrDown('Kind')}</span>
            </th>
          </tr>
        </thead></table></div>
        <div className="body-table" style={this.preventScroll()}><table><tbody>
          {this.renderRows()}
          {this.renderPlaceholderRows()}
        </tbody></table></div>
      </div>
    )
  }
}
