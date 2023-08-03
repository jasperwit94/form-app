import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import Button from '@atlaskit/button';
import DynamicTable from '@atlaskit/dynamic-table';
import DropdownMenu, {
    DropdownItem,
    DropdownItemGroup,
  } from '@atlaskit/dropdown-menu'
import Form, { Field, HelperMessage, ErrorMessage } from '@atlaskit/form';
import Textfield from '@atlaskit/textfield';
  
import Modal, {
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle,
    ModalTransition,
  } from '@atlaskit/modal-dialog';
  import TextArea from '@atlaskit/textarea';
const lorem = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Suspendisse tincidunt vehicula eleifend.',
    'Nunc tristique nisi tortor, at pretium purus interdum sed.',
    'Sed vel augue sit amet sapien elementum bibendum. Aenean aliquam elementum dui, quis euismod metus ultrices ut.',
    'Curabitur est sapien, feugiat vel est eget, molestie suscipit nibh.',
    'Nunc libero orci, lacinia id orci aliquam, pharetra facilisis leo.',
    'Quisque et turpis nec lacus luctus ultrices quis vel nisi.',
    'Cras maximus ex lorem, sit amet bibendum nibh placerat eu.',
    'In hac habitasse platea dictumst. ',
    'Duis molestie sem vel ante varius, rhoncus pretium arcu dictum.',
  ];
function App() {
    const [data, setData] = useState(null);
    const [presidents, setPresidents] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    
    function createKey(input) {
        return input ? input.replace(/^(the|a|an)/, '').replace(/\s/g, '') : input;
      }
      function iterateThroughLorem(index) {
        return index > lorem.length ? index - lorem.length : index;
      }
      
    const createHead = (withWidth) => {
        return {
          cells: [
            {
              key: 'name',
              content: 'Name',
              isSortable: true,
              width: withWidth ? 25 : undefined,
            },
            {
              key: 'lastame',
              content: 'Lastname',
              isSortable: true,
              width: withWidth ? 20 : undefined,
            },
            /*{
              key: 'party',
              content: 'Party',
              shouldTruncate: true,
              isSortable: true,
              width: withWidth ? 15 : undefined,
            },
            {
              key: 'term',
              content: 'Term',
              shouldTruncate: true,
              isSortable: true,
              width: withWidth ? 10 : undefined,
            },*/
            {
              key: 'content',
              content: 'Comment',
              shouldTruncate: true,
            },
            {
              key: 'more',
              shouldTruncate: true,
            },
          ],
        };
      };
      const onButtonClicker = () => {
        console.log('test')
      }
      const head = createHead(true);
      
      const rows = presidents.map((president, index) => ({
        key: `row-${index}-${president.name}`,
        isHighlighted: false,
        cells: [
          {
            key: createKey(president.name),
            content: (
                <a href="https://atlassian.design">{president.name}</a>
            ),
          },
          {
            key: createKey(president.lastname),
            content: president.lastname,
          },
          /*{
            key: createKey(president.party),
            content: president.party,
          },
          {
            key: president.id,
            content: president.term,
          },*/
          {
            key: 'Lorem',
            content: iterateThroughLorem(index),
          },
          {
            key: 'MoreDropdown',
            content: (
              <DropdownMenu trigger="More">
                <DropdownItemGroup>
                  <DropdownItem><Button appearance="primary" onClick={onButtonClicker}>delete</Button></DropdownItem>
                  <DropdownItem><Button appearance="primary" onClick={onButtonClicker}>edit</Button></DropdownItem>
                </DropdownItemGroup>
              </DropdownMenu>
            ),
          },
        ],
      }));
      

    useEffect(() => {
        console.log("my message")
        invoke('getText', { example: 'my-invoke-variable' }).then(setPresidents);
    }, []);

    const onButtonClick = () => {
        console.log("button clicked 1")
    }
    
    const validateName = (value) => {
      //console.log("ere i am ")
      //console.log(value)
        if (value === "Ian") {
          return
        }
        //console.log(' shou bbe')
        return " shoud be IAN"
    }
    const validateAddress = (value) => {
      if (!value) {
        return ;
      }
  
      if (value.length < 5) {
        return 'TOO_SHORT';
      }
  
      //return (value);
    };

  const openModal = () => {
    setIsOpen(true)
  };
  const closeModal = useCallback(() => setIsOpen(false), []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      const obj = {};
      data.forEach((val, key) => {
        obj[key] = val;
      });
      console.log(obj)
      setName(obj.name);
    },
    [setName],
  );
    return (
        <div>
      <Button appearance="primary" onClick={openModal}>
        Open modal
      </Button>
      <ModalTransition>
        {isOpen && (
          <Modal onClose={closeModal}>
             <Form onSubmit={data => console.log(data)}>
             {({ formProps, submitting }) => (
                <form {...formProps}>
              <ModalHeader>
                <ModalTitle>Create a user</ModalTitle>
              </ModalHeader>
              <ModalBody>
            
                <Field id="name" name="name" label="Type your name to continue"  isRequired validate={validateName}>
                  {({ fieldProps, error }) => (
                    <Fragment>
                      <Textfield
                        {...fieldProps}
                        placeholder="Ian Atlas"
                        value={undefined}
                      />
                      {error  && (
                      <ErrorMessage>
                        {error}
                      </ErrorMessage>
                    )}
                    </Fragment>
                  )}
                </Field>
                <Field id="address" name="address" label="Fill in your adress"  isRequired validate={validateAddress}>
                  {({ fieldProps, error }) => (
                    <Fragment>
                      <Textfield
                        {...fieldProps}
                        placeholder="Street town"
                        value={undefined}
                      />
                      {error  && (
                      <ErrorMessage>
                        {error}
                      </ErrorMessage>
                    )}
                    </Fragment>
                  )}
                </Field>
                <Form
      onSubmit={(formState) =>
        console.log('form submitted', formState)}>
                  {({ formProps }) => (
                    <form {...formProps}>
                      <Field label="comment" name="example-text">
                        {({ fieldProps }) => (
                          <Fragment>
                            <TextArea
                              placeholder="Comment"
                              {...fieldProps}
                            />
                            <HelperMessage>
                              Comment here
                            </HelperMessage>
                          </Fragment>
                        )}
                      </Field>
                    </form>
                  )}
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button appearance="subtle" onClick={closeModal}>
                  Close
                </Button>
                <Button appearance="primary" type="submit">
                  Create
                </Button>
              </ModalFooter>
              </form>
              )}
            </Form>
          </Modal>
        )}
      </ModalTransition>

            <DynamicTable
      head={head}
      rows={rows}
      rowsPerPage={5}
      defaultPage={1}
      loadingSpinnerSize="large"
      isRankable
    />
  
        </div>
    );
}


export default App;
