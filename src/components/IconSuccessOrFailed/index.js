/* eslint-disable react/prop-types */
import React from 'react'

export default function IconSuccessOrFailed(props) {
  const { value } = props
  if (value) {
    return (
      <div className="text-center">
        <i className="icon-check text-success" style={{ fontSize: '25px' }} />
      </div>
    )
  }
  return (
    <div className="text-center">
      <i className="icon-close text-danger" style={{ fontSize: '25px' }} />
    </div>
  )
}
