import React from 'react'

function Buttons(props){

  const handleSelect = (e) =>{
    // e.preventDefault()
    props.gridSize(e.target.value)
  }

  return(
    <div className="btnContainer">
      <button onClick = {props.playButton}>
        {props.running ? "Stop" : "Start"}
      </button>

      <button onClick = {props.oneGen}>
        Advance One
      </button>


      {/* <button onClick = {props.pauseButton}>
        Pause
      </button> */}


      <button onClick={props.slow}>
        Slow
      </button>


      <button onClick={props.fast}>
        Fast    
      </button>


      <button onClick = {props.clear}>
        Clear    
      </button>


      <button onClick = {props.random}>
        Random
      </button>

      <select onChange = {handleSelect}>
        <option value="25x25">25 x 25</option>
        <option value="50x50">50 x 50</option>
        <option value="75x75">75 x 75</option>
        <option value="75x100">75 x 100</option>
      </select>
    </div> 
  )
}

export default Buttons