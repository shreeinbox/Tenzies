
import './App.css'
import { nanoid } from 'nanoid';
import { useEffect, useRef, useState } from 'react';
import Counter from './Counter';
import Dice from './Dice';


function App() {
  
  const [buttons, setButtons] = useState(generateRandomDice())
  const [counter, setCounter] = useState(0)
  const [timer, setTimer] = useState(30)
  const [gameOver, setGameOver] = useState(false)
  const [startGameInd, setStartGameInd] = useState(false)
  const gameWon = useRef(false)
  
  if(buttons.every(dice => dice.value === buttons[0].value && dice.isHeld)){
    console.log('won')
    //gameWon = true
    gameWon.current = true
  }
  function startGame(){
    //console.log('StartGame')
    setStartGameInd(true)
  }
  useEffect (()=>{
    if(!startGameInd) return;
      const intervalId = setInterval(()=>{
      //console.log('intervalid:' + intervalId)
      //console.log('gamewon.current::'+ gameWon.current)
      if(gameWon.current){
        clearInterval(intervalId)
      }
      else{
        setTimer((prevTimer)=>{
          if(prevTimer <= 0){
            console.log('Clearing this id as it is timeup:' + intervalId)
            console.log('timervalue:' + prevTimer)
            console.log('time is up')
            clearInterval(intervalId)
            return 0; //this is to set the x state back to 0
          }
          
          return prevTimer = prevTimer - 1;
        });
      }
    },1000)

    return (()=>{
      if(intervalId){
        console.log('Clearing this id in useeffect return' + intervalId)
        clearInterval(intervalId)
      }
    })

  },[gameOver, startGameInd])

  function generateRandomDice(){
    const dice = [];
    for(let i=0; i<10; i++){
      dice.push({value: Math.floor(Math.random()*6)+1,
                    id:nanoid(),
                    isHeld:false,
                })
    }
    return dice
  }
  function handleBtn(e){
    const selectedID = e.currentTarget.id
    setButtons((prevButtons)=>{
      return prevButtons.map((button) => {
        return button.id === selectedID ? {...button, isHeld : !button.isHeld } : button 
      })
    })
  }

  function newGame(){
      setButtons(generateRandomDice)
      setCounter(0)
      setTimer(30)
      setGameOver((prevGameOver)=>{
        return !prevGameOver;
      })
      gameWon.current = false;
  }

  function handleRoll(){
    if(gameWon.current){
      //console.log('not reachable area')
      //setButtons(generateRandomDice)
      //setCounter(0)
      //setTimer(0)
      gameWon.current = false;
    } else{
      setCounter(counter+1)
      setButtons((prevButtons) => {
        return prevButtons.map((button) => {
          return !button.isHeld ? {...button, value:Math.floor(Math.random()*6)+1} : button
        })
      })
    }
  }
//  console.log('hey:' + startGameInd)
  return (
    <main>
      <div className='header'>
        <h1>Tenzies</h1>
        <p>Roll untill all are the same. Click each die to freeze it at its current value between rolls.</p>
      </div>
      <div className='infoBoard'>
        <h3>Roll Counter: {counter}</h3>
        <h3>Timer: {timer} seconds</h3>
      </div>
      {gameWon.current? <h3 className='popUp'>Congratulations!! You won!</h3>: timer===0 ? <h3 className='popUp'>Time is Up!! Start a new Game</h3>:''}
      {startGameInd &&
        <Dice buttons={buttons} handleBtn={handleBtn} />
      }
      {/* <div id='container'>
        {buttons.map((element)=>{
          return <button className={element.isHeld?`btn btnSelected backgroundOption${element.value}` : `btn backgroundOption${element.value}`} 
                         onClick={handleBtn} 
                         key={element.id}
                         id={element.id}
                         >
                            
                 </button>
        })
        }
      </div> */}
      {
      !startGameInd ? 
        <button onClick={startGame} className='btn roll'>Start Game</button>
      :
      gameWon.current ?
      <button onClick={newGame} className='btn roll'>New Game</button>
      :
      timer === 0? 
      <button onClick={newGame} className='btn roll'>New Game</button>
      :
      <button onClick={handleRoll} className='btn roll'>Roll</button> 
      }
      <div className='footer'>Icons made by <a href="https://www.flaticon.com/authors/zlatko" title="Zlatko">Zlatko</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </main>
  )
}
export default App
