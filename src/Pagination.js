import React from 'react'


export default function Pagination({goToNextPage, goToPrevPage}) {
  return (
    <div>
        {goToPrevPage && <button onClick={goToPrevPage}>Prev</button>}
        {goToNextPage && <button onClick={goToNextPage}>Next</button>}
    </div>
  )
}
