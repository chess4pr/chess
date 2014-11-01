<?php
/* @var $this SiteController */
$this->pageTitle = Yii::app()->name;
?>
<a href="http://ru.wikipedia.org/wiki/%D0%A8%D0%B0%D1%85%D0%BC%D0%B0%D1%82%D1%8B" target="_blank" ><?php echo Yii::t('zii', 'сhess_wiki'); ?></a>
<br /><br />
<!-- логика шахмат -->
<div id="chess">
    <script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/js_chess/bokarev/test/src/chess_index.js"></script>
</div>

