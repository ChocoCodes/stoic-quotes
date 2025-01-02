import { useState, useEffect } from 'react';
import GenerateButton from '../components/GenerateButton';
import { QuoteResponse } from '../utils/utils';
import '../styles/style.css';

export default function Quote() {
    const [currentQuote , setCurrentQuote] = useState<QuoteResponse>({ author: '', quote: '' });

    // Fetch data when the page first loads
    // Empty array ensures that this effect will run only once
    useEffect(() => {
        generateQuote();
    }, []);

    const generateQuote = () => {
        fetch('/api/stoic-quote')
        .then(response => {
          if (!response.ok) {
            setCurrentQuote({ author: 'Error', quote: 'Error fetching quote! (Response not OK)' });
            throw new Error('Response not OK');
          }
          return response.json();
        })
        .then(result => {
          let { author, quote } = result.data;
          quote = quote.endsWith('@') ? quote.slice(0, -1) : quote;
          setCurrentQuote({ author: author, quote: quote });
        })
        .catch(err => {
          setCurrentQuote({
            author: 'Error',
            quote: `Error fetching quote! ${ err instanceof Error ? err.message : 'Unknown Error.' }`,
          });
        });      
    };

 
    return (
        <div className='quote-container'>
            <h1>Stoic Quote of the Day</h1>
            <div className="content">
                <p>{currentQuote.quote}</p>
                <h3>{currentQuote.author}</h3>
            </div>
            <GenerateButton fetchData={generateQuote}/>
        </div>
    )
}