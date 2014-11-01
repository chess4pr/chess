/* второй обьект Доска */

var Chess = {
    /* доска - [O] О - пустая клетка, офицера повысили до [Г] Генерала!*/
    board: [
        ['[Л]', '[C]', '[Г]', '[Ф]', '[K]', '[Г]', '[C]', '[Л]'],
        ['[П]', '[П]', '[П]', '[П]', '[П]', '[П]', '[П]', '[П]'],
        ['[O]', '[O]', '[O]', '[O]', '[O]', '[O]', '[O]', '[O]'],
        ['[O]', '[O]', '[O]', '[O]', '[O]', '[O]', '[O]', '[O]'],
        ['[O]', '[O]', '[O]', '[O]', '[O]', '[O]', '[O]', '[O]'],
        ['[O]', '[O]', '[O]', '[O]', '[O]', '[O]', '[O]', '[O]'],
        ['[П]', '[П]', '[П]', '[П]', '[П]', '[П]', '[П]', '[П]'],
        ['[Л]', '[C]', '[Г]', '[Ф]', '[K]', '[Г]', '[C]', '[Л]']],
    show_board: function()
    {
        /* рисуем доску - тот же обходчик обьектов */
        var str = "";
        for (x in Chess.board)
        {
            str += Chess.board[x] + "<br />";
        }
        document.getElementById("board").innerHTML = str;
    },
    move: function()
    {
        /* 
         * TODO_GALA : Ход Галатеи. Рассказать о самообучающихся программах
         * 
         * ходим пешкой */
        Chess.board[4][2] = Chess.board[6][2];
        /* чистим клетку */
        Chess.board[6][2] = '[O]';
        /* перерисовываем доску */
        Chess.show_board();
        /* Отключили кнопку - Мой ход */
        document.getElementById("move").disabled = true;
    },
    timer: ['[J]', '[A]', '[V]', '[A]', '[S]', '[C]', '[R]', '[I]', '[P]', '[T]'],
    str: "",
    c: 0,
    line: 0,
    show_timer: function()
    {
        var time = 1000;
        if (Chess.c < 10)
        {
            Chess.str += Chess.timer[Chess.c] + "";
            if (Chess.c % 2) {
                Galatea.start_pos();
            } else {
                Galatea.move_hands();
            }
            Chess.c++;
        } else {
            Galatea.move_leg();
            Chess.c = 0;
            Chess.line++;
            Chess.str = Chess.str + "<br />";
        }
        if (Chess.line == 6)
        {
            Chess.str = "";
            Chess.line = 0;
            Galatea.head.speak();

        }
        $("#window_board").html(Chess.str);
        if (true) // добавить функционал остановки таймера
        {
            setTimeout(function() {
                Chess.show_timer();
                Galatea.animation[TellMe.random_num()]
            }, time);
        }
timerWindow.show();
    }
}	 