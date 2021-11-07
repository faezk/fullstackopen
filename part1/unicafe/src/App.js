
import React, { useState } from "react";


const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)
const Statistic=({text,type})=>(
    
    <div><b>{text}</b>: {type} </div>
)

const App = () => {

const [good, setGood] = useState(0)
const [neutral, setNeutral] = useState(0)
const [bad, setBad] = useState(0)
const Isdisplay=((good!==0) || (neutral!==0) || (bad!==0)) ? true:false; 
const all=good + neutral + bad;
const avrage=(good, neutral,bad, all)=>{
  if(all !==0){
    return ((good*1) + (neutral*0) + (bad*-1) )/all 
  }
  else{
    return 0;
  }
}
const positive=(good, all)=>{
  if(all !==0){
    return (good*100 )/all 
  }
  else{
    return 0;
  }
}
return (
  <div>
    <h1>Feedback here</h1>
    <Button onClick={() => setGood(good + 1)}
      text='Good'
    />
        <Button onClick={() => setNeutral(neutral + 1)}
      text='Neutral'
    />
        <Button onClick={() => setBad(bad + 1)}
      text='bad'
    />
    
      <h1>Statistics</h1>
       {Isdisplay
        ? <div>
        <Statistic text="Good" type={good}/>
        <Statistic text="neutral" type={neutral}/>
        <Statistic text="bad" type={bad}/>
        <Statistic text="All" type={all}/>
        <Statistic text="avrage" type={avrage(good, neutral, bad, all)}/>
        <Statistic text="positive" type={positive(good, all)}/>
       </div>
       :<h3>No feedback given</h3>}               
  </div>
)
}

export default App
