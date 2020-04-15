import React, { ReactElement } from 'react';
import clsx from 'clsx';
import he from 'he';

interface Props {
    text: string;
    selected: boolean;
    isTrue: boolean;
    onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export default function QuestionOption({
    text,
    selected,
    isTrue,
    onClick,
}: Props): ReactElement {
    return (
        <button
            onClick={onClick}
            className={clsx(
                `flex-1 flex-grow text-left bg-gray-300 rounded-md my-1 ${
                    !selected && !isTrue && 'hover:bg-gray-200'
                } py-3 pl-6`,
                isTrue && selected && 'bg-green-300',
                isTrue && !selected && 'bg-red-300',
                !isTrue && selected && 'bg-blue-300',
            )}
        >
            <span>{he.decode(text)}</span>
        </button>
    );
}
