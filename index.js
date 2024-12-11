const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.static('static'));

// Declaring Variables
let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

// Question No : 1
function checkFinalTotal(price, total) {
  let finalTotal = price + total;
  return finalTotal.toString();
}
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);

  res.send(checkFinalTotal(newItemPrice, cartTotal));
});

// Question No : 2
function checkMembership(cartTotal, isMember, discount) {
  let discountedPrice;
  if (isMember === 'true') {
    return cartTotal - (cartTotal * discount) / 100;
  } else {
    return cartTotal;
  }
}
app.get('/membership-discount', (req, res) => {
  // /membership-discount?cartTotal=3600&isMember=true
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;

  res.send(checkMembership(cartTotal, isMember, discountPercentage).toString());
});

// Question No: 3
function applyingTax(total, tax) {
  let applyTax = total * (tax / 100);
  return applyTax.toString();
}
app.get('/calculate-tax', (req, res) => {
  // /calculate-tax?cartTotal=3600
  let cartTotal = parseFloat(req.query.cartTotal);

  res.send(applyingTax(cartTotal, taxRate));
});

// Question No: 4
function estimateDelivery(method, distance) {
  if (method.toLowerCase() === 'standard') {
    return Math.floor(distance / 50).floor();
  } else if (method.toLowerCase() === 'express') {
    return Math.floor(distance / 100);
  }
}
app.get('/estimate-delivery', (req, res) => {
  // /estimate-delivery?shippingMethod=express&distance=600
  let shippingMethod = req.query.shippingMethod;
  let distance = req.query.distance;

  res.send(estimateDelivery(shippingMethod, distance).toString());
});

// Question No: 5
function calculateShipping(weight, distance) {
  let shipnCost = Math.floor(weight * distance * 0.1);
  return shipnCost;
}
app.get('/shipping-cost', (req, res) => {
  // shipping-cost?weight=2&distance=600
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);

  res.send(calculateShipping(weight, distance).toString());
});

// Question No: 6
function checkLoyaltyPoint(amount) {
  return amount * 2;
}
app.get('/loyalty-points', (req, res) => {
  // /loyalty-points?purchaseAmount=3600
  let purchaseAmount = parseFloat(req.query.purchaseAmount);

  res.send(checkLoyaltyPoint(purchaseAmount).toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
