import React from 'react'

export default function FacilityDetails ({ facility }) {
  return (
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
    </div>
  )
}
