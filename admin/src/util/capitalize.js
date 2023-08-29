
export const capitalize = (word) => {
    word = word?.split('')[0]?.toUpperCase() + word?.slice(1-word.length);
    return word;
}

export const capitalizeWords = (words) => {
    let newWords = words?.split(' ').map(word => capitalize(word)).join(' ');
    return newWords;    
}
