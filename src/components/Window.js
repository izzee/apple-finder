import React from 'react'
import Topbar from './Topbar'
import Sidebar from './Sidebar'
import MainContent from './MainContent'
import ContextMenu from './ContextMenu'
import Filestack from 'filestack-js'
import keys from '../keys'
const URL = 'http://localhost:3000/api/v1/'
const defaultContextMenu = {target: null, targetRow: null, x: null, y: null}


export default class Window extends React.Component {

  constructor(){
    super()
    this.state = {
      folders : [],
      search : "",
      activeFileset : null,
      clickedRow : null,
      viewMode : 'listView',
      history: {back: [], forward: []},
      sorted: {by: null, ascending: false},
      contextMenu: defaultContextMenu,
      window: {height: null, width: null, focused: true},
      renamingFile : null,
      newFileName : ""
    }
  }

  componentDidMount = () => {
    fetch(URL+'folders')
    .then(res => res.json())
    .then(res => this.setState({folders: res, activeFileset: res[0]}))
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
    window.addEventListener("blur", this.focusBlur)
    window.addEventListener("focus", this.focusBlur)
  }

  updateWindowDimensions = () => {
    let newDimensions = {height: window.innerHeight, width: window.innerWidth, focused: true}
    this.setState({window: newDimensions, contextMenu: defaultContextMenu})
  }

  handleKeydown = (e) => {
    if(e.keyCode === 38 || e.keyCode === 40){
      e.preventDefault()
      this.setState({renamingFile: null, newFileName: "", highlightedRow: null, contextMenu: defaultContextMenu})
    }
    let row = this.state.clickedRow
    let allRows = this.state.activeFileset.documents
    if(row !== null){
      if(e.keyCode === 38){this.setState({clickedRow : row > 0 ? row-1 : allRows.length-1})}
      if(e.keyCode === 40){this.setState({clickedRow : row < allRows.length-1 ? row+1 : 0})}
      this.scrollToRow(this.state.clickedRow, false)
      }
    }

  scrollToRow = (rowId, smooth) => {
    let rows = [...document.getElementsByClassName('row')]
    let targetRow = rows.find(row => {return parseInt(row.dataset.id,10) === rowId})
    if(smooth){targetRow.scrollIntoView({block: 'end', behavior: 'smooth'})
    }else{targetRow.scrollIntoViewIfNeeded()}
  }

  onWindowClick = (e) => {
    if(e.target.type !== 'file'){
      e.preventDefault()
      this.clearContextMenu(e)
      if(this.state.renamingFile){
        this.setNewFilename()
      }
    }
  }

  renderContextMenu = (e) => {
    e.preventDefault()
    let target = e.currentTarget.className
    console.log(target)
    let contextMenuInfo = defaultContextMenu
    if(this.state.window.focused){
      if(target === 'row'){contextMenuInfo = this.renderDocMenu(e)}
      else if(target === 'placeholderRow' || target === 'context-menu-target' || e.target.className === 'sidebar' || e.target.className === 'column-view-preview'){contextMenuInfo = this.renderFolderMenu(e)}
      this.setState({contextMenu: contextMenuInfo, renamingFile: null})
    }
  }

  renderDocMenu = (e) => {
    let targetId = parseInt(e.currentTarget.id, 10)
    let rowId = parseInt(e.currentTarget.dataset.id,10)
    return {target: targetId, targetRow: rowId, type: 'document', x: e.clientX, y: e.clientY}
  }

  renderFolderMenu = (e) => {
    return {target: 'folder', x: e.clientX, y: e.clientY}
  }

  renderSecondaryMenu = (e) => {
    let newContextState = Object.assign({}, this.state.contextMenu)
    if(e.type === 'mouseenter'){
      newContextState.secondary = e.target.innerText
      this.setState({contextMenu: newContextState})
    }
  }

  clearContextMenu = (e) => {
    e.preventDefault()
    if(this.state.contextMenu.target){
      if(e.type === 'click' || e.target.parentNode.className !== 'row'){
      this.setState({contextMenu: defaultContextMenu})
      }
    }
  }

  uploadButton = (e) => {
    this.setState({search : "", sort: {by: null, ascending: false}})
    if(e.target.files[0]){
      const client = Filestack.init(keys.fs)
      client.upload(e.target.files[0])
      .then(res => this.handleUpload(res))
    }
  }

  handleUpload = (res) => {
    let fileInfo = res
    let folder_id = this.getFiletype(fileInfo.mimetype)
    let document = {name: fileInfo.filename, file_url: fileInfo.url, filetype: fileInfo.mimetype, size: fileInfo.size, folder_id: folder_id}
    fetch(URL + 'documents', {
      method: 'POST',
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({document})
    })
    .then(res => res.json()).then(res => this.renderNewUpload(res))
  }

  getFiletype = (filetype) => {
    if(filetype.includes('image')){return '2'}
    else if(filetype.includes('audio')){return '3'}
    else {return '1'}
  }

  renderNewUpload = (doc) => {
    let newFolders = [...this.state.folders]
    let targetFolderId = doc.folder.id-1
    newFolders[targetFolderId].documents.push(doc)
    this.setState({folders: newFolders, activeFileset: newFolders[targetFolderId], uploadingFile: null})
    let targetRow = newFolders[targetFolderId].documents.find(docu => docu.id === doc.id)
    let targetRowId = newFolders[targetFolderId].documents.indexOf(targetRow)
    this.scrollToRow(targetRowId, true)
    this.setState({clickedRow: targetRowId})
  }

  renameFile = () => {
    let context = this.state.contextMenu
    this.setState({clickedRow: context.targetRow, renamingFile: context.target})
  }

  handleNameChange = (e) => {
    this.setState({newFileName : e.currentTarget.value})
  }

  setNewFilename = () => {
    let updateFileset = Object.assign({}, this.state.activeFileset)
    let newName = this.state.newFileName
    let currentName = updateFileset.documents.find(file => file.id === this.state.renamingFile).name
    let document = {name: newName.length > 0 ? newName : currentName }
    updateFileset.documents.find(file => file.id === this.state.renamingFile).name = document.name
      fetch(URL+'documents/'+this.state.renamingFile, {
        method: 'PATCH',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({document})
      })
      .then(this.setState({activeFileset: updateFileset, newFileName: "", renamingFile: null}))
  }

  selectFileset = (e) => {
    if(e.currentTarget.id !== this.state.activeFileset.name){
      let newHistory = Object.assign({}, this.state.history, {back: [...this.state.history.back, this.state.activeFileset]})
      let fileset = this.state.folders.find(folder => folder.name === e.currentTarget.id)
      this.setState({history: newHistory, activeFileset: fileset, clickedRow: null, sortBy : null, search : ""})
    }
    this.setState({sortBy: null})
  }

  selectRow = (e) => {
    let id = parseInt(e.currentTarget.dataset.id, 10)
    let url = this.state.activeFileset.documents[id].file_url
    if (id === this.state.clickedRow && !this.state.renamingFile && url){window.open(url,'_blank')}
    else{ this.setState({clickedRow: id}) }
  }

  selectSortBy = (e) => {
    let category = e.currentTarget.querySelector('span').innerText
    let newSorted = Object.assign({}, this.state.sorted)
    if (newSorted.by === category){ newSorted.ascending = !newSorted.ascending }
    else{ newSorted.by = category }
    this.setState({sorted: newSorted, clickedRow : null, renamingFile: null})
  }

  handleSearch = (e) => {
    let search = e.currentTarget.value.trim()
    let filtered = [...this.state.folders][0]
    if(this.state.activeFileset.name){ filtered = Object.assign({}, this.state.activeFileset)}
    if(search.length > 0){
      filtered = {name: "", documents: []}
      this.state.folders.forEach(folder => {folder.documents.forEach(doc => {
        if(doc.name.toLowerCase().includes(search)){filtered.documents.push(doc)}
      })})
    }
    this.setState({search : e.currentTarget.value, activeFileset: filtered, clickedRow : null})
  }

  updateHistory = (e) => {
    let direction = e.currentTarget.id
    let historyState = Object.assign({}, this.state.history)
    let directionHistory = historyState[direction]
    if (directionHistory.length > 0){
      let nextItem = directionHistory.pop()
      if (direction === 'back'){
        historyState = {back: directionHistory, forward: [...this.state.history.forward, this.state.activeFileset]}
      }if (direction === 'forward'){
        historyState = {back: [...this.state.history.back, this.state.activeFileset], forward: directionHistory}
      }
      this.setState({history: historyState, activeFileset: nextItem, clickedRow: null, search: ""})
    }
  }

  focusBlur = (e) => {
    let windowState = Object.assign({}, this.state.window)
    windowState.focused = e.type === 'focus'
    this.setState({window: windowState})
    if (!this.state.focused){
      this.setState({contextMenu: defaultContextMenu})
    }
  }

  selectViewMode = (e) => {
    this.setState({viewMode: e.currentTarget.id, clickedRow: 0})
  }

  renderContents = () => {
    if (this.state.folders.length !== 0) {
      document.addEventListener("keydown", this.handleKeydown)
      return <div className="window-container" onClick={this.onWindowClick}>
        <Topbar data={this.state} updateHistory={this.updateHistory} handleSearch={this.handleSearch} uploadButton={this.uploadButton} selectViewMode={this.selectViewMode}/>
        <MainContent data={this.state} selectRow={this.selectRow} selectSortBy={this.selectSortBy} renderContextMenu={this.renderContextMenu} handleNameChange={this.handleNameChange}/>
        <Sidebar data={this.state} selectFileset={this.selectFileset} renderContextMenu={this.renderContextMenu}/>
        {this.state.contextMenu ?
          <ContextMenu info={this.state.contextMenu} sorted={this.state.sorted} viewMode={this.state.viewMode} renameFile={this.renameFile} renderSecondaryMenu={this.renderSecondaryMenu} selectSortBy={this.selectSortBy} selectViewMode={this.selectViewMode}/> : null}
      </div>}
    else { return null }
  }

  render() {
    return(this.renderContents())
  }
}
