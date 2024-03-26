import React from 'react';
import { Table } from 'react-bootstrap';
import CallbackTableRow from './MainTable/CallbackTableRow/CallbackTableRow';
import Callback from '../../../../../callback/callback';
import { Action } from '../../../helpers/reducer/reducerFunction';

const MainTable = ({
    headers,
    callbacks,
    dispatcher,
  }: {
    headers: string[];
    callbacks: Callback[];
    dispatcher: React.Dispatch<Action>;
  }) => {
    return (
      <Table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {callbacks.map((callback) => (
            <CallbackTableRow
              key={callback.id}
              callback={callback}
              dispatcher={dispatcher}
            />
          ))}
        </tbody>
      </Table>
    );
  };
 
  export default MainTable;