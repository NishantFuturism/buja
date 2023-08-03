/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
import React from 'react'
export default function Timeslotdateselect() {
  return (
    <>
      <div>
        <input type="checkbox" onClick="PaymentMethodChange(this)"
          className="custom-checkbox"
          name="paymentmodewallet" checked="checked" value="W" style={{ width: '2%' }} disabled="" />
      </div>
    </>
  )
}
