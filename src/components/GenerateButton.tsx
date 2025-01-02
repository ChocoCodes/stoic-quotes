import '../styles/style.css';
import { buttonProps } from '../utils/utils';

const GenerateButton: React.FC<buttonProps> = ({ fetchData }) => {
    return (
        <button className='btn-regenerate' onClick={fetchData}>Re-generate</button>
    );
}

export default GenerateButton;