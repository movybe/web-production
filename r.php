<?php


require_once $_SERVER['DOCUMENT_ROOT'].'/config/functions.php';
require_once $_SERVER['DOCUMENT_ROOT'].'/config/detect.php';
class HandleNewInvites extends Functions
{
    private $now;
    private $referer_username;

    function tryCreditTheReferer() : bool
    {

        //Get the country of the visitor
        $user_country = Detect::ipCountry();

        //Check if the user is in Nigeria
        if($user_country != 'NG')
        {
            echo "This invitation is limited to non-Nigeria visitors";
            return false;
        }



        //get the ip address
        $ip_address = Detect::ip();


        //check if the ip address exists in database

        if($this->record_exists_in_table($this->visitors_table_name , 'ip_address' , $ip_address))
        {

            echo "You've already visited this website before now.";
            return false;
        }


        //update the last invite date
        $this->update_record($this->site_statistics_table_name , 'last_invitation_date' , $this->now , 'id' , 1);

        //Increment the number of invites today
        $this->increment_value($this->site_statistics_table_name , 'number_of_invites_today' , 1 , 'id =1');

        //credit the referer
        if($this->increment_value($this->users_table_name , 'account_balance' , $this->website_details->amountPaidForInvite , "username = '{$this->referer_username}'"))
        {
            //deduct the money from the site profit

            echo "{$this->referer_username} has been credited with <b>&#8358;</b>{$this->website_details->amountPaidForInvite}";
            return $this->decrement_value($this->site_statistics_table_name , 'profit' , $this->website_details->amountPaidForInvite , 'id =1');

        }

        return false;
    }

    function __construct()
    {
        parent::__construct();
        if(isset($_GET['referer']) && !empty($_GET['referer']))
        {

            $this->referer_username = $this->escape_string($_GET['referer']);
            $website_statistics = $this->fetch_data_from_table($this->site_statistics_table_name , 'id' , 1)[0];
            $last_invitation_date = $website_statistics['last_invitation_date'];
            $number_of_invites_today = $website_statistics['number_of_invites_today'];
            $this->now = date('Y-m-d H:i:s');

            $referer_details = $this->fetch_data_from_table($this->users_table_name , 'username' , $this->referer_username);
            if(empty($referer_details))
            {

                echo "No account found with the username <b>{$this->referer_username}</b>";
                return false;
            }

            $referer_details = $referer_details[0];



            //if number of invites today is less than the minimum number of invites for a day
            if($number_of_invites_today < $this->website_details->maximumNumberOfInvitesForADay) {
                $this->tryCreditTheReferer();
            }


            else {

                $last_invitation_date = strtotime($last_invitation_date);
                $current_date = strtotime($this->now);

                $date_difference = $current_date - $last_invitation_date;
                $days = floor($date_difference / (60 * 60 * 24));

                //Check if the last invite date has exceeded maximum invites for a day
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
    <title><?php echo 'Your invitation to '.$website_details->SiteName; ?></title>
    <link rel="canonical" href="<?php echo $website_details->SiteNameWithHttps; ?>" />
    <meta name="robot" content="index, follow" />

    <?php

    $stylesheets = array('materialize.min.css' , 'affiliate.css' , 'r.css');
    echo $functions->printAssets($stylesheets , "css" , false)."\n";
    ?>
    <link rel="icon" type="image/jpeg" href="<?php echo $website_details->IMG_FOLDER;?>favicon.jpg" />
</head>
<body>
<main class ="container">
    <div class ="section no-pad-bot" id="index-banner">
        <div class="container r-container">
            <div class="row notice-board z-depth-3 card-panel payments-notice-board">
                <div class="col s12 valign-wrapper">
                        <span class="invitation-message">
                  <?php
                  $handle_new_invites = new HandleNewInvites();
                  ?> <a href="/" class="continue-link">Continue</a>

                        </span>
                </div>

            </div>
        </div>
    </div>

</main>
</body>
</html>



