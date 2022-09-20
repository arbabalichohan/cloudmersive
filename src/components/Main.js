import { useEffect, useState } from "react";
import handleOption from "../functions/handleOption";
import useFetch from "../hooks/useFetch";

const Main = ({headers}) => {
    
    const [selected, setSelected] = useState('0');
    const [text, setText] = useState('');
    const [status, setStatus] = useState('Perform Operation');
    const [counter, setCounter] = useState(1);
    const [click, setClick] = useState(false);

    const {endpointUrl, options} = handleOption(headers, selected, text);
    const {data, timestamp} = useFetch(endpointUrl, options, counter, click, selected);
    
    const HandleSubmit = () => {
        document.getElementById('submit').disabled = true;
        setStatus('Loading please wait..');
        setCounter(counter + 1);
        setClick(true);
    }

    useEffect(() => {
        setStatus('Perform Operation');
        document.getElementById('submit').disabled = false;
        setClick(false);

    }, [timestamp, data]);

    return ( 
        <div className='card p-5 shadow bg-dark rounded'>
            <form action='' onSubmit={(e)=>{
                e.preventDefault();
                HandleSubmit();
            }}>
                <div className='form-group'>
                    <textarea name='' id='' cols='30' rows='5' className='form-control' placeholder='Enter input text here' value={text} onChange={(e) => setText(e.target.value)}></textarea>
                </div>
                <div className='form-group my-3'>
                    <select name='' id='' className='form-select' value={selected} onChange={(e)=>{
                        setSelected(e.target.value); 
                        document.getElementById('submit').disabled = false;
                    }}>
                        <option value='0' disabled >Select the NLP operation to perform</option>
                        <option value='1'>Perform Sentiment Analysis and Classification on Text</option>
                        <option value='2'>Translate English to German text</option>
                        <option value='3'>Translate English to French text</option>
                        <option value='4'>Rephrase English text sentence-by-sentence</option>
                        <option value='5'>Get words in input string</option>
                        <option value='6'>Part-of-speech tag a string, filter to verbs</option>
                        <option value='7'>Part-of-speech tag a string, filter to nouns</option>
                        <option value='8'>Part-of-speech tag a string, filter to adjectives</option>
                    </select>
                </div>
                <div className='form-group mb-3'>
                    <button id='submit' className='form-control btn bg-warning' disabled><b>{status}</b></button>
                </div>
                <div className='form-group'>
                    <textarea name='' id='' cols='30' rows='5' className='form-control' placeholder='Result will appear here' defaultValue={data}></textarea>
                </div>
            </form>
        </div> 
    );
}
 
export default Main;