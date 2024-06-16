import { History as HistoryInterface } from '../../interfaces/history';
import Username from '../username';
import React from 'react';

interface Props {
  history: Array<HistoryInterface>;
}

export const History: React.FC<Props> = ({ history }) => {
  return (
    <>
      {history.map((entry: HistoryInterface, index: number) => (
        <div key={entry.command + index}>
          <div className='flex w-full max-w-full flex-row space-x-2'>
            <div className='float-left flex-shrink'>
              <Username />
            </div>

            <div className='w-full overflow-hidden overflow-ellipsis whitespace-nowrap'>
              {entry.command}
            </div>
          </div>

          <p
            className='mb-2 whitespace-pre-wrap'
            style={{ lineHeight: 'normal' }}
            dangerouslySetInnerHTML={{ __html: entry.output }}
          />
        </div>
      ))}
    </>
  );
};

export default History;
