import { History as HistoryInterface } from '../../interfaces/history';
import Username from '../username';
import React from 'react';

interface Props {
  history: Array<HistoryInterface>;
}

export const History: React.FC<Props> = ({ history }) => {
  return (
    <>
      {history.map((entry: HistoryInterface, index: number) => {
        const Component = typeof entry.command === 'string' ? 'a' : 'div';
        return (
          <div key={entry.command + index}>
            <div className='flex w-full max-w-full flex-row'>
              <div className='float-left flex-shrink'>
                <Username />
              </div>

              <div className='w-full overflow-hidden overflow-ellipsis whitespace-nowrap'>
                {entry.command}
              </div>
            </div>

            <Component
              className='mb-2 whitespace-pre-wrap'
              style={{ lineHeight: 'normal' }}
            >
              {entry.output}
            </Component>
          </div>
        );
      })}
    </>
  );
};

export default History;
