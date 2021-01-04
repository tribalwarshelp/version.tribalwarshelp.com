import '@kichiyaki/roboto';
import 'date-time-format-timezone';
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/styles';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { QueryParamProvider } from 'use-query-params';
import App from './features/App';
import createTheme from './theme/createTheme';
import createGraphQLClient from './libs/graphql/createClient';
import initI18N from './libs/i18n/init';
import { URI as API_URI } from './config/api';
import reportWebVitals from './reportWebVitals';

const jsx = (
  <BrowserRouter>
    <ThemeProvider theme={createTheme()}>
      <I18nextProvider i18n={initI18N()}>
        <ApolloProvider client={createGraphQLClient(API_URI)}>
          <QueryParamProvider ReactRouterRoute={Route}>
            <App />
          </QueryParamProvider>
        </ApolloProvider>
      </I18nextProvider>
    </ThemeProvider>
  </BrowserRouter>
);

ReactDOM.render(jsx, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
