<?php
/* @var $this LogController */
/* @var $dataProvider CActiveDataProvider */

$this->breadcrumbs=array(
	Yii::t('zii','Logs'),
);

$this->menu=array(
	array('label'=>Yii::t('zii','My Games'), 'url'=>array('/games/games')),
);
?>

<h1><?php echo Yii::t('zii','Logs'); ?></h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); ?>
