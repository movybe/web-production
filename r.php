<?php
require_once 'config/functions.php';
//require_once 'config/detect.php';
class HandleNewInvites extends Functions
{
    private $now;
    private $invitee_username = "";
    public  $invitee_link = "/campaign";


    function tryCreditTheReferer() : bool
    {

        //Get the country of the visitor
        $ip_details = json_decode(file_get_contents($this->website_details->ip_url) , true);
        $user_country = $ip_details['countryCode'];

         //Check if the user is in Nigeria
        if($user_country != 'NG')
        {
            echo "Sorry, this invitation is not available in your country";
            return false;
        }



        //get the ip address
        $ip_address = $ip_details['query'];

        //check if the ip address exists in database
        if($this->record_exists_in_table($this->visitors_table_name , 'ip_address' , $ip_address))
        {
            echo "You've already visited this website before now.";
            return false;
        }

        //echo $this->fetch_data_from_table($this->visitors_table_name , 'ip_address' , $ip_address);

        //insert the ip address
        $this->insert_into_table($this->visitors_table_name ,
            [
                'ip_address' => $ip_address ,
                'country' => $user_country
            ]);

        //update the last invite date of the website
        $this->update_record($this->site_statistics_table_name , 'last_invitation_date' , $this->now , 'id' , 1);


        //Update last invite date of the referer
        $this->update_record($this->users_table_name , 'last_invitation_date' , $this->now , 'username' , $this->invitee_username);

        //Increment the number of invitations today of the referer today
        $this->increment_value($this->users_table_name , 'number_of_invitations_today' , 1 , "username = '{$this->invitee_username}'");

        //Increment the total number of invitations of the website today
        $this->increment_value($this->site_statistics_table_name , 'total_number_of_invites' , 1 , 'id = 1');

        //Increment the number of users referred by the invitee
        $this->increment_value($this->users_table_name , 'number_of_users_invited' , 1 , "username = '{$this->invitee_username}'");


        //credit the referer
        if(true or $this->increment_value($this->users_table_name , 'account_balance' , $this->website_details->amountPaidForInvite , "username = '{$this->invitee_username}'"))
        {

            echo "{$this->invitee_username} has been credited with <b>&#8358;{$this->website_details->amountPaidForInvite}</b>";
            //deduct the money from the site profit
           // return $this->decrement_value($this->site_statistics_table_name , 'profit' , $this->website_details->amountPaidForInvite , 'id =1');
        }

        return false;
    }

    function __construct()
    {
        parent::__construct();

        if(isset($_GET['referer']) && !empty($_GET['referer']))
        {

            $this->invitee_username = $this->escape_string($_GET['referer']);
            $website_statistics = $this->fetch_data_from_table($this->site_statistics_table_name , 'id' , 1)[0];
            //$last_invitation_date = $website_statistics['last_invitation_date'];
            //$number_of_invites_today = $website_statistics['number_of_invites_today'];
            $this->now = date('Y-m-d H:i:s');

            $invitee_details = $this->fetch_data_from_table($this->users_table_name , 'username' , $this->invitee_username);
            if(empty($invitee_details))
            {

                echo "No account found with the username <b>{$this->invitee_username}</b>";
                return false;
            }

            $invitee_details = $invitee_details[0];

            $this->invitee_link = "/campaign/".$this->invitee_username;

            //Check if the account type is affiliate
            if($invitee_details['account_type'] != 'affiliate')
            {
                echo "No account found with the username <b>{$this->invitee_username}</b>";
                return false;
            }

            $number_of_invites_by_invitee = (int)$invitee_details['number_of_users_invited'];

            $amount_earned_by_invitee_using_invitation_link = $number_of_invites_by_invitee * $this->website_details->amountPaidForInvite;

            $maximum_amount_expected_to_be_earned_by_invitee_using_invitation_link = $this->website_details->invitation_amount_to_pay_per_account_renewal * $invitee_details['number_of_account_renewals'];

            if($amount_earned_by_invitee_using_invitation_link < $maximum_amount_expected_to_be_earned_by_invitee_using_invitation_link)
            {
                return $this->tryCreditTheReferer();
            }

            echo "{$this->invitee_username} has been credited with <b>&#8358;{$this->website_details->amountPaidForInvite}</b>";
            return false;





            /*
            //Check if the referer has exceeded his invitations for today and the total number of invitations for today has not been exceeded
            else if ($referer_details['number_of_invitations_today'] >= $this->website_details->maximumNumberOfAffiliateInvitationsForADay && $number_of_invites_today < $this->website_details->maximumNumberOfInvitesForADay)
            {
                $last_invitation_date_by_referer = strtotime($referer_details['last_invitation_date']);
                $current_date = strtotime($this->now);
                $date_difference = $current_date - $last_invitation_date_by_referer;
                $days = floor($date_difference / (60 * 60 * 24));


                //Check if the last invite date is up to 24hrs
                if ($days >= 1) {
                    //set the number of invites of the referer today to 0
                    $this->update_record($this->users_table_name, 'number_of_invitations_today', 0, 'username', $this->referer_username);

                    //now try to credit the referer
                    return $this->tryCreditTheReferer();
                }
                echo "{$this->referer_username} has been credited with <b>&#8358;{$this->website_details->amountPaidForInvite}</b>";
                return false;

            }

            //if number of invites today is up to 24hrs
            else if($number_of_invites_today < $this->website_details->maximumNumberOfInvitesForADay) {
                $this->tryCreditTheReferer();
            }

            else{
                $last_invitation_date = strtotime($last_invitation_date);
                $current_date = strtotime($this->now);

                $date_difference = $current_date - $last_invitation_date;
                $days = floor($date_difference / (60 * 60 * 24));

                //Check if the last invite date is up to 24hrs
                if ($days >= 1) {
                    //set the number of invites today to 0
                    $this->update_record($this->site_statistics_table_name, 'number_of_invites_today', 0, 'id', 1);

                    //now try to credit the referer
                    return $this->tryCreditTheReferer();
                }


                $hours_difference = 24 - floor($date_difference / (60 * 60));
                echo "Today's invites has exceeded maximum of <b>{$this->website_details->maximumNumberOfInvitesForADay} invites for today</b>, please check back after <b>{$hours_difference} hrs</b>";
                return false;

            }
            */
        }
        else {

            header('location:/');
        }



    }
}

?>
<!DOCTYPE html>
<html lang="en-us" dir="ltr">
<head>
    <meta charset="utf-8" />
    <meta name="author" content="<?php echo $website_details->SiteName; ?>" />
    <meta name="description" content="<?php echo $website_details->PageDescription; ?>" />
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
    <title><?php echo 'Your invitation to '.$website_details->SiteName.' affiliate Program, Learn how to make money online today with your smartphone'; ?></title>
    <link rel="canonical" href="<?php echo $website_details->SiteNameWithHttps; ?>" />
    <meta name="robot" content="index, follow" />

    <?php

    require_once ('assets/incs/head-files.php');
    $stylesheets = array('affiliate.css' , 'r.css');
    $defaults_js = array('defaults.js');
    $r_js = array('r.js');
    echo $functions->printAssets($defaults_js , 'babel' , true ,$functions->is_production_mode() ? $website_details->COMPONENTS_FOLDER  : $website_details->SRC_FOLDER , null , false).$functions->printAssets($r_js , 'babel');

    //echo $materialize = $functions->is_production_mode() ? "<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css' />" : $functions->printAssets(['materialize.min.css'] , 'css'  , false);
    echo $functions->printAssets($stylesheets , "css" , false)."\n";
    ?>

</head>
<body>
<main class ="container">
    <div class ="section no-pad-bot" id="index-banner">
        <div class="container r-container">
            <div class="video-container demo-video-container" id="affiliate-video-container">

            </div>
            <div class="row notice-board z-depth-3 card-panel payments-notice-board">
                <div class="col s12 valign-wrapper">
                        <span class="invitation-message">
                  <?php
                  $handle_new_invites = new HandleNewInvites();
                  $handle_new_invites->try_insert_or_update_ip_address_in_database();
                  ?> <a href="<?php echo $handle_new_invites->invitee_link;?>" class="continue-link">Continue</a>

                        </span>
                </div>

            </div>
        </div>
    </div>
</main>
</body>
</html>



