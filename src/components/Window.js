import React from 'react'
import Topbar from './Topbar'
import Sidebar from './Sidebar'
import ContentList from './ContentList'
import ContextMenu from './ContextMenu'
import Filestack from 'filestack-js'
import keys from '../keys'
const URL = 'http://localhost:3000/api/v1/'
const defaultContextMenu = {target: null, targetRow: null, x: null, y: null}
const defaultUploadingFile = {name: "", fileUrl: "", file: null}


export default class Window extends React.Component {

  constructor(){
    super()
    this.state = {
      folders : [],
      search : "",
      activeFileset : {},
      clickedRow : null,
      history: {back: [], forward: []},
      sorted: {by: null, ascending: false},
      contextMenu: defaultContextMenu,
      window: {height: null, width: null, focused: true},
      renamingFile : null,
      newFileName : "",
      uploadingFile : defaultUploadingFile
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
      this.setState({renamingFile: null, newFileName: "", highlightedRow: null})
    }
    let row = this.state.clickedRow
    let allRows = document.getElementsByClassName('row')
    if(row !== null){
      if(e.keyCode === 38){this.setState({clickedRow : row > 0 ? row-1 : allRows.length-1})}
      if(e.keyCode === 40){this.setState({clickedRow : row < allRows.length-1 ? row+1 : 0})}
      let activeRow = [...allRows].find(rowNum => {return parseInt(rowNum.dataset.id,10) === this.state.clickedRow})
      activeRow.scrollIntoViewIfNeeded()
    }
  }

  onWindowClick = (e) => {
    if(e.target.type !== 'file'){
      this.clearContextMenu(e)
      if(this.state.renamingFile){
        this.setNewFilename()
      }
    }
  }

  uploadButton = (e) => {
    const client = Filestack.init(keys.fs)
    client.upload(e.target.files[0])
    .then(res => this.setState({uploadingFile : res}))
    .then(this.handleUpload)
  }

  handleUpload = () => {
    console.log(this.state.uploadingFile)
    let fileInfo = this.state.uploadingFile
    let folder_id = this.getFiletype(fileInfo.mimetype)
    let document = {name: fileInfo.filename, file_url: fileInfo.url, filetype: fileInfo.mimetype, size: fileInfo.size, folder_id: 2}
    fetch(URL + 'documents', {
      method: 'POST',
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({document})
    })
  }

  getFiletype = (filetype) => {
    
  }



  renderContextMenu = (e) => {
    e.preventDefault()
    if(this.state.window.focused){
      let targetId = parseInt(e.currentTarget.id, 10)
      let rowId = parseInt(e.currentTarget.dataset.id,10)
      let contextMenuInfo = {target: targetId, targetRow: rowId, x: e.clientX, y: e.clientY}
      this.setState({contextMenu: contextMenuInfo, clickedRow: null})
    }
  }

  clearContextMenu = (e) => {
    e.preventDefault()
    if(e.type === 'click' || e.target.parentNode.className !== 'row'){
    this.setState({contextMenu: defaultContextMenu})
    }
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
    if (id === this.state.clickedRow){ window.open(this.state.activeFileset.documents[id].file_url, '_blank') }
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
    let search = e.currentTarget.value
    this.setState({search : e.currentTarget.value})
    let filtered = {name: "", documents: []}
    this.state.folders.forEach(folder => {folder.documents.forEach(doc => {
      if(doc.name.toLowerCase().includes(search)){filtered.documents.push(doc)}
    })})
    this.setState({activeFileset: filtered, clickedRow : null})
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
      this.setState(defaultContextMenu)
    }
  }

  renderContents = () => {
    if (this.state.folders.length !== 0) {
      document.addEventListener("keydown", this.handleKeydown)
      return <div className="window-container" onClick={this.onWindowClick} onContextMenu={this.onWindowClick}>
        <Topbar data={this.state} updateHistory={this.updateHistory} handleSearch={this.handleSearch} uploadButton={this.uploadButton}/>
        <ContentList data={this.state} selectRow={this.selectRow} selectSortBy={this.selectSortBy} renderContextMenu={this.renderContextMenu} handleNameChange={this.handleNameChange}/>
        <Sidebar data={this.state} selectFileset={this.selectFileset}/>
        {this.state.contextMenu ? <ContextMenu info={this.state.contextMenu} renameFile={this.renameFile}/> : null}
      </div>}
    else { return null }
  }

  render() {
    return(this.renderContents())
  }
}
