<?php


require_once '../config/functions.php';


class Actions extends  Functions
{

    private $data , $error , $success , $action , $email , $username , $user_details , $reference , $ad_id;
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

        return true;


    }

    private function getUserDetails () : array  {

        if(!$this->emailExistsInTable())return [];
        return $this->fetch_data_from_table($this->users_table_name , "email" , $this->email)[0];
    }

    private function fetchMerchantDetails () : array{

        $user_details = $this->fetch_data_from_table($this->users_table_name , "email" , $this->email)[0];
        $ad_details = $this->fetch_data_from_table($this->ads_table_name , "posted_by" , $user_details['user_id']);


        return ["user" => $user_details ,"ads" => $ad_details];

    }

    private function generateUserId () : string {
        global  $website_details;
        $user_id = $this->generateID($website_details->UserIdLength);
        if($this->record_exists_in_table($this->users_table_name , "user_id" , $user_id)) $this->generateUserId();
        return $user_id;
    }
    private function create_new_merchant_account () : bool
    {
        if(!$this->insert_into_table($this->users_table_name , ["email" => $this->email , "account_type" => $this->data['accountType'] , "user_id" => $this->generateUserId()])) return false;

        return $this->executeSQL("UPDATE {$this->site_statistics_table_name} SET total_number_of_users = total_number_of_users + 1 , total_number_of_merchants = total_number_of_merchants + 1;");

    }
    private function emailExistsInTable () : bool
    {
        return $this->record_exists_in_table($this->users_table_name , "email" , $this->email);
    }

    private function usernameExistsInTable () : bool
    {
        return $this->record_exists_in_table($this->users_table_name , "username" , $this->username);
    }

    private function activateMerchantAccount () : bool
    {

        return $this->update_multiple_fields($this->users_table_name, ["subscribed" => 1, "reference_code" => $this->reference], "email = '{$this->email}'");

    }

    private function fetch_sponsored_ads () : array {


        $sponsored_ads = $this->fetch_data_from_sql("SELECT * FROM ads WHERE paused = 0 and active = 1 and approved = 1 and remaining_units > 0
ORDER BY RAND() LIMIT 3");

        $ad_rate = null;
        $ad_id = null;

        foreach ($sponsored_ads as $sponsored_ad)

        {
            //Check if ad is a pay per view ad
            $ad_rate = $sponsored_ad['ad_rate'];
            $posted_by = $sponsored_ad['posted_by'];
            $ad_id = $sponsored_ad['ad_id'];

            if($sponsored_ad['ad_type'] === 'ppv')
            {

                //Decrement the remaining units and also minus the ad_rate from the balance;
                $this->decrement_values($this->ads_table_name , ['remaining_units' , 'balance'] , [$ad_rate , 1] , "ad_id='{$ad_id}'");

                //Increment the number of views the ad has
                $this->increment_value($this->ads_table_name , 'number_of_views' , 1 , " ad_id = '{$ad_id}'");

                //Decrement the account balance of the user
                $this->decrement_value($this->users_table_name , 'account_balance' , $ad_rate , " user_id = '{$posted_by}'");

                //if the remaining_units is 0, deactivate the ad
                if(($sponsored_ad['remaining_units'] - 1)  === 0)
                {
                    //Deactivate the ad
                    $this->update_record($this->ads_table_name , 'active' , 0 , 'ad_id' , $ad_id);
                }


            }
        }
        return $sponsored_ads;
    }



    public function actionProcessor () : string
    {
        if(!$this->isReady() or !$this->setDetails()) return json_encode([$this->errorText => $this->networkErrorOccured , $this->successText => 0]);
        switch ($this->action)
        {
            case 'EMAIL_EXISTS' :

                return json_encode([$this->errorText => $this->emailExistsInTable() ,"user" => $this->getUserDetails() , $this->successText => 1]);
            case 'USERNAME_EXISTS' :
                $this->email = $this->data['username'];
                return json_encode([$this->errorText => $this->usernameExistsInTable() , $this->successText => 1]);

            case 'SIGNUP_MERCHANT' :
                $this->email = $this->data['email'];
                return json_encode([$this->successText => 1 , $this->errorText => $this->create_new_merchant_account()]);
            case 'FETCH_MERCHANT_DETAILS' :
                  return json_encode(array_merge($this->fetchMerchantDetails() , [$this->errorText => 1 ,$this->successText => 1]));
            case 'ACTIVATE_MERCHANT_ACCOUNT' :
                $this->email = $this->data['email'];
                $this->reference = $this->data['reference'];
                return json_encode([$this->errorText => $this->activateMerchantAccount() , $this->successText => 1 , "user" => $this->getUserDetails()]);
            case 'FETCH_AD_RATES' :
                $cpc = 5.2;
                $cpv = 1.2;
                $cpa = 10;
                return json_encode(array("cpc" => $cpc , "cpv" => $cpv , "cpa"=>  $cpa));
            case 'PAUSE_AD' :
                $this->email = $this->data['email'];
                $this->ad_id = $this->data['id'];
                $this->update_record($this->ads_table_name , 'paused' , 1 , 'ad_id' , $this->ad_id);
                return json_encode([$this->successText => 1 , $this->errorText => $this->successText]);
            case 'PLAY_AD' :
                $this->email = $this->data['email'];
                $this->ad_id = $this->data['id'];
                $this->update_record($this->ads_table_name , 'paused' , 0 , 'ad_id' , $this->ad_id);
                return json_encode([$this->successText => 1 , $this->errorText => $this->successText]);
            case 'FETCH_SPONSORED_ADS':
                return json_encode([$this->successText => 1 , $this->errorText => $this->successText , "sponsored_ads"=> $this->fetch_sponsored_ads()]);


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

$actions = new Actions();
echo $actions->actionProcessor();
?>