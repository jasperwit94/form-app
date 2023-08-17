import React, { Fragment } from 'react';
import { Field, ErrorMessage, HelperMessage } from '@atlaskit/form';
import TextArea from '@atlaskit/textfield';

export default function GenericTextArea ({id, name , label, validate, placeholder, defaultValue}) {


    return (<Field id={id} name={name} label={label} placeholder={placeholder}  isRequired validate={validate} defaultValue={defaultValue}>
    {({ fieldProps,error }) => (
          <Fragment>
            <TextArea
              placeholder={placeholder} 
              {...fieldProps}
            />
                    {error  && (
                      <ErrorMessage>
                        {error}
                      </ErrorMessage>
                    )}
            <HelperMessage>
              Comment here
            </HelperMessage>
            
          </Fragment>
        )}
      </Field>

    )
}