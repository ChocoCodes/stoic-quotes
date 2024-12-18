import './App.css';

const GenerateButton = ({ fetchData }) => {
    return (
        <button className='btn-regenerate' onClick={fetchData}>Re-generate</button>
    );
}

export default GenerateButton;
