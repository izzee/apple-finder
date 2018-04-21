import React from 'react'
import ContentListRow from './ContentListRow'

export default class ContentList extends React.Component {

  renderRows = () => {
    let files = this.props.data.files[this.props.data.activeContent]
    return files.map(file => {
      return <ContentListRow
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
            <th>Name</th>
            <th>Date Modified</th>
            <th>Size</th>
            <th>Kind</th>
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
