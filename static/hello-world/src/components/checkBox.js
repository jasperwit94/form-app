import React, { ChangeEvent, useCallback, useState } from 'react';

import { Checkbox } from '@atlaskit/checkbox';
import CommentTextArea from './CommentTextArea';


export default function CheckBox(){

  
    const [isChecked, setIsChecked] = useState(false);
    const [onChangeResult, setOnChangeResult] = useState('true');
  
    const onChange = useCallback((event) => {
      setIsChecked((current) => !current);
      setOnChangeResult(`${event.target.checked}`);
    }, []);
  
    const checkIfChecked = () =>{
      if (isChecked == true){
        console.log('is checked')
        
      }else {
        console.log('is not clicked')
      }
      
    }

    checkIfChecked();

    return(
    <Checkbox
      isChecked={isChecked}
      onChange={onChange}
      label={`Controlled checkbox, with props.isChecked: ${onChangeResult}`}
      value="Controlled Checkbox"
      name="controlled-checkbox"/>
      )
  
    
  };