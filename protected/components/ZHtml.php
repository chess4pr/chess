<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
class ZHtml extends CHtml
{
    public static function enumDropDownList($model, $attribute, $htmlOptions=array())
    {
      return CHtml::activeDropDownList( $model, $attribute, self::enumItem($model,  $attribute), $htmlOptions);
    }
 
    public static function enumItem($model,$attribute) {
        $attr=$attribute;
        self::resolveName($model,$attr);
        preg_match('/\((.*)\)/',$model->tableSchema->columns[$attr]->dbType,$matches);
        foreach(explode("','", $matches[1]) as $value) {
                $value=str_replace("'",null,$value);
                $values[$value]=Yii::t('zii',$value);
        }
        return $values;
    } 
}
