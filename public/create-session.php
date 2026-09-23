<?php

require 'vendor/autoload.php';

\Stripe\Stripe::setApiKey('demo');

header('Content-Type: application/json');

function formatProducts($i, $q) {
  return array(
    'price' => $i, 
    'quantity' => $q
  );
}
$products = array_map(
  'formatProducts',
  explode(' ', $_GET['id']),
  explode(' ', $_GET['quantity'])
);

$DOMAIN = 'https://niallains.github.io/dist/';
$checkout_session = \Stripe\Checkout\Session::create([
  'payment_method_types' => ['card'],
  'shipping_address_collection' => [
    'allowed_countries' => ['IE', 'GB'],
  ],
  'line_items' => $products,
  'mode' => 'payment',
  'success_url' => $DOMAIN . '/#/shop/success',
  'cancel_url' => $DOMAIN . '/#/shop/cancel',
]);
echo json_encode(['id' => $checkout_session->id]);

?>