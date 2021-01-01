import React, {useState} from 'react'
import './components.css'

const Profile = () => {
  let studentInfo = localStorage.getItem('student')
  let info = JSON.parse(studentInfo)
  console.log(info)
  const [student] = useState(info)
  return (
    <div>
      <div className="profileContainer">
        <div className="profile-pic-area">
        <img src={student.picture.large} alt="profile" className="rounded-circle" />
        <h4>{student.name.first} {student.name.last}</h4>
        </div>

        <div className="profile-info-area">
          <table>
            <tbody>
              <tr>
                <th>Gender:</th>
                <td>{student.gender}</td>
              </tr>
              <tr>
                <th>Age:</th>
                <td>{student.dob.age}</td>
              </tr>
              <tr>
                <th>Country:</th>
                <td>{student.location.country}</td>
              </tr>
              <tr>
                <th>State:</th>
                <td>{student.location.state}</td>
              </tr>
              <tr>
                <th>Address:</th>
                <td>No. {student.location.street.number} {student.location.street.name}</td>
              </tr>
              <tr>
                <th>Phone Number:</th>
                <td>{student.phone}</td>
              </tr>
              <tr>
                <th>Email:</th>
                <td>{student.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Profile
