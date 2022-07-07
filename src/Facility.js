import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import { get } from 'lodash'

import './Facility.css'
import { useAddMessage } from 'react-md'
import FacilityDetails from './FacilityDetails'
import TeeTimes from './TeeTimes'
import RegistrationForm from './RegistrationForm'

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
    axios.get(`/facilities/${facilityId}`).then(res => setFacility(res.data))
  }, [facilityId, selectedTime])

  const submitTime = function () {
    const timeObj = get(times, selectedTime)

    if (timeObj) {
      axios
        .put(`/facilities/${facilityId}/reserve`, {
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
        <FacilityDetails facility={facility} />
      </div>
      <div className='half'>
        <TeeTimes
          times={times}
          reservations={reservations}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
        <RegistrationForm
          firstName={firstName}
          lastName={lastName}
          selectedTime={selectedTime}
          setFirstName={setFirstName}
          setLastName={setLastName}
          setUserId={setUserId}
          submitTime={submitTime}
        />
      </div>
    </div>
  )
}
