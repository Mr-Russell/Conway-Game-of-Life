import React from 'react'

function Box(props){

  const selectBox = ()=>{
    props.selectBox(props.row, props.column)
  }

  return(
    <div 
      className = {props.boxClass}
      boxID = {props.boxID}
      onClick = {selectBox}
    >

    </div>
  )
}

export default Box