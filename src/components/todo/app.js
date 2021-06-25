import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header.js';
import React from 'react';
import SettingsProvider from '../../context/setting-manager.js';
import AuthProvider from '../../context/authContext.js';



import ToDoConnected from './todo-connected.js';

export default () => {
    return (
      <SettingsProvider>
        <AuthProvider>
          <Header/>
          <ToDoConnected />

        </AuthProvider>
      </SettingsProvider>
    );
}


