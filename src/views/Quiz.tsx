import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';
import QuestionOption from '../components/QuestionOption';
import he from 'he';

const duration = 200;

const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
};
type TransitionStyle = {
    key: TransitionStatus;
    value: {};
};
const transitionStyles: TransitionStyle[] = [
    { key: 'entering', value: { opacity: 1 } },
    { key: 'entered', value: { opacity: 1 } },
    { key: 'exiting', value: { opacity: 0 } },
    { key: 'exited', value: { opacity: 0 } },
];

type Question = {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    options: string[];
};

type Response = {
    response_code: number;
    results: Question[];
};

function Quiz() {
    let location = useLocation();
    let history = useHistory();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<string[]>(['']);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [isFinish, setIsFinish] = useState<boolean>(false);
    const [show, setShow] = React.useState(true);
    const [direction, setDirection] = React.useState('');
    const [time, setTime] = useState(10);
    const handleClick = (dir: string) => {
        if (
            (dir === 'dec' && questionIndex === 0) ||
            (dir === 'inc' && questionIndex === questions.length - 1)
        )
            return;
        setShow(false);
        setDirection(dir);
    };
    const onExited = () => {
        setShow(true);
        if (!isFinish) setTime(10);
        if (direction === 'inc')
            setQuestionIndex(
                questionIndex === questions.length - 1
                    ? questionIndex
                    : questionIndex + 1,
            );
        else if (direction === 'dec')
            setQuestionIndex(questionIndex === 0 ? 0 : questionIndex - 1);
        setDirection('');
    };

    useEffect(() => {
        const timerId = setTimeout(() => {
            if (time === 0 && !isFinish) {
                setIsFinish(true);
                alert(
                    'You have ' +
                        questions
                            .map((question) => {
                                return question.correct_answer;
                            })
                            .filter((x) => answers.includes(x)).length +
                        ' correct answer',
                );
            } else if (time > 0) {
                setTime(time - 1);
            }
        }, 1000);
        return () => clearTimeout(timerId);
    }, [time, answers, questions, isFinish]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                'https://opentdb.com/api.php' + location.search,
            );
            const data: Response = await response.json();
            data.results.forEach((result) => {
                if (result.type === 'multiple') {
                    result.options = result.incorrect_answers
                        .concat(result.correct_answer)
                        .sort(() => Math.random() - 0.5);
                } else {
                    result.options = ['True', 'False'];
                }
            });
            setQuestions(data.results);
        };
        fetchData();
    }, [location.search]);

    const handleOptionClick = (e: React.MouseEvent<HTMLElement>) => {
        if (isFinish) return;
        if (questionIndex < questions.length - 1) setShow(false);
        setDirection('inc');
        setAnswers([
            ...answers.slice(0, questionIndex),
            e.currentTarget.innerText,
            ...answers.slice(questionIndex + 1, answers.length),
        ]);
    };
    const handleFinish = () => {
        if (!isFinish) {
            setIsFinish(true);
            setTime(0);
            alert(
                `You have ${
                    questions
                        .map((question) => {
                            return question.correct_answer;
                        })
                        .filter((answer, index) => answer === answers[index])
                        .length
                } correct answer`,
            );
        } else {
            history.push('/quiz-app');
        }
    };

    let questionOnPage = questions.map((question, index) => (
        <React.Fragment key={index}>
            <div className='flex flex-row items-center justify-between mb-3 bg-gray-900 text-white h-12 md:rounded-md'>
                <div className='text-left pl-5'>
                    {questionIndex + 1} / {questions.length}
                </div>
                <div className='ext-center'>{question.category}</div>
                <div className='text-right w-10 pr-5'>{time}</div>
            </div>
            <div
                key={index}
                className='flex flex-col bg-gray-200 p-3 my-3 rounded-md h-48 text-lg text-center justify-center text-2xl font-extrabold text-gray-800'
            >
                {he.decode(question.question)}
            </div>
            <div className='flex flex-col justify-between mb-3'>
                {question.options.map((option, i) => (
                    <QuestionOption
                        key={i}
                        text={option}
                        selected={option === answers[questionIndex]}
                        isTrue={isFinish && option === question.correct_answer}
                        onClick={handleOptionClick}
                    />
                ))}
            </div>
        </React.Fragment>
    ));

    return (
        <div className='flex flex-col min-h-screen md:justify-center md:w-1/2 mx-auto'>
            <Transition in={show} timeout={duration} onExited={onExited}>
                {(state) => (
                    <div
                        style={{
                            ...defaultStyle,
                            ...transitionStyles.filter(
                                (transition) => transition.key === state,
                            )[0].value,
                        }}
                    >
                        {questionOnPage[questionIndex]}
                    </div>
                )}
            </Transition>
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
        </div>
    );
}

export default Quiz;
