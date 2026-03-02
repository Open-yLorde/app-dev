import React from 'react'

export default function CustomSwitch({ checked, onChange, disabled }) {
  return (
    <>
      <label className={"switch"} style={{
        cursor: disabled ? 'not-allowed' : 'pointer'
      }}>
        {disabled ? (
          <input type="checkbox" defaultChecked={checked} disabled style={{
            cursor: disabled ? 'not-allowed' : 'pointer'
          }} />
        ) : (
          <input type="checkbox" defaultChecked={checked} onChange={(e) => {
            onChange(e);
            window.location.reload();
          }} />
        )}
        <span className="slider round" style={{
          cursor: disabled ? 'not-allowed' : 'pointer'
        }}></span>
      </label>
    </>
  )
}
