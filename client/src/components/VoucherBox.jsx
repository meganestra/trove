var React = require('react');
var Voucher = require('./Voucher');

var VoucherBox = React.createClass({

  render: function(){

    var availableVoucherNodes = this.props.availableVouchers.map(function(voucher, key){
      return (
        <Voucher
        key={key}
        voucher={voucher}
        description={voucher.description}
        discountValue={voucher.discountValue}
        eligibleValue={voucher.eligibleValue}
        specialItems={voucher.specialItems}
        availableVouchers={this.props.checkForAvailableVouchers}
        applyAvailableVoucher={this.props.applyAvailableVoucher}
        />
      )
    }.bind(this))

    return(
      <div>
        <h4>Vouchers:</h4>
        <ul>
          {availableVoucherNodes}
        </ul>
      </div>
    )
  }

});

module.exports = VoucherBox;