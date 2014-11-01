<?php
/* @var $this LogController */
/* @var $model Log */
/* @var $form CActiveForm */
?>

<div id="step_form" class="form">

    <?php
    $form = $this->beginWidget('CActiveForm', array(
        'id' => 'log-form',
        // Please note: When you enable ajax validation, make sure the corresponding
        // controller action is handling ajax validation correctly.
        // There is a call to performAjaxValidation() commented in generated controller code.
        // See class documentation of CActiveForm for details on this.
        'enableAjaxValidation' => false,
    ));
    ?>

    <?php
    echo $form->errorSummary($model);
    //скрытое поле передающее user_id текущего пользователя
    echo $form->hiddenField($model, 'user_id', array('type' => "hidden", 'value' => Yii::app()->user->id));
    echo $form->labelEx($model, Yii::t('zii', 'Joined Game') . Yii::app()->request->getParam('id', 0));
    echo $form->hiddenField($model, 'game_id', array('type' => "hidden", 'value' => Yii::app()->request->getParam('id', 0)));
    ?>
    <!--    <div class="row">           
    <?php echo $form->labelEx($model, 'game_id'); ?>
    <?php echo $form->dropDownList($model, 'game_id', $model->getMyGamesForStep()); ?>
<?php echo $form->error($model, 'game_id'); ?>
        </div>-->

    <div class="row">
        <?php echo $form->labelEx($model, 'figure'); ?>
        <?php echo ZHtml::enumDropDownList($model, 'figure'); ?>
        <?php // echo $form->textField($model,'figure',array('size'=>5,'maxlength'=>5));  ?>
<?php echo $form->error($model, 'figure'); ?>
    </div>

    <div class="row">
        <?php echo $form->labelEx($model, 'figure_place'); ?>
        <?php echo $form->textField($model, 'figure_place', array('size' => 10, 'maxlength' => 10)); ?>
<?php echo $form->error($model, 'figure_place'); ?>
    </div>

    <!--	<div class="row">
    <?php echo $form->labelEx($model, 'step_time'); ?>
    <?php echo $form->textField($model, 'step_time'); ?>
<?php echo $form->error($model, 'step_time'); ?>
            </div>-->

    <div class="row buttons">

        <?php
        echo CHtml::submitButton($model->isNewRecord ? Yii::t('zii', 'Create') : Yii::t('zii', 'Save'));

        ?>
    </div>

<?php $this->endWidget(); ?>

</div><!-- form -->
