import {useState, useEffect} from 'react';
import GenerateButton from './GenerateButton.jsx';
import './App.css'

export default function Quote() {
    const [currentQuote , setCurrentQuote] = useState({ quoteAuthor: '', text: '' });

    // Fetch data when the page first loads
    // Empty array ensures that this effect will run only once
    useEffect(() => {
        generateQuote();
    }, []);

    const generateQuote = async () => {
        try {
            const response = await fetch('/api/quotes');
            if(!response.ok) {
                setCurrentQuote({ author: 'Error', text: 'Error fetching quote! (Response not OK)'});
                return;
            }
            const result = await response.json();
            const { quoteAuthor, text } = result;
            setCurrentQuote({ quoteAuthor, text });
        } catch (err) {
            setCurrentQuote({ quoteAuthor: 'Error', text: `Error fetching quote! ${err.message}`});
        }
    };

 
    return (
        <div className='quote-container'>
            <h1>Stoic Quote of the Day</h1>
            <div className="content">
                <p>{currentQuote.text}</p>
                <h3>{currentQuote.quoteAuthor}</h3>
            </div>
            <GenerateButton fetchData={generateQuote}/>
        </div>
    )
}