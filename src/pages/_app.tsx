import Layout from '../components/layout';
import '../styles/global.css';
import { ShellProvider } from '../utils/shellProvider';
import { ThemeProvider } from '../utils/themeProvider';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

type CustomAppProps = AppProps & {
  Component: React.ComponentType<any> & {
    inputRef: React.RefObject<HTMLInputElement>;
  };
};

const App: React.FC<CustomAppProps> = ({ Component, pageProps }) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const onClickAnywhere = () => {
    inputRef.current?.focus();
  };

  return (
    <ThemeProvider>
      <ShellProvider>
        <Head>
          <meta
            name='viewport'
            content='initial-scale=1.0, width=device-width'
            key='viewport'
          />
        </Head>
        <Layout onClick={onClickAnywhere}>
          <Component {...pageProps} inputRef={inputRef} />
        </Layout>
      </ShellProvider>
    </ThemeProvider>
  );
};

export default App;
