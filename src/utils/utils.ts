type buttonProps = {
    fetchData: () => void;
}

type QuoteResponse = {
    author: string | "Anonymous";
    quote: string | "No quote available";
}

export type { buttonProps, QuoteResponse };