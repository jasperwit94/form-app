import React, { Fragment } from 'react';
import GenericTextField from './generic/GenericTextField';



export default function AddressTextArea({defaultValue}){
  console.log("addres" , defaultValue)
 
    const validateAddress = (value) => {
        if (!value) {
          return ;
        }
    
        if (value.length < 5) {
          return 'TOO_SHORT';
        }
      };
      return (
        <GenericTextField id={"address"} name = {"address" } label= {"address"} placeholder={"street town"} validate={validateAddress} defaultValue={defaultValue}/>
    )

}