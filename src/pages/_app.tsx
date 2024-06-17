import Layout from '../components/layout';
import { ShellProvider } from '../context/shell-provider';
import { ThemeProvider } from '../context/theme-provider';
import '../styles/global.css';
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
            content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
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
