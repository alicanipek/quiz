import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useUser } from './UserContext';

export default function Result() {
    const { user } = useUser()!;
    let history = useHistory();
    let params = new URLSearchParams(useLocation().search);
    return (
        <React.Fragment>
            <div className='flex flex-col min-h-screen justify-center md:w-1/2 mx-auto px-2'>
                <div className='flex flex-col bg-gray-200 p-3 my-3 rounded-md h-48 text-lg text-center justify-center font-extrabold text-gray-800'>
                    {user} has {params.get('correct')}
                    {params.get('correct') === '1'
                        ? ' correct answer'
                        : ' correct answers'}
                </div>
                <div className='flex flex-col justify-between mb-3'>
                    <button
                        type='button'
                        className='flex-grow w-full h-12 text-white bg-indigo-500 hover:bg-indigo-400 focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 md: rounded-md'
                        onClick={() => history.push('/quiz-app')}
                    >
                        {'Restart Quiz'}
                    </button>
                </div>
            </div>
        </React.Fragment>
    );
}
