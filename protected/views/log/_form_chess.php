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
    echo $form->labelEx($model, Yii::t('zii', 'Joined Game') . Yii::app()->request->getParam('id', 0));
    echo $form->hiddenField($model, 'user_id', array('type' => "hidden", 'value' => Yii::app()->user->id));
    echo $form->hiddenField($model, 'figure_id', array('type' => "hidden", 'value' => ''));
    echo $form->hiddenField($model, 'x', array('type' => "hidden", 'value' => ''));
    echo $form->hiddenField($model, 'y', array('type' => "hidden", 'value' => ''));
    echo $form->hiddenField($model, 'game_id', array('type' => "hidden", 'value' => Yii::app()->request->getParam('id', 0)));
    ?>
    <br />
    <?php echo ZHtml::enumDropDownList($model, 'figure'); ?>
    <?php echo $form->textField($model, 'figure_place', array('size' => 10, 'readonly'=>true, 'maxlength' => 10)); ?>

    <?php
    echo CHtml::button(Yii::t('zii', 'Save'),array('onclick' => 'sendPost()'));
    ?>
</div>

<?php $this->endWidget(); ?>
<div id="step_error" style="color:red"></div><div id="step_success" style="color:green"></div>
</div><!-- form -->
