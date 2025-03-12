
import './App.css'
import { nanoid } from 'nanoid';
import { useState } from 'react';
import Counter from './Counter';


function App() {
  
  const [buttons, setButtons] = useState(generateRandomDice())
  const [counter, setCounter] = useState(0)
  const [timer, setTimer] = useState(0) 

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
    //console.log('clicked')
    const selectedID = e.currentTarget.id
    setButtons((prevButtons)=>{
      return prevButtons.map((button) => {
        return button.id === selectedID ? {...button, isHeld : !button.isHeld } : button 
      })
    })
  }

  function handleRoll(){
    
    if(gameWon){
      setButtons(generateRandomDice)
      setCounter(0)
      gameWon = false;
    } else{
      setCounter(counter+1)
      setButtons((prevButtons) => {
        return prevButtons.map((button) => {
          return !button.isHeld ? {...button, value:Math.floor(Math.random()*6)+1} : button
        })
      })
    }
  }

  let gameWon = false 
  
  if(buttons.every(dice => dice.value === buttons[0].value && dice.isHeld)){
    console.log('won')
    gameWon = true
  }

  return (
    <main>
      <div>
        <h1 className='title'>Tenzies</h1>
        <p className='info'>Roll untill all are the same. Click each die to freeze it at its current value between rolls.</p>
      </div>
      <Counter count={counter} />
      <h4>Timer : {timer} seconds </h4>
      {gameWon? <h3>Congratulations!! You won!</h3>:''}
      <div id='container'>
        {buttons.map((element)=>{
          return <button className={element.isHeld?`btn btnSelected backgroundOption${element.value}` : `btn backgroundOption${element.value}`} 
                         onClick={handleBtn} 
                         key={element.id}
                         id={element.id}
                         >
                            
                 </button>
        })
        }
      </div>
      <button onClick={handleRoll} className='btn roll'>{gameWon ? 'New Game': 'Roll'}</button> 
      <div className='footer'>Icons made by <a href="https://www.flaticon.com/authors/zlatko" title="Zlatko">Zlatko</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </main>
  )
}
export default App
