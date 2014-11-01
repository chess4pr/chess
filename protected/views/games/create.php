<?php
/* @var $this GamesController */
/* @var $model Games */

$this->breadcrumbs=array(
	Yii::t('zii','List Games')=>array('index'),
	Yii::t('zii','Create Games'),
);

$this->menu=array(
	array('label'=>Yii::t('zii','List Games'), 'url'=>array('index')),
	array('label'=>Yii::t('zii','Manage Games'), 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('zii','Create Games') . ' ' . Yii::app()->user->name . '?'; ?></h1>

<?php $this->renderPartial('_form', array('model'=>$model)); ?>
