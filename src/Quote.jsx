import {useState, useEffect} from 'react';
import GenerateButton from './GenerateButton.jsx';
import './App.css'

export default function Quote() {
    const [currentQuote , setCurrentQuote] = useState({ quoteAuthor: '', text: '' });

    // Fetch data when the page first loads
    // Empty array ensures that this effect will run only once
    useEffect(() => {
        fetchQuote();
    }, []);

    const fetchQuote = async () => {
        try {
            const response = await fetch('/stoic-quote');
            if(!response.ok) {
                setQuote({ author: 'Error', text: 'Error fetching quote! (Response not OK)'});
                return;
            }
            const result = await response.json();
            let { author, quote } = result.data;
            // Remove trailing '@' character in the data
            if (quote.endsWith('@')) quote = quote.slice(0, -1).trim();
            if (author.length == 0) author = 'Unknown';
            
            setCurrentQuote({ quoteAuthor: author, text: quote });
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
            <GenerateButton fetchData={fetchQuote}/>
        </div>
    )
}