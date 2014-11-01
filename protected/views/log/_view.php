<?php
/* @var $this LogController */
/* @var $data Log */
?>

<div class="view">

	<b><?php echo CHtml::encode($data->getAttributeLabel('id')); ?>:</b>
	<?php echo CHtml::link(CHtml::encode($data->id), array('view', 'id'=>$data->id)); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('user_id')); ?>:</b>
	<?php echo CHtml::encode($data->user_id); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('game_id')); ?>:</b>
	<?php echo CHtml::encode($data->game_id); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('figure')); ?>:</b>
	<?php echo CHtml::encode($data->figure); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('figure_place')); ?>:</b>
	<?php echo CHtml::encode($data->figure_place); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('step_time')); ?>:</b>
	<?php echo CHtml::encode($data->step_time); ?>
	<br />


</div>