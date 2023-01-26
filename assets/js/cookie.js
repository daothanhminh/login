function setCookie(cname,cvalue,exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function setSessionCookie(cname,cvalue) {
    let expires = "expires=Fri, 31 Dec 9999 23:59:59 GMT"
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

  function eraseCookie(cname) {   
    document.cookie = cname+"=; expires = Thu, 01 Jan 1970 00:00:00 GMT"
  }
  
  function checkCookie() {
    let information = getCookie("information");
    let $username = $('#id_username').val();
    let $password = $('#id_password').val();
    let $remember = $('#remember');
    if($remember.is(":checked")){
      setSessionCookie("information", `username:${$username}&password:${$password}&remember:on`);
      eraseCookie("auth_failed");
    } else {
      setCookie("information", `username:${$username}&password:${$password}&remember:off`, 0.1);
      eraseCookie("auth_failed");
    }
    if($username == '' || $password == ''){
      eraseCookie("information");
    }
  }

  window.onload = function automaticAuthenticate(){
    if(getCookie("information").includes("remember:on")){
      window.location.href = './authenticate.html'
    } else if(getCookie("information")==''){
      if(getCookie("auth_failed")!=''){
        $(".dialog-auth-failed").show();
        eraseCookie("auth_failed");
      }
    }
  }