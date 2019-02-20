<?php

function  decrement_values (string $table_name , array  $field_names_and_decrement_values,   $where_clause) : string {


    $sql = "UPDATE {$table_name} SET ";

    $fields_and_values_length = count($field_names_and_decrement_values);
    $count = 0;
    foreach($field_names_and_decrement_values as $field_name => $decrement_value)
    {
        $show_or_hide_comma = ($count + 1) == $fields_and_values_length ? "" : ",";
        $sql.= "{$field_name} = {$field_name} - {$decrement_value}$show_or_hide_comma ";
        $count ++;
    }
    return $sql.= "WHERE {$where_clause};";
    //return $this->executeSQL($sql);
}

echo decrement_values('users' , ['account_balance' => 1 , 'amount_earned' => 400] , " username = 'megakosi'");



?>