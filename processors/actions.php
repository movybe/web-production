<?php


require_once '../config/functions.php';


class Actions extends  Functions
{
    private $data , $error , $success = 1 , $action , $email , $username , $user_details , $reference , $ad_id , $sponsored_ad,
    $errorText = "error" , $successText = "success", $networkErrorOccured = "unknown network error",
    $emailAddressAlreadyExistsErrorMessage = "Sorry, email already exists",
    $usernameAlreadyExistsErrorMessage = "Sorry, username already taken",
    $refererUsernameNotFoundMessage = "Sorry, referer username not found",
    $refererAccountExpiredMessage = "Your referer is no longer active",
    $userIsNotAnAffiliateMemberMessage = "the referer is not an affiliate member",
    $successfulWithdrawalMessage = "Withdrawal Successful, your account will be credited within the next 15min";
    private final  function  isReady () : bool
    {
        return isset($_POST['data']) && !empty($this->data = json_decode($_POST['data'] , true));
    }

    private final  function  setDetails() : bool
    {

        $this->action = $this->data['action'];
        $this->email = strtolower($this->data['email']);

        return true;
    }

    private function getUserDetails () : array  {

        if(!$this->emailExistsInTable())return [];
        return $this->fetch_data_from_table($this->users_table_name , "email" , $this->email)[0];
    }

    private function fetchMerchantDetails () : array{

        $user_details = $this->fetch_data_from_table($this->users_table_name , "email" , $this->email)[0];
        $user_details['terms_and_conditions_version'] = floatval($user_details['terms_and_conditions_version']);

        $ad_details = $this->fetch_data_from_table($this->ads_table_name , "posted_by" , $user_details['user_id']);

        $site_statistics = $this->fetch_data_from_table($this->site_statistics_table_name , 'id' , 1)[0];
        $advert_login_email = $site_statistics['advert_login_email'];
        $admin_login_email = $site_statistics['admin_login_email'];

        $is_site_admin_login_email= $this->email === $admin_login_email ? 1 : 0;
        $is_site_advert_login_email= $this->email === $advert_login_email ? 1 : 0;
        $user_details_2 = ['is_site_admin_login_email' => $is_site_admin_login_email , 'is_site_advert_login_email' => $is_site_advert_login_email];
        $user_details = array_merge($user_details , $user_details_2);
        if($is_site_admin_login_email)
        {
            $user_details_3 = ['site_statistics' => $site_statistics];
            $user_details = array_merge($user_details , $user_details_3);
        }
        return ["user" => $user_details ,"ads" => $ad_details];
    }

    private function fetchAffiliateDetails () : array {


        $user_details = $this->fetch_data_from_table($this->users_table_name , "email" , $this->email)[0];
        $username = $user_details['username'];

        if((int)$user_details['subscribed'] === 1) {
            $now = date('Y-m-d H:i:s');
            $last_subscription_date = $user_details['last_subscription_date'];
            $amount_earned_for_the_month = (double)$user_details['amount_earned_for_the_month'];
            $login_date = strtotime($last_subscription_date); // change x with your login date var
            $current_date = strtotime($now); // change y with your current date var
            $date_difference = $current_date - $login_date;
            $days = floor($date_difference / (60 * 60 * 24));
            if(($days > $this->website_details->subscriptionDurationInDays) && ($amount_earned_for_the_month >= $this->website_details->minimumEarningExpected))
            {
                //Unsubscribe the user
                $this->update_record($this->users_table_name , 'subscribed' , 0 , 'username' , $username);
            }

        }
        $user_details = $this->fetch_data_from_table($this->users_table_name , "email" , $this->email)[0];

        //Check if the user has made more than the minimum in the last n days

        $ad_details = $this->fetch_data_from_table($this->ads_table_name , "posted_by" , $user_details['user_id']);
        $withdrawal_requests_by_affiliate = $this->fetch_data_from_table_with_conditions($this->withdrawals_table_name , "paid = 0 AND username = '{$username}'");
        $total_withdrawal_amount = 0;

        foreach ($withdrawal_requests_by_affiliate as $withdrawal) {
            $total_withdrawal_amount += (double)$withdrawal['amount'];
        }
        $payments_made = $this->fetch_data_from_table_with_conditions($this->withdrawals_table_name , "username = '{$username}' AND paid = 1 AND seen = 0");

        $number_of_withdrawal_requests = count($withdrawal_requests_by_affiliate);
        $user_details_2 = ['withdrawal_requests' => $number_of_withdrawal_requests , 'payments' => $payments_made , 'total_withdrawal_amount' => $total_withdrawal_amount];
        $user_details = array_merge($user_details , $user_details_2);

        return ["user" => $user_details ,"ads" => $ad_details];
    }


    private function affiliateWithdrawal () : string  {

        $total_withdrawal_amount = (double)$this->data['total_withdrawal_amount'];
        $payment_amount = (double)$this->data['payment_amount']; //amount to pay the user
        $profit = (int)$this->data['profit'];
        $withdrawal_charge = (double)$this->data['withdrawal_charge'];





        $user_details = $this->fetch_data_from_table($this->users_table_name , 'email'  , $this->email)[0];

        $user_account_balance = (double)$user_details['account_balance'];

        if($user_account_balance < $total_withdrawal_amount)
        {
            return json_encode([$this->errorText => "Withdrawal failed due to insufficient funds" , $this->successText => 0]);
        }

        else if($this->decrement_value($this->users_table_name , 'account_balance' , $total_withdrawal_amount, "email = '{$this->email}'"))
        {
            $this->insert_into_table($this->withdrawals_table_name , [
                'amount' => $payment_amount ,
                'username' => $user_details['username'] ,
                'reference_code' => $this->generateID($this->website_details->withdrawalReferenceCodeLength , $this->withdrawals_table_name , 'reference_code')
                ]);

            //Decrement the total amount from the website account balance
            $this->decrement_value($this->site_statistics_table_name , 'account_balance' , $total_withdrawal_amount , 'id = 1');

            //Increment the profit of the site
            $this->increment_value($this->site_statistics_table_name , 'profit' , $profit , 'id = 1');

            //Increment the account_balance of the site by the  withdrawal charge
            $this->increment_value($this->site_statistics_table_name , 'account_balance' , $withdrawal_charge , 'id = 1');


            //Send the payment request as message
            $return_string = json_encode([$this->errorText => $this->successfulWithdrawalMessage  , $this->successText => 1]);

            /*
            try {
                $this->send_payment_email($payment_amount, $user_details['account_name']);
            }
            catch (Exception $exception){

                return $return_string;
           }
            */
            return $return_string;

        }

        return json_encode([$this->errorText => $this->successfulWithdrawalMessage  , $this->successText => 1]);
    }

    private function generateUserId () : string {
        $user_id = $this->generateID($this->website_details->UserIdLength);
        if($this->record_exists_in_table($this->users_table_name , "user_id" , $user_id)) $this->generateUserId();
        return $user_id;
    }

    private function create_new_merchant_account () : string
    {
        if(!$this->insert_into_table($this->users_table_name , [
            "email" => $this->email ,
            "account_type" => $this->data['accountType'] ,
            "user_id" => $this->generateUserId(),
            'referer_usernames' => $this->website_details->SiteName
        ])){return false;}

        $user_details = $this->fetch_data_from_table($this->users_table_name , 'email' , $this->email)[0];

        //Increment number of users and number of merchants
        $this->increment_values($this->site_statistics_table_name , ['total_number_of_users' => 1 , 'total_number_of_merchants' => 1] , 'id = 1');

        return json_encode([$this->successText => 1 , $this->errorText => $this->successText , 'user' => $user_details]);
    }
    private function emailExistsInTable () : bool
    {
        return $this->record_exists_in_table($this->users_table_name , "email" , $this->email);
    }

    private function usernameExistsInTable () : bool
    {
        return $this->record_exists_in_table($this->users_table_name , "username" , $this->username);
    }

    private function activateMerchantAccount () : string
    {

        $amount = $this->data['amount'];
        $this->reference = $this->data['reference'];
        $this->update_multiple_fields($this->users_table_name, ["subscribed" => 1, "reference_code" => $this->reference], "email = '{$this->email}'");

        //Increment the website profit if it's a non-admin account
        $site_statistics = $this->fetch_data_from_table($this->site_statistics_table_name , 'id' , 1)[0];
        $site_ad_email = $site_statistics['advert_login_email'];
        $not_movybe_account = $this->email !== strtolower($site_ad_email);

        if($not_movybe_account){
            $this->increment_value($this->site_statistics_table_name , 'profit' , $amount , 'id = 1');
        }


        return json_encode([$this->errorText => $this->successText , $this->successText => 1]);




        }

    private  function perform_ad_actions ($sponsored_ad , bool $increment_views = true , bool $increment_clicks = false, bool $deduct_from_account_balance = false) : bool
    {

        
        //Check if ad is a pay per view ad
        $ad_rate = $sponsored_ad['ad_rate'];
        $posted_by = $sponsored_ad['posted_by'];
        $ad_id = $sponsored_ad['ad_id'];

        $poster_details = $this->fetch_data_from_table($this->users_table_name , 'user_id' , $posted_by)[0];
        //Decrement the remaining units and also minus the ad_rate from the balance;

        $site_statistics = $this->fetch_data_from_table($this->site_statistics_table_name , 'id' , 1)[0];
        $site_ad_email = $site_statistics['advert_login_email'];

        $is_movybe_ad = strtolower($poster_details['email']) == strtolower($site_ad_email);
        if ((($sponsored_ad['remaining_units'] - 1) >= 0) &&  !$is_movybe_ad && $deduct_from_account_balance){
            $this->decrement_values($this->ads_table_name, [
                'remaining_units' => 1 ,
                'balance' => $ad_rate
            ], "ad_id='{$ad_id}'");
            $this->decrement_value($this->users_table_name, 'account_balance', $ad_rate, " user_id = '{$posted_by}'");
    }
        //Increment the number of views the ad has
        if($increment_views){
            $this->increment_value($this->ads_table_name , 'number_of_views' , 1 , " ad_id = '{$ad_id}'");

            //Update the last viewed;
            $now = date('Y-m-d H:i:s');
            $this->update_record($this->ads_table_name , 'last_viewed' , $now , 'ad_id' , $ad_id);
        }
        else if($increment_clicks){
            $this->increment_value($this->ads_table_name , 'number_of_clicks' , 1 , " ad_id = '{$ad_id}'");

            //Update the last clicked;
            $now = date('Y-m-d H:i:s');
            $this->update_record($this->ads_table_name , 'last_clicked' , $now , 'ad_id' , $ad_id);
        }
        //Decrement the account balance of the user
        //if the remaining_units is 0, deactivate the ad
        if(($sponsored_ad['remaining_units'] - 1)  === 0)
        {
            //Deactivate the ad
            $this->update_record($this->ads_table_name , 'active' , 0 , 'ad_id' , $ad_id);
            //Decrement the number of active ads from the site statistics table
            $this->decrement_value($this->site_statistics_table_name , 'total_number_of_active_ads' , 1 , ' id = 1');
        }

        return true;


    }

    private function fetch_sponsored_ads () : array {


        
        $sponsored_ads = $this->fetch_data_from_sql("SELECT * FROM ads WHERE paused = 0 and active = 1 and approved = 1 and remaining_units > 0
ORDER BY RAND() LIMIT {$this->website_details->NumberOfSponsoredAdsToShow}");
        $ad_rate = null;
        $ad_id = null;
        if(!count($sponsored_ads)) return [];
        foreach ($sponsored_ads as $sponsored_ad)

        {



            if($sponsored_ad['ad_type'] == 'ppv'){
                $this->perform_ad_actions($sponsored_ad , true , false , true);


            }
            else {
                $this->perform_ad_actions($sponsored_ad , true , true , false);
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

        //Check if the referer has made more than minimum in the last month
        if(($days > $this->website_details->subscriptionDurationInDays) && ($amount_earned_for_the_month >= $this->website_details->minimumEarningExpected))
        {
            //Unsubscribe the user
            $this->update_record($this->users_table_name , 'subscribed' , 0 , 'username' , $referer_username);
            return json_encode([$this->errorText => $this->refererAccountExpiredMessage , $this->successText => 0]);
        }


        return json_encode([$this->errorText => $this->successText , $this->successText => 1 , "amount" => $this->website_details->affiliateSignupFee]);






        //Check if referer username


    }

    private function create_new_affiliate_account () : string {

        $username  = strtolower($this->escape_string($this->data['username']));
        $account_name = $this->escape_string($this->data['account_name']);
        $account_number = $this->data['account_number'];
        $bank_name = $this->data['bank_name'];
        $referer_username = strtolower($this->escape_string($this->data['referer_username']));




        $user_id = $this->escape_string($this->generateUserId());
        $reference_code = $this->data['reference_code'];
        $is_referral_link = (int)$this->data['is_referral_link'];
        $next_referrer = $this->data['next_referrer'];

        $change_admin_referrer = (int)$this->data['change_admin_referrer'] === 1;
        //Check if the user registered without a referral link,if so change the last referrer

        if($change_admin_referrer)$this->update_record($this->site_statistics_table_name , 'last_admin_referrer' , $next_referrer , "id"  , 1);
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
            'reference_code' => $reference_code,
            'referer_usernames' => $referer_username,
            'user_id' => $this->generateUserId()
        ];

        $msg = "hi";
        $referrer_details = $this->fetch_data_from_table($this->users_table_name , 'username' , $referer_username)[0];

        $referrer_is_on_trial = intval($referrer_details['trial']) === 1;

        //Insert the data to the table
        if($this->insert_into_table($this->users_table_name , $fields_and_values ,$msg))
        {

            $new_website_account_balance_increment = $referrer_is_on_trial ? 0  : $this->website_details->amountPaidToAffiliateForReferer;
            $this->increment_values($this->site_statistics_table_name ,
                [
                    'account_balance' => $new_website_account_balance_increment,
                    'total_number_of_users' => 1,
                    'profit' => $this->website_details->siteAffiliateSignupFee ,
                    'total_number_of_affiliates' => 1] , "id = 1");


            //Increment the account balance of the referer
            $new_account_balance_increment = $this->website_details->amountPaidToAffiliateForReferer;

            //check if the referral is on trial
            if($referrer_is_on_trial)
            {
                $new_account_balance_increment = 0;
                $this->increment_values($this->users_table_name ,
                    [
                        'account_balance' => $new_account_balance_increment,
                        'number_of_users_referred' => 1
                        ,'total_income_earned' => $this->website_details->amountPaidToAffiliateForReferer ,
                        'total_referer_amount_earned' => $this->website_details->amountPaidToAffiliateForReferer,
                        'amount_earned_for_the_month' => $this->website_details->amountPaidToAffiliateForReferer
                    ]
                    , "username = '{$referer_username}'");

                //Add the amount to website profit
                $this->increment_value($this->site_statistics_table_name , 'profit' , $this->website_details->amountPaidToAffiliateForReferer , "id = 1");

                //Remove the referrer from trial
                $this->update_record($this->users_table_name , 'trial' , 0 , 'username' , $referer_username);
            }
            else
            {

                $this->increment_values($this->users_table_name ,
                    [
                        'account_balance' => $new_account_balance_increment,
                        'number_of_users_referred' => 1
                        ,'total_income_earned' => $this->website_details->amountPaidToAffiliateForReferer ,
                        'total_referer_amount_earned' => $this->website_details->amountPaidToAffiliateForReferer,
                        'amount_earned_for_the_month' => $this->website_details->amountPaidToAffiliateForReferer
                    ]
                    , "username = '{$referer_username}'");


            }

        }



        $new_user_details = $this->fetch_data_from_table($this->users_table_name , 'username' , $username)[0];

        $payments_made = $this->fetch_data_from_table_with_conditions($this->withdrawals_table_name , "username = '{$username}' AND paid = 1 AND seen = 0");

        $withdrawal_requests_by_affiliate = $this->fetch_data_from_table_with_conditions($this->withdrawals_table_name , "paid = 0 AND username = '{$username}'");
        $total_withdrawal_amount = 0;

        foreach ($withdrawal_requests_by_affiliate as $withdrawal) {
            $total_withdrawal_amount += (double)$withdrawal['amount'];
        }

        $number_of_withdrawal_requests = count($withdrawal_requests_by_affiliate);
        $user_details_2 = ['withdrawal_requests' => $number_of_withdrawal_requests , 'payments' => $payments_made , 'total_withdrawal_amount' => $total_withdrawal_amount];
        $new_user_details = array_merge($new_user_details , $user_details_2);

        return json_encode([$this->errorText => $this->successText , $this->successText => 1 , 'user' => $new_user_details]);

    }


    private function activate_affiliate_account ($referer_username , $user_details , bool $withdraw_2100_from_user = false) : string {
        //Deduct N2,100 from the user account

        if($withdraw_2100_from_user) {
            $this->decrement_value($this->users_table_name, 'account_balance', $this->website_details->affiliateSignupFee, "email = '{$this->email}'");
        }
        else {
            //Update the reference code
            $this->update_record($this->users_table_name , 'reference_code' , $this->data['reference_code'] , 'email' , $this->email);
        }

        //Update the last referer
        $this->update_record($this->users_table_name , 'referer_username' , $referer_username , 'email' , $this->email);



        //Add the amount to profit
        $this->increment_values($this->site_statistics_table_name ,
            [
                'account_balance' => $this->website_details->amountPaidToAffiliateForReferer ,
                'profit' => $this->website_details->siteAffiliateSignupFee
            ] , "id = 1");


        //Increment the account balance of the referer
        $this->increment_values($this->users_table_name ,
            [
                'account_balance' => $this->website_details->amountPaidToAffiliateForReferer,
                'total_income_earned' => $this->website_details->amountPaidToAffiliateForReferer ,
                'total_referer_amount_earned' => $this->website_details->amountPaidToAffiliateForReferer,
                'amount_earned_for_the_month' => $this->website_details->amountPaidToAffiliateForReferer,
                'number_of_users_invited' => 1
            ]
            , "username = '{$referer_username}'");


        //update the last subscription date
        $now = date('Y-m-d H:i:s');
        $this->update_record($this->users_table_name , 'last_subscription_date' , $now , 'email' , "{$this->email}");

        //Increment the number of account_renewals
        $this->increment_value($this->users_table_name , 'number_of_account_renewals' , 1 , "email = '{$this->email}'");

        //Reset the user's amount earned for the month
        $this->update_record($this->users_table_name , 'amount_earned_for_the_month' , 0 , 'email' , "{$this->email}");

        //Add the referer to the comma-separated list of referrers;
        $referer_usernames = $user_details['referer_usernames'].','.$referer_username;

        $this->update_record($this->users_table_name , 'referer_usernames' , $referer_usernames  , 'email' , "{$this->email}");

        //Subscribe the user
        $this->update_record($this->users_table_name , 'subscribed' , 1 , 'email' , "{$this->email}");


        //Change the username of the user
        //$this->update_record($this->users_table_name , "username" , strtolower($this->generateID($this->website_details->UserIdLength , $this->users_table_name , 'username')) , 'user_id' , $user_details['user_id']);

        return json_encode([$this->errorText => $this->successText , $this->successText => 1]);

    }

    function update_user_last_read_terms_and_conditions() : string {
        $now = date('Y-m-d H:i:s');
        $version = $this->data['version'];

        if($this->update_multiple_fields($this->users_table_name ,
            [
                'last_read_terms_and_conditions' => $now,
                'terms_and_conditions_version' => $version
            ] , "email = '{$this->email}'")){
            return json_encode([$this->successText => 1 , 'timestamp' => $now]);
        }
    }

    function get_cached_ad() : string
    {

        //If the url sent is an array, base-64 the json_encoded version of the url, else return the url as it is.
        $url = is_array($this->data['url']) ? base64_encode(json_encode($this->data['url'])) : $this->data['url'];

        /*
         * This is the default response if there's no ad data returned from the database, where the link field contains
         the url, in other words, send a response with update = true, if no data is returned, meaning the server will
         Crawl the url.
        */
        $response = ['update' => true, 'ads' => []];

        //fetch the row from database where url = $url
        $data = $this->fetch_data_from_table($this->links_table_name , 'url' , $url);

        //if there's no data returned, send a response with update = true, to the client to crawl the server
        if(!count($data))return json_encode($response);

        //Since the data returned is an array, the first element is the data required
        $data= $data[0];

        //This is the timestamp at which this ad detail was stored in the database
        $last_update_timestamp = $data['last_update_timestamp'];


        $now = time();

        //Convert the time string to time()
        $strtotime = strtotime($last_update_timestamp);


        $difference = $now - $strtotime;


        //This is the number of days the result has stayed in the database
        $days = floor($difference / (3600 * 24));

        //if the number of days is greater than the specified number of days, send another request to the servers
        $response['update'] = $days > $this->website_details->ad_cache_days;


        $response['days'] = $days;
        $response['stored_timestamp'] = $last_update_timestamp;


        $response['ads'] = json_decode(base64_decode(($data['ad'])), true);



        return json_encode($response);
    }

    function update_search_result () : string  {

        $url = is_array($this->data['url']) ? base64_encode(json_encode($this->data['url'])) : $this->data['url'];
        $now = date('Y-m-d H:i:s');

        $website = $this->data['website'];
        $query = $this->data['query'];
        $page = $this->data['page'];


        $ads = $this->data['ads'];

        if($this->record_exists_in_table($this->links_table_name , 'url' , $url))
        {

            $this->update_multiple_fields($this->links_table_name ,
                [
                    'last_search' => $now,
                    'page' => $page,
                    'query' => $query,
                    'website' => $website,
                    'last_update_timestamp' => $now,
                    'ad' => base64_encode(json_encode($ads))
                ] , "url = '{$url}'"
            );
        }

        else {

            $this->insert_into_table($this->links_table_name , [
                'page' => $page,
                'query' => $query,
                'website' => $website,
                'last_update_timestamp' => $now,
                'ad' => base64_encode(json_encode($ads)),
                'url' => $url
            ]);
        }


        return json_encode(["stored_timestamp" => $now, $this->successText => $this->success, "ads" => $ads]);

    }

    private function try_reactivate_affiliate_account () : string{


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
        if((int)$referer_details['subscribed'] != 1)
        {
            return json_encode([$this->errorText => $this->refererAccountExpiredMessage , $this->successText => 0]);
        }

        //Now check if the user account has exceeded n days

        $now = date('Y-m-d H:i:s');
        $last_subscription_date = $referer_details['last_subscription_date'] ;
        $amount_earned_for_the_month = (double)$referer_details['amount_earned_for_the_month'];
        $login_date = strtotime($last_subscription_date); // change x with your login date var
        $current_date = strtotime($now); // change y with your current date var
        $datediff = $current_date - $login_date;
        $days = floor($datediff/(60*60*24));

        //Check if the referer has made more than x in the last n days
        if($days > $this->website_details->subscriptionDurationInDays && $amount_earned_for_the_month >= $this->website_details->minimumEarningExpected)
        {
            //Unsubscribe the user
            $this->update_record($this->users_table_name , 'subscribed' , 0 , 'username' , $referer_username);
            return json_encode([$this->errorText => $this->refererAccountExpiredMessage , $this->successText => 0]);
        }


        $user_details = $this->fetch_data_from_table($this->users_table_name , 'email' , $this->email)[0];
        //Check if the user has more than N2,100

        if($user_details['account_balance'] >= $this->website_details->affiliateSignupFee)
        {

            return $this->activate_affiliate_account($referer_username , $user_details , true);
        }


         return json_encode([$this->errorText => $this->successText , $this->successText => 0 , "continue_with_paystack" => 1 ,  "amount" => $this->website_details->affiliateSignupFee]);


    }

    private function  fetch_next_payment_details () : string {
        $index = $this->data['index'];
        $payment_details = $this->fetch_data_from_table_with_conditions($this->withdrawals_table_name , " paid = 0 AND id > {$index} ORDER BY ID ASC");

        if(!empty($payment_details))
        {

            $withdrawal_sum = 0;
            $total_withdrawals = 0;


            foreach($payment_details as $payment_detail){

                $withdrawal_sum += $payment_detail['amount'];
                $total_withdrawals ++;
            }

            $user_details = $this->fetch_data_from_table($this->users_table_name , 'username' , $payment_details[0]['username'])[0];
            $payment_details = $payment_details[0];
            $extra_fields = ['total_withdrawals_amount' => $withdrawal_sum , 'number_of_withdrawals' => $total_withdrawals];
            $payment_details = array_merge($user_details , $payment_details , $extra_fields);
        }
        else {
            $payment_details = [];
        }
        return json_encode([$this->successText => 1 , $this->errorText => $this->successText , 'payment_details' => $payment_details]);
    }

    private  function reactivate_affiliate_account () :string
    {
        $referer_username = $this->escape_string($this->data['referer_username']);
        $user_details = $this->fetch_data_from_table($this->users_table_name , 'email' , $this->email)[0];

        return $this->activate_affiliate_account($referer_username , $user_details);
    }

    private function deletePaymentHistory () : string  {

        $this->update_record($this->withdrawals_table_name , 'seen' , 1 , 'reference_code' , $this->data['reference_code']);

        return json_encode([$this->successText => 1 , $this->errorText => $this->successText]);

    }

    private function disapprove_ad () :string {

        $ad_id = $this->escape_string($this->data['ad_id']);
        $this->update_multiple_fields($this->ads_table_name , [
            'approved' =>  0 ,
            'admin_message' => $this->escape_string($this->data['message'])
        ] , "ad_id= '{$ad_id}'");

        return json_encode([$this->successText => 1 , $this->errorText => $this->successText]);
    }

    private function getSponsoredAds () : string  {
        $index = $this->data['index'];
        $sponsored_ads = $this->fetch_data_from_table_with_conditions($this->ads_table_name , " approved = 1 AND active = 1 LIMIT $index , 10");
        return json_encode([$this->successText => 1 , $this->errorText => $this->successText , 'sponsored_ads' => $sponsored_ads]);
    }
    private function confirmPayment () : string {

        $now = date('Y-m-d H:i:s');
        $reference_code = $this->data['reference_code'];
        $this->update_multiple_fields($this->withdrawals_table_name ,
            [
            'paid' => 1 ,
            'payment_date' => $now
            ] , "reference_code ='{$reference_code}'");

        //Increment the amount paid out
        $this->increment_value($this->site_statistics_table_name , 'total_amount_paid_out' , $this->data['amount'] , 'id =1');

        //Add this transaction to transaction history table
        $this->insert_into_table($this->transactions_history_table_name ,
            [
                'transaction_type' => $this->website_details->transactionTypes['payment']['type'],
                'transaction_text' => $this->website_details->transactionTypes['payment']['action'],
                'from_user' => $this->website_details->siteNameLowercase,
                'to_user' => $this->data['username'],
                'transaction_amount' => $this->data['amount']
                ]);
        return json_encode([$this->successText => 1 , $this->errorText => $this->successText]);
    }

    public function actionProcessor () : string
    {
        if(!$this->isReady() or !$this->setDetails()) return json_encode([$this->errorText => $this->networkErrorOccured , $this->successText => 0]);
        switch ($this->action)
        {
            case 'EMAIL_EXISTS' :
                return json_encode([$this->errorText => $this->emailExistsInTable() ,"user" => $this->getUserDetails() , $this->successText => 1 ,"username" => strtolower($this->generateID($this->website_details->UserIdLength , $this->users_table_name,"username"))]);
            case 'USERNAME_EXISTS' :
                $this->email = $this->data['username'];
                return json_encode([$this->errorText => $this->usernameExistsInTable() , $this->successText => 1]);
            case 'SIGNUP_MERCHANT' :
                return $this->create_new_merchant_account();
            case 'FETCH_MERCHANT_DETAILS' :
                  return json_encode(array_merge($this->fetchMerchantDetails() , [$this->errorText => 1 ,$this->successText => 1]));
            case 'ACTIVATE_MERCHANT_ACCOUNT' :
                return $this->activateMerchantAccount();
            case 'FETCH_AD_RATES' :
                $cpc = 5.2;
                $cpv = 1.2;
                $cpa = 10;
                return json_encode(array("cpc" => $cpc , "cpv" => $cpv , "cpa"=>  $cpa));
            case 'PAUSE_AD' :
                $this->ad_id = $this->data['id'];
                $this->update_record($this->ads_table_name , 'paused' , 1 , 'ad_id' , $this->ad_id);
                return json_encode([$this->successText => 1 , $this->errorText => $this->successText]);
            case 'PLAY_AD' :
                $this->ad_id = $this->data['id'];
                $this->update_record($this->ads_table_name , 'paused' , 0 , 'ad_id' , $this->ad_id);
                return json_encode([$this->successText => 1 , $this->errorText => $this->successText]);
            case 'FETCH_SPONSORED_ADS':
                return json_encode([$this->successText => 1 , $this->errorText => $this->successText , "sponsored_ads"=> $this->fetch_sponsored_ads()]);
            case 'SPONSORED_AD_CLICKED' :
                $this->ad_id = $this->data['ad_id'];
                $this->sponsored_ad = $this->fetch_data_from_table($this->ads_table_name , 'ad_id' , $this->ad_id)[0];
                if($this->sponsored_ad['ad_type'] == 'ppc'){
                    return json_encode([$this->successText => $this->perform_ad_actions($this->sponsored_ad , false, true , true) , $this->errorText => $this->successText]);
                }
                return json_encode([$this->successText => $this->perform_ad_actions($this->sponsored_ad , false, true , false) , $this->errorText => $this->successText]);

            case 'VALIDATE_AFFILIATE':
                return $this->validate_affiliate();
            case 'SIGNUP_AFFILIATE' :
                return $this->create_new_affiliate_account();
            case 'FETCH_AFFILIATE_DETAILS':
                return json_encode(array_merge($this->fetchAffiliateDetails() , [$this->errorText => 1 ,$this->successText => 1]));
            case 'AFFILIATE_WITHDRAWAL':
                return $this->affiliateWithdrawal();
            case 'DELETE_PAYMENT_HISTORY' :
                return $this->deletePaymentHistory();
            case 'TRY_RE-ACTIVATE_AFFILIATE_ACCOUNT':
                return $this->try_reactivate_affiliate_account();
            case 'RE-ACTIVATE_AFFILIATE_ACCOUNT' :
                return $this->reactivate_affiliate_account();
            case 'FETCH_NEXT_PAYMENT_DETAILS':
                return $this->fetch_next_payment_details();
            case 'CONFIRM_PAYMENT':
                return $this->confirmPayment();
            //For admin sponsored ads
            case 'GET_SPONSORED_ADS' :
                return $this->getSponsoredAds();
            case 'DISAPPROVE_AD':
                return $this->disapprove_ad();
            case 'FETCH_CACHED_AD':
                return $this->get_cached_ad();
            case 'UPDATE_SEARCH_RESULT' :
                return $this->update_search_result();
            case 'UPDATE_USER_LAST_READ_TERMS_AND_CONDITIONS' :
                return $this->update_user_last_read_terms_and_conditions();
        }
    }

}
$actions = new Actions();
echo $actions->actionProcessor();
?>