import React, { ChangeEvent, useCallback, useState } from 'react';

import { Checkbox } from '@atlaskit/checkbox';



export default function CheckBox({isChecked, setIsChecked}){

  
    const onChange = useCallback((event) => {
      setIsChecked((current) => !current);
    }, []);

    return(
    <Checkbox
      isChecked={isChecked}
      onChange={onChange}
      label={"Need comment"}
      value="Controlled Checkbox"
      name="controlled-checkbox"/>
      )
  
    
  };