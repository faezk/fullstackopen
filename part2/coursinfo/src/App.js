import React from 'react'
const Courses = ({ courses }) => {
 // console.log(courses)
  return (
    <> 
    <h1>Web development curriculum</h1>
     {courses.map(course => <Course key={course.id} course={course} />)}   
   </>
  )
}
const Course = ({course})=>{
   // console.log(course)
return(
  <>
     <h2>{course.name}</h2>
      {course.parts.map(part => <p key={part.id}> {part.name}  <b>{part.exercises}</b> </p>)}
      <Total parts={course.parts}/>
  </>
)
}
 const Total = ({ parts })=>{
  //  console.log(parts);
   return(
     <>
    <p>Total of <b>{parts.reduce((sum, part)=> sum + part.exercises, 0)}</b> exercises</p> 
     </>
   )
 
}


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  return <Courses courses={courses} />
 }
export default App