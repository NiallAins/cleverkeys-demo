<?php

require 'vendor/autoload.php';

header('Content-Type: application/json');

$stripe = new \Stripe\StripeClient('demo');

$productData = array(
  'products' => $stripe->products->all(['active' => true]),
  'prices' => $stripe->prices->all(['active' => true])
);

echo json_encode($productData);

?>