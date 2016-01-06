$(function(){
  var currentCartVal, giftCardVal, finalDue;
  function finalAmount(){
    if(!giftCardVal){
      finalDue = Number(currentCartVal);
    }else{
      finalDue = Number(currentCartVal) - Number(giftCardVal);
    }
    $("div#totalAmount").text("The Amount You Need to Pay: $" + finalDue);
  }
  
  $("#cartVal").on("keyup", function(e){
    currentCartVal = $(this).val();
    finalAmount();
  });

  $("form#giftcard").on("submit", function(){
    $.ajax({
      url: "/checkcoupon",
      method: "POST",
      data: {"coupon":$("input#coupon").val()}
    }).done(function(res){
      if(res.err){
        $("div#result").text(res.err);
        giftCardVal = undefined;
      }else{
        $("div#result").text("Congratulations! Your giftcard has $" +res.value +", use it before " +res.expiration);
        giftCardVal = res.value;
      }
        finalAmount();
    });
  });
});