import React, { Fragment, useCallback, useEffect, useState, ChangeEvent, } from 'react';
import { invoke } from '@forge/bridge';
import Button from '@atlaskit/button';
import DynamicTable from '@atlaskit/dynamic-table';
import DropdownMenu, {
    DropdownItem,
    DropdownItemGroup,
  } from '@atlaskit/dropdown-menu'
import Form, { Field, HelperMessage, ErrorMessage } from '@atlaskit/form';

  
import Modal, {
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle,
    ModalTransition,
  } from '@atlaskit/modal-dialog';
import FirstNameTextField from './components/FirstNameTextField';
import CommentTextArea from './components/CommentTextArea';
import AddressTextArea from './components/AddressTextArea';
import CheckBox from './components/HasCommentCheckBox';

function App() {
    const [isChecked, setIsChecked] = useState(false);
    const [data, setData] = useState(null);
    const [presidents, setPresidents] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [currentTableState, setCurrentTableState] = useState({
      nextCursor : ''
    })
    
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


      const onButtonClicker = async (operation, rowId) => {
        console.log(operation)
        console.log(rowId)
        await invoke('deleteTableRow', { rowId }).then(successCallback, failureCallback);
        
        function successCallback() {
          console.log(`yay it works`);
          //getNextData();
        }
        function failureCallback() {
          console.error(`aww too bad`);
        }
      }
      const head = createHead(true);
      
      const rows = presidents.map((president, index) => ({
        key: `row-${index}-${president["value"]["first-name"]}`,
        isHighlighted: false,
        cells: [
          {
            key: createKey(president["value"]["first-name"]),
            content: (
                <a href="https://atlassian.design">{president["value"]["first-name"]}</a>
            ),
          },
          {
            key: createKey(president["value"].address),
            content: president["value"].address,
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
            key: createKey(president["value"].comment),
            content: president["value"].comment,
          },
          {
            key: 'MoreDropdown',
            content: (
              <DropdownMenu trigger="More">
                <DropdownItemGroup>
                  <DropdownItem><Button appearance="primary" onClick={onButtonClicker}>Edit</Button></DropdownItem>
                  <DropdownItem><Button appearance="primary" onClick={() => onButtonClicker("delete", president["key"])}>Delete</Button></DropdownItem>
                </DropdownItemGroup>
              </DropdownMenu>
            ),
          },
        ],
      }));
      

    useEffect(() => {
      (async () => {
        console.log("my message")
      await getNextData()
      })();
    }, [1]);
   


  const openModal = () => {
    setIsOpen(true)
  };
  const closeModal = useCallback(() => setIsOpen(false), []);
  const getNextData = async () =>{
    const tableState = await invoke('getData', { cursor: currentTableState.nextCursor});
    console.log(tableState)
    setPresidents([...presidents, ...tableState.results.map(row => row)])
    setCurrentTableState(tableState)
  } 
  const onSetPage = async (page) => {
    if (page * 5 > presidents.length) {
      console.log(" fetch new rows")
      await getNextData()
     
    } else {
    console.log(" do not do anything")
    }
  }
  const onSubmit = async(data) => {

    console.log(" 111")
    console.log(data)
    const result = await invoke('addTableRow', { data });
    console.log(result)


  }
    return (
        <div>
      <Button appearance="primary" onClick={openModal}>
        Open modal
      </Button>
      <ModalTransition>
        {isOpen && (
          <Modal onClose={closeModal}>
             <Form onSubmit={onSubmit}>
             {({ formProps, submitting }) => (
                <form {...formProps}>
              <ModalHeader>
                <ModalTitle>Create a user</ModalTitle>
              </ModalHeader>
              <ModalBody>
                <FirstNameTextField/>
                <AddressTextArea/>
                <CheckBox
                 isChecked={isChecked}
                 setIsChecked={setIsChecked}/>
                {isChecked && (
                <CommentTextArea/>
                )}
                
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
      onSetPage={onSetPage}
    />
  
        </div>
    );
}

export default App;