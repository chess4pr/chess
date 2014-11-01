<?php

/**
 * This is the model class for table "{{games}}".
 *
 * The followings are the available columns in table '{{games}}':
 * @property integer $id
 * @property string $start_time
 * @property string $end_time
 * @property integer $winner
 * @property string $type
 *
 * The followings are the available model relations:
 * @property Users $winner0
 * @property Log[] $logs
 */
class Games extends CActiveRecord {
    //обьявление переменной username и user_id
    public $username;
    public $user_id;
    /**
     * @return string the associated database table name
     */
    public function tableName() {
        return '{{games}}';
    }

    /**
     * @return array validation rules for model attributes.
     */
    public function rules() {
        // NOTE: you should only define rules for those attributes that
        // will receive user inputs.
        return array(
            array('winner', 'numerical', 'integerOnly' => true),
            array('type', 'length', 'max' => 5),
            array('start_time, end_time', 'safe'),
            // The following rule is used by search().
            // @todo Please remove those attributes that should not be searched.
            array('id, start_time, end_time, winner, type, username, user_id', 'safe', 'on' => 'search'),
            array('start_time', 'default', 'value' => new CDbExpression('NOW()'), 'setOnEmpty' => false),
        );
    }

    /**
     * @return array relational rules.
     */
    public function relations() {
        // NOTE: you may need to adjust the relation name and the related
        // class name for the relations automatically generated below.
        return array(
            'winner0' => array(self::BELONGS_TO, 'User', 'winner'),
            'logs' => array(self::HAS_MANY, 'Log', 'game_id'),
            'user' => array(self::BELONGS_TO, 'User', 'logs.user_id'),
        );
    }

    /**
     * @return array customized attribute labels (name=>label)
     */
    public function attributeLabels() {
        return array(
            'id' => '№',
            'start_time' => 'начало игры',
            'end_time' => 'окончание игры',
            'winner' => 'победитель',
            'type' => 'тип игры',
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

        $criteria->compare('id', $this->id);
        $criteria->compare('start_time', $this->start_time, true);
        $criteria->compare('end_time', $this->end_time, true);
        $criteria->compare('winner', $this->winner);
        $criteria->compare('type', $this->type, true);

        return new CActiveDataProvider($this, array(
            'criteria' => $criteria,
        ));
    }

    public function searchUserLog() {
        // @todo Please modify the following code to remove attributes that should not be searched.

        $criteria = new CDbCriteria;
        $criteria->select = array('g.id, g.start_time, g.type, user.username as username, user.id as user_id' );
        $criteria->alias = 'g';
        $criteria->join = 'LEFT JOIN chess_log logs ON (logs.game_id=g.id)';
        $criteria->join .= 'LEFT JOIN chess_users as user ON user.id = logs.user_id';
        $criteria->condition = 'logs.figure_place != "start" '
                . 'AND logs.user_id != ' . Yii::app()->user->id; 
        $criteria->group = 'g.id';
        $criteria->compare('g.id', $this->id);
        $criteria->compare('g.start_time', $this->start_time, true);
        $criteria->compare('g.type', $this->type, true);
        $criteria->compare('user.username', $this->username, true);
        $criteria->compare('user.user_id', $this->user_id, true);
        return new CActiveDataProvider($this, array(
            'criteria' => $criteria,
        ));

        
        /*
         * Возможности $criteria
         * 
         * alias
          Condition
          Distinct
          Group
          Having
          Join
          Limit, Offset
          Order by
          Params
          scopes
          SELECT
          together
          With
          addBetweenCondition
          Compare
          addCondition
          addInCondition
          addNotInCondition
          addSearchCondition
         *          
         */
    }

    public function getTypeTranslate($type) {
        return Yii::t('zii', $type);
    }

    /**
     * Returns the static model of the specified AR class.
     * Please note that you should have this exact method in all your CActiveRecord descendants!
     * @param string $className active record class name.
     * @return Games the static model class
     */
    public static function model($className = __CLASS__) {
        return parent::model($className);
    }

}
