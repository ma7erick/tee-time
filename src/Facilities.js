import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Button } from 'react-md'
import { Link } from 'react-router-dom'
import './Facilities.css'

export default function Facilities () {
  const [facilities, setFacilities] = useState([])
  useEffect(() => {
    axios.get(`/facilities`).then(res => setFacilities(res.data))
  }, [])

  return (
    <div className='facilitiesContainer'>
      <h1 className='facilitiesHeader'>Facilities</h1>
      <div className='facilities'>
        {facilities.map(facility => (
          <Button>
            <Link className='link' to={`/${facility._id.toString()}`}>
              {facility.name}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  )
}
