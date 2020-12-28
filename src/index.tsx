import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/styles';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { QueryParamProvider } from 'use-query-params';
import DateFnsUtils from '@date-io/date-fns';
import App from './features/App';
import createTheme from './theme/createTheme';
import createGraphQLClient from './libs/graphql/createClient';
import initI18N from './libs/i18n/init';
import locales, { Locale } from './libs/date/locales';
import extractVersionCodeFromHostname from './utils/extractVersionCodeFromHostname';
import { URI as API_URI } from './config/api';
import { DEFAULT_LANGUAGE } from './config/app';
import reportWebVitals from './reportWebVitals';

const version = extractVersionCodeFromHostname();
const jsx = (
  <BrowserRouter>
    <ThemeProvider theme={createTheme()}>
      <I18nextProvider i18n={initI18N()}>
        <ApolloProvider client={createGraphQLClient(API_URI)}>
          <MuiPickersUtilsProvider
            utils={DateFnsUtils}
            locale={
              version in locales
                ? locales[version as Locale]
                : locales[DEFAULT_LANGUAGE as Locale]
            }
          >
            <QueryParamProvider ReactRouterRoute={Route}>
              <App />
            </QueryParamProvider>
          </MuiPickersUtilsProvider>
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
