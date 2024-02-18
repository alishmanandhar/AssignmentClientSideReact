import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import { ChakraProvider, Container } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from './pages/User/List/UserList';
import AddUser from './pages/User/Add/AddUser';
import { BASE_URL } from './constants/Constants';
import EditUser from './pages/User/Edit/EditUser';

const root = ReactDOM.createRoot(document.getElementById('root'));

// apollo client setup to connect with GraphQl
const client = new ApolloClient({
  uri:BASE_URL,
  cache: new InMemoryCache(),
})

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      {/* Chakra UI component library  */}
      <ChakraProvider>
        {/* Router */}
        <BrowserRouter>
          <Container maxW={"6xl"}>
            <Routes>
              <Route path='/' element={<UserList />} />
              <Route path='/add-user' element={<AddUser />} />
              <Route path='/edit-user/:id' element={<EditUser />} />
            </Routes>
          </Container>
        </BrowserRouter>
      </ChakraProvider>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
