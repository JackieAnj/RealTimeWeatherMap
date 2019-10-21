require([
    "esri/WebMap",
    "esri/views/MapView",
    "esri/widgets/Legend",
    "esri/widgets/LayerList",
    "esri/widgets/Expand",
    "esri/widgets/Search"
], function (WebMap, MapView, Legend, LayerList, Expand, Search) {
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

        // Add search bar in top right corner
        var search = new Search({
            view: view
        });
  
        view.ui.add(search, "top-right");

        // Add legend in an expand widget
        var legendExpand = new Expand({
            content: new Legend({
                view:view
            }),
            view: view,
            expanded: true
        });
        view.ui.add(legendExpand, "top-left");

        // Add layer list in an expand widget
        var layerList = new LayerList({
            view: view
        });

        var layerExpand = new Expand({
            expandIconClass: "esri-icon-layers",
            expandToolTip: "Layers",
            title: "Layers",
            view: view,
            content: layerList
        })
        view.ui.add(layerExpand, "top-left");
    });
});