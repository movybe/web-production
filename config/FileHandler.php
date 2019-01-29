<?php


class FileHandler
{

    private $image_upload_error = "sorry , image failed to upload, try uploading another";
    public function isFileSize (int $file_size , int $max_size){

        return $max_size > $file_size;
    }


    public  function getFileExtension (string  $name , string $target_directory) : string {
        $target_file = $target_directory . basename($name);
        $imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
        return ".$imageFileType";
    }

    public final function getExtension (string  $filename) : string {
        $lastIndexOfDot = strrpos($filename, '.');
        return $extension = substr($filename, $lastIndexOfDot);
        }

    public function changeFileName(string  $filename , string  $new_name) : string {
       return $new_name.$this->getExtension($filename);
    }

    public final function  isImage (string $tmp_name) : string {
        return $image_size = (bool) getimagesize($tmp_name);

    }
    public function isFileType (string $filename , string $type , string $target_directory) : bool {
        $image_array = Array ("png" , "jpg" , "jpeg");
        $video_array = Array("mp4" , "3gp");
        $target_file = $target_directory.basename($filename);
        $imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
        switch (strtolower($type))
        {
            case 'image' :
                return in_array($imageFileType , $image_array);
                break;
            case 'video' :
                return in_array($imageFileType , $video_array);
                break;
        }

        return false;


        }

    private function  isValidImage ($image , string $directory , int $max_ad_image_size , string $error = null) :  bool
    {
        $file_name = $image['name'];
        $file_size = $image['size'];
        $file_type = $image['type'];
        $file_error = $image['error'];
        $tmp_name = $image['tmp_name'];
        $is_image = $this->isImage($tmp_name);
        $is_file_type = $this->isFileType($file_name, 'image', $directory);
        $is_file_size = $this->isFileSize($file_size, $max_ad_image_size);
        if ($is_image) {
            if ($is_file_type) {
                if ($is_file_size) {
                    return true;
                } else {
                    $max_image_size_mb = round($max_ad_image_size / 1000000);
                    $error = "Max image size allowed : {$max_image_size_mb}";
                    return false;
                }
            } else {

                $error = "only .png , .jpg  and .jpeg images are allowed for image";
                return false;
            }
        } else {
            $error = "Only .png , .jpg  and .jpeg images are allowed for image";
            return false;
        }
    }

    public  final function  upload_image ($image  , $target_directory , $change_name = false, $error = null , $new_name = "name")
    {
        $filename = $image["name"];
        $tmp_name = $image["tmp_name"];
        $target_file = $target_directory.basename($filename);
        $new_name = $target_directory.$this->changeFileName($filename, $new_name);
        //$new_filename = $target_directory.$new_name;
        if (move_uploaded_file($tmp_name, $target_file)) {

            if($change_name) rename($target_file , $new_name);
            return true;
        }

            $error = $this->image_upload_error;
            return false;

    }
}

$file_handler = new FileHandler();

?>