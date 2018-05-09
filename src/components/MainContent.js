import React from 'react'
import ContentRow from './ContentRow'
import ColumnView from './ColumnView'
import ListView from './ListView'
import IconView from './IconView'
import moment from 'moment'
import formatBytes from 'format-bytes'

export default class MainContent extends React.Component {

  reformatFileDate=(fileDate) => {
    if (moment().format('D') === moment(fileDate).format('D')){
      return moment(fileDate).format('[Today at] h:mm A');
    }else if(moment().add(-1, 'days').format('D') === moment(fileDate).format('D')){
      return moment(fileDate).format('[Yesterday at] h:mm A');
    }else{
      return moment(fileDate).format('MMM D, YYYY [at] h:mm A');
    }
  }

  reformatFileType = (file) => {
    let fileType=file.filetype
    if(fileType){
      if(fileType.includes('image')){ return 'Image'}
      if(fileType.includes('document')
      || fileType.includes('pdf')){ return 'Document'}
      if(fileType.includes('video')){return 'Video'}
      if(fileType.includes('audio')){return 'Audio'}
      else{return 'Other'}
    }else{return '--'}
  }

  reformatFileSize=(file) => {
    let fileSize=file.size
    return fileSize ? formatBytes(fileSize) : '--'
  }

  reformattedInfo=(file) => {
    return {created: this.reformatFileDate(file.created_at), updated: this.reformatFileDate(file.updated_at),
      opened: this.reformatFileDate(moment()),type: this.reformatFileType(file), size: this.reformatFileSize(file)}
  }

  sortRows = () => {
    let asc = this.props.data.sorted.ascending
    let folders = this.props.data.activeFileset.documents
    switch(this.props.data.sorted.by) {
      case 'Name':
        return [...folders].sort((a,b) => {
          if(a.name > b.name){return asc ? 1 : -1}
          else if(a.name < b.name){return asc ? -1 : 1}
          else if(a.id > b.id){return asc ? 1 : -1}
          else if(a.id < b.id){return asc ? -1 : 1}
          else{return 0}
        })
      case 'Date Modified':
        return folders.sort((a,b) => {
          if(a.updated_at > b.updated_at){return asc ? 1 : -1}
          else if(a.updated_at < b.updated_at){return asc ? -1 : 1}
          else if(a.id > b.id){return asc ? 1 : -1}
          else if(a.id < b.id){return asc ? -1 : 1}
          else{return 0}
        })
      case 'Size':
        return folders.sort((a,b) => {
          if(a.size > b.size){return asc ? 1 : -1}
          else if(a.size < b.size){return asc ? -1 : 1}
          else if(a.id > b.id){return asc ? 1 : -1}
          else if(a.id < b.id){return asc ? -1 : 1}
          else{return 0}
        })
      default:
        return folders;
    }
  }

  renderRows = () => {
    let files = this.sortRows()
    return files.map(file => {
      return <ContentRow
        key={file.id} index={files.indexOf(file)} dataid={file.id} fileInfo={file} reformattedInfo={this.reformattedInfo(file)} data={this.props.data} selectRow={this.props.selectRow} handleNameChange={this.props.handleNameChange} renderContextMenu={this.props.renderContextMenu}/>
    })
  }

  renderViewMode = () => {
    if(this.props.data.viewMode === 'listView'){
      return <ListView data={this.props.data} renderRows={this.renderRows} renderContextMenu={this.props.renderContextMenu} selectSortBy={this.props.selectSortBy} numRows={this.sortRows().length}/>
    }else if(this.props.data.viewMode === 'columnView'){
      return <ColumnView data={this.props.data} renderRows={this.renderRows} reformattedInfo={this.reformattedInfo} renderContextMenu={this.props.renderContextMenu}/>
    }else if(this.props.data.viewMode === 'iconView'){
      return <IconView data={this.props.data} sortRows={this.sortRows}
      selectRow={this.props.selectRow} renderContextMenu={this.props.renderContextMenu}/>
    }
  }

  render(){
    return(this.renderViewMode())
  }
}
