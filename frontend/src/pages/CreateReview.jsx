import React, { useState } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateReview = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [rating, setRating] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmitReview = () => {
        const data = {
            title,
            author,
            rating
        };
        setLoading(true);
        axios
            .post('http://localhost:5555/reviews', data)
            .then(() => {
                setLoading(false);
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                alert('An error occurred. Please check the console.');
                console.log(error);
            });
    };

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Create book</h1>
            {loading ? <Spinner /> : ''}
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Title</label>
                    <input
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Author</label>
                    <input
                        type='text'
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Rating</label>
                    <input
                        type='number'
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <button className='p-2 bg-sky-300 m-8' onClick={handleSubmitReview}>
                    Submit
                </button>
            </div>
        </div>
    );
}

export default CreateReview