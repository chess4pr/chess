<?php

/**
 * This is the model class for table "{{log}}".
 *
 * The followings are the available columns in table '{{log}}':
 * @property string $id
 * @property integer $user_id
 * @property integer $game_id
 * @property string $figure
 * @property string $figure_place
 * @property string $step_time
 *
 * The followings are the available model relations:
 * @property Games $game
 */
class Log extends CActiveRecord {

    /**
     * @return string the associated database table name
     */
    public function tableName() {
        return '{{log}}';
    }

    /**
     * @return array validation rules for model attributes.
     */
    public function rules() {
        // NOTE: you should only define rules for those attributes that
        // will receive user inputs.
        return array(
            array('user_id, game_id, figure_id, x, y', 'numerical', 'integerOnly' => true),
            array('figure', 'length', 'max' => 5),
            array('figure_place', 'length', 'max' => 10),
            array('step_time', 'safe'),
            // The following rule is used by search().
            // @todo Please remove those attributes that should not be searched.
            array('id, user_id, game_id, figure, figure_place, step_time, figure_id', 'safe', 'on' => 'search'),
            //делаем запись времени хода
            array('step_time', 'default', 'value' => new CDbExpression('NOW()'), 'setOnEmpty' => false, 'on' => 'insert'),
            //валидация хода
            array('figure_place', 'in', 'range' => self::getChessBoardRules(), 'message' => Yii::t('zii', 'figure_place_error')),
        );
    }

    /**
     * @return array relational rules.
     */
    public function relations() {
        // NOTE: you may need to adjust the relation name and the related
        // class name for the relations automatically generated below.
        return array(
            'user' => array(self::BELONGS_TO, 'User', 'user_id'),
            'game' => array(self::BELONGS_TO, 'Games', 'game_id'),
        );
    }

    public function behaviors() {
        return array(
            'EJsonBehavior' => array(
                'class' => 'application.behaviors.EJsonBehavior'
            ),
        );
    }

    public function getChessBoardRules() {
        $board = self::getChessBoard();
        $board[] = 'delete';
        return $board;
    }

    public function getChessBoard() {
        $str = 'a8,b8,c8,d8,e8,f8,g8,h8,a7,b7,c7,d7,e7,f7,g7,h7,a6,b6,c6,d6,e6,f6,g6,h6,a5,b5,c5,d5,e5,f5,g5,h5,a4,b4,c4,d4,e4,f4,g4,h4,a3,b3,c3,d3,e3,f3,g3,h3,a2,b2,c2,d2,e2,f2,g2,h2,a1,b1,c1,d1,e1,f1,g1,h1';
        $pieces = explode(",", $str);
        return $pieces;
    }

    /**
     * @return array customized attribute labels (name=>label)
     */
    public function attributeLabels() {
        return array(
            'id' => 'уникальный id записи',
            'user_id' => 'пользователь id',
            'game_id' => 'в какой игре сделан ход',
            'figure' => 'перемещение фигур',
            'figure_place' => 'поле : a1 ... h8, delete',
            'step_time' => 'в какое время сделан был ход',
        );
    }

    /**
     * Retrieves a list of models based on the current search/filter conditions.
     *
     * Typical usecase:
     * - Initialize the model fields with values from filter form.
     * - Execute this method to get CActiveDataProvider instance which will filter
     * models according to data in model fields.
     * - Pass data provider to CGridView, CListView or any similar widget.
     *
     * @return CActiveDataProvider the data provider that can return the models
     * based on the search/filter conditions.
     */
    public function search() {
        // @todo Please modify the following code to remove attributes that should not be searched.

        $criteria = new CDbCriteria;

        $criteria->compare('id', $this->id, true);
        $criteria->compare('user_id', $this->user_id);
        $criteria->compare('game_id', $this->game_id);
        $criteria->compare('figure', $this->figure, true);
        $criteria->compare('figure_place', $this->figure_place, true);
        $criteria->compare('step_time', $this->step_time, true);

        return new CActiveDataProvider($this, array(
            'criteria' => $criteria,
        ));
    }

    /**
     * Returns the static model of the specified AR class.
     * Please note that you should have this exact method in all your CActiveRecord descendants!
     * @param string $className active record class name.
     * @return Log the static model class
     */
    public static function model($className = __CLASS__) {
        return parent::model($className);
    }
    
    /**
     * Забираем список ходов используя id игры 
     * @return array
     */
    public function getStepByGame($id) {
        $games = Yii::app()->db->createCommand()
                ->select('l.figure,l.figure_place,l.step_time,l.figure_id,l.x,l.y,u.username')
                ->from(self::tableName() . ' l')
                ->join(User::tableName() . ' u', 'l.user_id=u.id')
                ->where('game_id=:game_id', array(':game_id' => $id))
                ->order('l.id')
                ->queryAll();
        return $games;
    }

    /**
     * Нам нужно узнать игры, которые еще не закончились(нет победителя) 
     * и в которых текущий пользователь может сделать ход.
     * - используется в скрине сделать ход
     * @return array
     */
    public function getMyGamesForStep() {
        $games = Yii::app()->db->createCommand()
                ->select('game_id')
                ->from(self::tableName() . ' l')
                ->join(Games::tableName() . ' g', 'l.game_id=g.id')
                ->where('user_id=:user_id', array(':user_id' => Yii::app()->user->id))
                ->andWhere('g.winner IS NULL')
                ->andWhere('l.figure_place != "start"') //не ждем соперника
                ->queryAll();
        $return = array();
        foreach ($games as $key => $val) {
            $return[$val['game_id']] = $val['game_id'];
        }
        return array_unique($return);
    }

    /**
     * Игры которые мы начали и ждем соперника
     * @return array
     */
    public function getMyGamesWaiting() {
        $games = Yii::app()->db->createCommand()
                ->select('game_id')
                ->from(self::tableName())
                ->where('user_id=:user_id', array(':user_id' => Yii::app()->user->id))
                ->andWhere('figure_place = "start"') //ждем соперника
                ->queryAll();
        $return = array();
        foreach ($games as $key => $val) {
            $return[$val['game_id']] = $val['game_id'];
        }
        return array_unique($return);
    }

    /**
     * Подсчитать .
     * @return integer
     */
    public function countInvites() {
        return count(Log::joinGames());
    }
    
        /**
     * Подсчитать мои активные игры.
     * @return integer
     */
    public function countMyActiveGames() {
        $model = new Games('search');
        $count = $model->searchUserLog();
        return count($count->getData());
    }

    /**
     * Игры которые закончились
     * @return array
     */
    public function getMyGamesFinished() {
        $games = Yii::app()->db->createCommand()
                ->select('game_id')
                ->from(self::tableName())
                ->where('user_id=:user_id', array(':user_id' => Yii::app()->user->id))
                ->andWhere('g.winner IS NOT NULL') //победитель обозначен
                ->queryAll();
        $return = array();
        foreach ($games as $key => $val) {
            $return[$val['game_id']] = $val['game_id'];
        }
        return array_unique($return);
    }

    /**
     * Метод делает запись в лог о том что игра началась
     * @return
     */
    public function setStartGame($game_id) {
        $log = Yii::app()->db->createCommand();
        $log->insert(self::tableName(), array(
            'user_id' => Yii::app()->user->id,
            'game_id' => $game_id,
            'figure' => NULL,
            'figure_place' => 'start',
        ));
        return;
    }

    /**
     * Присоединиться к игре, возращает список игр в которых 1 игрок
     * @return array
     */
    public function joinGames() {
        $games = Yii::app()->db->createCommand()
                ->select('game_id')
                ->from(self::tableName())
                ->where('user_id!=:user_id', array(':user_id' => Yii::app()->user->id))
                ->andWhere('figure_place = "start"')
                ->group('game_id')
                ->queryAll();
        $return = array();
        foreach ($games as $key => $val) {
            $return[$val['game_id']] = $val['game_id'];
        }
        return $return;
    }

    /**
     * два игрока в игре - начало новой игры.
     * @return boolean
     */
    public function startNewGame() {
        //если есть игры с одним игроком
        if (Log::countInvites()) {
            $game_id = $_POST['game_id'];
            //обновили запись сопернику           
            $log = Log::model()->findByAttributes(array('game_id' => $game_id,'figure_place' => 'start'));
            $log->attributes = array('figure_place' => 'new_game');
            $log->update();
            //заносим себя в Log - тоже new_game
            $log = Yii::app()->db->createCommand();
            $log->insert(self::tableName(), array(
                'user_id' => Yii::app()->user->id,
                'game_id' => $game_id,
                'figure' => NULL,
                'figure_place' => 'new_game',
            ));
            return true;
        } else {
            return false;
        }
    }

}
