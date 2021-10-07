import React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import Result from './components/Result';
import UserContextProvider from './components/UserContext';
import Configuration from './views/Configuration';
import Quiz from './views/Quiz';

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
                        <Route path='/result'>
                            <Result />
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
