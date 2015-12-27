(function()
{
   "use strict";

   chrome.extension.onMessage.addListener( function( sMessage, oSender, fResponseCallback )
   {
      if( sMessage === "Purify" )
      {
        chrome.storage.sync.get({
          bgColor: '#f7f7f7',
          fgColor: '#000000',
          fontSize: "15",
          bodyFont: "Roboto",
          titleFont: "Ubuntu",
          bodyLoadFromGoogle: true,
          titleLoadFromGoogle: true,
          singleColumn: false
        },
        function(items) {
            (new ArticleView(items)).activate();
        });

      }
   });

   // // Auto-start
   // $(document).ready( function()
   // {
   //    (new ArticleView()).activate();
   // })

})();
