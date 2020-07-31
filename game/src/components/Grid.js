import React from 'react'
import Box from './Box.js'

function Grid(props) {
  // const width = props.columns * 16
  let rowsArray = []
  let boxClass = ""

  for (let i=0; i < props.rows; i++){
    for (let j=0; j < props.columns; j++){
      let boxID = `${i}_${j}`
      boxClass = props.grid[i][j] ? "box on" : "box off"
      rowsArray.push(
        <Box 
          boxClass = {boxClass}
          key = {boxID}
          boxID = {boxID}
          row = {i}
          column = {j}
          selectBox = {props.selectBox}
        />
      )
    }
  }


  return(
    <div 
      className="grid" 
      style={{gridTemplateColumns: `repeat(${props.columns}, 20px)`}}
    >
      {rowsArray}
    </div>
  )
}

export default Grid