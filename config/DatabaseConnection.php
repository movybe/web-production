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
    public $users_table_name = "users";
    public $ads_table_name = "ads";
    public $visitors_table_name = "visitors";
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
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL ,
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

    public final  function create_visitors_table () : bool
    {

        $sql = "CREATE TABLE IF NOT EXISTS {$this->visitors_table_name}(

             id BIGINT AUTO_INCREMENT PRIMARY KEY NOT NULL,
             ip_address VARCHAR (100) UNIQUE NOT NULL DEFAULT 'zyxwvuts', 
             visitor_id VARCHAR (100) UNIQUE NOT NULL DEFAULT 'abcdefgh'
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

    public final  function  create_users_table() : bool
    {
        $sql = "CREATE TABLE IF NOT EXISTS {$this->users_table_name}(
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR (100) NOT NULL  UNIQUE ,
        account_balance BIGINT NOT NULL DEFAULT  0, 
        account_type VARCHAR (100) NOT NULL , 
        username VARCHAR (100) NOT NULL DEFAULT 0, 
        number_of_users_refered BIGINT NOT NULL  DEFAULT  0,
        registered_on TIMESTAMP NOT NULL  DEFAULT  CURRENT_TIMESTAMP , 
        referred_by VARCHAR (100) NOT NULL  DEFAULT  0 , 
        subscribed INT  NOT NULL  DEFAULT  0 COMMENT 'true 1 false 0' , 
        approved INT NOT NULL DEFAULT 0 ,
        total_income_earned BIGINT NOT NULL DEFAULT  0,
        total_referrer_amount_earned BIGINT NOT NULL DEFAULT  0,
        total_amount_funded BIGINT ( 255 ) NOT NULL DEFAULT 0,
        user_id VARCHAR (1000) NOT NULL DEFAULT 'abcdefgh',
        ip_address VARCHAR(100) NOT NULL UNIQUE DEFAULT '010.199.212.002',
        last_paid VARCHAR (100) NOT NULL  DEFAULT 'today'
        
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

    public final function create_ads_table () : bool
    {

        $sql = "CREATE TABLE IF NOT EXISTS {$this->ads_table_name}(

          id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY , 
          title VARCHAR (1000) NOT NULL  , 
          link VARCHAR  (10000) NOT NULL  , 
          description VARCHAR (10000) NOT NULL DEFAULT 'description goes here',
          image VARCHAR (1000) NOT NULL , 
          ad_type VARCHAR (1000) NOT  NULL DEFAULT 'ppc' COMMENT 'ppc - Pay per click , ppv - Pay per view , ppa - Pay per affiliate',
          paused INT (10) NOT NULL  DEFAULT  0 COMMENT '1 true , 0 false',
          posted_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
          balance BIGINT NOT  NULL DEFAULT 0,
          amount_paid BIGINT NOT NULL DEFAULT 0,
          number_of_clicks_paid_for BIGINT NOT NULL DEFAULT 0,
          number_of_views_paid_for BIGINT NOT NULL  DEFAULT 0,
          number_of_affiliates_paid_for BIGINT NOT NULL  DEFAULT 0,
          number_of_clicks BIGINT NOT NULL  DEFAULT 0,
          number_of_views BIGINT NOT NULL  DEFAULT 0,
          number_of_affiliates_reached BIGINT NOT NULL  DEFAULT 0,
          ad_id VARCHAR (100) NOT  NULL ,
          posted_by VARCHAR (100) NOT NULL ,
          link_short_url VARCHAR (100) NOT NULL ,
          location VARCHAR (1000) NOT NULL ,
          campaign_name VARCHAR (1000) NOT NULL ,
          active INT NOT NULL DEFAULT 1 COMMENT '1 true , 0 false' ,
          approved INT NOT NULL DEFAULT  1 COMMENT '1 true 0 false', 
          contact VARCHAR (100) NULL  DEFAULT  '0707'
        
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
//$DatabaseConnection->executeSQL("DROP TABLE ads");
//$DatabaseConnection->executeSQL("DROP TABLE users");

//$DatabaseConnection->create_ads_table();
//$DatabaseConnection->create_users_table();

//$DatabaseConnection->create_users_table();
//$DatabaseConnection->create_ads_table();
//$DatabaseConnection->create_visitors_table();
?>