<?php



function  decrement_values (string $table_name , array  $field_names, array  $decrement_values , $where_clause) : string{


    $sql = "UPDATE {$table_name} SET ";

    $fields_and_values_length = count($field_names);
    for($i = 0; $i < $fields_and_values_length ; ++$i)
    {
        $show_or_hide_comma = ($i + 1) == $fields_and_values_length ? "" : ",";
        $current_field = $field_names[$i];
        $current_decrement_value = $decrement_values[$i];
        $sql.= "{$current_field} = {$current_field} - {$current_decrement_value}$show_or_hide_comma ";
    }

    $sql.= "WHERE $where_clause";

    return $sql;

}

print decrement_values("ads" , ['balance'] , [5.20] , "ad_id = 'PD_BKk5'");

?>