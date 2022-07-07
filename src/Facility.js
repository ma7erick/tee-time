import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import { get } from 'lodash'

import './Facility.css'
import { Button, Chip, TextField, useAddMessage } from 'react-md'

const times = []
for (let i = 0; i < 19; i++) {
  const thing2 = dayjs()
    .hour(9)
    .minute(0)
    .add(10 * i, 'm')
  times.push(thing2)
}

export default function Facility () {
  const { facilityId } = useParams()
  const [facility, setFacility] = useState()
  const [selectedTime, setSelectedTime] = useState(-1)
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [userId, setUserId] = useState()

  const addMessage = useAddMessage()

  useEffect(() => {
    axios
      .get(`http://localhost:5001/facilities/${facilityId}`)
      .then(res => setFacility(res.data))
  }, [facilityId, selectedTime])

  const submitTime = function () {
    const timeObj = get(times, selectedTime)

    if (timeObj) {
      axios
        .put(`http://localhost:5001/facilities/${facilityId}/reserve`, {
          date: timeObj.toDate(),
          firstName,
          lastName,
          userId
        })
        .then(() => {
          setSelectedTime(-1)
          addMessage({
            children: `You have reserved a tee time for ${timeObj.format(
              'HH:mm A'
            )}`
          })
        })
    }
  }

  const reservations = new Set()
  if (get(facility, 'reservations')) {
    facility.reservations.forEach(reservation => {
      const timeKey = dayjs(reservation.date).format('YYYY-MM-DD-HH-mm')
      reservations.add(timeKey)
    })
  }
  return (
    <div className='container'>
      <div className='half'>
        <div className='sectionContainer'>
          <h1>Facility Details</h1>
          {facility ? (
            <>
              <img
                className='picture'
                src={`${facility.imagePath}`}
                alt={facility.imagePath}
              />
              <div className='facilityName'>{facility.name}</div>
              <div className='facilityAddress'>{facility.address}</div>
              <div className='facilityDetails'>{facility.details}</div>
            </>
          ) : null}
          {}
        </div>
      </div>
      <div className='half'>
        <div className='sectionContainer teeTimesContainer'>
          <h1>Tee Times</h1>
          <div className='teeTimesList'>
            <ul>
              {times.map((time, i) => {
                const isTimeAvailable = !reservations.has(
                  time.format('YYYY-MM-DD-HH-mm')
                )
                return (
                  <li key={i} className='time-list'>
                    <Chip
                      className='teeTimeChip'
                      key={time.format('HH:mm')}
                      selected={selectedTime === i}
                      selectedThemed
                      onClick={() => setSelectedTime(i)}
                      disabled={!isTimeAvailable}
                    >
                      {time.format('H:mm A')}
                      {' -- '}
                      {isTimeAvailable ? 'Available' : 'Reserved'}
                    </Chip>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <div className='sectionContainer'>
          <h1>Registration Form</h1>
          <TextField
            className='textField'
            key='firstName'
            // label='First Name'
            name='firstName'
            placeholder='First Name'
            onChange={e => setFirstName(e.target.value)}
            value={firstName}
            // theme='filled'
          />
          <TextField
            className='textField'
            key='lastName'
            placeholder='Last Name'
            onChange={e => setLastName(e.target.value)}
          />
          <TextField
            className='textField'
            key='userId'
            placeholder='PGA Member ID'
            onChange={e => setUserId(e.target.value)}
          />
          <Button
            id='outlined-button-5'
            theme='clear'
            themeType='outline'
            onClick={submitTime}
            disabled={selectedTime < 0 || !firstName || !lastName}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  )
}
