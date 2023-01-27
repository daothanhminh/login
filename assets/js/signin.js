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
    if(localStorage.getItem("info") === null){
      $('#id_new_password').val("");
      $(".dialog-auth-failed").show();
      $(".dialog-auth-failed p").text("Bạn không thể đổi mật khẩu ngay lúc này.");
    } else if(localStorage.getItem("info") !== null){
      let infoData = JSON.parse(localStorage.getItem("info"));
      const info = {
        username: infoData.username,
        password: $('#id_new_password').val()
      };
      localStorage.setItem("info", JSON.stringify(info));
      $("#id_new_password").val("");
      window.location.href="https://baodaigov.github.io/login/index.html";
    }
  }