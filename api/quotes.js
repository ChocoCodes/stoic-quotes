export default async function handler(req, res) {
    try {
        const response = await fetch('https://stoic.tekloon.net/stoic-quote');
    
        if (!response.ok) {
            return res.status(500).json({ author: 'Error', quote: 'Error fetching quote! (Response not OK)' });
        }

        const result = await response.json();
        let { author, quote } = result.data;

        // Remove trailing '@' character
        if (quote.endsWith('@')) quote = quote.slice(0, -1).trim();

        // Handle empty author field
        if (author.length === 0) author = 'Unknown';

        // Send the cleaned data back to the client
        res.status(200).json({ quoteAuthor: author, text: quote });
    } catch (err) {
        res.status(500).json({ author: 'Error', text: `Error fetching quote! ${err.message}` });
    }
}