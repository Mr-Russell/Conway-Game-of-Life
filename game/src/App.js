import React, {useState, useEffect, useRef} from 'react'
import Grid from './components/Grid.js'
import Buttons from './components/Buttons.js'


const create2DArray = (columns, rows) =>{
  let arr = Array(columns)
  for (let i = 0; i < arr.length; i ++){
    arr[i] = Array(rows).fill(false)
  }
  return arr
}

function App() {
  ///////////////////// STATE ////////////////////////////

  const [rows, setRows] = useState(25)
  const rowsRef = useRef(rows)
  rowsRef.current = rows

  const [columns, setColumns] = useState(25)
  const columnsRef = useRef(columns)
  columnsRef.current = columns

  // const [grid, setGrid] = useState(Array(columns).fill(Array(rows).fill(false)))
  // const [grid, setGrid] = useState(create2DArray(columns, rows))
  const [grid, setGrid] = useState(Array(rows).fill().map(()=>(Array(columns).fill(false))))
  const gridRef = useRef(grid)
  gridRef.current = grid

  const [running, setRunning] = useState(false)
  const runningRef = useRef(running)
  runningRef.current = running

  const [generation, setGeneration] = useState(0)
  const genRef = useRef(generation)
  genRef.current = generation

  const [speed, setSpeed] = useState(1000)
  const speedRef = useRef(speed)
  speedRef.current = speed

  const [singleStep, setSingleStep] = useState(false)


  const runSimulation = () =>{
    if (runningRef.current === false){
      return
    } else {
      let gridCopy = JSON.parse(JSON.stringify(gridRef.current))

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          let neighbors = 0;
          
          // COUNT NEIGHBORS
          if (i > 0) {
            if (gridRef.current[i - 1][j]) {neighbors++}
          };
          if (i > 0 && j > 0) {
            if (gridRef.current[i - 1][j - 1]) {neighbors++}
          };
          if (i > 0 && j < (columns - 1)) {
            if (gridRef.current[i - 1][j + 1]) {neighbors++}
          };
          if (j < (columns - 1)) {
            if (gridRef.current[i][j + 1]) {neighbors++}
          };
          if (j > 0) {
            if (gridRef.current[i][j - 1]) {neighbors++}
          };
          if (i < (rows - 1)) {
            if (gridRef.current[i + 1][j]) {neighbors++}
          };
          if (i < (rows - 1) && j > 0) {
            if (gridRef.current[i + 1][j - 1]) {neighbors++}
          };
          if (i < (rows - 1) && j < (columns - 1)) {
            if (gridRef.current[i + 1][j + 1]) {neighbors++}
          };
          
          // CHECK COUNT
          if (gridRef.current[i][j] && (neighbors < 2 || neighbors > 3)) {
            gridCopy[i][j] = false
          };
          if (!gridRef.current[i][j] && neighbors === 3) {
            gridCopy[i][j] = true
          };
        }
      }
    
      gridRef.current = gridCopy
      setGrid(gridRef.current)
      
      genRef.current++
      setGeneration(genRef.current)
      
      if (singleStep){
        runningRef.current = false
        setSingleStep(false)
      }

      setTimeout(runSimulation, speedRef.current)
    }
  }



 ///////////////////// GRID FUNCTIONS ////////////////////////////

  // useEffect(()=>{
  //   const newGrid = Array(columns).fill(Array(rows).fill(false))
  //   setGrid(newGrid)
  //   console.log('From useEffect:', grid)
  // }, [rows, columns])

  const selectBox = (row, column)=>{
    if (runningRef.current){
      return
    }
    let gridCopy = JSON.parse(JSON.stringify(grid))
    gridCopy[row][column] = !gridCopy[row][column]
    setGrid(gridCopy)
  }


  const gridSize = (size) =>{
    clear()
    console.log(size)

    if (size === "25x25"){
      rowsRef.current = 25
      setRows(rowsRef.current)

      columnsRef.current = 25
      setColumns(columnsRef.current)

    } else if (size === "50x50"){
      rowsRef.current = 50
      setRows(rowsRef.current)
      
      columnsRef.current = 50
      setColumns(columnsRef.current)

      // debugger
      console.log("After Setting rows to '50'",rows)
      
    } else if (size === "75x75"){
      rowsRef.current = 75
      setRows(rowsRef.current)
      
      columnsRef.current = 75
      setColumns(columnsRef.current)

    } else if (size === "75x100"){
      rowsRef.current = 75
      setRows(rowsRef.current)
      
      columnsRef.current = 100
      setColumns(columnsRef.current)
    }

    console.log(rows)
    console.log(columns)
    console.log(grid)
    
    gridRef.current = create2DArray(rowsRef.current, columnsRef.current)
    setGrid(gridRef.current)
  }





   ///////////////////// BUTTON FUNCTIONS ////////////////////////////
  const playButton = () =>{
    setRunning(!running)
    if (!running){
      runningRef.current = true
      runSimulation()
    }
  }

  const oneGen = () =>{
    runningRef.current = true
    setSingleStep(true)
    runSimulation()
  }

  const fast = () =>{
    speedRef.current = 200
    setSpeed(speedRef.current)
  }

  const slow = () =>{
    speedRef.current = 1000
    setSpeed(speedRef.current)
  }

  const clear = () =>{
    setRunning(false)
    setGrid(Array(columns).fill(Array(rows).fill(false)))
    setGeneration(0)
  }

  const random = () =>{
    setRunning(false)
    let gridCopy = JSON.parse(JSON.stringify(grid))
    for (let i=0; i < rows; i++){
      for (let j=0; j < columns; j++){
        if (Math.floor(Math.random()* 3) === 1){
          gridCopy[i][j] = true;
        } else {
          gridCopy[i][j] = false;
        }
      }
    }
    setGrid(gridCopy)
    setGeneration(0)
  }



   ///////////////////// RENDER ////////////////////////////
  return (
    <div className="App">
      <h1>John Conway's Game of Life</h1>
      <div className="outerContainer">
        <div className="gameContainer">
          {/* <Buttons 
            playButton = {playButton}
            slow = {slow}
            fast = {fast}
            clear = {clear}
            random = {random}
            gridSize = {gridSize}
            running = {running}
            oneGen = {oneGen}
          /> */}
          {/* <h4>Speed: {speedRef.current===1200 ? "Slow" : "Fast"}</h4> */}
          <h4><u>Speed</u>: {speed === 1000 ? "Slow" : "Fast"}</h4>
          <Grid 
            grid = {gridRef.current}
            rows = {rows}
            columns = {columns}
            selectBox = {selectBox}
          />
          <h2>Generations: {genRef.current}</h2>
        {/* closes gameContainer */}
        </div>
        <Buttons 
            playButton = {playButton}
            slow = {slow}
            fast = {fast}
            clear = {clear}
            random = {random}
            gridSize = {gridSize}
            running = {running}
            oneGen = {oneGen}
          />
        <div className="rules">
          <h3><u>The Rules of the Game:</u></h3>
          <ol>
            <li>Any living cell with fewer than two live neighbors dies, as if by under-population.</li>
            <li>Any living cell with more than three living neighbors dies, as if by overpopulation.</li>
            <li>Any living cell with two or three living neighbors lives on to the next generation.</li>
            <li>Any dead cell with exactly three living neighbors comes alive, as if by reproduction.</li>
          </ol>
        {/* closes rules */}
        </div>
        
      {/* closes outerContainer */}
      </div> 
    {/* closes App */}
    </div> 
  );
}

export default App;
