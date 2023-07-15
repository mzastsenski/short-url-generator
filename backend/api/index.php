<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
  $data = json_decode(file_get_contents("./data.json"));
  $id = $_GET['id'];  

  $result = '401';
  foreach ($data as $elem) {
    if ($elem->id == $id ) {
       $result = json_encode($elem->link);
    }    
  }
  echo $result;
}

else if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $inputdata = json_decode(file_get_contents("php://input"));
  $data = json_decode(file_get_contents("./data.json"));
  array_push($data, $inputdata);
  file_put_contents("data.json", json_encode($data));
  echo 200;
}

?>