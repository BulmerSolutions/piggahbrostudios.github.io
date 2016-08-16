var PBS = {
  page: {
    current: '',
    finder: function() {
      if(window.location.hash.slice(1,window.location.hash.length) !== PBS.page.current){
        document.getElementById(PBS.page.current).style.display = "none";
        PBS.page.current = window.location.hash.slice(1,window.location.hash.length);
        if (document.getElementById(PBS.page.current)) {
          document.getElementById(PBS.page.current).style.display = 'block';
          document.getElementsByTagName("title")[0].innerText = document.getElementById(PBS.page.current).getAttribute("title");
        } else {
          document.getElementsByTagName("title")[0].innerText = document.getElementById(PBS.settings.page.error['404']).getAttribute("title");
          document.getElementById(PBS.settings.page.error['404']).style.display = 'block';
        }
      }
    },
    generate: function(file) {
      
    }
  },
  settings: {
    page: {
      blocked: [],
      start: '/Home',
      autoRun: true,
      error: {
        '404': '/ERROR/404'
      }
    }
  },
  toUpdate: [],
  update: function() {
    for ( i = 0; i < PBS.toUpdate.length; i++ ) {
      PBS.toUpdate[i]();
    }
    
    requestAnimationFrame(PBS.update);
  },
  initialize: function(){
    if ( PBS.settings.page.autoRun === true ) {
      if (window.location.hash === ''){
        window.location.hash = '#' + PBS.settings.page.start;
        document.getElementById(PBS.settings.page.start).style.display = "block";
        PBS.page.current = PBS.settings.page.start;
      } else {
        document.getElementById(window.location.hash.slice(1,window.location.hash.length)).style.display = "block";
        PBS.page.current = window.location.hash.slice(1,window.location.hash.length).toString();
      }
      PBS.toUpdate.push(PBS.page.finder);
    }
    PBS.update();
  },
  cookie: {
    set: function setCookie(name,value,days) {
      var d = new Date();
      d.setTime(d.getTime() + (days*24*60*60*1000));
      var expires = "expires=" + d.toGMTString();
      document.cookie = name + "=" + value + "; " + expires;
    },
    setList: function setListOfCookies(list, log) { /** [{name: '', value: '', days: 30}, {...}]*/
      for ( i = 0; i < list.length; i++ ) {
        PBS.cookie.set(list[i].name, list[i].value, list[i].days);
        if ( log && log === true ) {
          console.log('Cookie "' + list[i].name + '" was created!');
        }
      }
    },
    get: function getCookie(name) {
      var name = name + "=";
      var ca = document.cookie.split(';');
      for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
    getList: function getCookie(list) {
      this.cookieList = {};
      for ( i = 0; i < list.length; i++ ) {
        this.cookieList[list[i]] = PBS.cookie.get(list[i]);
      }
      return this.cookieList;
    },
    check: function checkCookie(name, set) {
      var user = PBS.cookie.get(name);
      if (user === "") {
        if (set) {
          PBS.cookie.set(set.name, set.value, set.days);
          console.log("The " + name + " cookie has been set!");
        } else {
          console.error(name + " is not a cookie!");
        }
      }
    },
    delete: function deleteCookie(name) {
    	PBS.cookie.set(name, "", -1);
    },
    deleteList: function(list){
      for ( i = 0; i < list.length; i++ ) {
        PBS.cookie.delete(list[i]);
      }
    },
    print: function printCookie(name) {
      console.log(PBS.cookie.get(name));
    }
  }
};

PBS.initialize();
