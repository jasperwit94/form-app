
import React, { Fragment, useState, useEffect } from 'react';
import Form, { Field, HelperMessage, ErrorMessage } from '@atlaskit/form';

import Button, { LoadingButton } from '@atlaskit/button';
import Modal, {
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle,
    ModalTransition,
  } from '@atlaskit/modal-dialog';
import FirstNameTextField from './FirstNameTextField';
import CommentTextArea from './CommentTextArea';
import AddressTextArea from './AddressTextArea';
import CheckBox from './HasCommentCheckBox';


export default function ModalDialog ({isOpen, onSubmit, closeModal, editedItem }) {
    const [isChecked, setIsChecked] = useState(false)

    
    useEffect(() => {
      (async () => {
        console.log(" fired")
          setIsChecked(editedItem? editedItem.value.comment : false)
      })();
    }, [editedItem]);

    const onModalClose = () =>{
      console.log(" onMOdal close")
      setIsChecked(false)
      closeModal()
    }


    const onFormSubmit = (data) => {
      setIsChecked(false)
      onSubmit(data)
    }
    return (
        <ModalTransition>
        {isOpen && (
          <Modal onClose={onModalClose}>
             <Form onSubmit={onFormSubmit}>
             {({ formProps, submitting }) => (
                <form {...formProps}>
              <ModalHeader>
                <ModalTitle>Create a user</ModalTitle>
              </ModalHeader>
              <ModalBody>
                <FirstNameTextField defaultValue={editedItem ? editedItem.value["first-name"] : ""}/>
                <AddressTextArea defaultValue={editedItem ? editedItem.value.address : ""}/>
                <CheckBox
                 isChecked={editedItem? editedItem.value.comment : isChecked }
                 setIsChecked={setIsChecked}
                 />
                {(isChecked) && (
                <CommentTextArea defaultValue={editedItem ? editedItem.value.comment : ""} prop1 = " asdfasd"
                />
                )}
                
              </ModalBody>
              <ModalFooter>
                <Button appearance="subtle" onClick={onModalClose}>
                  Close
                </Button>
                <LoadingButton isLoading={submitting} appearance="primary" type="submit">
                  Create
                </LoadingButton>
              </ModalFooter>
              </form>
              )}
            </Form>
          </Modal>
        )}
      </ModalTransition>
    )
}