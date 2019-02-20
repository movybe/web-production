<?php


require_once '../config/functions.php';


class Actions extends  Functions
{

    private $data , $error , $success , $action , $email , $username , $user_details , $reference , $ad_id , $sponsored_ad;
    private $errorText = "error" , $successText = "success";
    private $networkErrorOccured = "unknown network error";
    private $emailAddressAlreadyExistsErrorMessage = "Sorry, email already exists";
    private $usernameAlreadyExistsErrorMessage = "Sorry, username already taken";
    private $refererUsernameNotFoundMessage = "Sorry, referer username not found";
    private $refererAccountExpiredMessage = "Your referer is no longer active";
    private $userIsNotAnAffiliateMemberMessage = "the referer is not an affiliate member";
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
        
        $user_id = $this->generateID($this->website_details->UserIdLength);
        if($this->record_exists_in_table($this->users_table_name , "user_id" , $user_id)) $this->generateUserId();
        return $user_id;
    }
    private function create_new_merchant_account () : bool
    {
        if(!$this->insert_into_table($this->users_table_name , ["email" => $this->email , "account_type" => $this->data['accountType'] , "user_id" => $this->generateUserId()])) return false;


        return $this->increment_values($this->site_statistics_table_name , ['total_number_of_users' => 1 , 'total_number_of_merchants' => 1] , 'id = 1');
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

    private  function perform_ad_actions ($sponsored_ad , bool $increment_views = true , $increment_clicks = false) : bool
    {

        
        //Check if ad is a pay per view ad
        $ad_rate = $sponsored_ad['ad_rate'];
        $posted_by = $sponsored_ad['posted_by'];
        $ad_id = $sponsored_ad['ad_id'];

        $poster_details = $this->fetch_data_from_table($this->users_table_name , 'user_id' , $posted_by)[0];
        //Decrement the remaining units and also minus the ad_rate from the balance;

        $is_omoba_ad = strtolower($poster_details['email']) == strtolower($this->website_details->siteEmail);

        if ((($sponsored_ad['remaining_units'] - 1) >= 0) &&  !$is_omoba_ad){
            $this->decrement_values($this->ads_table_name, [
                'remaining_units' => $ad_rate ,
                'balance' => $ad_rate
            ], "ad_id='{$ad_id}'");
            $this->decrement_value($this->users_table_name, 'account_balance', $ad_rate, " user_id = '{$posted_by}'");
    }
        //Increment the number of views the ad has
        if($increment_views){
            $this->increment_value($this->ads_table_name , 'number_of_views' , 1 , " ad_id = '{$ad_id}'");

        }
        else if($increment_clicks){
            $this->increment_value($this->ads_table_name , 'number_of_clicks' , 1 , " ad_id = '{$ad_id}'");
        }

        //Decrement the account balance of the user

        //if the remaining_units is 0, deactivate the ad
        if(($sponsored_ad['remaining_units'] - 1)  === 0)
        {
            //Deactivate the ad
            $this->update_record($this->ads_table_name , 'active' , 0 , 'ad_id' , $ad_id);
        }
        return true;


    }

    private function fetch_sponsored_ads () : array {


        
        $sponsored_ads = $this->fetch_data_from_sql("SELECT * FROM ads WHERE paused = 0 and active = 1 and approved = 1 and remaining_units > 0
ORDER BY RAND() LIMIT {$this->website_details->NumberOfSponsoredAdsToShow}");

        $ad_rate = null;
        $ad_id = null;

        foreach ($sponsored_ads as $sponsored_ad)

        {

            if($sponsored_ad['ad_type'] === 'ppv')
            {

                $this->perform_ad_actions($sponsored_ad);

            }


        }


        return $sponsored_ads;

    }




    private function validate_affiliate() : string{

        $email = $this->escape_string($this->data['email']);
        //Check if email address exists
        if($this->record_exists_in_table($this->users_table_name , 'email' , $email)){
            return json_encode([$this->errorText => $this->emailAddressAlreadyExistsErrorMessage , $this->successText => 0]);
        }
        $username = $this->escape_string($this->data['username']);

        //Check if username has already been taken
        if($this->record_exists_in_table($this->users_table_name , "username" , $username))
        {
            return json_encode([$this->errorText => $this->usernameAlreadyExistsErrorMessage , $this->successText => 0]);
        }

        $referer_username = $this->escape_string($this->data['referer_username']);

        //Check if the referer username exists
        if(!$this->record_exists_in_table($this->users_table_name , "username" , $referer_username))
        {
            return json_encode([$this->errorText => $this->refererUsernameNotFoundMessage , $this->successText => 0]);
        }



        $referer_details = $this->fetch_data_from_table($this->users_table_name , 'username' , $referer_username)[0];

        //Check if the account type of the user is affiliate;
        if($referer_details['account_type'] != 'affiliate') {
            return json_encode([$this->errorText => $this->userIsNotAnAffiliateMemberMessage , $this->successText => 0]);
        }


        //Check if the user referer account has expired
        if($referer_details['subscribed'] != '1')
        {
            return json_encode([$this->errorText => $this->refererAccountExpiredMessage , $this->successText => 0]);
        }

        //Now check if the user account has exceeded a month

        $now = date('Y-m-d H:i:s');
        $last_subscription_date = $referer_details['last_subscription_date'] ;
        $amount_earned_for_the_month = (double)$referer_details['amount_earned_for_the_month'];
        $login_date = strtotime($last_subscription_date); // change x with your login date var
        $current_date = strtotime($now); // change y with your current date var
        $datediff = $current_date - $login_date;
        $days = floor($datediff/(60*60*24));

        //Check if the referer has made more than N5000 in the last month
        if($days > $this->website_details->subscriptionDurationInDays && $amount_earned_for_the_month >= $amount_earned_for_the_month)
        {

            //Unsubscribe the user
            $this->update_record($this->users_table_name , 'subscribed' , 0 , 'username' , $referer_username);
            return json_encode([$this->errorText => $this->refererAccountExpiredMessage , $this->successText => 0]);
        }


        return json_encode([$this->errorText => $this->successText , $this->successText => 1 , "amount" => $this->website_details->affiliateSignupFee]);






        //Check if referer username


    }

    private function create_new_affiliate_account () : string {

        $username  = $this->data['username'];
        $account_name = $this->data['account_name'];
        $account_number = $this->data['account_number'];
        $bank_name = $this->data['bank_name'];
        $referer_username = $this->data['referer_username'];
        $user_id = $this->generateUserId();
        $reference_code = $this->data['reference_code'];
        if($this->record_exists_in_table($this->users_table_name , 'user_id' , $user_id))$this->signup_merchant();

        $fields_and_values = [
            'username' => $username,
            'account_name' => $account_name,
            'account_number' => $account_number ,
            'bank_name' => $bank_name ,
            'referer_username' => $referer_username ,
            'email' => $this->email ,
            'account_type' => 'affiliate',
            'subscribed' => 1,
            'approved' => 1,
            'reference_code' => $reference_code

        ];

        $msg = "hi";
        //Insert the
        if($this->insert_into_table($this->users_table_name , $fields_and_values ,$msg))
        {
            //Add the amount to profit

            $this->increment_values($this->site_statistics_table_name ,
                [
                    'account_balance' => $this->website_details->siteAffiliateSignupFee ,
                    'total_number_of_users' => 1,
                    'profit' => $this->website_details->siteAffiliateSignupFee ,
                    'total_number_of_affiliates' => 1] , "id = 1");


            //Increment the account balance of the referer

            $this->increment_values($this->users_table_name ,
                [
                    'account_balance' => $this->website_details->amountPaidToAffiliateForReferer,
                    'number_of_users_referred' => 1
                    ,'total_income_earned' => $this->website_details->amountPaidToAffiliateForReferer ,
                    'total_referer_amount_earned' => $this->website_details->amountPaidToAffiliateForReferer,
                    'amount_earned_for_the_month' => $this->website_details->amountPaidToAffiliateForReferer
                ]
           , "username = '{$referer_username}'");
        }

        $new_user_details = $this->fetch_data_from_table($this->users_table_name , 'username' , $username)[0];
        return json_encode([$this->errorText => $this->successText , $this->successText => 1 , 'user' => $new_user_details]);



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
            case 'SPONSORED_AD_CLICKED' :
                $this->ad_id = $this->data['ad_id'];
                $this->sponsored_ad = $this->fetch_data_from_table($this->ads_table_name , 'ad_id' , $this->ad_id)[0];
                return json_encode([$this->successText => $this->perform_ad_actions($this->sponsored_ad , false, true) , $this->errorText => $this->successText]);
            case 'VALIDATE_AFFILIATE':
                return $this->validate_affiliate();
            case 'SIGNUP_AFFILIATE' :
                return $this->create_new_affiliate_account();
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