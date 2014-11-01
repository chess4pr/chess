<?php
/* @var $this GamesController */
/* @var $model Games */

$this->breadcrumbs = array(
    Yii::t('zii', 'List Games') => array('index'),
    Yii::t('zii', 'My Games'),
);
?>   
<?php
$this->menu = array(
    array('label' => Yii::t('zii', 'List Games'), 'url' => array('index')),
        //array('label' => Yii::t('zii', 'Manage Games'), 'url' => array('admin')),
);
?>


<h1><?php echo Yii::t('zii', 'My Games'); ?></h1>

<?php
Yii::app()->clientScript->registerScript('search', "
$('.search-button').click(function(){
	$('.search-form').toggle();
	return false;
});
$('.search-form form').submit(function(){
	$('#games-grid').yiiGridView('update', {
		data: $(this).serialize()
	});
	return false;
});
");

$this->widget('zii.widgets.grid.CGridView', array(
    'id' => 'games-grid',
    'dataProvider' => $model->searchUserLog(),
    'filter' => $model,
    'itemsCssClass' => 'table-striped',
    'columns' => array(
        array('name' => 'id',
            'type' => 'raw',
            'value' => '$data->id',
            'htmlOptions' => array('style' => 'width:10px'),
        ),
        'start_time',
        array('name' => 'type',
            'type' => 'raw',
            'value' => '$data->getTypeTranslate($data->type) . " (  " . Yii::t("zii", "competitor") . CHtml::link($data->username, array("/user/user/view&id=" . $data->user_id)) . ")"',
            'filter' => array('' => 'Все', 'long' => Yii::t('zii', 'long'), 'short' => Yii::t('zii', 'short')),
        ),
        array(
            'class' => 'CButtonColumn',
            'template' => '{game}&nbsp;{chat}', //{view}{update}{delete}
            'buttons' => array
                (
                'game' => array
                    (
                    'label' => Yii::t('zii', 'Create Log'),
                    'imageUrl' => Yii::app()->request->baseUrl . '/images/chess.png',
                    'url' => 'Yii::app()->createUrl("log/showChess", array("id"=>$data->id))',
                ),
                'chat' => array
                    (
                    'label' => Yii::t('zii', 'chat'),
                    'imageUrl' => Yii::app()->request->baseUrl . '/images/chat.png',
                    'url' => 'Yii::app()->createUrl("log/create", array("id"=>$data->id))',
                ),
            ),
        ),
    ),
));
?>