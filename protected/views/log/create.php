<?php
/* @var $this LogController */
/* @var $model Log */

$this->breadcrumbs = array(
    Yii::t('zii', 'Logs') => array('index'),
    Yii::t('zii', 'Create'),
);

$this->menu = array(
    array('label' => Yii::t('zii', 'List Log'), 'url' => array('index')),
    array('label' => Yii::t('zii', 'show chess'), 'url' => array('showChess', 'id' => Yii::app()->request->getParam('id', 0))),
);

$this->widget('YiiChatWidget', array(
    'chat_id' => '123', // a chat identificator
    'identity' => Yii::app()->user->id, // the user, Yii::app()->user->id ?
    'selector' => '#chat', // were it will be inserted
    'minPostLen' => 2, // min and
    'maxPostLen' => 500, // max string size for post
    'model' => new ChatHandler(), // the class handler. **** FOR DEMO, READ MORE LATER IN THIS DOC ****
    'data' => 'any data', // data passed to the handler
    // success and error handlers, both optionals.
    'onSuccess' => new CJavaScriptExpression(
            "function(code, text, post_id){   }"),
    'onError' => new CJavaScriptExpression(
            "function(errorcode, info){  }"),
));
?>

<h1><?php echo Yii::t('zii', 'Create Log') . ' ' . Yii::app()->user->name . '?'; ?></h1>
<div class="span-8">
<?php $this->renderPartial('_form', array('model' => $model, 'myGames' => $myGames)); ?>
</div>
<div class="span-9">
    <div id='chat'></div> 
</div>
