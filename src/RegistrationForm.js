import React from 'react'
import { Button, TextField } from 'react-md'

export default function RegistrationForm ({
  firstName,
  lastName,
  selectedTime,
  setFirstName,
  setLastName,
  setUserId,
  submitTime
}) {
  return (
    <div className='sectionContainer'>
      <h1>Registration Form</h1>
      <TextField
        className='textField'
        key='firstName'
        name='firstName'
        placeholder='First Name'
        onChange={e => setFirstName(e.target.value)}
        value={firstName}
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
  )
}
