import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header.js';
import React, {useContext} from 'react';
import SettingsProvider from '../../context/setting-manager.js';
import AuthProvider from '../../context/authContext.js';
import SignUp from '../auth/signup'

export default () => {
    return (
      <SettingsProvider>
        <AuthProvider>
          <Header/>
          <SignUp/>
        </AuthProvider>
      </SettingsProvider>
    );
}


