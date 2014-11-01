<?php
/* @var $this LogController */
/* @var $model Log */

$this->breadcrumbs = array(
    Yii::t('zii', 'Logs') => array('index'),
    Yii::t('zii', 'show chess'),
);
?>
<?php $this->renderPartial('_form_chess', array('model' => $model, 'myGames' => $myGames)); ?>
<script type="text/javascript">
    var board_marker = new Array();
    window.steps_log = new Array();
<?php
foreach ($board as $key => $val) {
    echo 'board_marker[' . $key . '] = "' . $val . '";';
}
?> 
    //получаем данные с сервера
    function ajaxData() {
        $.getJSON("/chess/index.php?r=log/json&id=<?php echo Yii::app()->request->getParam('id', 0); ?>", function(data) {
        })
                .done(function(data) {
                    if (window.steps_log != 'undefined' && window.steps_log.length < data.length) {
                        stepsLog(data[data.length - 1]);
                    }
                    window.steps_log = data;
                });
    }
    //отправляем данные на сервер
    function sendPost() {
        if ($("#Log_figure_place").val() != '') {
            $.post("/chess/index.php?r=log/showChess&id=<?php echo Yii::app()->request->getParam('id', 0); ?>",
                    {'Log': {user_id: $("#Log_user_id").val(),
                            game_id: $("#Log_game_id").val(),
                            figure: $("#Log_figure").val(),
                            figure_place: $("#Log_figure_place").val(),
                            figure_id: $("#Log_figure_id").val(),
                            x: $("#Log_x").val(),
                            y: $("#Log_y").val()
                        }
                    }
            )
                    .done(function(data) {
                        $("#step_success").html('Сохранено');
                        setTimeout(function() {
                            $("#step_success").html('');
                            $("#step_error").html('');
                        }, 5000);
                    });
        } else {
            $("#step_error").html('не сделан ход');
        }
    }

    setInterval(function() {
        ajaxData();
    }, 3000);

</script>

<div id="chess" style="padding: 10px;">
    <script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/js_chess/bokarev/test/src/chess.js"></script>
</div>



