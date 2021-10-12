import he from 'he';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';
import Footer from '../components/Footer';
import QuestionHeader from '../components/QuestionHeader';
import QuestionOptions from '../components/QuestionOptions';

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
    time: number;
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
    const [time, setTime] = useState(90);
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
        if (!isFinish) setTime(90);
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
            if (questions[questionIndex].time === 0 && !isFinish) {
                setIsFinish(true);
                history.push(
                    '/result?correct=' +
                        questions
                            .map((question) => {
                                return question.correct_answer;
                            })
                            .filter((x) => answers.includes(x)).length,
                );
            } else if (questions[questionIndex].time > 0) {
                questions[questionIndex].time =
                    questions[questionIndex].time - 1;
                setTime(questions[questionIndex].time);
            }
        }, 1000);
        return () => clearTimeout(timerId);
    }, [answers, time, questions, isFinish, history, questionIndex]);

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
                    result.time = 90;
                } else {
                    result.options = ['True', 'False'];
                    result.time = 90;
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

            history.push(
                '/result?correct=' +
                    questions
                        .map((question) => {
                            return question.correct_answer;
                        })
                        .filter((answer, index) => answer === answers[index])
                        .length,
            );
        } else {
            history.push('/quiz-app');
        }
    };

    let questionOnPage = questions.map((question, index) => (
        <React.Fragment key={index}>
            <QuestionHeader
                questionIndex={questionIndex + 1}
                totalQuestions={questions.length}
                category={question.category}
                time={question.time}
            />
            <div
                key={index}
                className='flex flex-col bg-gray-200 p-3 my-3 rounded-md h-48 text-lg text-center justify-center font-extrabold text-gray-800'
            >
                {he.decode(question.question)}
            </div>
            <QuestionOptions
                answer={answers[questionIndex]}
                correct_answer={question.correct_answer}
                options={question.options}
                onClick={handleOptionClick}
                isFinish={isFinish}
            />
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
            <Footer
                handleClick={handleClick}
                handleFinish={handleFinish}
                isFinish={isFinish}
            />
        </div>
    );
}

export default Quiz;
