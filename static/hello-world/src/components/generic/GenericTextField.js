

import React, { Fragment } from 'react';
import { Field, ErrorMessage } from '@atlaskit/form';
import Textfield from '@atlaskit/textfield';
  

export default function GenericTextField ({id, name , label, placeholder, validate, defaultValue}) {


    return (<Field id={id} name={name} label={label} placeholder={placeholder}  isRequired validate={validate} defaultValue={defaultValue}>
    {({ fieldProps, error }) => (
      <Fragment>
        <Textfield
          {...fieldProps}
          placeholder={placeholder} 
        />
        {error  && (
        <ErrorMessage>
          {error}
        </ErrorMessage>
      )}
      </Fragment>
    )}
  </Field>)
}