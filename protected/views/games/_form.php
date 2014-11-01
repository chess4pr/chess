<?php
/* @var $this GamesController */
/* @var $model Games */
/* @var $form CActiveForm */
?>

<div class="form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'id'=>'games-form',
	// Please note: When you enable ajax validation, make sure the corresponding
	// controller action is handling ajax validation correctly.
	// There is a call to performAjaxValidation() commented in generated controller code.
	// See class documentation of CActiveForm for details on this.
	'enableAjaxValidation'=>false,
)); ?>

<!--	<p class="note"><?php echo Yii::t('zii','required'); ?></p>-->

	<?php echo $form->errorSummary($model); ?>

<!-- три поля при создании новой игры не нужны	
        <div class="row">

		<?php echo $form->labelEx($model,'start_time'); ?>
		<?php echo $form->textField($model,'start_time'); ?>
		<?php echo $form->error($model,'start_time'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'end_time'); ?>
		<?php echo $form->textField($model,'end_time'); ?>
		<?php echo $form->error($model,'end_time'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'winner'); ?>
		<?php echo $form->textField($model,'winner'); ?>
		<?php echo $form->error($model,'winner'); ?>
	</div>-->

	<div class="row">
		<?php echo $form->labelEx($model,'type'); ?>
                <?php echo ZHtml::enumDropDownList( $model,'type' ); ?>
		<?php echo $form->error($model,'type'); ?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton($model->isNewRecord ? Yii::t('zii','Create Games') : 'Save'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- form -->