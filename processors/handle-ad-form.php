<?php

require_once '../config/functions.php';
require_once '../config/FileHandler.php';


class HandleAdForm extends  Functions
{

    private $title , $ad_id, $description , $link , $contact , $campaign, $location ,  $ad_type , $units , $is_new_ad = false ,
        $email , $total_amount , $action , $ad_rate , $ad_location ,  $upload_image = false , $file_handler , $user_id , $link_short_url , $reference_code;

    private $error_message = "";
    private $unknown_error_message = "an unknown error occured";
    private $image_upload_error_message = "your banner image failed to upload";
    private $network_error = "please check your network connection";
    private $error_text = "error";
    private $success_text = "success";
    private $success_value = true;
    private $failure_value = false;

    public function __construct()
    {
        global  $file_handler;
        parent::__construct();
        $this->file_handler = $file_handler;
    }


    public function __destruct()
    {
        parent::__destruct(); // TODO: Change the autogenerated stub
    }


    private function  generateAdID () : string {
        global  $website_details;
        $ad_id = $this->generateID($website_details->AD_ID_LENGTH);
        if($this->record_exists_in_table($this->ads_table_name , "ad_id" , $ad_id)) $this->generateAdId();
        return $ad_id;
    }

    private function  generateLinkShortUrl () : string
    {
        global  $website_details;
        $short_link = $this->generateID($website_details->LinkShortUrlLength);
        if($this->record_exists_in_table($this->ads_table_name , "link_short_url" , $short_link)) $this->generateAdId();
        return $short_link;
    }

    private function isReady () : bool
    {
        return !empty($_POST) && isset($_POST['action']);
    }

    private function setDetails () : bool
    {

        $this->title = $this->escape_string($_POST['title']);
        $this->description = $this->escape_string($_POST['description']);
        $this->link = $this->escape_string($_POST['link']);
        $this->contact = $this->escape_string($_POST['contact']);
        $this->campaign = $this->escape_string($_POST['campaign']);
        $this->location = $this->escape_string($_POST['location']);
        $this->upload_image = $_POST['UPLOAD_IMAGE'];
        $this->action = $_POST['action'];
        $this->email = $_POST['email'];
        echo $this->ad_id =  $_POST['ad_id'] !== "" ? $_POST['ad_id'] : $this->generateAdID();
        $this->user_id = $this->fetch_data_from_table($this->users_table_name , 'email' , $this->email)[0]['user_id'];
        $this->link_short_url = $this->generateLinkShortUrl();
        $this->ad_location = $_POST['ad_location'];

        if($this->action != 'NEW_AD') return true;

        $this->ad_type = $_POST['ad_type'];
        $this->is_new_ad = true;
        $this->ad_rate = (double)$_POST['ad_rate'];
        $this->total_amount = (int)$_POST['total_amount'];
        $this->units = (int)$_POST['units'];
        $this->reference_code = $_POST['reference_code'];



        return true;


    }


    private function insertNewAdToDatabase () : bool
    {
        $bannerExtension = $this->file_handler->getExtension($_FILES['banner']['name']);
        $bannerImage = $this->ad_id.$bannerExtension;
        $ad_type_paid_for = "";

        switch ($this->ad_type)
        {
            case 'ppv':
                $ad_type_paid_for = "number_of_views_paid_for";
                break;
            case 'ppc':
                $ad_type_paid_for = 'number_of_clicks_paid_for';
                break;
            case 'ppa':
                $ad_type_paid_for = 'number_of_affiliates_paid_for';
                break;
        }

        $now = date('Y-m-d H:i:s');
        $data_fields_and_values =  [
            'title' => $this->title,
            'link' => $this->link,
            'description' => $this->description,
            'banner' => $bannerImage,
            'ad_type' => $this->ad_type ,
            'balance' => $this->total_amount ,
            'amount_paid' => $this->total_amount ,
            $ad_type_paid_for => $this->units,
            'ad_id' => $this->ad_id,
            'posted_by' => $this->user_id,
            'link_short_url' => $this->link_short_url,
            'location' => $this->location ,
            'campaign_name' => $this->campaign,
            'contact' => $this->contact,
            'last_paid' => $now,
            'ad_rate' => $this->ad_rate,
            'updated_on' => $now,
            'reference_code' => $this->reference_code,
            'total_units_paid_for' => $this->units,
            'remaining_units' => $this->units,
            'ad_location' => $this->ad_location
        ];

        return $this->insert_into_table($this->ads_table_name ,$data_fields_and_values);


    }

    private function uploadAdImage() : bool {

        global  $website_details;

        //Delete previous banner image if the user wants to edit the ad and upload new image
        if(!$this->is_new_ad && $this->upload_image){
            $previous_ad_banner = $this->fetch_data_from_table($this->ads_table_name , 'ad_id' , $this->ad_id)[0]['banner'];
            unlink($website_details->BANNER_IMAGES_FOLDER.$previous_ad_banner);
        }

        return $this->file_handler->upload_image($_FILES['banner'] , $website_details->BANNER_IMAGES_FOLDER , true , "" , $this->ad_id );
    }


    private function updateUserDetailsForNewAd () : bool
    {

           if(!$this->executeSQL("UPDATE {$this->users_table_name} SET account_balance = account_balance + {$this->total_amount}, total_amount_funded = total_amount_funded + {$this->total_amount} WHERE email = '{$this->email}'"))return false;
           return $this->update_multiple_fields($this->site_statistics_table_name , ['profit' => "profit + {$this->total_amount}",'account_balance' => "account_balance + {$this->total_amount}" ,'total_number_of_ads' => 'total_number_of_ads + 1' , 'number_of_active_ads' => "total_number_of_active_ads + 1"], "id = 1");

    }


    public function  Processor () : string
    {
        if (!($this->isReady() && $this->setDetails())) return json_encode([$this->success_text => $this->failure_value, $this->error_text => $this->unknown_error_message]);

        if(!$this->uploadAdImage()) return json_encode([$this->success_text => $this->failure_value , $this->error_text => $this->image_upload_error_message]);
        if($this->is_new_ad && !$this->insertNewAdToDatabase()) return json_encode([$this->success_text => $this->failure_value , $this->error_text => $this->network_error]);
        if($this->is_new_ad && !$this->updateUserDetailsForNewAd()) return json_encode([$this->success_text => $this->failure_value , $this->error_text => $this->network_error]);

        return json_encode([$this->success_text => $this->success_value , $this->error_text => "success"]);

    }
}

$handle_ad_form = new HandleAdForm();
echo $handle_ad_form->Processor();

?>