
import React, { useState } from "react";


const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)
const Statisticline=({text,type})=>(    
    <div><b>{text}</b>: {type} </div>
)


const App = () => {

const [good, setGood] = useState(0)
const [neutral, setNeutral] = useState(0)
const [bad, setBad] = useState(0)
const [value, setValue] = useState(0)
const [allClicks, setAll] = useState(0)
const Isdisplay=((good!==0) || (neutral!==0) || (bad!==0)) ? true:false; 

return (
  <div>
    <h1>Feedback here</h1>
      <Button onClick={() => {
        setGood(good + 1) 
        setValue(value + 1) 
        setAll(allClicks + 1)}} text="Good" />

     <Button onClick={() => {
      setNeutral(neutral + 1) 
      setValue(value + 0) 
      setAll(allClicks + 1)}} text="Neutral" />

     <Button onClick={() => {
      setBad(bad + 1)
      setValue(value - 1) 
      setAll(allClicks + 1)}} text="Bad" />

      <h1>Statistics</h1>
       {Isdisplay
        ?<div>        
        <Statisticline text="Good" type={good}/>
        <Statisticline text="neutral" type={neutral}/>
        <Statisticline text="bad" type={bad}/>
        <Statisticline text="All" type={allClicks}/>
        <Statisticline text="Avrage" type={value/allClicks}/>
        <Statisticline text="positive" type={(good*100 )/allClicks+'%'}/>
        </div>
       :<h3>No feedback given</h3>}               
  </div>
)
}

export default App
