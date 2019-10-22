require([
    "esri/WebMap",
    "esri/views/MapView",
    "esri/widgets/Legend",
    "esri/widgets/LayerList",
    "esri/widgets/Expand",
    "esri/widgets/Search",
    "esri/core/watchUtils"
], function (WebMap, MapView, Legend, LayerList, Expand, Search, watchUtils) {
    var webmap = new WebMap({
        portalItem: {
          id: "cf8eca6c516f4c90af896f1421dbeaa9"
        }
    });
    var view = new MapView({
        container: "viewDiv",
        map: webmap,
    });

    view.when(function() {

        // Add description in top left corner in an expand widget
        var info = "<div id='info'><h3>Information</h3>This is a real-time weather map of Canada, that displays various information such as temperature, humidity, and wind speeds. (Updated hourly)<br><br>" +
        "Each point on the Temperature layer indicates a set of attributes and can be clicked on to reveal more weather information.<br><br>" +
        "Data provided by Environment Canada, Data visualisation and application widgets created by Jackie Liu.</div>"

        var description = new Expand({
            expandIconClass: "esri-icon-description",
            view: view,
            content: info
        });

        // Add search bar in top right corner
        var search = new Search({
            view: view
        });

        view.ui.add(search, "top-right");

        // Add legend in an expand widget
        var legend = new Legend({
            view:view,
            container: document.createElement("div")
        });
        var legendExpand = new Expand({
            expandIconClass: "esri-icon-drag-horizontal",
            content: legend.container,
            view: view
        });

        // Add layer list in an expand widget
        var layerList = new LayerList({
            view: view,
            container: document.createElement("div")
        });

        var layerExpand = new Expand({
            expandIconClass: "esri-icon-layers",
            expandToolTip: "Layers",
            title: "Layers",
            view: view,
            content: layerList.container
        });

        // functions to collapse other widgets when one is expanded
        expandHandle1 = watchUtils.pausable(description, "expanded", function(newVal, oldVal){
            if(newVal === true){
                expandHandle1.pause();
                setTimeout(function() {
                    expandHandle2.resume();
                    expandHandle3.resume();
                }, 100);
            } else {
                expandHandle1.resume();
            }
            if (legendExpand.expanded) {
                legendExpand.collapse();
            }
            if (layerExpand.expanded) {
                layerExpand.collapse();
            }
        });

        expandHandle2 = watchUtils.pausable(legendExpand, "expanded", function(newVal, oldVal){
            if(newVal === true){
                expandHandle2.pause();
                setTimeout(function() {
                    expandHandle1.resume();
                    expandHandle3.resume();
                }, 100);
            } else {
                expandHandle2.resume();
            }
            if (description.expanded) {
                description.collapse();
            }
            if (layerExpand.expanded) {
                layerExpand.collapse();
            }
        });

        expandHandle3 = watchUtils.pausable(layerExpand, "expanded", function(newVal, oldVal){
            if(newVal === true){
                expandHandle3.pause();
                setTimeout(function() {
                    expandHandle1.resume();
                    expandHandle2.resume();
                }, 100);
            } else {
                expandHandle3.resume();
            }
            if (description.expanded) {
                description.collapse();
            }
            if (legendExpand.expanded) {
                legendExpand.collapse();
            }
        });

        view.ui.add(description, "top-left");
        view.ui.add(legendExpand, "top-left");
        view.ui.add(layerExpand, "top-left");
    });
});