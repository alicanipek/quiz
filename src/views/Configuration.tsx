import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';

type FormData = {
    amount: string;
    category: string;
    difficulty: string;
    type: string;
};

type Category = {
    id: number;
    name: 'string';
};

type Response = {
    trivia_categories: Category[];
};

export default function Configuration() {
    let history = useHistory();
    const [categories, setCategories] = React.useState<Category[]>([]);
    const { register, handleSubmit, errors } = useForm<FormData>();
    let url = '/quiz?amount=';
    const onSubmit = handleSubmit(({ amount, category, difficulty, type }) => {
        url += amount;
        url += category !== 'any' ? '&category=' + category : '';
        url += difficulty !== 'any' ? '&difficulty=' + difficulty : '';
        url += type !== 'any' ? '&type=' + type : '';
        history.push(url);
    });
    React.useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                'https://opentdb.com/api_category.php',
            );
            const data: Response = await response.json();
            setCategories(data.trivia_categories);
        };
        fetchData();
    }, []);
    return (
        <div className='flex flex-col min-h-screen justify-center md:w-1/2 mx-auto px-2'>
            <div className='py-5 text-center'>Quiz App</div>
            <form className='grid grid-cols-1 row-gap-3' onSubmit={onSubmit}>
                <label>Amount</label>
                <input
                    name='amount'
                    ref={register({ required: true, max: 50 })}
                    type='number'
                    className={clsx(
                        'border border-black border-solid px-3 py-4 h-12 rounded-md text-base',
                        errors.amount &&
                            'border-red-300 focus:border-red-600 focus:shadow-outline-red',
                    )}
                />
                <label>Category</label>
                <select
                    name='category'
                    className='border border-black border-solid px-3 py-2 h-12 rounded-md text-base'
                    ref={register}
                >
                    <option value='any'>Any Category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <label>Difficulty</label>
                <select
                    name='difficulty'
                    className='border border-black border-solid px-3 py-2 h-12 rounded-md text-base'
                    ref={register}
                >
                    <option value='any'>Any Difficulty</option>
                    <option value='easy'>Easy</option>
                    <option value='medium'>Medium</option>
                    <option value='hard'>Hard</option>
                </select>
                <label>Type</label>
                <select
                    name='type'
                    className='border border-black border-solid px-3 py-2 h-12 rounded-md text-base'
                    ref={register}
                >
                    <option value='any'>Any Type</option>
                    <option value='multiple'>Multiple Choice</option>
                    <option value='boolean'>True / False</option>
                </select>
                <button
                    type='submit'
                    className='bg-indigo-600 hover:bg-indigo-500 focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 py-2 h-12 rounded-md text-white'
                >
                    Start
                </button>
            </form>
        </div>
    );
}
