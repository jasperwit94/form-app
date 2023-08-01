import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import Button from '@atlaskit/button';
import DynamicTable from '@atlaskit/dynamic-table';
import DropdownMenu, {
    DropdownItem,
    DropdownItemGroup,
  } from '@atlaskit/dropdown-menu';

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

const presidents = [
    {
      id: 1,
      name: 'George Washington',
      party: 'None, Federalist',
      term: '1789-1797',
    },
    {
      id: 2,
      name: 'John Adams',
      party: 'Federalist',
      term: '1797-1801',
    },
    {
      id: 3,
      name: 'Thomas Jefferson',
      party: 'Democratic-Republican',
      term: '1801-1809',
    },
    {
      id: 4,
      name: 'James Madison',
      party: 'Democratic-Republican',
      term: '1809-1817',
    },
    {
      id: 5,
      name: 'James Monroe',
      party: 'Democratic-Republican',
      term: '1817-1825',
    },
    {
      id: 6,
      name: 'John Quincy Adams',
      party: 'Democratic-Republican',
      term: '1825-1829',
    },
    {
      id: 7,
      name: 'Andrew Jackson',
      party: 'Democrat',
      term: '1829-1837',
    },
    {
      id: 8,
      name: 'Martin van Buren',
      party: 'Democrat',
      term: '1837-1841',
    },
    {
      id: 9,
      name: 'William H. Harrison',
      party: 'Whig',
      term: '1841',
    },
    {
      id: 10,
      name: 'John Tyler',
      party: 'Whig',
      term: '1841-1845',
    },
    {
      id: 11,
      name: 'James K. Polk',
      party: 'Democrat',
      term: '1845-1849',
    },
    {
      id: 12,
      name: 'Zachary Taylor',
      party: 'Whig',
      term: '1849-1850',
    },
    {
      id: 13,
      name: 'Millard Fillmore',
      party: 'Whig',
      term: '1850-1853',
    },
    {
      id: 14,
      name: 'Franklin Pierce',
      party: 'Democrat',
      term: '1853-1857',
    },
    {
      id: 15,
      name: 'James Buchanan',
      party: 'Democrat',
      term: '1857-1861',
    },
    {
      id: 16,
      name: 'Abraham Lincoln',
      party: 'Republican',
      term: '1861-1865',
    },
    {
      id: 17,
      name: 'Andrew Johnson',
      party: 'National Union',
      term: '1865-1869',
    },
    {
      id: 18,
      name: 'Ulysses S. Grant',
      party: 'Republican',
      term: '1869-1877',
    },
    {
      id: 19,
      name: 'Rutherford Hayes',
      party: 'Republican',
      term: '1877-1881',
    },
    {
      id: 20,
      name: 'James Garfield',
      party: 'Republican',
      term: '1881',
    },
    {
      id: 21,
      name: 'Chester Arthur',
      party: 'Republican',
      term: '1881-1885',
    },
    {
      id: 22,
      name: 'Grover Cleveland',
      party: 'Democrat',
      term: '1885-1889',
    },
    {
      id: 23,
      name: 'Benjamin Harrison',
      party: 'Republican',
      term: '1889-1893',
    },
    {
      id: 24,
      name: 'Grover Cleveland',
      party: 'Democrat',
      term: '1893-1897',
    },
    {
      id: 25,
      name: 'William McKinley',
      party: 'Republican',
      term: '1897-1901',
    },
    {
      id: 26,
      name: 'Theodore Roosevelt',
      party: 'Republican',
      term: '1901-1909',
    },
    {
      id: 27,
      name: 'William Taft',
      party: 'Republican',
      term: '1909-1913',
    },
    {
      id: 28,
      name: 'Woodrow Wilson',
      party: 'Democrat',
      term: '1913-1921',
    },
    {
      id: 29,
      name: 'Warren Harding',
      party: 'Republican',
      term: '1921-1923',
    },
    {
      id: 30,
      name: 'Calvin Coolidge',
      party: 'Republican',
      term: '1923-1929',
    },
    {
      id: 31,
      name: 'Herbert C. Hoover',
      party: 'Republican',
      term: '1929-1933',
    },
    {
      id: 32,
      name: 'Franklin Delano Roosevelt',
      party: 'Democrat',
      term: '1933-1945',
    },
    {
      id: 33,
      name: 'Harry S Truman',
      party: 'Democrat',
      term: '1945-1953',
    },
    {
      id: 34,
      name: 'Dwight David Eisenhower',
      party: 'Republican',
      term: '1953-1961',
    },
    {
      id: 35,
      name: 'John Fitzgerald Kennedy',
      party: 'Democrat',
      term: '1961-1963',
    },
    {
      id: 36,
      name: 'Lyndon Baines Johnson',
      party: 'Democrat',
      term: '1963-1969',
    },
    {
      id: 37,
      name: 'Richard Milhous Nixon',
      party: 'Republican',
      term: '1969-1974',
    },
    {
      id: 38,
      name: 'Gerald R. Ford',
      party: 'Republican',
      term: '1974-1977',
    },
    {
      id: 39,
      name: 'Jimmy Carter',
      party: 'Democrat',
      term: '1977-1981',
    },
    {
      id: 40,
      name: 'Ronald Wilson Reagan',
      party: 'Republican',
      term: '1981-1989',
    },
    {
      id: 41,
      name: 'George H. W. Bush',
      party: 'Republican',
      term: '1989-1993',
    },
    {
      id: 42,
      name: 'Bill Clinton',
      party: 'Democrat',
      term: '1993-2001',
    },
    {
      id: 43,
      name: 'George W. Bush',
      party: 'Republican',
      term: '2001-2009',
    },
    {
      id: 44,
      name: 'Barack Obama',
      party: 'Democrat',
      term: '2009-2016',
    },
  ];
  

function App() {
    const [data, setData] = useState(null);
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
            key: createKey(president.party),
            content: president.party,
          },
          {
            key: president.id,
            content: president.term,
          },
          {
            key: 'Lorem',
            content: iterateThroughLorem(index),
          },
          {
            key: 'MoreDropdown',
            content: (
              <DropdownMenu trigger="More">
                <DropdownItemGroup>
                  <DropdownItem>{president.name}</DropdownItem>
                </DropdownItemGroup>
              </DropdownMenu>
            ),
          },
        ],
      }));
      

    useEffect(() => {
        console.log("my message")
        invoke('getText', { example: 'my-invoke-variable' }).then(setData);
    }, []);

    const onButtonClick = () => {
        console.log("button clicked 1")
    }

    return (
        <div>
            <Button appearance="primary" onClick={onButtonClick}>Add new row</Button>
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
