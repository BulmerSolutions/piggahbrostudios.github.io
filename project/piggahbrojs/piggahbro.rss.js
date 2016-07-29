//////////////////////////////////////////////////////////////////////
/*                                                                  */
/*         This is a addon to PiggahBroJS or piggahbro.js!          */
/*     This script allows you to get RSS feed from any source!      */
/*                                                                  */
//////////////////////////////////////////////////////////////////////
/*                                                                  */
/*                             WARNING!                             */
/*                                                                  */
/*  Please make sure you have piggahbro.js AND piggahbro.server.js  */
/*  in use for this script to fully function!                       */
/*                                                                  */
//////////////////////////////////////////////////////////////////////

PB.rss = function (){
  this.feed = document.getElementsByTagName('rss');
  
  for(i=0; i < this.feed.length; i++){
    PB.server.getFile('GET', {
      url: this.feed[i].getAttribute('url'),
      headers: ['Access-Control-Allow-Headers', '*', 'Access-Control-Allow-Origin', PB.getBaseURL(this.feed[i].getAttribute('url'))],
      onready: function(xhttp){
        if (xhttp.status === 200) {
          this.feed[i].innerText = xhttp.responseXML;
        } else if(xhttp.status === 404) {
          alert('There was a 404 error');
        } else {
          alert('There was a problem with the request.\n\nCheck the console to know why.');
        };
      }
    });
  }
};
