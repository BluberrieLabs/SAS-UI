function showPassword() {

    var key_attr = $('#key').attr('type');

    if(key_attr != 'text') {

        $('.checkbox').addClass('show');
        $('#key').attr('type', 'text');

    } else {

        $('.checkbox').removeClass('show');
        $('#key').attr('type', 'password');

    }

}

function checkForm(form) {
  if(form.key.value.length < 8) {
    document.getElementById('errortext').innerHTML="Password must contain at least eight characters!";
    form.key.focus();
    return false;
  }

    if(form.key.value == "" || form.key.value != form.keytwo.value) {
      document.getElementById('errortext').innerHTML="Passwords don't match";
      form.key.focus();
      return false;
    }

    return true;
  }

function doReset(form) {

  console.log('reset clicked');

  if (form.recoveryemail.value) {
    $.get('/login/reset?email='+form.recoveryemail.value);

    form.recoveryemail.value="";

    $('#resetmodal').modal('hide');

    document.getElementById('errortext').innerHTML="Reset email sent";


  }

  return false;
  //var form = document.getElementById('resetform');

}
