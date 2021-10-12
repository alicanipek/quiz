import React from 'react';
import QuestionOption from './QuestionOption';

interface QuestionOptionProps {
    options: string[];
    answer: string;
    correct_answer: string;
    isFinish: boolean;
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

export default function QuestionOptions({
    options,
    isFinish,
    onClick,
    correct_answer,
    answer,
}: QuestionOptionProps) {
    return (
        <div className='flex flex-col justify-between mb-3'>
            {options.map((option, i) => (
                <QuestionOption
                    key={i}
                    text={option}
                    selected={option === answer}
                    isTrue={isFinish && option === correct_answer}
                    onClick={onClick}
                />
            ))}
        </div>
    );
}
