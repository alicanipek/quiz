import React from 'react';

interface FooterProps {
    handleClick: (dir: string) => void;
    handleFinish: () => void;
    isFinish: boolean;
}

export default function Footer({
    handleClick,
    handleFinish,
    isFinish,
}: FooterProps) {
    return (
        <div className='flex flex-row justify-between items-center'>
            <button
                type='button'
                className='w-1/3 flex-grow h-12 bg-gray-500 hover:bg-gray-400 md: rounded-md'
                onClick={() => handleClick('dec')}
            >
                {'Previous'}
            </button>
            <button
                type='button'
                className='w-1/3 mx-1 flex-grow h-12 text-white bg-indigo-500 hover:bg-indigo-400 focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 md: rounded-md'
                onClick={handleFinish}
            >
                {!isFinish ? 'Finish Quiz' : 'Restart Quiz'}
            </button>
            <button
                className='w-1/3 flex-grow h-12 bg-gray-500 hover:bg-gray-400 md: rounded-md'
                onClick={() => handleClick('inc')}
            >
                {'Next'}
            </button>
        </div>
    );
}
