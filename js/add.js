/**/
$(document).ready(function(){
  $(document).on("click",".catalogue-item-compare > a",function(e){
    var elem = $(this);
    var add="ADD_TO_COMPARE_LIST";
    var remove="DELETE_FROM_COMPARE_LIST";
    var id = elem.data('id');
    var action = elem.hasClass("in-compare") ? remove : add;
    var url = "ajax/compare.html";
    $.ajax({
      dataType: "html",
      url: url,
      type: 'GET',
      data: {id:id, action: action},
      success: function(ret){
        $("[data-id="+id+"]").each(function(i,elem){
          var ret_json = jQuery.parseJSON(ret);
          if(ret_json.MESSAGE == 'Товар добавлен в список сравнения') {            // перестал работать
            $(this).addClass("in-compare").addClass("active");
            $(this).parents('.catalogue-item').addClass("in-compare");
            $(".header-compare").show();
          }else{
            $(this).removeClass("in-compare").removeClass("active");
            $(this).parents('.catalogue-item').removeClass("in-compare");
            $(".header-compare").hide();
          }
        });
        $(this).parents().filter('.catalogue-item').toggleClass('in-compare');
      },
      error: function(ret){
        console.log(ret);
      }
    });
    e.preventDefault();
  });

  $("font.tablebodytext").remove();

});