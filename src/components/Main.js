import { useState } from 'react';

function Main({headers}){
    
    const [selected, setSelected] = useState('');
    const [result, setResult] = useState('');
    const [text, setText] = useState('');
    const [status, setStatus] = useState('Perform Operation');
    
    const BindResult = (data) => {
        if (selected === '1'){
            setResult(data.SentimentClassificationResult);
        }else if(selected === '2' || selected === '3'){
            setResult(data.TranslatedTextResult);
        }else if(selected === '4'){
            setResult(data.RephrasedResults[0].Rephrasings[0].RephrasedSentenceText)
        }else if(selected === '5'){
            let res = '';
            data.Words.forEach((word, index) => {
                if (index > 0 && index < (data.Words.length - 1)){
                    res += word.Word + ', ';
                }else if (index === (data.Words.length - 1)){
                    res += word.Word;
                }
            });
            setResult(res);
        }else if(selected === '6' || selected === '7' || selected === '8'){
            let verbs = '';
            data.TaggedSentences.forEach(sentence => {
                sentence.Words.forEach(word => {
                    verbs += word.Word + ', ';
                });
            });
            
            verbs = verbs.slice(0, verbs.length - 2);           
            setResult(verbs);
        }
    }
    const NLP = async (body, url) => {
        const options = {
            method: 'POST',
            headers: headers,
            body: body
        };
        const response = await fetch(url, options);
        const data = await response.json();
        try{
            if (response.ok){
                BindResult(data);
                setStatus('Perform Operation');
            }
            document.getElementById('submit').disabled = false;

        }catch (error){
            document.getElementById('submit').disabled = false;
        }
    }
    

    const HandleSubmit = ()=>{
        setStatus('Loading...');
        document.getElementById('submit').disabled = true;
        if (selected !== '' && text !== ''){
            if (selected === '1'){
                let bodyParams = new URLSearchParams({
                    TextToAnalyze: text
                });
               
                // // Sentiment Analysis
                let url = 'https://api.cloudmersive.com/nlp-v2/analytics/sentiment';
                NLP(bodyParams, url, headers);
            }else if(selected === '2'){
                let bodyParams = new URLSearchParams({
                    TextToTranslate: text
                });
                
                let url = 'https://api.cloudmersive.com/nlp-v2/translate/language/eng/to/deu';
                NLP(bodyParams, url);
            }else if(selected === '3'){
                let bodyParams = new URLSearchParams({
                    TextToTranslate: text
                });
                let url = 'https://api.cloudmersive.com/nlp-v2/translate/language/eng/to/fra';
                NLP(bodyParams, url);
            }else if(selected === '4'){
                let bodyParams = new URLSearchParams({
                    TextToTranslate: text,
                    TargetRephrasingCount: 2
                });
                let url = 'https://api.cloudmersive.com/nlp-v2/rephrase/rephrase/eng/by-sentence';
                NLP(bodyParams, url);
            }else if(selected === '5'){
                let bodyParams = `InputText=${text}`;

                let url = 'https://api.cloudmersive.com/nlp-v2/segmentation/words';
                NLP(bodyParams, url);
            }else if(selected === '6'){
                let bodyParams = new URLSearchParams({
                    InputText: text
                });
                let url = 'https://api.cloudmersive.com/nlp-v2/pos/tag/verbs';
                NLP(bodyParams, url);
            }else if(selected === '7'){
                let bodyParams = new URLSearchParams({
                    InputText: text
                });
                let url = 'https://api.cloudmersive.com/nlp-v2/pos/tag/nouns';
                NLP(bodyParams, url);
            }else if(selected === '8'){
                let bodyParams = new URLSearchParams({
                    InputText: text
                });
                let url = 'https://api.cloudmersive.com/nlp-v2/pos/tag/adjectives';
                NLP(bodyParams, url);
            }
        }else{
            
        }
    }
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
                    <select name='' id='' className='form-select' value={selected} onChange={(e)=>{setSelected(e.target.value); 
                    document.getElementById('submit').disabled = false;}}>
                        <option value='' disabled selected=''>Select the NLP operation to perform</option>
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
                    <textarea name='' id='' cols='30' rows='5' className='form-control' placeholder='Result will appear here' value={result}></textarea>
                </div>
            </form>
        </div> 
    );
}
 
export default Main;