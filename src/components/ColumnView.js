import React from 'react'
import { Document, Page } from 'react-pdf';
import ReactAudioPlayer from 'react-audio-player'
import moment from 'moment'
import audioplayerImg from '../icons/audioplayer.png'
import CircularProgressbar from 'react-circular-progressbar';
import Play from 'react-icons/lib/io/ios-play'
import Pause from 'react-icons/lib/io/ios-pause'
import ArrowL from 'react-icons/lib/go/arrow-left'
import ArrowR from 'react-icons/lib/go/arrow-right'

export default class ColumnView extends React.Component {

  constructor(){
    super()
    this.state ={
      numPages: null,
      pageNumber: 1,
      audioProgress: 0,
      playing: false
    }
  }

  componentWillReceiveProps = () => {
    this.setState({pageNumber: 1, numPages: null, audioProgress: 0, playing: false})
  }

  getActiveFile = () => {
    if(this.props.data.clickedRow !== null){
      let rows = document.getElementsByClassName('row')
      let id = parseInt([...rows].find(row => parseInt(row.dataset.id,10) === this.props.data.clickedRow).id, 10)
      return this.props.data.activeFileset.documents.find(doc => doc.id === id)
    }
  }

  onDocumentLoad = ({ numPages }) => {
    console.log('loaded')
    this.setState({ numPages });
    this.setState({pageNumber: 1})
    console.log(this.state)
  }

  handlePageChange = (e) => {
    if(e.currentTarget.id ==='back-pdf' && this.state.pageNumber > 1){
      this.setState({pageNumber: this.state.pageNumber - 1})
    }if(e.currentTarget.id ==='forward-pdf' && this.state.pageNumber < this.state.numPages){
      this.setState({pageNumber: this.state.pageNumber + 1})
    }
  }

  pdfButtonStyle = (target) => {
    if(target === 'back'){
      return this.state.pageNumber === 1 ? {backgroundColor: 'rgba(120,120,120,.95)', color: '#dadada'} : null
    }if(target === 'forward'){
      return this.state.pageNumber === this.state.numPages ? {backgroundColor: 'rgba(120,120,120,.95)', color: '#dadada'} : null
    }
  }

  preventScroll = () =>{
    return (this.props.data.contextMenu.target) ? {overflow: 'hidden'} : {overflow: null}
  }

  renderFilePreview = () => {
    if(this.getActiveFile()){
      let file = this.getActiveFile()
      if(file.filetype){
        if(file.filetype.includes('audio')){
          return this.renderAudioPlayer(file)
        }if(file.filetype.includes('image')){
          return <img src={file.file_url} className="cv-image-preview" alt={file.filetype}></img>
        }if(file.filetype.includes('pdf')){
          return(
            <div id="pdf-container">
            <Document file={file.file_url} onLoadSuccess={this.onDocumentLoad}>
              <Page pageNumber={this.state.pageNumber} scale={this.props.data.window.height/1850}/>
            </Document>
            <div className="pdf-nav">
              <div id="back-pdf" className="pdf-button" onClick={this.handlePageChange} style={this.pdfButtonStyle('back')}><ArrowL/></div>
              <div id="forward-pdf"  className="pdf-button" onClick={this.handlePageChange} style={this.pdfButtonStyle('forward')}><ArrowR/></div>
            </div>
          </div>
          )
        }
      }
    }
  }

  toggleAudio = () => {
    let player = document.getElementById('player')
    if(player){
      if(player.paused){
        player.play()
        this.setState({playing: true})
      }else if(!player.paused){
        player.pause()
        this.setState({playing: false})
      }
    }
  }

  progressBarStyle = () => {
    if(this.state.playing){
      return {width: '56px', height: '56px', transform: 'translate(-25px, -25px)', opacity: '100'}
    }else{
      return null
    }
  }

  playButtonStyle = () => {
    if(this.state.playing){
      return {display: 'block', boxShadow: 'none'}
    }else{
      return null
    }
  }

  renderAudioPlayer = (file) => {
    return(
      <div className="cv-audio-preview">
        <div id="progress-bar" style={this.progressBarStyle()}> <CircularProgressbar percentage={this.state.audioProgress} textForPercentage={null}/></div>
        <div className="play-button" onClick={this.toggleAudio} style={this.playButtonStyle()}>
          <Play id="play-svg" style={{display: this.state.playing? 'none' : 'block'}}/>
          <Pause id="pause-svg" style={{display: this.state.playing? 'block' : 'none'}}/>
        </div>
        <img src={audioplayerImg} alt={file.filetype}></img>
        <ReactAudioPlayer id="player" src={file.file_url} listenInterval={100} onListen={this.updateProgress} onLoadedMetadata={this.getAudioDuration} onAbort={this.handleStopAudio}/>
      </div>
    )
  }

  handleStopAudio = () => {
    this.setState({playing: false, audioProgress: 0})
  }

  getAudioDuration = (e) =>{
    if(e.srcElement){
      this.setState({playing: false, audioProgress : 0})
      let duration = moment.utc(e.srcElement.duration*1000).format('mm:ss')
      document.getElementById('variable-info-title').innerText = "Duration"
      document.getElementById('variable-info-value').innerText = duration
    }
  }

  updateProgress = () => {
    let player = document.getElementById('player');
    this.setState({audioProgress: player.currentTime/player.duration*100})
  }

  renderFileInfo = () => {
    if(this.getActiveFile()){
      let activeFile = this.getActiveFile()
      return(
        <div className="cv-file-info">
          <h3>{activeFile.name}</h3>
          <p>{this.props.reformattedInfo(activeFile).type} - {this.props.reformattedInfo(activeFile).size}</p>
          <table>
            <thead>
            <tr>
              <td>Created</td>
              <td>{this.props.reformattedInfo(activeFile).created}</td>
            </tr>
            <tr>
              <td>Modified</td>
              <td>{this.props.reformattedInfo(activeFile).updated}</td>
            </tr>
            <tr>
              <td>Last Opened</td>
              <td>{this.props.reformattedInfo(activeFile).opened}</td>
            </tr>
            <tr>
              <td id="variable-info-title"></td>
              <td id="variable-info-value"></td>
            </tr>
          </thead>
          </table>
        </div>
      )
    }
  }

  render(){
    return(
      <div className="column-view-container">
        <div className="body-table" style={this.preventScroll()}>
          <table><tbody>
            {this.props.renderRows()}
          </tbody></table>
          <div className="context-menu-target" onContextMenu={this.props.renderContextMenu}></div>
        </div>
        <div className="column-view-preview" onContextMenu={this.props.renderContextMenu}>
          <div className="preview-container">{this.renderFilePreview()}</div>
          {this.renderFileInfo()}
          <p id="file-duration"></p>
        </div>
      </div>
    )
  }
}
