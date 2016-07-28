//////////////////////////////////////////////////////////////////////
/*                                                                  */
/*         This is a addon to PiggahBroJS or piggahbro.js!          */
/*     This script allows you to get RSS feed from any source!      */
/*                                                                  */
//////////////////////////////////////////////////////////////////////
/*                                                                  */
/*                             WARNING!                             */
/*                                                                  */
/* Please make sure you have piggahbro.js in use or this won't work */
/*                                                                  */
//////////////////////////////////////////////////////////////////////

var getBaseURL = function(url){
  this.hits = '';
  for( i=0; i<url.length; i++ ){
    if (this.hits.substr((this.hits.length - 4),4) == '.com'){
      return this.hits;
    } else {
      this.hits += url[i];
    }
  }
}

PB.rss = function (){
  this.feed = document.getElementsByTagName('rss');
  
  for(i=0; i < this.feed.length; i++){
    this.urlOrigin = 
    PB.server.getFile('GET', {
      url: this.feed[i].getAttribute('url'),
      headers: ['Access-Control-Allow-Headers', '*', 'Access-Control-Allow-Origin', getBaseOrigin(url)],
      onready: function(xhttp){
        if (xhttp.status === 200) {
          alert(xhttp.responseText);
        } else if(xhttp.status === 404) {
          alert('There was a 404 error');
        } else {
          alert('There was a problem with the request.\n\nCheck the console to know why.');
        };
      }
    });
  }
};
