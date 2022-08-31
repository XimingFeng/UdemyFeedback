import React from "react";
import { createContext, useState } from "react";
import {v4 as uuidv4} from "uuid";
import FeedbackData from "../data/FeedbackData";


const FeedbackContext = createContext();

function FeedbackProvider({children}) {
    const [feedback, setFeedback] = useState(FeedbackData);

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {}, 
        edit: false
    })

    const deleteFeedback = (id) => {
        if (window.confirm('Are you sure to delet this piece of shit feedback?')) {
          setFeedback(feedback.filter((item) => {
            return item.id !== id;
          }))
        }    
    };

    function addFeedback(newFeedback) {
        newFeedback.id = uuidv4()
        setFeedback([newFeedback, ...feedback]);
    }

    function editFeedback(item) {
        setFeedbackEdit({
            item, 
            edit: true
        })
    }

    // update feedback item 
    function updateFeedback(id, updItem) {
        updItem.id = id;
        setFeedback(feedback.map((item) => item.id === id? updItem: item) );
    }

    return (
        <FeedbackContext.Provider value={{
            feedback, 
            feedbackEdit, 
            deleteFeedback, 
            addFeedback, 
            editFeedback, 
            updateFeedback
        }}>
            {children}
        </FeedbackContext.Provider>
    )
}

export {FeedbackProvider};

export default FeedbackContext; 