import React from 'react';

interface QuestionHeaderProps {
    questionIndex: number;
    totalQuestions: number;
    category: string;
    time: number;
}

export default function QuestionHeader({
    questionIndex,
    totalQuestions,
    category,
    time,
}: QuestionHeaderProps) {
    return (
        <div className='flex flex-row items-center justify-between mb-3 bg-gray-900 text-white h-12 md:rounded-md'>
            <div className='text-left pl-5'>
                {questionIndex} / {totalQuestions}
            </div>
            <div className='text-center'>{category}</div>
            <div className='text-right w-10 pr-5'>{time}</div>
        </div>
    );
}
