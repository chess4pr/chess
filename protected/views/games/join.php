<?php
/* @var $this GamesController */
/* @var $model Games */

$this->breadcrumbs=array(
	Yii::t('zii','List Games')=>array('index'),
	Yii::t('zii','Join Games'),
);

$this->menu=array(
	array('label'=>Yii::t('zii','List Games'), 'url'=>array('index')),
	array('label'=>Yii::t('zii','Manage Games'), 'url'=>array('admin')),
);
?>



<?php if(Yii::app()->user->hasFlash('notice')):?>
    <div class="start_game">
        <?php echo Yii::app()->user->getFlash('notice'); ?>
    </div>
<?php endif; ?>

<h1><?php echo Yii::t('zii','Join Games') . ' ' . Yii::app()->user->name . '?'; ?></h1>

<div class="form">
<?php echo CHtml::beginForm(); ?>
	<div class="row">
                <input name="join" type="hidden" value="true" />
                <?php echo CHtml::dropDownList('game_id', '', Log::joinGames()) ?>
	</div>
	<div class="row buttons">
		<?php echo CHtml::submitButton(Yii::t('zii','Join Games')); ?>
	</div>
<?php echo CHtml::endForm(); ?>

</div><!-- form -->
