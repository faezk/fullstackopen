import React from 'react'
const Course=({ course }) => {
  return (
    <>
     <h1>{course.name}</h1>
     {course.parts.map(x => <p key={x.id}>{x.name + x.exercises} </p>)}
   </>
  )
}
const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}
export default App