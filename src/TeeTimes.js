import React from 'react'
import { Chip } from 'react-md'

export default function TeeTimes ({
  times,
  reservations,
  selectedTime,
  setSelectedTime
}) {
  return (
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
  )
}
