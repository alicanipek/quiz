import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Configuration from './views/Configuration';
import Quiz from './views/Quiz';
import UserContextProvider from './components/UserContext';

function App() {
    return (
        <UserContextProvider>
            <div className='min-h-screen'>
                <div className='mx-auto bg-gray-100 max-w-screen-lg'>
                    <BrowserRouter>
                        <Route exact path='/'>
                            <Redirect to='/quiz-app' />
                        </Route>
                        <Route exact path='/quiz-app'>
                            <Configuration />
                        </Route>
                        <Route path='/quiz'>
                            <Quiz />
                        </Route>
                    </BrowserRouter>
                </div>
            </div>
        </UserContextProvider>
    );
}

export default App;
