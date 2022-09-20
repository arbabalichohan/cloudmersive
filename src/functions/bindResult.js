const bindResult = (data, selected) => {
    let result;
    if (selected === '1'){
        result = data.SentimentClassificationResult;
    }else if(selected === '2' || selected === '3'){
        result = data.TranslatedTextResult;
    }else if(selected === '4'){
        result = data.RephrasedResults[0].Rephrasings[0].RephrasedSentenceText;
    }else if(selected === '5'){
        let res = '';
        if (data.Words.length){
            data.Words.forEach((word, index) => {
                if (index >= 0 && index < (data.Words.length - 1)){
                    res += word.Word + ', ';
                }else if (index === (data.Words.length - 1)){
                    res += word.Word;
                }
            });
            result = res;
        }else{
            result = 'There are no words.';
        }
    }else if(selected === '6' || selected === '7' || selected === '8'){
        let words = '';
        let wordCount = 0;        
        data.TaggedSentences.forEach(sentence => {
            sentence.Words.forEach(word => {
                words += word.Word + ', ';
                wordCount++;
            });
        });
        
        words = words.slice(0, words.length - 2);
        (wordCount) ? result = words : result = `There are no words.`;
    }
    return result
}
export default bindResult;