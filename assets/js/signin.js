function setCookie(cname,cvalue) {
    const d = new Date();
    let time = 30*60*1000
    d.setTime(d.getTime() + time);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function checkInformation() {
    let $username = $('#id_username').val();
    let $password = $('#id_password').val();
    let $remember = $('#remember');
    const info = {
      username: $('#id_username').val(),
      password: $('#id_password').val()
    };
    if(localStorage.getItem("info") === null){
      if($username == '' || $password == ''){
        $("#id_username").val("");
        $("#id_password").val("");
        $(".dialog-auth-failed").show();
      } else {
        localStorage.setItem("info", JSON.stringify(info));
        $("#id_username").val("");
        $("#id_password").val("");
        window.location.href="https://baodaigov.github.io/login/authenticate.html";
      }
    } else if(localStorage.getItem("info") !== null){
      let infoData = JSON.parse(localStorage.getItem("info"));
      if($("#id_password").val() != infoData.password || $("#id_username").val() != infoData.username){
        $("#id_username").val("");
        $("#id_password").val("");
        $(".dialog-auth-failed").show();
      } else {
        window.location.href="https://baodaigov.github.io/login/authenticate.html";
      }
    }
  }

  function changePassword() {
    let $password = $('#id_new_password').val();
    if(getCookie('pass_changed') == 'true'){
      $('#id_new_password').val("");
      $(".dialog-auth-failed").show();
      $(".dialog-auth-failed p").text("Bạn không thể đổi mật khẩu ngay lúc này.");
    } else {
      if($password == ''){
        $('#id_new_password').val("");
        $(".dialog-auth-failed").show();
        $(".dialog-auth-failed p").text("Vui lòng nhập mật khẩu.");
      } else {
        if(localStorage.getItem("info") === null){
          $('#id_new_password').val("");
          $(".dialog-auth-failed").show();
          $(".dialog-auth-failed p").text("Bạn không thể đổi mật khẩu ngay lúc này.");
        } else if(localStorage.getItem("info") !== null){
            let infoData = JSON.parse(localStorage.getItem("info"));
            const info = {
              username: infoData.username,
              password: $password
            };
            localStorage.setItem("info", JSON.stringify(info));
            $("#id_new_password").val("");
            window.location.href="https://baodaigov.github.io/login/index.html";
            setCookie("pass_changed","true");
          }
        }
    }
  }

window.onload = function passChanged(){
  let passChanged = getCookie('pass_changed');
  if(passChanged == 'true'){
    $(".forgot-password-disable").show();
    $(".forgot-password").hide();
  }
}
