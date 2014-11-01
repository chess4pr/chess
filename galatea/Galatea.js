/* первый обьект Галатея */

var Galatea = {
    /* Объект = {
     идентификатор : значение,
     ...
     } */
    name: "Галатея",
    dance: false,
    head: {
        /* Голова */
        speak: function()
        {
            /* Говорит */
            $("#inside").html(TellMe.random_lang() + ' ' + TellMe.random_lang() + ' ' + TellMe.random_lang());
        }
    },
    start_pos: function()
    {
        /* Руки в сторону 1 позиция */

        $("#picture").attr({src: "images/gala_1.jpg"});
    },
    move_hands: function()
    {
        /* Руки двигаются */
        $("#picture").attr({src: "images/gala_2.jpg"});
    },
    move_leg: function()
    {
        /* Нога двигается */
        $("#picture").attr({src: "images/gala_3.jpg"});
    },
    inside: function(e)
    {
        /*  
         обходим обьект в {} работает как идентификатор и содержание того что в обьект[идентификатор]
         [] - похоже на двери 
         [x] - вставили ключ )
         */          var obj = e;
        var str = "";
        for (x in obj)
        {
            /* усложнили вывод строки, согласитесь удобно) */
            str += '<h2><a href="https://www.google.com/search?q=javascript+'
                    + x + '" target=_blank>'
                    + x + '</a></h2> тип: <span style="color:green">'
                    + typeof obj + '</span> содержит ' + obj[x] + " <br />";
        }
        document.getElementById("inside").innerHTML = str;
    },
    animation: function()
    {
        /* используя задержку меняем картинки */
        var time = 100; //секунда это 1000, здесь одна десятая секунды
        setTimeout(function() {
            Galatea.start_pos()
        }, time * 1);
        setTimeout(function() {
            Galatea.move_hands()
        }, time * 2);
        setTimeout(function() {
            Galatea.move_leg()
        }, time * 3);
        setTimeout(function() {
            Galatea.move_hands()
        }, time * 4);
        if (Galatea.dance)
        {
            setTimeout(function() {
                Galatea.animation()
            }, time * 4);
        }
    },
    start_dance: function()
    {
        /* запускаем анимацию */
        Galatea.dance = true;
        this.animation();
        document.title = "Dance! Dance! Dance!";
    },
    stop_dance: function()
    {
        /* останавливаем анимацию */
        Galatea.dance = false;
        document.title = "Галатея. Шахматы. Иностранные языки.";
    }
};