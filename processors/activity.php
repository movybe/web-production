<?php


require_once '../config/functions.php';

class Activity extends  Functions
{

    private $data , $error , $success , $action , $email , $username , $user_details;
    private $errorText = "error" , $successText = "success";
    private $networkErrorOccured = "unknown network error";

    private final  function  isReady () : bool
    {
        return isset($_POST['data']) && !empty($this->data = json_decode($_POST['data'] , true));
    }

    private final  function  setDetails() : bool
    {

        $this->action = $this->data['action'];
        $this->email = $this->data['email'];
        $this->user_details = $this->getUserDetails();
        return true;


    }

    private function getUserDetails () : array  {

        return $this->fetch_data_from_table($this->users_table_name , "email" , $this->email)[0];
    }


    private function create_new_merchant_account () : bool
    {
        global $website_details;
        return $this->insert_into_table($this->users_table_name , ["email" => $this->email , "account_type" => $this->data['accountType']]);
    }
    private function emailExistsInTable () : bool
    {
        return $this->record_exists_in_table($this->users_table_name , "email" , $this->email);
    }

    private function usernameExistsInTable () : bool
    {
        return $this->record_exists_in_table($this->users_table_name , "username" , $this->username);
    }



    public function actionProcessor () : string
    {
        if(!$this->isReady() or !$this->setDetails()) return json_encode([$this->errorText => $this->networkErrorOccured , $this->successText => 0]);
        switch ($this->action)
        {
            case 'EMAIL_EXISTS' :
                return json_encode([$this->errorText => $this->emailExistsInTable() ,"details" => $this->user_details , $this->successText => 1]);
                break;
            case 'USERNAME_EXISTS' :
                $this->email = $this->data['username'];
                return json_encode([$this->errorText => $this->usernameExistsInTable() , $this->successText => 1]);

            case 'SIGNUP_MERCHANT' :
                $this->email = $this->data['email'];
                return json_encode([$this->successText => 1 , $this->errorText => $this->create_new_merchant_account()]);

        }

    }

    public function __construct()

    {

        parent::__construct();
    }

    public function __destruct()
    {
        parent::__destruct(); // TODO: Change the autogenerated stub
    }


}

$activity = new Activity();
echo $activity->actionProcessor();
?>