import React, {useContext, useEffect, useState} from 'react'
import FeedbackContext from '../context/FeedbackContext';

function RatingSelect({select}) {
  const [selected, setSelected] = useState(10);    
  const {feedbackEdit} = useContext(FeedbackContext);
  
  useEffect(() => {
    setSelected(feedbackEdit.item.rating);
  }, [feedbackEdit])

  function handleChange(e) {
    // console.log(e.currentTarget.value);
    setSelected(+e.currentTarget.value); // + sign change string to int
    select(+e.currentTarget.value);
  }

  return (
    <ul className='rating'>
      {Array.from({length: 10}, (_, i) => {
        return (
          <li key={`rating-${i + 1}`}>
            <input type="radio" id={`num${i + 1}`} name='rating' value={i+1} onChange={handleChange} checked={selected === i + 1} />
            <label htmlFor={`num${i+1}`}>{i + 1}</label>
          </li>
        )
      } )}
    </ul>
  )
}

export default RatingSelect