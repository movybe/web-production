<?php

require_once '../config/functions.php';
require_once '../config/FileHandler.php';
class HandleAdForm extends  Functions
{

    private $title , $ad_id, $description , $link , $contact , $campaign, $location ,  $ad_type , $units , $is_new_ad = false ,
        $is_renewed_ad = false, $email , $total_amount , $action , $ad_rate , $ad_location ,  $upload_image = false , $file_handler , $user_id , $link_short_url , $reference_code;

    private $error_message = "";
    private $unknown_error_message = "an unknown error occured";
    private $image_upload_error_message = "your banner image failed to upload";
    private $network_error = "please check your network connection";
    private $error_text = "error";
    private $success_text = "success";
    private $success_value = true;
    private $failure_value = false;
    private $not_advert_by_movybe;
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
    private function  generateLinkShortUrl () : string
    {
        global  $website_details;
        $short_link = $this->generateID($this->website_details->LinkShortUrlLength);
        if($this->record_exists_in_table($this->ads_table_name , "link_short_url" , $short_link)) $this->generateLinkShortUrl();
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
        $this->upload_image = $_POST['UPLOAD_IMAGE'] === "true";
        $this->action = $_POST['action'];
        $this->email = $_POST['email'];
        $this->ad_id =  $_POST['ad_id'] !== "" ? $_POST['ad_id'] : $this->generateID($this->website_details->AD_ID_LENGTH , $this->ads_table_name , 'ad_id');
        $this->ad_id = $this->escape_string($this->ad_id);
        $this->user_id = $this->fetch_data_from_table($this->users_table_name , 'email' , $this->email)[0]['user_id'];
        $this->link_short_url = $this->generateLinkShortUrl();
        $this->ad_location = $this->escape_string($_POST['ad_location']);

        $site_statistics = $this->fetch_data_from_table($this->site_statistics_table_name , 'id' , 1)[0];
        $site_ad_email = $site_statistics['advert_login_email'];
        $this->not_advert_by_movybe = $this->email !== strtolower($site_ad_email);

        if($this->action === 'UPDATE_AD') return true;
        $this->ad_type = $_POST['ad_type'];
        $this->is_new_ad = $this->action === 'NEW_AD';
        $this->is_renewed_ad = !$this->is_new_ad;

        $this->ad_rate = (double)$_POST['ad_rate'];
        $this->total_amount = (int)$_POST['total_amount'];
        $this->units = (int)$_POST['units'];
        $this->reference_code = $_POST['reference_code'];
        return true;
    }

    private function updateAd () : bool {

        $now = date('Y-m-d H:i:s');

        $fields_and_values = array(
            'title' => $this->title,
            'link' => $this->link,
            'description' => $this->description ,
            'updated_on' => $now ,
            'location' => $this->location,
            'campaign_name' => $this->campaign ,
            'contact' => $this->contact ,
            'ad_location' => $this->ad_location,
            'approved' => 1
        );


        if($this->upload_image)
        {

            $bannerExtension = $this->file_handler->getExtension($_FILES['banner']['name']);
            $bannerImage = $this->ad_id.$bannerExtension;

            $fields_and_values2 = ['banner' => $bannerImage];
            $fields_and_values = array_merge($fields_and_values , $fields_and_values2);
        }



        return $this->update_multiple_fields($this->ads_table_name , $fields_and_values , "ad_id = '{$this->ad_id}'");
    }

    private function renewAd ()  : bool
    {

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
        $fields_and_values = array(
            'title' => $this->title,
            'link' => $this->link,
            'description' => $this->description ,
            'updated_on' => $now ,
            'location' => $this->location,
            'campaign_name' => $this->campaign ,
            'contact' => $this->contact ,
            'ad_location' => $this->ad_location,
            'paused' => 0,
            'posted_on' => $now,
            'balance' => $this->total_amount ,
            'amount_paid' => $this->total_amount ,
            $ad_type_paid_for => $this->units ,
            'number_of_clicks' => 0,
            'number_of_views' => 0,
            'number_of_affiliates_reached' => 0,
            'active' => 1,
            'approved' => 1,
            'reference_code' => $this->reference_code ,
            'ad_rate' => $this->ad_rate ,
            'last_paid' => $now ,
            'total_units_paid_for' => $this->units ,
            'remaining_units' => $this->units
        );

        if($this->upload_image)
        {

            $bannerExtension = $this->file_handler->getExtension($_FILES['banner']['name']);
            $bannerImage = $this->ad_id.$bannerExtension;

            $fields_and_values2 = ['banner' => $bannerImage];
            $fields_and_values = array_merge($fields_and_values , $fields_and_values2);
        }

         if($this->update_multiple_fields($this->ads_table_name , $fields_and_values , "ad_id = '{$this->ad_id}'") && $this->not_advert_by_movybe){

             return $this->increment_values($this->site_statistics_table_name , [

                 'profit' => $this->total_amount ,
                 'total_number_of_active_ads' => 1
             ] , 'id = 1');

         }

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
            'ad_location' => $this->ad_location,

        ];

        if($this->insert_into_table($this->ads_table_name ,$data_fields_and_values) && $this->not_advert_by_movybe){

            return $this->increment_values($this->site_statistics_table_name , [

                'profit' => $this->total_amount ,
                'total_number_of_ads' => 1 ,
                'total_number_of_active_ads' => 1
            ] , 'id = 1');
        }

        return true;


    }

    private function uploadAdImage() : bool
    {

        

        //Delete previous banner image if the user wants to edit the ad and upload new image

        if ($this->upload_image) {
            if (!$this->is_new_ad) {
                //Delete the previous image with the same id
                $previous_ad_banner = $this->fetch_data_from_table($this->ads_table_name, 'ad_id', $this->ad_id)[0]['banner'];
                unlink($this->website_details->BANNER_IMAGES_FOLDER . $previous_ad_banner);
            }
            //Now upload the banner
            return $this->file_handler->upload_image($_FILES['banner'], $this->website_details->BANNER_IMAGES_FOLDER, true, "", $this->ad_id);
        }
        return true;
    }
    private function updateUserDetailsForNewAd () : bool
    {

        
        if (!$this->increment_values($this->users_table_name ,
            ['account_balance' => $this->total_amount ,
                'total_amount_funded' => $this->total_amount
            ] ,  "email = '{$this->email}'")) return false;

        return true;
    }


    public function  Processor () : string
    {
        if (!($this->isReady() && $this->setDetails())) return json_encode([$this->success_text => $this->failure_value, $this->error_text => $this->unknown_error_message]);


        $this->uploadAdImage(); // return json_encode([$this->success_text => $this->failure_value , $this->error_text => $this->image_upload_error_message]);
        if($this->is_new_ad){
            if(!$this->insertNewAdToDatabase()) return json_encode([$this->success_text => $this->failure_value , $this->error_text => $this->network_error]);
            if(!$this->updateUserDetailsForNewAd()) return json_encode([$this->success_text => $this->failure_value , $this->error_text => $this->network_error]);
        }
        else if(!($this->is_new_ad or $this->is_renewed_ad)){
            //it is an updated ad
            if(!$this->updateAd())return json_encode([$this->success_text => $this->failure_value , $this->error_text => $this->unknown_error_message]);
        }
        else if($this->is_renewed_ad)
        {
            if(!$this->renewAd())return json_encode([$this->success_text => $this->failure_value , $this->error_text => $this->unknown_error_message]);

            if(!$this->updateUserDetailsForNewAd()) return json_encode([$this->success_text => $this->failure_value , $this->error_text => $this->network_error]);

        }
        return json_encode([$this->success_text => $this->success_value , $this->error_text => "success"]);
    }
}

$handle_ad_form = new HandleAdForm();
echo $handle_ad_form->Processor();

?>