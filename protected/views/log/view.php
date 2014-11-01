<?php
/* @var $this LogController */
/* @var $model Log */

$this->breadcrumbs=array(
	'Logs'=>array('index'),
	$model->id,
);

$this->menu=array(
	array('label'=>Yii::t('zii','List Log'), 'url'=>array('index')),
);
?>

<h1>View Log #<?php echo $model->id; ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data'=>$model,
	'attributes'=>array(
		'id',
		'user_id',
		'game_id',
		'figure',
		'figure_place',
		'step_time',
	),
)); ?>
