<?php
/* @var $this GamesController */
/* @var $dataProvider CActiveDataProvider */

$this->breadcrumbs=array(
	Yii::t('zii','List Games'),
);

$this->menu=array(
	array('label'=>Yii::t('zii','Create Games'), 'url'=>array('create')),
	//array('label'=>Yii::t('zii','Manage Games'), 'url'=>array('admin')),
);
?>

<h1>Games</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); ?>
