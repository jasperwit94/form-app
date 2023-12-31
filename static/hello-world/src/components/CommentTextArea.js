import React, { Fragment } from 'react';
import GenericTextArea from './generic/GenericTextArea';


export default function CommentTextArea({defaultValue, prop1}) {
  console.log(defaultValue)
  console.log(prop1)
    const validateComment = (value) => {
        if (!value) {
          return ;
        }
    
        if (value.length < 10) {
          return 'Comment should be longer than 10 characters';
        }
    
       
      };  
      return (
        <GenericTextArea id={"comment"} name = {"comment" } label= {"Comment"} placeholder={"Comment here at least 10"} validate={validateComment} defaultValue={defaultValue} />
    )
}