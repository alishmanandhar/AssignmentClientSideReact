import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {ApolloClient, InMemoryCache, ApolloProvider,ApolloLink} from '@apollo/client';
import { ChakraProvider, Container } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from './pages/User/List/UserList';
import AddUser from './pages/User/Add/AddUser';
import { BASE_URL } from './constants/Constants';
import EditUser from './pages/User/Edit/EditUser';
import { createStandaloneToast } from '@chakra-ui/react'
import { createHttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';

const root = ReactDOM.createRoot(document.getElementById('root'));
const { ToastContainer, toast } = createStandaloneToast()

// Create an HTTP link
const httpLink = createHttpLink({
  uri: BASE_URL,
});

// Create an error link to handle errors globally
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      );
    });
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

// Create a toast link to display a toast message for every API call
const toastLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {

    let toastMessage = ""
    let status = 'success'
    switch(operation?.operationName){
      case "DeleteUser":
        toastMessage = "User has been deleted successfully!"
        status = "error"
        break;
      case "EditUser":
        toastMessage = "User has been updated successfully!"
        break;
      case "CreateUser":
        toastMessage = "New user has been created!";
        break;
      default: return response;
    }

    if(toastMessage != ""){
      toast({
        title: "Success",
        description: toastMessage,
        status: status,
        duration: 3000,
        isClosable: true,
      })
    }
    
    // Check if errors exist in the response
    if (response.errors) {
      // Handle errors here if needed
      console.error( response.errors);
    }
    
    return response;
    

  }, (error) => {
    toast({
      title: 'An error occurred.',
      description: 'Something went wrong.',
      status: 'error',
      duration: 3000,
      isClosable: true,
    })
    throw error;
  });
});

// Create a composed link with the error link and toast link
const composedLink = ApolloLink.from([ errorLink,toastLink, httpLink]);

// apollo client setup to connect with GraphQl
const client = new ApolloClient({
  link:composedLink,
  cache: new InMemoryCache(),
})

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      {/* Chakra UI component library  */}
      <ChakraProvider>
        <ToastContainer />
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
