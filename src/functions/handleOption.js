function handleOption(headers, option, text){
    let endpointUrl = 'https://api.cloudmersive.com/nlp-v2/';
    let bodyParams = new URLSearchParams();
    const options = {
        method: "POST",
        headers: headers
    };

    if (option !== '' && text !== ''){
        if (option === '1'){
            bodyParams.append('TextToAnalyze', text);
            endpointUrl += 'analytics/sentiment';
            
        }else if(option === '2'){
            bodyParams.append('TextToTranslate', text);
            endpointUrl += 'translate/language/eng/to/deu';
            
        }else if(option === '3'){
            bodyParams.append('TextToTranslate', text);
            endpointUrl += 'translate/language/eng/to/fra';
           
        }else if(option === '4'){
            bodyParams.append('TextToTranslate', text);
            bodyParams.append('TargetRephrasingCount', 2);
            endpointUrl += 'rephrase/rephrase/eng/by-sentence';
            
        }else if(option === '5'){
            bodyParams = text;
            endpointUrl += 'segmentation/words';
            
        }else if(option === '6'){
            bodyParams.append('InputText', text);
            endpointUrl += 'pos/tag/verbs';
            
        }else if(option === '7'){
            bodyParams.append('InputText', text);
            endpointUrl += 'pos/tag/nouns';

        }else if(option === '8'){
            bodyParams.append('InputText', text);
            endpointUrl += 'pos/tag/adjectives';
            
        }
    }
    options.body = bodyParams;
    return {endpointUrl, options}
}
export default handleOption;