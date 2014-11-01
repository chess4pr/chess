/*

This file is part of Ext JS 4
and text for Alexey Bokarev

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
        handler: function(){
			addDragable();
			sortFigures();
       }
    });  
	var actionColorStart = Ext.create('Ext.Action', {
        text: 'Сменить цвет и начать заново',
		cls: 'but',
        handler: function(){
			sortFigures();
			changeColor();
       }
    });
	var actionColor = Ext.create('Ext.Action', {
        text: 'Сменить цвет и продолжить',
		cls: 'but',
        handler: function(){
			changeColor();
       }
    });
    Ext.create('Ext.Viewport', {
        layout: {
            type: 'border',
            padding: 5
        },
        defaults: {
            split: true
        },
        items: [{
            region: 'north',
            collapsible: true,
            title: 'Тач-скрин',
            split: true,
            height: 100,
            minHeight: 60,
            html: 'Проведите рукой, чтобы сменить цвет шахматных фигур'
        },{
            region: 'west',
            collapsible: true,
            title: 'Возможности',
            split: true,
            width: 250,
            minWidth: 100,
            minHeight: 140,
            items: [Ext.create('Ext.button.Button', actionSort),
				    Ext.create('Ext.button.Button', actionColorStart),
					Ext.create('Ext.button.Button', actionColor)] 
        },{
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
	addLayoutCell();
	
});

	function addLayoutCell() { 
		var c = 70; //cell size
		var row = 0;
		for (var i=1;i<=64;i++){
			var t =  Math.floor(i/8);	
			if(row%2){
				var dark_cell = "";
				if(i%2)dark_cell = "background-color: #757575;"
			}else{
				var dark_cell = "background-color: #757575;";
				if(i%2)dark_cell = "";
			} 
			$("#board").append("<a href='javascript:void(0);'>" 
			+ "<img id='cell_" + i + "' style='width:"+ c +"px; height:" + c + "px; "  + dark_cell + "' class='mosaic-block' src='images/cell.gif'/></a>");
			if(t*8==i){$("#board").append("<br />"); row++;}
			board.positions[i] = $("#cell_" + i ).position();
			console.log(">>" + i + "get<<" + board.positions[i].left);
		}
		
	}
	
	function getGamePlay() { 
		var str = '<div id="board"></div>';
		// пешки белые
		for (var i=1;i<=8;i++){
			str += '<div id="f_' + i + '" class="f"></div>';
		}
		// пешки черные
		for (var i=9;i<=16;i++){
			str += '<div id="f_' + i + '" class="f_b"></div>';
		}
		// тяжелые фигуры белые
		for (var i=17;i<=24;i++){
			if(i==17||i==24)var cls = "f_1";
			if(i==18||i==23)var cls = "f_2";
			if(i==19||i==22)var cls = "f_3";
			if(i==20)var cls = "f_4";
			if(i==21)var cls = "f_5";
			str += '<div id="f_' + i + '" class="' + cls + '"></div>';
		}
		// тяжелые фигуры черные
		for (var i=25;i<=32;i++){
			if(i==25||i==32)var cls = "f_1_b";
			if(i==26||i==31)var cls = "f_2_b";
			if(i==27||i==30)var cls = "f_3_b";
			if(i==28)var cls = "f_4_b";
			if(i==29)var cls = "f_5_b";
			str += '<div id="f_' + i + '" class="' + cls + '"></div>';
		}
		return str;
	}	
	
	function sortFigures() { 
		  	x = 14;
			y = -510;
			//пешки белые
			for (var i=1;i<=8;i++){
				$("#f_"+i).animate({"left": x,"top": y, "opacity": 1, "height": 50, "width": 50}, "slow");
				y = y - 55;
				x = x + 70;
			}
			x = 14;
			y = -580;
			//пешки черные
			for (var i=9;i<=16;i++){
				$("#f_"+i).animate({"left": x,"top": y, "opacity": 1, "height": 50, "width": 50}, "slow");
				y = y - 55;
				x = x + 70;
			}
			x = 14;
			y = -1460;		
			// тяжелые фигуры белые
			for (var i=17;i<=24;i++){
				$("#f_"+i).animate({"left": x,"top": y, "opacity": 1, "height": 50, "width": 50}, "slow");
				y = y - 55;
				x = x + 70;
			}	 	
			x = 14;
			y = -1390;		
			// тяжелые фигуры черные
			for (var i=25;i<=32;i++){
				$("#f_"+i).animate({"left": x,"top": y, "opacity": 1, "height": 50, "width": 50}, "slow");
				y = y - 55;
				x = x + 70;
			}			
	}
	
	function changeColor() { 	
		
	    if(!board.color){
			//пешки
			for (var i=1;i<=8;i++){
				$("#f_"+i).removeClass().addClass("f_b");
			}
			for (var i=9;i<=16;i++){
				$("#f_"+i).removeClass().addClass("f");
			}
			//тяжелые фигуры
			for (var i=17;i<=24;i++){
				if(i==17||i==24)$("#f_"+i).removeClass().addClass("f_1_b");
				if(i==18||i==23)$("#f_"+i).removeClass().addClass("f_2_b");
				if(i==19||i==22)$("#f_"+i).removeClass().addClass("f_3_b");
				if(i==20)$("#f_"+i).removeClass().addClass("f_4_b");
				if(i==21)$("#f_"+i).removeClass().addClass("f_5_b");
			}
			for (var i=25;i<=32;i++){
				if(i==25||i==32)$("#f_"+i).removeClass().addClass("f_1");
				if(i==26||i==31)$("#f_"+i).removeClass().addClass("f_2");
				if(i==27||i==30)$("#f_"+i).removeClass().addClass("f_3");
				if(i==28)$("#f_"+i).removeClass().addClass("f_4");
				if(i==29)$("#f_"+i).removeClass().addClass("f_5");
			}
			board.color = 1;
		}else{
			//пешки
			for (var i=1;i<=8;i++){
				$("#f_"+i).removeClass().addClass("f");
			}
			for (var i=9;i<=16;i++){
				$("#f_"+i).removeClass().addClass("f_b");
			}
			//тяжелые фигуры
			for (var i=17;i<=24;i++){
				if(i==17||i==24)$("#f_"+i).removeClass().addClass("f_1");
				if(i==18||i==23)$("#f_"+i).removeClass().addClass("f_2");
				if(i==19||i==22)$("#f_"+i).removeClass().addClass("f_3");
				if(i==20)$("#f_"+i).removeClass().addClass("f_4");
				if(i==21)$("#f_"+i).removeClass().addClass("f_5");
			}
			for (var i=25;i<=32;i++){
				if(i==25||i==32)$("#f_"+i).removeClass().addClass("f_1_b");
				if(i==26||i==31)$("#f_"+i).removeClass().addClass("f_2_b");
				if(i==27||i==30)$("#f_"+i).removeClass().addClass("f_3_b");
				if(i==28)$("#f_"+i).removeClass().addClass("f_4_b");
				if(i==29)$("#f_"+i).removeClass().addClass("f_5_b");
			}
			board.color = 0;
		}
		return;
	}	

	function addDragable() { 	
		$(".f, .f_b, .f_1, .f_1_b, .f_2, .f_2_b, .f_3, .f_3_b, .f_4, .f_4_b, .f_5, .f_5_b").draggable();
		return;
	}	
		


	
	