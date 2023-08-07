

import React, { Fragment } from 'react';
import { Field, ErrorMessage } from '@atlaskit/form';
import Textfield from '@atlaskit/textfield';
  

export default function GenericTextField ({id, name , label, placeholder, validate}) {


    return (<Field id={id} name={name} label={label} placeholder={placeholder}  isRequired validate={validate}>
    {({ fieldProps, error }) => (
      <Fragment>
        <Textfield
          {...fieldProps}
          placeholder={placeholder} 
          value={undefined}
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