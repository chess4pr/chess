<?php
/* @var $this GamesController */
/* @var $model Games */

$this->breadcrumbs=array(
	Yii::t('zii','List Games')=>array('index'),
	$model->id,
);

$this->menu=array(
	array('label'=>Yii::t('zii','List Games'), 'url'=>array('index')),
	array('label'=>Yii::t('zii','Create Games'), 'url'=>array('create')),
//	array('label'=>Yii::t('zii','Update Games'), 'url'=>array('update', 'id'=>$model->id)),
//	array('label'=>Yii::t('zii','Delete Games'), 'url'=>'#', 'linkOptions'=>array('submit'=>array('delete','id'=>$model->id),'confirm'=>Yii::t('zii','Are you sure you want to delete this item?'))),
//	array('label'=>Yii::t('zii','Manage Games'), 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('zii','View Games'); ?> №<?php echo $model->id; ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data'=>$model,
	'attributes'=>array(
		'id',
		'start_time',
		'end_time',
		'winner',
		'type',
	),
)); ?>
