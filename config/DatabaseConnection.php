<?php

date_default_timezone_set("Africa/Lagos");
class DatabaseConnection {


    public $database_username = "root"; // username for the database
    public $database_password = "";
    public $database_host = "localhost";
    public $database = "movybe"; // database name
    public  $conn;
    public $words_table_name = "words";
    public $queries_table_name = "queries";
    final protected  function  establish_database_connection () : bool
    {

        try {

            $database = $this->database;
            $username = $this->database_username;
            $password = $this->database_password;
            $database_host = $this->database_host;

            $this->conn = new PDO("mysql:dbname=$database;host=$database_host", $username, $password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return true;
        } catch (PDOException $exception) {

            echo "Connection failed : " . $exception->getMessage();
            return false;


        }
    }

        function __construct () {

            // Establish  connection with the Database


            $this->establish_database_connection();
            return true;


        }

         function __destruct()
    {
        // TODO: Implement __destruct() method.

    $this->conn = null; // Close the database connection on Class Destruct

    }


    public final  function  create_words_table() : bool  {

        $sql = "CREATE TABLE IF NOT EXISTS {$this->words_table_name}(
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        word VARCHAR (100) NOT NULL  UNIQUE ,
        occurrence BIGINT NOT NULL  
    )";

        try {

            $this->conn->exec($sql);
            echo "Table Created successfully";
            return true;
        }

        catch (PDOException $exception) {
            echo "Error occured {$exception->getMessage()}";
            return false;
        }



    }


    public final  function  create_queries_table() : bool  {

        $sql = "CREATE TABLE IF NOT EXISTS {$this->queries_table_name}(
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        query VARCHAR (100) NOT NULL  UNIQUE ,
        occurrence BIGINT NOT NULL  
    )";

        try {

            $this->conn->exec($sql);
            echo "Table Created successfully";
            return true;
        }

        catch (PDOException $exception) {
            echo "Error occured {$exception->getMessage()}";
            return false;
        }



    }



    public final function update_multiple_fields (string $table_name , array  $fields_and_values , string $where_clause){

       $field_length = count($fields_and_values);
       $counter = 0;

       $sql = "UPDATE {$table_name} SET ";

       foreach ($fields_and_values as $field => $value){


           $sql.= ($field_length - $counter == 1 )?  "{$field} = '{$value}'"  : "{$field} = '{$value}',";

           $counter += 1;
       }

        $sql.= " WHERE $where_clause";

       try {

            $this->conn->exec($sql);
            return true;
        }

        catch (PDOException $exception) {
            echo "Error occured {$exception->getMessage()}";

            return false;
        }

    }

    public final function insert_into_table(string $table_name , array $fields_and_values){
        $field_string = "";
        $field_length = count($fields_and_values);
        $values_string = "";
        $counter = 0;
        foreach ($fields_and_values as $field => $value){
            $counter += 1;

            $field_string.= ($counter == $field_length)?  $field  : $field.",";
            $values_string.= ($counter == $field_length) ? "'$value'" : "'$value'".",";
        }

        $counter = 0;

        $sql = "INSERT INTO {$table_name} ($field_string) VALUES ($values_string)";
        try {

            $this->conn->exec($sql);
            return true;
        }

        catch (PDOException $exception) {
            $msg = $exception->getMessage();

            return true;
        }


    }
/*



    You can add a new column at the end of your table

    ALTER TABLE assessment ADD q6 VARCHAR( 255 )
ALTER TABLE users ADD last_free_mode_time VARCHAR( 255 ) NOT NULL DEFAULT '0';
    Add column to the begining of table

    ALTER TABLE assessment ADD q6 VARCHAR( 255 ) FIRST

    Add column next to a specified column

    ALTER TABLE assessment ADD q6 VARCHAR( 255 ) after q5




*/
    public  function fetch_data_from_table_desc(string $table , string $row , string $value): array

    {

        $sql = "SELECT * FROM $table  WHERE $row = '{$value}' order by id DESC ";
        $result = $this->conn->prepare($sql);
        $result->execute();
        $set_type_record = $result->setFetchMode(PDO::FETCH_ASSOC);
        $record = $result->fetchAll();
        return $record;
    }



    public  final  function record_exists_in_table(string  $table_name , string   $row_name , string  $value) : bool {
        $value = strtolower($value);
        $sql = "SELECT $row_name  FROM $table_name WHERE $row_name = '{$value}'";
        $result = $this->conn->prepare($sql);
        $result->execute();
        $num_rows = $result->rowCount();

        if($num_rows > 0)
            return true;
        return false;


    }

    public  final function  delete_record(string  $table_name , string   $row_name , string  $value) : bool  {

        $value = strtolower($value);
        $sql = "DELETE FROM {$table_name} WHERE {$row_name} = '{$value}'";
        $result = $this->conn->prepare($sql);
        $result->execute();
        return true;
    }


    public  final  function  update_record (string  $table_name , string  $row_name , string $new_value , string $row_to_searc_for , string $old_value , $lowercase = true) {

        $new_value = ($lowercase)?strtolower($new_value):$new_value;
        $old_value = strtolower($old_value);
        $sql = "UPDATE {$table_name} SET {$row_name} = '{$new_value}' WHERE {$row_to_searc_for} = '{$old_value}'";
        $result = $this->conn->prepare($sql);
        $result->execute();
        return true;
    }

    public final function fetch_data_from_table(string $table , string $row , string $value): array

    {

        $sql = "SELECT * FROM $table  WHERE $row = '{$value}'";
        $result = $this->conn->prepare($sql);
        $result->execute();
        $set_type_record = $result->setFetchMode(PDO::FETCH_ASSOC);
        $record = $result->fetchAll();
        return $record;
    }

    public  final  function fetch_data_from_table_with_conditions(string  $table , string $conditions){
        $sql = "SELECT * FROM $table  WHERE $conditions";
        $result = $this->conn->prepare($sql);
        $result->execute();
        $set_type_record = $result->setFetchMode(PDO::FETCH_ASSOC);
        $record = $result->fetchAll();
        return $record;

    }

    public final function executeSQL (string $sql){

        $result = $this->conn->prepare($sql);
        $result->execute();

        return true;

    }





}


$DatabaseConnection = new DatabaseConnection();
//$DatabaseConnection->create_words_table();
//$DatabaseConnection->create_queries_table();
?>