import config from '../../config.json';
import { History } from '../components/history';
import { Input } from '../components/input';
import { useShell } from '../context/shell-provider';
import Head from 'next/head';
import React from 'react';

interface IndexPageProps {
  inputRef: React.RefObject<HTMLDivElement>;
}

const IndexPage: React.FC<IndexPageProps> = ({ inputRef }) => {
  const { history } = useShell();

  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [history]);

  return (
    <>
      <Head>
        <title>Keegan Potgieter</title>
      </Head>

      <div
        className='h-full w-full overflow-hidden rounded-lg'
        style={{
          padding: config.border ? 16 : 8,
        }}
      >
        <div ref={containerRef} className='h-full w-full overflow-y-auto'>
          <div className='float-left w-full overflow-x-clip'>
            <History history={history} />

            <Input inputRef={inputRef} containerRef={containerRef} />
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
