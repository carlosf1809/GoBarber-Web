import React from 'react';
import GlobalStyle from './styles/global';
import SignIn from './pages/SignIn/SignIn';
//import SignUp from './pages/SignUp/SignUp';

import {AuthProvider} from './context/AuthContext'

const App: React.FC = () => (
   
   <>
      <AuthProvider>
         <SignIn/>
      </AuthProvider>
      <GlobalStyle/>
   </>
); 

export default App;
