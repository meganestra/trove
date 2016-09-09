var _ = require('lodash');

var ShoppingBasket = function(){
  this.basket = [];
  this.value = 0;
};

ShoppingBasket.prototype = {

  numberOfProducts: function(){
    return this.basket.length;
  },

  addProduct: function(product){
    if(product.salePrice){
      this.value += product.salePrice
    } else {
      this.value += product.price
    };
    this.basket.push(product);
  },

  removeProduct: function(product){
    var index = this.basket.indexOf(product);
    this.basket.splice(index, 1);
    this.value -= product.price;
  },

  emptyBasket: function(){
    this.basket = [];
    this.value = 0;
  },

  checkSpecialItemPresent: function(voucher){
    var matchedItems = [];
    _.forEach(voucher.specialItems, function(specialItem){
      matchedItems = _.filter(this.basket, _.matches(specialItem));
    }.bind(this));
      matchedItems = _.uniq(matchedItems);
    return (matchedItems.length === voucher.specialItems.length);
  },

  checkEligibleDiscountValueReached: function(voucher){
    return (this.value >= voucher.eligibleValue);
  },

  checkEligibleForDiscountVoucher: function(voucher){
    return (this.checkSpecialItemPresent(voucher) && this.checkEligibleDiscountValueReached(voucher));
  },

  applyDiscountVoucher: function(voucher){
    if(this.checkEligibleForDiscountVoucher(voucher)){
      this.value -= voucher.discountValue;
    };
  }

};

module.exports = ShoppingBasket;