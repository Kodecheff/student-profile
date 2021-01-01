import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import './components.css'
// import Searchbox from './Searchbox';
import {Form, Button, Col, Row} from 'react-bootstrap'



const Students = () => {

  let history = useHistory()
  const [data, setData] = useState([])
  const [students, setStudents] = useState([])
  const [error, setError] = useState('')
  const url = 'https://randomuser.me/api?results=25&nat=us'

  const getStudent = (e) => {
    let element = e.target;
    let studentName;

    // Check if the clicked target has the class name "card-body"
    if(element.className === "card-body"){

      const elements = element.childNodes
      console.log(elements)
      elements.forEach(elem => {
        if(elem.classList.contains('studentName')){

          studentName = elem.innerHTML.split(' ')
        }
      })

      const selected = students.filter((student) => {
        return student.name.first === studentName[0]
      })

        localStorage.setItem('student', JSON.stringify(selected[0]))
        return history.push('/profile')
    }

    // Check if clicked target contains the class name "studentName"
    if(element.classList.contains('studentName')){
      studentName = element.innerHTML.split(' ')

      const selected = students.filter((student) => {
        return student.name.first === studentName[0]
      })

      localStorage.setItem('student', JSON.stringify(selected[0]))
      return history.push('/profile')
    }
    return;
  }


  useEffect(() => {

    if(localStorage.getItem('fetch')){
      const parseData = localStorage.getItem('fetch') // Fetching data from local storage
      setData(JSON.parse(parseData))
      setStudents(JSON.parse(parseData))

    }else{
      axios.get(url, {
        headers: {
          'Content-Type': 'application/json'
        }})
      .then((res) => {

        localStorage.setItem('fetch', JSON.stringify(res.data.results)) // Stores data on local storage
         setStudents(res.data.results)
         setData(res.data.results)
         console.log('fetched')
         console.log(students)
      })
      .catch(error => {
        console.log(error.message)
      })
    }

    // Clear local storage after 5 seconds
    setTimeout(() => {
        localStorage.removeItem('fetch')
      }, 10000)

  }, [])

  const handleSearch = (e) => {
    e.preventDefault();
    let input = document.getElementById('input').value
   const result =  data.filter(student => {
      if(input.toLowerCase() === student.name.first.toLowerCase() || 
        input.toLowerCase() === student.name.last.toLowerCase()){
        return student;
      }
      return null
    })

    // if(result.)
    if(result.length === 0){
      setStudents([])
      setError("Search not found")
    }else{
      setError('')
      setStudents(result)
    }

    console.log(data)
  }


  return (
    <div className="App">

      {/* Search box */}
      <div className="p-3">
      <Form onSubmit={handleSearch}>
        <Form.Group>
          <Col md="11" sm="10" xs="10">
            <Form.Control type="text" placeholder="Search" id="input"/>
          </Col>
          <Col md="1" sm="2" xs="2">
            <Button type="submit">Search</Button>
          </Col>
        </Form.Group>
      </Form>
    </div>

      {/* Student card list */}
      <div className="container">
        <div className="row">
          {students.map((student) => (
            <div onClick={getStudent} className="m-auto cards" key={student.id.value}>
              <Card
                
                style={{ width: '200px',height: 'auto', marginBottom: "20px"}} 
                className="mb-5" >

                <Card.Img variant='top' src={student.picture.large}/>
                <Card.Body>
                <Card.Title className="studentName">{student.name.first+' '+student.name.last}</Card.Title>
                </Card.Body>
              </Card>
            </div>
      
          
          
          ))}
        </div>
      </div>
          <h2 style={{textAlign: "center"}}>{error}</h2>
    </div>
  );
}

export default Students;
