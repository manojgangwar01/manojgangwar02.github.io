define(['dojo/_base/declare',
  'jimu/BaseWidget',
      'esri/map'

],
function(declare, BaseWidget, map) {
    var clazz = declare([BaseWidget], {
        templateString: '<div> <br /> <br />1. Click the "Select" button below to activate the tool. <br /> <br />' + '<br /> <input type="button" style="background-color: rgb(125,125,125)!important; background: url(./widgets/Streetview/images/streetview.png) no-repeat;"  class="jimu-btn" id="btnPict" value=" &nbsp;&nbsp;&nbsp; Select" data-dojo-attach-event="click:_EarthClick"> <br /> <br /> <br />' + '2. Click on the map, and Streetview will open for this location in a new window. <br /><br /> </div> ',



      

        _EarthClick: function () {
            EarthConfigURL = this.config.configText;
            map = this.map;

            var handlerStreetView;
            //handlers 
            if (handlerStreetView) {
                handlerStreetView.remove();
                handlerStreetView= null;
            } else {



                map.setMapCursor("url(./widgets/Streetview/images/streetview.cur),auto");
                handlerStreetView = map.on("click", function (evt) {

                    pt = esri.geometry.webMercatorToGeographic(evt.mapPoint);
                    url = "https://earth.google.com/web/@" + pt.y + "," + pt.x + EarthConfigURL;
					url_s = "http://maps.google.com/?cbll=" +  pt.y + "," + pt.x + "&cbp=12,90,0,0,5&layer=c" + EarthConfigURL;

                    window.open(url_s);

                    ///// remove after one click
                    map.setMapCursor("default");
                    ////remove after one click
                    

                    handlerStreetView.remove();
                });
            };  /// end else for handlerStreetView 


            /////  end of street view widget

            /////
        }
});

clazz.hasStyle = false;
clazz.hasUIFile = false;
clazz.hasLocale = false;
clazz.hasConfig = false;
return clazz;
});

