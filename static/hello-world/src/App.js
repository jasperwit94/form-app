import React, { Fragment, useCallback, useEffect, useState, ChangeEvent, } from 'react';
import { invoke } from '@forge/bridge';
import Button, { LoadingButton } from '@atlaskit/button';
import DynamicTable from '@atlaskit/dynamic-table';
import DropdownMenu, {
    DropdownItem,
    DropdownItemGroup,
  } from '@atlaskit/dropdown-menu'
import ModalDialog from './components/ModalDialog';

function App() {
    const [isChecked, setIsChecked] = useState(undefined);
    const [data, setData] = useState(null);
    const [presidents, setPresidents] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [currentTableState, setCurrentTableState] = useState({
      nextCursor : ''
    })
    const [isTableLoadin, setISTableLoading] = useState(true)
    const [editedItem, setEditedItem] = useState(undefined)
    
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
        try{
          setISTableLoading(true)
        await invoke('deleteTableRow', { rowId })
        await reloadTable()
        setISTableLoading(false)
        console.log(`yay it works`);
			} catch (error) {
  console.error(`aww too bad`);}
      }

      const onEditClicker = (president) =>{
        console.log('were gonna edit', president)
        setEditedItem(president)
        openModal();
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
                  <DropdownItem><Button appearance="primary" onClick={() => onEditClicker((president))}>Edit</Button></DropdownItem>
                  <DropdownItem><Button appearance="primary" onClick={() => onButtonClicker("delete", president["key"])}>Delete</Button></DropdownItem>
                </DropdownItemGroup>
              </DropdownMenu>
            ),
          },
        ],
      }));
      

    useEffect(() => {
      (async () => {
        setISTableLoading(true)
        await getNextData()
        setISTableLoading(false)
      })();
    }, []);
   


  const openModal = () => {
    setIsOpen(true)
  };
  const closeModal = useCallback(() => {
    setIsOpen(false)
    setEditedItem(undefined)
    setIsChecked(false)}
    , []);
  const getNextData = async () =>{
    const tableState = await invoke('getData', { cursor: currentTableState.nextCursor});
    console.log(tableState)
    setPresidents([...presidents, ...tableState.results.map(row => row)])
    setCurrentTableState(tableState)
  } 

  const reloadTable = async () =>{

    const tableState = await invoke('getData', { cursor: ''});
    console.log(tableState)
    setPresidents([...tableState.results.map(row => row)])
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

    console.log(data)
    const result = await invoke('addTableRow', { data });
    setIsOpen(false)
    setIsChecked(false)
    reloadTable()
    console.log(result)


  }
    return (
        <div>
      <Button appearance="primary" onClick={openModal}>
        Open modal
      </Button>
     <ModalDialog
     
     isOpen = {isOpen}
      onSubmit ={onSubmit} 
      closeModal = {closeModal}
      editedItem = {editedItem} 
     />

    <DynamicTable
      head={head}
      rows={rows}
      rowsPerPage={5}
      defaultPage={1}
      loadingSpinnerSize="large"
      isRankable
      onSetPage={onSetPage}
      isLoading={isTableLoadin}
    />
  
        </div>
    );
}

export default App;