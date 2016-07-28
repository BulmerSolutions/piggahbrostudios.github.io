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

PB.rss = function (){
  this.feed = document.getElementsByTagName('rss');
  
  for(i=0; i < this.feed.length; i++){
    this.feed[i].innerText = "This feed wants to grab " + this.feed[i].getAttribute('url');
  }
};
