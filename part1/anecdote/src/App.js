import React, { useState } from "react";

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
]

const SelectedAnecdote = ({anecdotes, selected, points}) => (
<>
<p>{anecdotes[selected]}</p>
<p>has {points[selected]} votes</p>
</>
)

const App = () => {
  const [selected, setSelected] = useState(0)
  // Define a zero-filled array of a desired length.
  const pointlength = new Array(anecdotes.length).fill(0)
  const [points, setPoints] = useState(pointlength)

  const handleVote = () => {  
    const copy = [...points]
    copy[selected]++
    setPoints(copy)
  }

  const nextAnecdote = () => {
    const random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random)
    }
  
return (
  <>
    <SelectedAnecdote anecdotes={anecdotes} selected={selected} points={points} />
    <button onClick={handleVote}>vote</button>
    <button onClick={nextAnecdote}>next anecdote</button>
  </>
)
}
export default App
