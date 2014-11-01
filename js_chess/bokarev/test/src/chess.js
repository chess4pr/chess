/*
 
 This file is part of Ext JS 4 by Alexey Bokarev
 
 Copyright (c) 2011 Sencha Inc
 
 Contact:  alexeybokarev@gmail.com
 
 GNU General Public License Usage
 This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.
 
 If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.
 
 */

        Ext.require(['*']);
Ext.onReady(function() {
    var cw;
    var x = 14;
    var y = -510;
    board = {};
    board.color = 0; // каким цветом играем
    board.positions = [];
    var actionSort = Ext.create('Ext.Action', {
        text: 'Расставить фигуры на позиции',
        cls: 'but',
        handler: function() {
            addDragable();
            sortFigures();
        }
    });
    var actionColorStart = Ext.create('Ext.Action', {
        text: 'Сменить цвет и начать заново',
        cls: 'but',
        handler: function() {
            sortFigures();
            changeColor();
        }
    });
    var actionTimerWindow = Ext.create('Ext.Action', {
        text: 'Показать таймер',
        cls: 'but',
        handler: function() {
            this.disabled = true;
            getTimerWindow();
        }
    });
    var actionColor = Ext.create('Ext.Action', {
        text: 'Сменить цвет и продолжить',
        cls: 'but',
        handler: function() {
            changeColor();
        }
    });

    Ext.application({
        launch: function() {
            var ext_chess = Ext.create('Ext.panel.Panel', {
                height: 650,
                width: 910,
                layout: {
                    type: 'border',
                    padding: 5
                },
                renderTo: Ext.get('chess'),
                defaults: {
                    split: true
                },
                items: [
                    {
                        region: 'west',
                        collapsible: true,
                        title: 'Возможности',
                        split: true,
                        width: 240,
                        minWidth: 100,
                        minHeight: 140,
                        autoScroll: true,
                        items: [Ext.create('Ext.button.Button', actionSort),
                            Ext.create('Ext.button.Button', actionColorStart),
                            Ext.create('Ext.button.Button', actionColor),
                            Ext.create('Ext.button.Button', actionTimerWindow)],
                        html: '<div id="west_form"></div>'
                    }, {
                        region: 'center',
                        layout: 'border',
                        border: false,
                        items: [{
                                region: 'center',
                                html: getGamePlay(),
                                title: 'Шахматы',
                                minHeight: 80,
                                items: []
                            }]
                    }]
            });
            ext_chess.show();
        }
    });
    addLayoutCell();
    addDragable();
    sortFigures();
    ajaxData();
    setTimeout("stepsLog('first step')", 3000);

});

function getTimerWindow() {
    timerWindow = Ext.create('Ext.window.Window', {
        title: 'Таймер',
        height: 320,
        width: 420,
        layout: 'fit',
        collapsible: true,
        closable: false,
        autoScroll: true,
        bodyBorder: false,
        shadowOffset: 6,
        bodyStyle: 'background:#fff; padding:10px',
        html: '</div><img id="picture" src="images/gala_1.jpg" style="width: 200px"/>'
                + '<div id="window_board" style="float:left; margin: 10px;"></div><br />'
                + '<div id="inside" style="margin: 10px;"></div>'
    });
    Chess.show_timer();
}
//отлавливаем пересечение клеток и фигур
var intersects = function(e) {
    var figure = $('#' + e).position();
    // var offset = p.position();

    var ax = figure.left;
    var ay = figure.top;
    var ax1 = ax + 50;
    var ay1 = ay + 50;
    for (var i = 1; i <= 64; i++) {
        var bx = cell_coord[i][0];
        var by = cell_coord[i][1];
        var bx1 = bx + 70;
        var by1 = by + 70;
        if (ay > by && ay1 < by1 && ax > bx && ax1 < bx1) {
            $("#Log_figure_place").val($('#cell_' + i).attr('marker'));
            d = document.getElementById(e);
            e = e.replace("f_", "");
            var left = d.style.left.replace("px", "");
            var top = d.style.top.replace("px", "");
            $("#Log_figure_id").val(e);
            $("#Log_x").val(Math.round(left));
            $("#Log_y").val(Math.round(top));
            $('#step_error').text('');
            break;
        } else {
            if (ax > 570 || ax < -45 || ay < -45 || ay > 565) {
                d = document.getElementById(e);
                e = e.replace("f_", "");
                var left = d.style.left.replace("px", "");
                var top = d.style.top.replace("px", "");
                $("#Log_figure_place").val('delete');
                $("#Log_figure_id").val(e);
                $("#Log_x").val(Math.round(left));
                $("#Log_y").val(Math.round(top));
                $('#step_error').text('Фигура удалена!');
            } else {
                $('#step_error').text('Ход непонятен. Поправьте фигуру!');
            }


        }

    }


}

function addLayoutCell() {
    var c = 70; //cell size
    var row = 0;
    cell_coord = new Array();
    for (var i = 1; i <= 64; i++) {
        var t = Math.floor(i / 8);
        if (row % 2) {
            var dark_cell = "";
            if (i % 2)
                dark_cell = "background-color: #757575;"
        } else {
            var dark_cell = "background-color: #757575;";
            if (i % 2)
                dark_cell = "";
        } //class='mosaic-block'
        $("#board").append(""
                + "<img id='cell_" + i + "' marker='" + board_marker[i - 1] + "' onclick='alert(this.getAttribute(\"marker\"))'  style='width:" + c + "px; height:" + c + "px; " + dark_cell + "' src='images/cell.gif'/>");
        if (t * 8 == i) {
            $("#board").append("<br />");
            row++;
        }
        board.positions[i] = $("#cell_" + i).position();
        cell_coord[i] = [board.positions[i].left, board.positions[i].top];
    }
}

function stepsLog(step) {
    console.log('step' + step);
    var html = $("#west_form").html();
    var c = 0;
    if (typeof step != 'string') {
        window.steps_log = new Array(step); //сокращаем массив до последнего хода
    }
    $.each(window.steps_log, function(key, val) {

        if (val['figure_id'] != null) {
            var figure = val['figure'];
            c++;
            figure = figure.replace("Б_K", "Белый король");
            figure = figure.replace("Ч_K", "Черный король");
            figure = figure.replace("Б_Ф", "Белый ферзь(королева)");
            figure = figure.replace("Ч_Ф", "Черный ферзь(королева)");
            figure = figure.replace("Б_Б", "Белая ладья(башня)");
            figure = figure.replace("Ч_Б", "Черная ладья(башня)");
            figure = figure.replace("Б_О", "Белый офицер");
            figure = figure.replace("Ч_О", "Черный офицер");
            figure = figure.replace("Б_Л", "Белый конь");
            figure = figure.replace("Ч_Л", "Черный конь");
            figure = figure.replace("Б_П", "Белая пешка");
            figure = figure.replace("Ч_П", "Черная пешка");
            var left = val['x'];
            var top = val['y'];
            html += "<li id='" + key + "'>"
                    + (val['figure_place'] != 'new_game' ? " ход " + c + " : " + val['figure_place'] + " " + val['username'] : "")
                    + (val['figure'] != null ? " <br />фигура : " + figure : "")
                    + (val['step_time'] != null ? " <br />время : " + val['step_time'] : "")
                    + "</li>";
        }
        $('#f_' + val['figure_id']).animate({"left": left, "top": top}, "slow");//, "opacity": 1, "height": 50, "width": 50
    });
    $("#west_form").html(html);
}

function getGamePlay() {
    var str = '<div id="board"></div><div id="more_buttons"></div>';
    // пешки белые
    for (var i = 1; i <= 8; i++) {
        str += '<div id="f_' + i + '" class="f" onmousedown="changeInputVal(this.getAttribute(\'name\'))" onclick="changeInputVal(this.getAttribute(\'name\'))" onmouseup="intersects(this.getAttribute(\'id\'))" name="Б_П"></div>';
    }
    // пешки черные
    for (var i = 9; i <= 16; i++) {
        str += '<div id="f_' + i + '" class="f_b" onmousedown="changeInputVal(this.getAttribute(\'name\'))" onclick="changeInputVal(this.getAttribute(\'name\'))" onmouseup="intersects(this.getAttribute(\'id\'))" name="Ч_П"></div>';
    }
    // тяжелые фигуры белые
    for (var i = 17; i <= 24; i++) {
        if (i == 17 || i == 24) {
            var cls = "f_1";
            var name = "Б_Б";
        }

        if (i == 18 || i == 23) {
            var cls = "f_2";
            var name = "Б_О";
        }
        if (i == 19 || i == 22) {
            var cls = "f_3";
            var name = "Б_Л";
        }
        if (i == 20) {
            var cls = "f_4";
            var name = "Б_К";
        }
        if (i == 21) {
            var cls = "f_5";
            var name = "Б_Ф";
        }
        str += '<div id="f_' + i + '" class="' + cls + '" name="' + name + '" onmousedown="changeInputVal(this.getAttribute(\'name\'))" onclick="changeInputVal(this.getAttribute(\'name\'))" onmouseup="intersects(this.getAttribute(\'id\'))"></div>';
    }
    // тяжелые фигуры черные
    for (var i = 25; i <= 32; i++) {
        if (i == 25 || i == 32) {
            var cls = "f_1_b";
            var name = "Ч_Б";
        }
        if (i == 26 || i == 31) {
            var cls = "f_2_b";
            var name = "Ч_О";
        }
        if (i == 27 || i == 30) {
            var cls = "f_3_b";
            var name = "Ч_Л";
        }
        if (i == 28) {
            var cls = "f_4_b";
            var name = "Ч_К";
        }
        if (i == 29) {
            var cls = "f_5_b";
            var name = "Ч_Ф";
        }
        str += '<div id="f_' + i + '" class="' + cls + '" name="' + name + '" onmousedown="changeInputVal(this.getAttribute(\'name\'))" onclick="changeInputVal(this.getAttribute(\'name\'))" onmouseup="intersects(this.getAttribute(\'id\'))"></div>';
    }
    return str;
}

function sortFigures() {
    x = 14;
    y = -490;
    //пешки белые
    for (var i = 1; i <= 8; i++) {
        $("#f_" + i).animate({"left": x, "top": y, "opacity": 1, "height": 50, "width": 50}, "slow");
        y = y - 55;
        x = x + 70;
    }
    x = 14;
    y = -580;
    //пешки черные
    for (var i = 9; i <= 16; i++) {
        $("#f_" + i).animate({"left": x, "top": y, "opacity": 1, "height": 50, "width": 50}, "slow");
        y = y - 55;
        x = x + 70;
    }
    x = 14;
    y = -1440;
    // тяжелые фигуры белые
    for (var i = 17; i <= 24; i++) {
        $("#f_" + i).animate({"left": x, "top": y, "opacity": 1, "height": 50, "width": 50}, "slow");
        y = y - 55;
        x = x + 70;
    }
    x = 14;
    y = -1390;
    // тяжелые фигуры черные
    for (var i = 25; i <= 32; i++) {
        $("#f_" + i).animate({"left": x, "top": y, "opacity": 1, "height": 50, "width": 50}, "slow");
        y = y - 55;
        x = x + 70;
    }
}

function changeColor() {

    if (!board.color) {
        //пешки
        for (var i = 1; i <= 8; i++) {
            $("#f_" + i).removeClass().addClass("f_b");
        }
        for (var i = 9; i <= 16; i++) {
            $("#f_" + i).removeClass().addClass("f");
        }
        //тяжелые фигуры
        for (var i = 17; i <= 24; i++) {
            if (i == 17 || i == 24)
                $("#f_" + i).removeClass().addClass("f_1_b");
            if (i == 18 || i == 23)
                $("#f_" + i).removeClass().addClass("f_2_b");
            if (i == 19 || i == 22)
                $("#f_" + i).removeClass().addClass("f_3_b");
            if (i == 20)
                $("#f_" + i).removeClass().addClass("f_4_b");
            if (i == 21)
                $("#f_" + i).removeClass().addClass("f_5_b");
        }
        for (var i = 25; i <= 32; i++) {
            if (i == 25 || i == 32)
                $("#f_" + i).removeClass().addClass("f_1");
            if (i == 26 || i == 31)
                $("#f_" + i).removeClass().addClass("f_2");
            if (i == 27 || i == 30)
                $("#f_" + i).removeClass().addClass("f_3");
            if (i == 28)
                $("#f_" + i).removeClass().addClass("f_4");
            if (i == 29)
                $("#f_" + i).removeClass().addClass("f_5");
        }
        board.color = 1;
    } else {
        //пешки
        for (var i = 1; i <= 8; i++) {
            $("#f_" + i).removeClass().addClass("f");
        }
        for (var i = 9; i <= 16; i++) {
            $("#f_" + i).removeClass().addClass("f_b");
        }
        //тяжелые фигуры
        for (var i = 17; i <= 24; i++) {
            if (i == 17 || i == 24)
                $("#f_" + i).removeClass().addClass("f_1");
            if (i == 18 || i == 23)
                $("#f_" + i).removeClass().addClass("f_2");
            if (i == 19 || i == 22)
                $("#f_" + i).removeClass().addClass("f_3");
            if (i == 20)
                $("#f_" + i).removeClass().addClass("f_4");
            if (i == 21)
                $("#f_" + i).removeClass().addClass("f_5");
        }
        for (var i = 25; i <= 32; i++) {
            if (i == 25 || i == 32)
                $("#f_" + i).removeClass().addClass("f_1_b");
            if (i == 26 || i == 31)
                $("#f_" + i).removeClass().addClass("f_2_b");
            if (i == 27 || i == 30)
                $("#f_" + i).removeClass().addClass("f_3_b");
            if (i == 28)
                $("#f_" + i).removeClass().addClass("f_4_b");
            if (i == 29)
                $("#f_" + i).removeClass().addClass("f_5_b");
        }
        board.color = 0;
    }
    return;
}

function addDragable() {
    $(".f, .f_b, .f_1, .f_1_b, .f_2, .f_2_b, .f_3, .f_3_b, .f_4, .f_4_b, .f_5, .f_5_b").draggable();
    return;
}

function changeInputVal(name) {
    $("#Log_figure").val(name);  //alert(name);
    return;
}

//

	