
import React, { useState } from "react";

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statisticline=({text,type})=>(    
      <tr>
        <td>{text}</td> 
        <td>{type}</td>
      </tr>
 )

const Statistics = (props) => {  
  if (props.good !== 0 || props.bad !==0 || props.neutral!==0) {
    return (  
      <table>
        <tbody>
        <Statisticline text="Good" type={props.good}/>
        <Statisticline text="neutral" type={props.neutral}/>
        <Statisticline text="bad" type={props.bad}/>
        <Statisticline text="All" type={props.allClicks}/>
        <Statisticline text="Avrage" type={props.avrage}/>
        <Statisticline text="positive" type={props.positive}/>
        </tbody>
      </table>
    )
  }
  return (    
    <h3>No feedback given</h3>    
  )
}

const App = () => {

const [good, setGood] = useState(0)
const [neutral, setNeutral] = useState(0)
const [bad, setBad] = useState(0)
const [value, setValue] = useState(0)
const [allClicks, setAll] = useState(0)

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
      <Statistics good={good} bad={bad} neutral={neutral} allClicks={allClicks} avrage={value/allClicks} positive={good*100/allClicks +"%"}/>                
  </div>
)
}

export default App
