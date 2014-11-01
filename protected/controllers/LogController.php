<?php

class LogController extends Controller {

    /**
     * @var string the default layout for the views. Defaults to '//layouts/column2', meaning
     * using two-column layout. See 'protected/views/layouts/column2.php'.
     */
    public $layout = '//layouts/column2';

    /**
     * @return array action filters
     */
    public function filters() {
        return array(
            'accessControl', // perform access control for CRUD operations
            'postOnly + delete', // we only allow deletion via POST request
        );
    }

    /**
     * Specifies the access control rules.
     * This method is used by the 'accessControl' filter.
     * @return array access control rules
     */
    public function accessRules() {
        return array(
            array('allow', // allow all users to perform 'index' and 'view' actions
                'actions' => array('index', 'view', 'json'),
                'users' => array('*'),
            ),
            array('allow', // allow authenticated user to perform 'create' and 'update' actions
                'actions' => array('create', 'update', 'showChess'),
                'users' => array('@'),
            ),
            array('allow', // allow admin user to perform 'admin' and 'delete' actions
                'actions' => array('admin', 'delete'),
                'users' => array('admin'),
            ),
            array('deny', // deny all users
                'users' => array('*'),
            ),
        );
    }

    /**
     * Displays a particular model.
     * @param integer $id the ID of the model to be displayed
     */
    public function actionView($id) {
        $this->render('view', array(
            'model' => $this->loadModel($id),
        ));
    }

    public function actionShowChess() {
        $model = new Log;

        // Uncomment the following line if AJAX validation is needed
        // $this->performAjaxValidation($model);

        if (isset($_POST['Log'])) {
            $model->attributes = $_POST['Log'];
            if ($model->save())
                $this->redirect(array('showChess', 'id' => $model->game_id));
        }
        ?>
        <link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/js_chess/ext/resources/css/ext-all.css" />
        <link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/js_chess/css/chess.css" />
        <script src="<?php echo Yii::app()->request->baseUrl; ?>/galatea/Galatea.js"></script>
        <script src="<?php echo Yii::app()->request->baseUrl; ?>/galatea/Chess.js"></script>
        <script src="<?php echo Yii::app()->request->baseUrl; ?>/galatea/TellMe.js"></script>
        <script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/js_chess/ext/bootstrap.js"></script>    
        <script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/js_chess/jquery/jquery.min.js"></script>	
        <script src="<?php echo Yii::app()->request->baseUrl; ?>/js_chess/jquery/ui/jquery.ui.core.js"></script>
        <script src="<?php echo Yii::app()->request->baseUrl; ?>/js_chess/jquery/ui/jquery.ui.widget.js"></script>
        <script src="<?php echo Yii::app()->request->baseUrl; ?>/js_chess/jquery/ui/jquery.ui.mouse.js"></script>
        <script src="<?php echo Yii::app()->request->baseUrl; ?>/js_chess/jquery/ui/jquery.ui.draggable.js"></script>
        <script src="<?php echo Yii::app()->request->baseUrl; ?>/js_chess/jquery/ui/jquery.ui.droppable.js"></script>

        <?php
        $this->render('show_chess', array(
            'model' => $model,
            'board' => $model->getChessBoard(),
            'myGames' => $model->getMyGamesForStep(),
        ));
    }

    /**
     * Creates a new model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     */
    public function actionCreate() {
        $model = new Log;

        // Uncomment the following line if AJAX validation is needed
        // $this->performAjaxValidation($model);

        if (isset($_POST['Log'])) {
            $model->attributes = $_POST['Log'];
            if ($model->save())
                $this->redirect(array('view', 'id' => $model->id));
        }
        ;
        $this->render('create', array(
            'model' => $model,
            'myGames' => $model->getMyGamesForStep(),
        ));
    }

    /**
     * Updates a particular model.
     * If update is successful, the browser will be redirected to the 'view' page.
     * @param integer $id the ID of the model to be updated
     */
    public function actionUpdate($id) {
        $model = $this->loadModel($id);

        // Uncomment the following line if AJAX validation is needed
        // $this->performAjaxValidation($model);

        if (isset($_POST['Log'])) {
            $model->attributes = $_POST['Log'];
            if ($model->save())
                $this->redirect(array('view', 'id' => $model->id));
        }

        $this->render('update', array(
            'model' => $model,
        ));
    }

    /**
     * Deletes a particular model.
     * If deletion is successful, the browser will be redirected to the 'admin' page.
     * @param integer $id the ID of the model to be deleted
     */
    public function actionDelete($id) {
        $this->loadModel($id)->delete();

        // if AJAX request (triggered by deletion via admin grid view), we should not redirect the browser
        if (!isset($_GET['ajax']))
            $this->redirect(isset($_POST['returnUrl']) ? $_POST['returnUrl'] : array('admin'));
    }

    /**
     * Lists all models.
     */
    public function actionIndex() {
        $dataProvider = new CActiveDataProvider('Log');
        $this->render('index', array(
            'dataProvider' => $dataProvider,
        ));
    }

    /**
     * JSON
     */
    public function actionJson() {
        $id = Yii::app()->request->getParam('id',0);
        $model = Log::getStepByGame($id);
        echo json_encode($model);
    }

    /**
     * Manages all models.
     */
    public function actionAdmin() {
        $model = new Log('search');
        $model->unsetAttributes();  // clear any default values
        if (isset($_GET['Log']))
            $model->attributes = $_GET['Log'];

        $this->render('admin', array(
            'model' => $model,
        ));
    }

    /**
     * Returns the data model based on the primary key given in the GET variable.
     * If the data model is not found, an HTTP exception will be raised.
     * @param integer $id the ID of the model to be loaded
     * @return Log the loaded model
     * @throws CHttpException
     */
    public function loadModel($id) {
        $model = Log::model()->findByPk($id);
        if ($model === null)
            throw new CHttpException(404, 'The requested page does not exist.');
        return $model;
    }

    /**
     * Performs the AJAX validation.
     * @param Log $model the model to be validated
     */
    protected function performAjaxValidation($model) {
        if (isset($_POST['ajax']) && $_POST['ajax'] === 'log-form') {
            echo CActiveForm::validate($model);
            Yii::app()->end();
        }
    }

}
