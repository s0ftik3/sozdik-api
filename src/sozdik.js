const axios = require('axios');
const checkLanguageSupport = require('./checkLanguageSupport');
const error = require('./error.json');

class Sozdik {

    /**
     * Get translation of the given text.
     * @param {String} query Desired text to translate.
     * @param {String} from Source language of the text.
     * @param {String} to The language translate to.
     */
    async getTranslation(query, from, to) {

        const code = checkLanguageSupport(from, to).code;
        if (code == 0) throw new Error(error['0']);
            else if (code == 1) throw new Error(error['1']);

        const lang = {
            'kz': 'kk',
            'kazakh': 'kk',
            'ru': 'ru',
            'russian': 'ru'
        };
        const requestURL = 'https://sozdik.kz/translate/' + lang[from.toLowerCase()] + '/' + lang[to.toLowerCase()] + '/';
        const encodedQuery = encodeURIComponent(query);

        const result = await axios(requestURL + encodedQuery).then(response => {

            const data = response.data.data;

            const parent = data.parent;
            const phrase = data.phrase;
            const phrase_stress = data.phrase_acute;
            const transcription = data.phrase_ipa;
            const similar_phrases = (data.similar_phrases.length > 0) ? data.similar_phrases.replace(/<.+?>/gi, '') : data.similar_phrases;
            const synonyms = (data.synonyms.length > 0) ? data.synonyms.replace(/<.+?>/gi, '') : data.synonyms;
            const translation = (data.translation.length > 0) ? data.translation.replace(/<.+?>/gi, '') : data.translation;
            const source = data.url_short;

            if ((synonyms.length + translation.length + source.length) <= 0) return { code: 204, response: error['2'] };

            return {
                text: query,
                parent: parent,
                phrase: phrase,
                transcription: transcription,
                phrase_stress: phrase_stress,
                similar_phrases: similar_phrases,
                synonyms: synonyms,
                translation: translation,
                source: source
            };

        }).catch(err => {

            console.error(err);
            throw new Error(error['3'], err);

        });

        return result;

    }

}

module.exports = Sozdik;