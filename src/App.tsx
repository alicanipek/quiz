import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Configuration from './views/Configuration';
import Quiz from './views/Quiz';

function App() {
    return (
        <div className='min-h-screen'>
            <div className='mx-auto bg-gray-100 max-w-screen-lg'>
                <BrowserRouter>
                    <Route exact path='/'>
                        <Configuration />
                    </Route>
                    <Route path='/quiz'>
                        <Quiz />
                    </Route>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
