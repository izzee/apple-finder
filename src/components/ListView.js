import React from 'react'
import ChevronUp from 'react-icons/lib/fa/chevron-up';
import ChevronDown from 'react-icons/lib/fa/chevron-down';

export default class ListView extends React.Component {

  upOrDown = (category) => {
    if(category === this.props.data.sorted.by){
      return this.props.data.sorted.ascending ? <ChevronUp/> : <ChevronDown/>
    }
  }

  renderPlaceholderRows = () => {
    let emptySpace = (Math.floor(((this.props.data.window.height*.7-76)/20) - this.props.numRows))
    if (emptySpace > 0){
      let i=0;
      return [...Array(emptySpace)].map(row => {
        return <tr key={i++} className="placeholderRow"
          onContextMenu={this.props.renderContextMenu}>
        <td></td><td></td><td></td><td></td></tr>})
    }else{ return false }
  }

  preventScroll = () =>{
    return (this.props.data.contextMenu.target || this.renderPlaceholderRows()) ?
     {overflow: 'hidden'} : {overflow: null}
  }

  render(){
    return(
        <div className="content-list">
          <div className="header-table">
            <table>
              <thead>
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
                  <th>
                    <span>Kind</span>
                    <span className="header-border"></span>
                  </th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="body-table" style={this.preventScroll()}>
            <table>
              <tbody>
              {this.props.renderRows()}
              {this.renderPlaceholderRows()}
              </tbody>
            </table>
          </div>
        </div>
    )
  }
}
