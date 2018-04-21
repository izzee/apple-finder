import React from 'react'
import Topbar from './Topbar'
import MainContent from './MainContent'

export default class Window extends React.Component {

  constructor(){
    super()
    this.state = {
      files : {
        x : [{name:'x1'},{name:'x2'},{name:'x3'},{name:'x4'},{name:'x5'},{name:'x6'},{name:'x7'},{name:'x8'}],
        y : [{name:'y1'},{name:'y2'},{name:'y3'},{name:'y4'},{name:'y5'},{name:'y6'},{name:'y7'},{name:'y8'}],
        z : [{name:'z1'},{name:'z2'},{name:'z3'},{name:'z4'},{name:'z5'},{name:'z6'},{name:'z7'},{name:'z8'}]
      },
      activeContent : 'x',
      clickedRow : null
    }
  }

  selectRow = e => {
    if(parseInt(e.currentTarget.id) === this.state.clickedRow){console.log('2x clicked')}
    this.setState({clickedRow: parseInt(e.currentTarget.id)})
  }

  selectFileset = e => {
    if(e.currentTarget.id !== this.state.activeContent){this.setState({clickedRow : null})}
    this.setState({activeContent: e.currentTarget.id})
  }

  render() {
    return(
      <div className="window-container">
        <Topbar activeContent={this.state.activeContent}/>
        <MainContent data={this.state} selectRow={this.selectRow} selectFileset={this.selectFileset}/>
      </div>
    )
  }
}
