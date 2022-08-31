import React, {useState, useEffect} from 'react'
import Card from './shared/Card'
import Button from './shared/Button';
import RatingSelect from './RatingSelect';
import { setSelectionRange } from '@testing-library/user-event/dist/utils';
import { useContext } from 'react';
import FeedbackContext from '../context/FeedbackContext';

function FeedbackForm() {
  const [text, setText] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(10);
  const {addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext);

  useEffect(() => {
    if (feedbackEdit.edit) {
      setBtnDisabled(false);
      setText(feedbackEdit.item.text);
      setRating(feedbackEdit.item.rating);
    } 
  }, [feedbackEdit]);

  function handleTextChange(event) {
    const inputVal = event.target.value;
    if (inputVal === '') {
      setBtnDisabled(true);
      setMessage(null);
    } else if (inputVal.trim().length < 10 ) {
      setMessage('Text must be at least 10 charaters');
      setBtnDisabled(true);
    } else {
      setMessage(null);
      setBtnDisabled(false);
    }
    setText(inputVal);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if(text.trim().length > 10) {
      const newFeedback = {
        text, rating
      }
      if (feedbackEdit.edit === true) {
        updateFeedback(feedbackEdit.item.id, newFeedback);
      } else {
        addFeedback(newFeedback);
      }
      
      setText('');
    }
  }

  return (
    <Card>
        <form onSubmit={handleSubmit}>
            <h2>How would you rate your service with us?</h2>
            <RatingSelect select={(rating) => (setRating(rating))} />
            <div className="input-group">
                <input 
                  type="text" 
                  placeholder='Write a review' 
                  onChange={handleTextChange} 
                  value={text} 
                />
              <Button type='submit' version='secondary' isDisabled={btnDisabled}> Send </Button>
            </div>
          {message &&  <div className='message'> {message} </div> }
        </form>
    </Card>
  )
}

export default FeedbackForm