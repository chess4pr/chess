/* третий обьект TellMe */

var TellMe = {
    /* Словарный запас: [0] русский, [1] английский, [2] - французский */
    langs: [
        ['Расслабься)', 'Хочу танцевать!', 'Я выкинула шахматы...'],
        ['You are the best!', 'Lets dance.', 'Look at me.'],
        ['Regarder-moi.', 'Je veux chanter!', 'Ha-Ha-Ha))']],
    random_num: function()
    {
        /* Возращает случайное число от 0 до 2 включительно */
        return  Math.floor(Math.random() * 3 + 1) - 1;
    },
    random_ru: function()
    {
        /* Случайная фраза на русском */
        return TellMe.langs[0][TellMe.random_num()];
    },
    random_en: function()
    {
        /* Случайная фраза на английском */
        return TellMe.langs[1][TellMe.random_num()];
    },
    random_fr: function()
    {
        /* Случайная фраза на французском */
        return TellMe.langs[2][TellMe.random_num()];
    },
    random_lang: function()
    {
        /* Случайная фраза на любом языке */
        return TellMe.langs[TellMe.random_num()][TellMe.random_num()];
    }
}
