    Ext.Loader.setConfig({enabled: true});
	//Ext.Loader.setPath('Ext.ux.DataView', '/js/ext-4.0.7-gpl/e/ux/DataView/');
	Ext.Loader.setPath('Ext.chooser', '/js/ext-4.0.7-gpl/e/view/chooser/');
	Ext.Loader.setPath('Ext.ux', '/js/ext-4.0.7-gpl/e/ux/');
	//Ext.Loader.setPath('Ext.window', '/js/ext-4.0.7-gpl/e/window/');
	Ext.require(['*']);
	Ext.require([
    'Ext.button.Button',
    'Ext.data.proxy.Ajax',
    'Ext.chooser.InfoPanel',
    'Ext.chooser.IconBrowser',
    'Ext.chooser.Panel',
    'Ext.ux.DataView.Animated',
    'Ext.toolbar.Spacer'
	]);
	
	Array.prototype.in_array = function(needle) {
		for(var i = 0, l = this.length; i < l; i++) {
			if(this[i] == needle) {
				return true;
			}
		}
		return false;
	}

    Ext.onReady(function() {
	var tabCount = 1;
	window.query = 'wave';
	c = 48;/*cellSize*/
	window.l = 1;/*langs*/
	window.icon = [];
	window.iconRemove = [];
	var colors=new Array(); 
	/* Красный Оранжевый Желтый Зеленый Голубой Синий Фиолетовый Розовый Белый Серый Черный Коричневый */
	
	colors[0] = ["c00","red",langs['red'][l]];       
	colors[1] = ["fb940b","orange",langs['orange'][l]];
	colors[2] = ["ff0","yellow",langs['yellow'][l]];
	colors[3] = ["0c0", "green",langs['green'][l]];       
	colors[4] = ["03c0c6","blue",langs['blue'][l]];
	colors[5] = ["00f","darkblue",langs['darkblue'][l]];
	colors[6] = ["762ca7","purple",langs['purple'][l]];       
	colors[7] = ["ff98bf","pink",langs['pink'][l]];
	colors[8] = ["fff","white",langs['white'][l]];
	colors[9] = ["999", "gray",langs['gray'][l]];       
	colors[10] = ["000","black",langs['black'][l]];
	colors[11] = ["885418","brown",langs['brown'][l]];
	var winChooser = new Array();
	var palette = new Array();
	var palettePic = '';
	
	/* 
			if(!openTabs.in_array(name)){
			openTabs[num] = name;		
 */	
	
	for(var i=0; i<colors.length; i++) {
		var color = colors[i][0];
		colorName = colors[i][1];
		var colorLocName = colors[i][2];

		palette[i] = {
			title: '<span style="background:#' + color + ';display:block">&nbsp;</span>',
			id: 'palette_' + colorName,
			tbar:[{
				text:'Показать цвет: ' + colorLocName,
				stateId: colorName,
				stateName: colorLocName,
				stateColor: color,
				iconCls: 'info',
				handler: function() {
					if(!openTabs.in_array(this.stateId)){
						openTabs[openTabs.length] = this.stateId;
						tabs.add({
							xtype: 'panel',
							title: this.stateName ,
							id: 'tab_' + this.stateId,
							items:[winChooser[this.stateId] = Ext.create('Ext.chooser.Panel', {
								id: 'img_chooser_'+ this.stateId,
								color: this.stateId
							})],
							closable: true
							});
							winChooser[this.stateId].setWidth('100%');
							winChooser[this.stateId].setHeight('100%');
							tabs.setActiveTab(Ext.getCmp('tab_' + this.stateId));
							console.log(openTabs);
					}
				}
			}]
		}
		palettePic += '<div id="swatch' + i + '" class="sc' + (i==10?' selected':'') + '">' 
					+ '<a id="s' + i + '" href="javascript:void(0);" onClick="cur_color=\'#' + color + '\'; activeColor(\'swatch'+ i +'\');" ' 
					+ 'style="background:#' + color + ';display:block" title="' + colorLocName + '"></a></div>';
	}
		 
				
	/////////// data view ///////////
	ImageModel = Ext.define('ImageModel', {
        extend: 'Ext.data.Model',
        fields: [
           {name: 'name'},
           {name: 'url'},
           {name: 'size', type: 'float'},
           {name:'lastmod', type:'date', dateFormat:'timestamp'}
        ]
    }); 
	
    var store = Ext.create('Ext.data.Store', {
        model: 'ImageModel',
        proxy: {
            type: 'ajax',
            url: '/get-images.php',
            reader: {
                type: 'json',
                root: 'images'
            }
        }
    });
    store.load();

    preview_ten = Ext.create('Ext.Panel', {
        id: 'images-view',
 /*        frame: true,
        collapsible: true, */
        //width: 200,
        //renderTo: 'dataview-example',
        //title: 'Simple DataView (0 items selected)',
        items: Ext.create('Ext.view.View', {
            store: store,
            tpl: [
                '<tpl for=".">',
                    '<div class="thumb-wrap" id="{name}">',
                    '<div class="thumb"><img src="{url}" title="{name}"></div>',
                    '<span class="x-editable">{shortName}</span></div>',
                '</tpl>',
                '<div class="x-clear"></div>'
            ],
            multiSelect: true,
			autoScroll:true,
            //height: 210,
            trackOver: true,
            overItemCls: 'x-item-over',
            itemSelector: 'div.thumb-wrap',
            emptyText: 'No images to display',
            plugins: [
                Ext.create('Ext.ux.DataView.DragSelector', {}),
                Ext.create('Ext.ux.DataView.LabelEditor', {dataIndex: 'name'})
            ],
            prepareData: function(data) {
                Ext.apply(data, {
                    shortName: Ext.util.Format.ellipsis(data.name, 15),
                    sizeString: Ext.util.Format.fileSize(data.size),
                    dateString: Ext.util.Format.date(data.lastmod, "m/d/Y g:i a")
                });
                return data;
            },
            listeners: {
                selectionchange: function(dv, nodes ){
                    var l = nodes.length,
                        s = l !== 1 ? 's' : '';
                    this.up('panel').setTitle('Simple DataView (' + l + ' item' + s + ' selected)');
                }
            }
        })
    });
	///////////end data view ///////////
		store = new Array();
		grid = new Array();
		openTabs = new Array();
		cur_color = '#000';
		cur_color_id = 'swatch10';
        Ext.QuickTips.init();
        Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
		var store_2 = Ext.create('Ext.data.TreeStore', {
			proxy: {
				type: 'ajax',
				url: '/draw/cat'
			},
			sorters: [{
				property: 'leaf',
				direction: 'ASC'
			}, {
				property: 'text',
				direction: 'ASC'
			}]
		});

		var tree = Ext.create('Ext.tree.Panel', {
			store: store_2,
			title: langs['selCat'][l],
			collapsed: false,
			rootVisible: false,
			useArrows: true,
			frame: true,
			//title: 'Check Tree',
			//renderTo: 'tree-div',
			//width: 200,
			height: 250,
			bodyStyle: 'border: 0',
			dockedItems: [{
				xtype: 'toolbar',
				items: {
					text: langs['load'][l],
					handler: function(){
						var records = tree.getView().getChecked(),
                        names = [];                  
						Ext.Array.each(records, function(rec){
							names.push(rec.get('text'));
						});
						var t = names.join('<br />');
                        Ext.getCmp('red').update(t, false);
						Ext.getCmp('orange').update(t, false);
					}
				}
			}]
		});
		
		var formAddTheme = Ext.create('Ext.form.Panel', {
        border: false,
        fieldDefaults: {
            labelWidth: 55
        },
       // url: 'save-form.php',
        defaultType: 'textfield',
        bodyPadding: 5,

        items: [{
            fieldLabel: langs['theme'][1],
            name: 'query',
			id: 'query',
			allowBlank: false,
            anchor:'100%'  // anchor width by percentage
        }],
		buttons: [
			{text: langs['googleSearch'][1],
                    handler: function() {
					window.query = Ext.getCmp('query').value;
					console.log("--"+window.query);
					Ext.MessageBox.alert('Thank you!', ' Your inquiry has been sent. We will respond as soon as possible.');
                           // console.log(Ext.getCmp('query').value);
/*                         if (this.up('formAddTheme').getForm().isValid()) {
                            // In a real application, this would submit the form to the configured url
                            // this.up('form').getForm().submit();
                            //this.up('form').getForm().reset();
                            //this.up('window').hide();
                            Ext.MessageBox.alert('Thank you!', 'Your inquiry has been sent. We will respond as soon as possible.');
                        } */
                    }
            }]
		});
		
        var viewport = Ext.create('Ext.Viewport', {
            id: 'border-example',
            layout: 'border',
            items: [
            // create instance immediately
            Ext.create('Ext.Component', {
                region: 'north',
                height: 32, // give north and south regions a height
                autoEl: {
                    tag: 'div',
                    html:'<p>в нашей базе 1172070 отелей	</p>'
                }
            }),{
                // lazily created panel (xtype:'panel' is default)
                region: 'south',
                contentEl: 'south',
                split: false	,
                height: 500,
                minSize: 300,
                maxSize: 500,
                collapsible: true,
                collapsed: true,
                title: 'South',
                margins: '0 0 0 0'
            }, {
                xtype: 'tabpanel',
                region: 'east',
                title: 'Фильтры',
                animCollapse: true,
                collapsible: true,
                split: true,
                width: 225, // give east and west regions a width
                minSize: 175,
                maxSize: 400,
                margins: '0 0 0 0',
                tabPosition: 'top',
                items: [Ext.create('Ext.form.Panel', {
        width: 400,
        height: 160,
        title: 'Рисунок',
        bodyPadding: 10,
        //renderTo: 'container',
        defaultType: 'sliderfield',
        defaults: {
            anchor: '95%'
        }, 
        items: [{
            fieldLabel: 'Горизонталь',
            value: 1,
            name: 'hor',
			id: 'hor',
			tipText: function(thumb){
				var h = 500 + String(thumb.value)*10;
				$('#center1').css('width', h + 'px');
				$('#center1').css('border', '1px dotted');
                return h + 'px';
            }
        },{
            fieldLabel: 'Вертикаль',
            value: 1,
            name: 'vert',
			id: 'vert',
			tipText: function(thumb){
				var v = 500 + String(thumb.value)*5;
				$('#center1').css('height', v + 'px');
				$('#center1').css('border', '1px dotted');
                return v + 'px';
            }	
        },{
            fieldLabel: 'Размер ячейки',
            value: 10,
            name: 'cellSize',
			id: 'cellSize',
			tipText: function(thumb){
				c = 40 + String(thumb.value)*2;
				$('.mosaic-block').css('width', c + 'px');
		        $('.mosaic-block').css('height', c + 'px');
				$('#center1').css('border', '1px dotted');
                return c + 'px';
            }
        }],
		html:	'<div id="sc-block" style="margin:0 auto;width:100px;height:60px;margin-top:18px">' 
				+ '<div style="margin:10px "><b>карандаш</b></div>' + palettePic + '</div>'
			}),{
				id: 'palette',
				region: 'east',
                title: 'Палитра',
                iconCls: 'nav',
                split: true, 
                width: 200,
                minWidth: 175,
                maxWidth: 250,
                collapsible: true,
                animCollapse: true,
                margins: '0 0 0 5',
				layout: 'accordion',
				items: palette     
            }]
            }, {
                region: 'center',
                stateId: 'center-panel',
                id: 'center-panel', 
                //split: true,
                margins: '0 0 0 0',
                layout: 'accordion',
                items: [
				tabs = Ext.create('Ext.tab.Panel', {
                //deferredRender: false,
				id: 'tabs',
				title: 'Выберите страну из навигации слева',
				bodyStyle: 'border: 0',
                iconCls: 'info',
				plugins: Ext.create('Ext.ux.TabReorderer'),
                items: [{
                    contentEl: 'center1',
                    title: 'Описание проекта',
                    closable: true,
                    autoScroll: true
                }]
				})
				]
            },{
                region: 'west',
                stateId: 'navigation-panel',
                id: 'west-panel', // see Ext.getCmp() below
                title: 'West',
                split: true,
                width: 200,
                minWidth: 175,
                maxWidth: 250,
                collapsible: true,
                animCollapse: true,
                margins: '0 0 0 5',
				layout: 'accordion',
				items: [tree,{
                    title: langs['addTheme'][l],
					id: 'info',
					items: formAddTheme
                    //html:  '<p>' + langs['selCat'][l] + '</p>'				
					}],
                    title: langs['category'][l],
                    iconCls: 'nav' // see the HEAD section for style used
              
            }]
			
        });
	/////////////////////////////
	Ext.define('HotelThread', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'id', type: 'int', mapping: 'id'}, 
			{name: 'hotelname', mapping: 'hotelname'}, 
			//{name: 'type', mapping: 'type'}, 
			{name: 'stars', mapping: 'stars'},
            {name: 'room', type: 'int', mapping: 'room'},
			{name: 'description', mapping: 'description'}
           // {name: 'lastpost', mapping: 'lastpost', type: 'date', dateFormat: 'timestamp'},
        ]/* ,
        idProperty: 'id' */
    });
		addLayoutCell();
		Ext.getCmp('hor').on("changecomplete", function(slider, newValue) {
          addLayoutCell();
        });
		Ext.getCmp('vert').on("changecomplete", function(slider, newValue) {
          addLayoutCell();
        });
		Ext.getCmp('cellSize').on("changecomplete", function(slider, newValue) {
          addLayoutCell();
        });
    });
	
	function addLayoutCell() {
		$('#center1').html('');
		for (i=0;i<=2000;i++){
			$("#center1").append("<a href='javascript:void(0);' onClick=\"$('#cell_" + i + "').css('background-color', cur_color);\">" 
			+ "<img id='cell_" + i + "' style='width:"+ c +"px; height:" + c + "px;' class='mosaic-block' src='/images/cell.gif'/></a>");
			if($("#cell_" + i).offset().top + $("#cell_" + i).height() > $("#center1").offset().top + $("#center1").height()){
				$("#cell_" + i).remove();
				$('#center1').css('border', '0');
				return;
			}
		}
		
	}
	
	function activeColor(colorId) {
		$("#" + cur_color_id).removeClass("sc selected").addClass("sc");
		cur_color_id = colorId;
		$("#" + cur_color_id).addClass("sc selected");
	}
	
	window.removePic = function(image) {
	    
		$("#" + image).css('border','#cc0000 5px solid');
	//	window.iconRemove[] = image;
	}
	
	
	window.setActivePic = function(color,image) {
	    window.icon[color]=image;
	}

