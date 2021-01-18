/**
 * Check language support (Kazakh and Russian only).
 * @param {String} from Source language of the text.
 * @param {String} to The language translate to.
 */
module.exports = (from, to) => {

    if (typeof from == 'number') return { code: 0 };
    if (typeof to == 'number') return { code: 0 };

    const isFromCorrect = (
        from.toLowerCase() == 'kz' || 
        from.toLowerCase() == 'kazakh' || 
        from.toLowerCase() == 'ru' || 
        from.toLowerCase() == 'russian'
    ) ? true : false; 

    const isToCorrect = (
        to.toLowerCase() == 'kz' || 
        to.toLowerCase() == 'kazakh' || 
        to.toLowerCase() == 'ru' || 
        to.toLowerCase() == 'russian'
    ) ? true : false;

    return (isFromCorrect && isToCorrect) ? true : { code: 1 };

}