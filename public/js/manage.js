function lockClick(userid) {

  console.log('reset clicked for ' + userid);

  //$('#lock-'+userid).html('Save');

  var button = $('#lock-' + userid).text();

  if (button == 'Lock') {
    console.log("Unlocking");

    $.get('/manage/apilock?userid=' + userid, function(data, status) {
      console.log(status);

     $('#lock-' + userid).text('Unlock');

   });


  } else {
    console.log("Locking");

    $.get('/manage/apiunlock?userid=' + userid)
    .done(function(data, statusText, xhr) {
      $('#lock-' + userid).text('Lock');
    });


  }

}


function openClick(userid) {

  console.log('open clicked for ' + userid);

  //$('#lock-'+userid).html('Save');

  var button = $('#open-' + userid).text();

  if (button == 'Open') {

    $.get('/manage/apiopen?userid=' + userid, function(data, status) {
      console.log(status);

     $('#open-' + userid).text('Close');

   });


  } else {

    $.get('/manage/apiclose?userid=' + userid)
    .done(function(data, statusText, xhr) {
      $('#open-' + userid).text('Open');
    });


  }

}

function deleteClick(userid) {

  if (confirm("Do you want to delete this user?") == true) {
    $.get('/manage/apidelete?userid=' + userid)
    .done(function(data, statusText, xhr) {
      $("#usertable").DataTable().row("#"+userid).remove().draw();
    });
    } 


}
