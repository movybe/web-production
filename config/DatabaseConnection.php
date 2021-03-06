<?php

date_default_timezone_set("Africa/Lagos");
class DatabaseConnection {
    /*

    Renaming a column in sql

    ALTER TABLE "table_name" Change "column 1" "column 2" ["Data Type"];
    ALTER TABLE "table_name" RENAME COLUMN "column 1" TO "column 2";
    ALTER TABLE Customer CHANGE Address Addr char(50);
    ALTER TABLE Customer RENAME COLUMN Address TO Addr;


    */
    public $database_username = "root", // username for the database
        $database_password = "", $database_host = "localhost", $database = "movybe", // database name
        $production_database_username = 'movybeco_guys', $production_database_name = 'movybeco_users',
        $production_database_password = 'Quicknaira.com', $conn, $words_table_name = "words",
        $queries_table_name = "queries", $users_table_name = "users", $ads_table_name = "ads",
        $visitors_table_name = "visitors", $site_statistics_table_name = "site_statistics",
        $withdrawals_table_name = "withdrawals", $website_details,
        $site_name,$transactions_history_table_name = "transactions_history",
        $links_table_name = "links";

    final public function is_production_mode () : bool
    {
        $server_name = $_SERVER['SERVER_NAME'];
        return $is_production_mode = strpos($server_name, '.com');

    }
    final protected  function  establish_database_connection () : bool

    {
        try {

            $database = $this->is_production_mode() ? $this->production_database_name : $this->database;
            $username = $this->is_production_mode() ? $this->production_database_username : $this->database_username;
            $password = $this->is_production_mode() ?$this->production_database_password : $this->database_password;
            $database_host = $this->database_host;

            // Establish  connection with the Database
            $this->conn = new PDO("mysql:dbname=$database;host=$database_host", $username, $password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return true;
        } catch (PDOException $exception) {

            echo "Connection failed : " . $exception->getMessage();
            return false;


        }
    }

        function __construct ()
        {

            global $website_details;

            $this->site_name = 'Movybe';

            $this->establish_database_connection();
            $this->website_details = $website_details;
            return true;

        }

         function __destruct()
    {
        // TODO: Implement __destruct() method.

    $this->conn = null; // Close the database connection on Class Destruct

    }

    public final function create_withdrawals_table () : bool
    {
        $sql = "CREATE TABLE IF NOT EXISTS {$this->withdrawals_table_name}(
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT  NULL  ,
    username VARCHAR (100) NOT NULL DEFAULT  'movybe',
    amount DOUBLE(16,2) NOT NULL DEFAULT 0,
    withdrawal_date TIMESTAMP NOT NULL  DEFAULT  CURRENT_TIMESTAMP ,
    payment_date TIMESTAMP NOT NULL  DEFAULT  CURRENT_TIMESTAMP,
    paid INT NOT NULL  DEFAULT  0 COMMENT 'true 1 false 0',
    reference_code VARCHAR(100) NOT NULL UNIQUE,
    seen int not null DEFAULT 0 comment '0 false, 1 true'
    )";
        return $this->try_create_table($sql);


    }

    public final  function  create_words_table() : bool  {

        $sql = "CREATE TABLE IF NOT EXISTS {$this->words_table_name}(
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL ,
        word VARCHAR (100) NOT NULL  UNIQUE ,
        occurrence BIGINT NOT NULL  ,
        last_search TIMESTAMP  NOT NULL  DEFAULT  CURRENT_TIMESTAMP
    )";

        return $this->try_create_table($sql);

    }

    public final  function create_visitors_table () : bool
    {

        $sql = "CREATE TABLE IF NOT EXISTS {$this->visitors_table_name}(

             id BIGINT AUTO_INCREMENT PRIMARY KEY NOT NULL,
             ip_address VARCHAR (100) UNIQUE NOT NULL DEFAULT '010.199.212.002', 
             country VARCHAR (100) NOT NULL DEFAULT 'NG',
             visits BIGINT NOT NULL DEFAULT 1 ,
             last_visit TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)";

        return $this->try_create_table($sql);
    }

    public final  function  create_users_table() : bool
    {
        $sql = "CREATE TABLE IF NOT EXISTS {$this->users_table_name}(
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR (100) NOT NULL  UNIQUE ,
        account_balance DOUBLE(16,2) NOT NULL DEFAULT 0, 
        account_type VARCHAR (100) NOT NULL , 
        username VARCHAR (100) NOT NULL DEFAULT 'movybe', 
        number_of_users_referred BIGINT NOT NULL DEFAULT 0,
        registered_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , 
        subscribed INT  NOT NULL  DEFAULT 0 COMMENT 'true 1 false 0' , 
        approved INT NOT NULL DEFAULT 0 COMMENT 'true 1 false 0',
        total_income_earned DOUBLE(16,2) NOT NULL DEFAULT 0,
        total_referer_amount_earned DOUBLE(16,2) NOT NULL DEFAULT 0,
        total_amount_funded DOUBLE(16,2) NOT NULL DEFAULT 0,
        user_id VARCHAR (1000) NOT NULL DEFAULT 'vodka123',
        ip_address VARCHAR(100) NOT NULL DEFAULT '010.199.212.002',
        last_paid VARCHAR (100) NOT NULL  DEFAULT 'today',
        reference_code VARCHAR (400) NOT NULL  DEFAULT  'aghdjjshuueosmjs',
        amount_earned_for_the_month DOUBLE(16,2) NOT NULL DEFAULT 0,
        bank_name varchar (1000) NOT NULL DEFAULT  'FCMB',
        account_name VARCHAR (1000) NOT NULL DEFAULT  'Movybe Studio',
        account_number VARCHAR (30) NOT NULL DEFAULT  '2093954338',
        last_subscription_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        number_of_users_invited BIGINT NOT NULL DEFAULT  0,
        referer_username VARCHAR (100) NOT NULL DEFAULT 'Movybe',
        referer_usernames LONGTEXT,
        number_of_account_renewals BIGINT NOT NULL DEFAULT 1,
        number_of_invitations_today BIGINT NOT NULL DEFAULT 0,
        last_invitation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        trial varchar (12) NOT NULL  DEFAULT  0,
        last_read_terms_and_conditions TIMESTAMP NOT NULL  DEFAULT  CURRENT_TIMESTAMP,
        terms_and_conditions_version DOUBLE(16,1) NOT NULL DEFAULT 0 
        )";

        return $this->try_create_table($sql);

    }

    public final function create_ads_table () : bool
    {
        $sql = "CREATE TABLE IF NOT EXISTS {$this->ads_table_name}(

          id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY , 
          title VARCHAR (1000) NOT NULL  , 
          link VARCHAR  (10000) NOT NULL  , 
          description VARCHAR (10000) NOT NULL DEFAULT 'description goes here',
          banner VARCHAR (1000) NOT NULL , 
          ad_type VARCHAR (1000) NOT  NULL DEFAULT 'ppc' COMMENT 'ppc - Pay per click , ppv - Pay per view , ppa - Pay per affiliate',
          paused INT (10) NOT NULL  DEFAULT  0 COMMENT '1 true , 0 false',
          posted_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
          updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
          balance DOUBLE(16,2) NOT  NULL DEFAULT 0,
          amount_paid DOUBLE (16 , 2) NOT NULL DEFAULT 0,
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
          ad_location VARCHAR(1000) NOT NULL DEFAULT 'Nigeria',
          campaign_name VARCHAR (1000) NOT NULL ,
          active INT NOT NULL DEFAULT 1 COMMENT '1 true , 0 false' ,
          approved INT NOT NULL DEFAULT  1 COMMENT '1 true 0 false', 
          contact VARCHAR (100) NULL  DEFAULT  '0707',
          reference_code VARCHAR (400) NOT NULL  DEFAULT  'aghdjjshuueosmjs',
          ad_rate DOUBLE (16 , 2) NOT NULL DEFAULT 1 ,
          last_paid TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          total_units_paid_for BIGINT NOT NULL DEFAULT 0 ,
          remaining_units BIGINT NOT NULL  DEFAULT  0,
          admin_message VARCHAR (2000) NOT NULL DEFAULT 'this ad contains some banned contents',
          last_viewed TIMESTAMP NOT NULL  DEFAULT CURRENT_TIMESTAMP,
          last_clicked  TIMESTAMP NOT NULL  DEFAULT CURRENT_TIMESTAMP
      )";
        return $this->try_create_table($sql);
    }

    public final function create_site_statistics_table () : bool
    {

        $sql = "CREATE TABLE IF NOT EXISTS {$this->site_statistics_table_name}(

               id BIGINT AUTO_INCREMENT PRIMARY KEY NOT  NULL ,
               account_balance DOUBLE(16, 3) NOT NULL DEFAULT  0.0 COMMENT 'This is the account balance',
               total_number_of_users BIGINT NOT NULL DEFAULT  0 , 
               profit DOUBLE(16 , 3) NOT NULL DEFAULT  0.0,
               total_number_of_ads BIGINT NOT  NULL  DEFAULT  0,
               total_number_of_active_ads BIGINT NOT NULL DEFAULT  0,
               total_amount_paid_out DOUBLE(16 , 3) NOT NULL DEFAULT 0.0,
               total_number_of_merchants BIGINT  NOT NULL  DEFAULT  0,
               total_number_of_affiliates BIGINT NOT NULL  DEFAULT  0,
               last_invitation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
               number_of_invites_today bigint NOT NULL DEFAULT 0,
               admin_login_email varchar(100) NOT NULL DEFAULT 'movybeadmin@mail.com',
               advert_login_email varchar(100) NOT NULL  DEFAULT 'movybemerchant@mail.com',
               total_number_of_invites BIGINT NOT NULL DEFAULT 0,
               last_admin_referrer VARCHAR (255) NOT NULL  DEFAULT  'amily'
                )";

        return $this->try_create_table($sql);
    }
    
    public final function create_transactions_history_table() : bool 
    {
        $sql = "CREATE TABLE IF NOT EXISTS {$this->transactions_history_table_name}(
                id BIGINT UNSIGNED NOT NULL  AUTO_INCREMENT PRIMARY KEY,
                transaction_type VARCHAR (100) NOT NULL DEFAULT 'transfer',
                transaction_text VARCHAR (100) NOT NULL DEFAULT  'transferred',
                transaction_date TIMESTAMP NOT NULL  DEFAULT CURRENT_TIMESTAMP ,
                from_user VARCHAR (100) NOT NULL DEFAULT 'you',
                to_user VARCHAR (100) NOT NULL DEFAULT 'someone',
                transaction_amount DOUBLE(16 , 3) NOT NULL DEFAULT  0.0
              )";
        return $this->try_create_table($sql);
    }

    public final function  try_create_table(string $sql) : bool
    {
        $return_value = true;
        try {

            $this->conn->exec($sql);
            echo "Table Created successfully";
        }
        catch (PDOException $exception) {
            echo "Error occurred {$exception->getMessage()}";
            $return_value =  false;
        }
        return $return_value;
    }

    public final  function  create_queries_table() : bool  {

        $sql = "CREATE TABLE IF NOT EXISTS {$this->queries_table_name}(
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        query VARCHAR (2000) NOT NULL UNIQUE ,
        occurrence BIGINT NOT NULL,
        last_search TIMESTAMP NOT NULL DEFAULT  CURRENT_TIMESTAMP 
    )";

        return $this->try_create_table($sql);
    }

    public function create_links_table() : bool {

        $sql = "CREATE TABLE IF NOT EXISTS {$this->links_table_name}(
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        url VARCHAR(65535) CHARACTER SET utf8 NOT NULL,
        last_update_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
        ad VARCHAR(65535) CHARACTER SET utf8 NOT NULL,
        website VARCHAR (255) NOT NULL  DEFAULT 'NA',
        query VARCHAR (1000) NOT NULL DEFAULT 'NA',
        page INT NOT NULL DEFAULT 1,
        last_search TIMESTAMP NOT NULL DEFAULT  CURRENT_TIMESTAMP
        
    )";

        return $this->try_create_table($sql);
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
            echo "Error occurred {$exception->getMessage()}";

            return false;
        }

    }

    public final function insert_into_table(string $table_name , array $fields_and_values , $msg = null){
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
            echo $msg;
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

    public function fetch_data_from_sql (string $sql) : array {

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

    public final function executeSQL (string $sql) : bool{

        $result = $this->conn->prepare($sql);
        $result->execute();

        return true;

    }

    public final function  decrement_values (string $table_name , array  $field_names_and_decrement_values,   $where_clause) : bool {


        $sql = "UPDATE {$table_name} SET ";

        $fields_and_values_length = count($field_names_and_decrement_values);
        $count = 0;
        foreach($field_names_and_decrement_values as $field_name => $decrement_value)
        {
            $show_or_hide_comma = ($count + 1) == $fields_and_values_length ? "" : ",";
            $sql.= "{$field_name} = {$field_name} - {$decrement_value}$show_or_hide_comma ";
            $count ++;
        }
        $sql.= "WHERE {$where_clause};";
        return $this->executeSQL($sql);
    }
    function  increment_values (string $table_name , array  $field_names_and_increment_values,   $where_clause) : bool {
        $sql = "UPDATE {$table_name} SET ";
        $fields_and_values_length = count($field_names_and_increment_values);
        $count = 0;
        foreach($field_names_and_increment_values as $field_name => $increment_value)
        {
            $show_or_hide_comma = ($count + 1) == $fields_and_values_length ? "" : ",";
            $sql.= "{$field_name} = {$field_name} + {$increment_value}$show_or_hide_comma ";
            $count ++;
        }
        $sql.= "WHERE {$where_clause};";
        return $this->executeSQL($sql);
    }


    
    public  final function initiate_database_tables () : bool
    {
            $this->create_words_table();
            $this->create_queries_table();
            $this->create_ads_table();
            $this->create_users_table();
            $this->create_ads_table();
            $this->create_visitors_table();
            $this->create_site_statistics_table();
            $this->insert_into_table($this->site_statistics_table_name , []);
            $this->create_withdrawals_table();
            $this->create_transactions_history_table();
            $this->create_links_table();
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
//$DatabaseConnection->create_site_statistics_table();
//$DatabaseConnection->create_withdrawals_table();
//$DatabaseConnection->initiate_database_tables();
//$DatabaseConnection->create_links_table();
?>