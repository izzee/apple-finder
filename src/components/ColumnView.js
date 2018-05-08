import React from 'react'
import ReactAudioPlayer from 'react-audio-player'
import moment from 'moment'
import audioplayerImg from '../icons/audioplayer.png'
import Play from 'react-icons/lib/io/ios-play'
import Pause from 'react-icons/lib/io/ios-pause'

export default class ColumnView extends React.Component {

  getActiveFile = () => {
    let playSVG = document.getElementById('play-svg')
    let pauseSVG = document.getElementById('pause-svg')
    if(playSVG && pauseSVG){
      playSVG.style.display = 'block'
      pauseSVG.style.display = 'none'
    }
    if(this.props.data.activeFileset.documents[this.props.data.clickedRow]){
      return this.props.data.activeFileset.documents[this.props.data.clickedRow]
    }
  }

  renderFilePreview = () => {
    if(this.getActiveFile()){
      let file = this.getActiveFile()
      if(file.filetype){
        if(file.filetype.includes('audio')){
          return this.renderAudioPlayer(file)
        }if(file.filetype.includes('image')){
          return <img src={file.file_url}></img>
        }
      }
    }
  }

  toggleAudio = () => {
    let player = document.getElementById('player')
    let playSVG = document.getElementById('play-svg')
    let pauseSVG = document.getElementById('pause-svg')
    if(player){
      if(player.paused){
        player.play()
        playSVG.style.display = 'none'
        pauseSVG.style.display = 'block'
      }else{
        player.pause()
        playSVG.style.display = 'block'
        pauseSVG.style.display = 'none'
      }
    }
  }

  renderAudioPlayer = (file) => {
    return(
      <div className="cv-audio-preview">
        <div className="play-button" onClick={this.toggleAudio}>
          <Play id="play-svg"/>
          <Pause id="pause-svg"/>
        </div>
        <img src={audioplayerImg}></img>
        <ReactAudioPlayer id="player" src={file.file_url} onLoadedMetadata={this.getAudioDuration}/>
      </div>
    )
  }

  getAudioDuration = (e) =>{
    if(e.srcElement){
      let duration = moment.utc(e.srcElement.duration*1000).format('mm:ss')
      document.getElementById('variable-info-title').innerText = "Duration"
      document.getElementById('variable-info-value').innerText = duration
    }
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
        <div className="body-table">
          <table><tbody>
            {this.props.renderRows()}
          </tbody></table>
          <div className="context-menu-target" onContextMenu={this.props.renderContextMenu}></div>
        </div>
        <div className="column-view-preview" onContextMenu={this.props.renderContextMenu}>
          {this.renderFilePreview()}
          {this.renderFileInfo()}
          <p id="file-duration"></p>
        </div>
      </div>
    )
  }
}
