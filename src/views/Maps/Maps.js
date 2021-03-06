import React, { Component } from 'react';
import { Alert, Card, CardBody, CardHeader, Col, Row, Button,Badge, Table, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import Map from 'ol/Map.js';
import Overlay from 'ol/Overlay.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import {fromLonLat} from 'ol/proj.js';
import XYZ from 'ol/source/XYZ.js';
import ol_Scaleline from 'ol/control/scaleline'
import Permalink from 'ol-ext/control/Permalink';
import SearchNominatim from 'ol-ext/control/SearchNominatim'
import ol_layer_Tile from 'ol/layer/tile'
import ol_source_OSM from 'ol/source/osm'
import ol_source_Stamen from 'ol/source/stamen'
import ol_control_Swipe from 'ol-ext/control/Swipe';
import Style from 'ol/style/Style';
import Chart from 'ol-ext/style/Chart';
import Stroke from 'ol/style/Stroke';
import Text from 'ol/style/Text';
import Fill from 'ol/style/Fill';
import Circle from 'ol/style/Circle';
import Polygon from 'ol/geom/Polygon';
import ol_Feature from 'ol/feature';
import ol_geom_Point from 'ol/geom/point';
import ol_layer_Vector from 'ol/layer/Vector';
import ol_source_Vector from 'ol/source/Vector';
import ol_ordering from 'ol-ext/render/ordering';
import ol_interaction_Select from 'ol/interaction/select';
import EsriJSON from 'ol/format/EsriJSON.js';
import proj from 'ol/proj.js';
import * as projection from 'ol/proj.js';
import $ from 'JQuery';
import ZoomToExtent from 'ol/control/ZoomToExtent';
import Control from 'ol/Control';
//import Popup from 'ol-popup/dist/ol-popup.js'
import * as c3 from 'c3';
//import PluggableMap from 'ol/PluggableMap';
import 'c3/c3.css';
import Cluster from 'ol/source/Cluster';
import AnimatedCluster from 'ol-ext/layer/AnimatedCluster';
import SelectCluster from 'ol-ext/interaction/SelectCluster';
import ol_coordinate_convexHull from 'ol-ext/geom/ConvexHull';
import coordinate from 'ol/coordinate';
import ReactResizeDetector from 'react-resize-detector';
import {styles} from 'ol/ol.css';
import 'ol-ext/control/Permalink.css';
import 'ol-ext/control/Search.css';
import 'ol-ext/control/Swipe.css';
import 'ol-popup/src/ol-popup.css';

class Maps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
    };

    this.onDismiss = this.onDismiss.bind(this);    
  }
  
  componentDidMount() {

 
  let chart = c3.generate({
    bindto: '#chart',
    data: {
          columns: [
              ['data1', 30, 20, 50, 40, 60, 50],
              ['data2', 200, 130, 90, 240, 130, 220],
              ['data3', 300, 200, 160, 400, 250, 250],
              ['data4', 200, 130, 90, 240, 130, 220],
              ['data5', 130, 120, 150, 140, 160, 150],
              ['data6', 90, 70, 20, 50, 60, 120],
          ],
          type: 'bar',
          types: {
              data3: 'spline',
              data4: 'line',
              data6: 'area',
          },
          groups: [
              ['data1','data2']
          ]
      }
    });
    
    let mapElement = 'map';


    /**
     * Elements that make up the popup.
     */
    var container = document.getElementById('popup');
    var content = document.getElementById('popup-content');
    var closer = document.getElementById('popup-closer');
  

    /**
     * Add a click handler to hide the popup.
     * @return {boolean} Don't follow the href.
     */
    closer.onclick = function() {
      overlay.setPosition(undefined);
      closer.blur();
      return false;
    };


    
    /**
     * Create an overlay to anchor the popup to the map.
     */
    var overlay = new Overlay({
      element: container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });

    this.map = new Map({
      target: mapElement,
      layers: [
        // new TileLayer({
        //   source: new XYZ({
        //     attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
        //         'rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
        //     url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' +
        //         'World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
        //   })
        // })
        new TileLayer({
          source: new  ol_source_OSM()
        })
      
      ],
      view: new View({
        center: fromLonLat([-121.1, 47.5]),
        zoom: 7
      }),
      overlays: [overlay],
    });

   //$(mapElement).data('map', this.map);
   self.map = this.map;

    var esrijsonFormat = new EsriJSON();

    var serviceUrl = 'http://gisval.labs.addev.ssa.gov:6080/arcgis/rest/services/GETSTATS_VAL/GETSTATS2/MapServer/';
    var layer = 0;

    let offTypes = {
        "ADO": ['11'],
        "DDS": ['07', '15'],
        "DDS-DDS": ['07'],
        "DDS-DHU": ['15'],
        "EXTAGY": ['09', '0D'],
        "EXTAGY-EXTAGY": ['09'],
        "EXTAGY-OCSE": ['0D'],
        "EQUIP-EQUIP": ['93'],
        "EQUIP-ROCC": ['10'],
        "EQUIP": ['93', '10'],

        "FO": ['13', '01', '18', '16', '0E'],
        "FO-FO/1": ['13'],
        "FO-FO/2": ['01'],
        "FO-FO/RS": ['18'],
        "FO-FSP": ['16'],
        "FO-VSDEXT": ['0E'],

        "FOSU/WSU/SDW": ['42', '30', '65'],
        "FOSU/WSU/SDW-FOSU": ['42'],
        "FOSU/WSU/SDW-ICTS": ['30'],
        "FOSU/WSU/SDW-SDW": ['65'],

        "MISC": ['90', '06', '26'],
        "MISC-AGENCY": ['90'],
        "MISC-HCFA": ['06'],
        "MISC-MISC": ['26'],

        //"ODAR": ['52', '71', '54', '50', '29', '64', '0A', '0C'],
        //"ODAR-OAOLO": ['52', '71', '54'],              
        "ODAR": ['28', '29', '50', '64', '0A', '0C'],
        "ODAR-OHOCO": ['28'],
        "ODAR-OHORO": ['29'],
        "ODAR-OHOFO": ['50'],
        "ODAR-OHOPRS": ['64', '0A', '0C'],

        "OAO": ['49','51','52','54','71'],
        "OAO-OAOCO": ['49'],
        "OAO-OAOAO": ['51'],
        "OAO-OAODR": ['52'],
        "OAO-OAOLO": ['54'],
        "OAO-OAOLD": ['71'],

        //"OAO-OHACO": ['28'],               
        //"ODAR-VTC": ['0C'],
        //"ODAR/roll": ['51', '52', '71', '54'],
        //"ODAR/roll-OAOAO": ['51'],
        //"ODAR/roll-OAODR": ['52'],
        //"ODAR/roll-OAOLD": ['71'],            
        //"ODAR/roll-OAOLO": ['54'],
        "OIG": ['0H', '32', '31', '41', '25', '27'],
        "OIG-OIGCDI": ['0H'],
        "OIG-OIGABR": ['32'],
        "OIG-OIGADV": ['31'],
        "OIG-OIGIBR": ['41'],
        "OIG-OIGIDV": ['25'],
        "OIG-OIGOTH": ['27'],
        "OQP": ['23'],
        //"PSC": ['02', '05'],
        "PC/TSC/WBDOC": ['56', '47', '02', '81', '82', '05', '21'],
        "PC/TSC/WBDOC-OCO": ['56'],
        "PC/TSC/WBDOC-OEO": ['47'],
        "PC/TSC/WBDOC-PC": ['02'],
        "PC/TSC/WBDOC-SAU": ['81', '82'], //two in one
        "PC/TSC/WBDOC-TSC": ['05'],
        "PC/TSC/WBDOC-WBDOC": ['21'],

        //"PSC/roll": ['20', '19', '04', '98', '08'],
        //"PSC/roll-OTHPC": ['20'],
        //"PSC/roll-OTHTSC": ['19'],
        //"PSC/roll-PCMOD": ['04'],
        //"PSC/roll-TSTOFC": ['98'],
        //"PSC/roll-TSUNIT": ['08'],

        "RO": ['03'],

        //"RO/roll": ['24', '22'],
        //"RO/roll-OTHRRO": ['24'],
        //"RO/roll-RSO": ['22'],

        "SSA HQ": ['59', '63'],
        "SSA HQ-COMSNR": ['59'],
        "SSA HQ-DIVISN": ['63'] //,
        //"SDW": ['65']

        //"SSA HQ/Roll": ['60', '66', '61'],
        //"SSA HQ/Roll-DEPCOM": ['60'],
        //"SSA HQ/Roll-DEPMNT": ['66'],
        //"SSA HQ/Roll-OFFICE": ['61']
    };

  var officeTypeSymbols = {
      "ADO": [255, 215, 0, 1],
      "DDS-DDS": [255, 0, 255, 1],
      "DDS-DHU": [0, 255, 0, 1],
      "EXTAGY-EXTAGY": [0, 255, 255, 1],
      "EXTAGY-OCSE": [100, 149, 237, 1],
      "EQUIP-EQUIP": [255, 165, 0, 1],
      "EQUIP-ROCC": [0, 250, 154, 1],

      "FO": [102, 51, 255, 1],
      "FO-FO/1": [166, 206, 227, 1],
      "FO-FO/2": [31, 120, 180, 1],
      "FO-FO/RS": [178, 223, 138, 1],
      "FO-FSP": [51, 160, 44, 1],
      "FO-VSDEXT": [251, 154, 153, 1],

      "FOSU/WSU/SDW-FOSU": [154, 205, 50, 1],
      "FOSU/WSU/SDW-ICTS": [32, 178, 170, 1],
      "FOSU/WSU/SDW-SDW": [250, 235, 215, 1],

      "MISC-AGENCY": [239, 237, 245, 1],
      "MISC-HCFA": [188, 189, 220, 1],
      "MISC-MISC": [117, 107, 177, 1],

      //"ODAR-OAOCO": [127, 201, 127, 1],
      "ODAR-OHO": [190, 174, 212, 1],
      //"ODAR-OAOLO": [253, 192, 134, 1],
      "ODAR-OHOCO": [253, 192, 134, 1],
      "ODAR-OHORO": [56, 108, 176, 1],
      "ODAR-OHOFO": [255, 255, 153, 1],                
      "ODAR-OHOPRS": [240, 2, 127, 1],
      "ODAR-VTC": [191, 91, 23, 1],

      "OAO-OAOCO": [127, 201, 127, 1],
      "OAO-OAOAO": [253, 192, 134, 1],
      "OAO-OAODR": [0, 250, 154, 1],
      "OAO-OAOLO": [188, 189, 220, 1],
      "OAO-OAOLD": [118, 42, 131, 1],

      //"ODAR/roll-OAOAO": [202, 0, 32, 1],
      //"ODAR/roll-OAODR": [244, 165, 130, 1],
      //"ODAR/roll-OAOLD": [146, 197, 222, 1],
      //"ODAR/roll-OAOLO": [5, 113, 176, 1],
      "OIG-OIGCDI": [118, 42, 131, 1],
      "OIG-OIGABR": [175, 141, 195, 1],
      "OIG-OIGADV": [231, 212, 232, 1],
      "OIG-OIGIBR": [217, 240, 211, 1],
      "OIG-OIGIDV": [127, 191, 123, 1],
      "OIG-OIGOTH": [27, 120, 55, 1],
      "OQP": [255, 255, 150, 1],

      "PC/TSC/WBDOC-OCO": [141, 211, 199, 1],
      "PC/TSC/WBDOC-OEO": [255, 255, 179, 1],
      "PC/TSC/WBDOC-PC": [190, 186, 218, 1],
      "PC/TSC/WBDOC-SAU": [251, 128, 114, 1],
      "PC/TSC/WBDOC-TSC": [128, 177, 211, 1],
      "PC/TSC/WBDOC-WBDOC": [253, 180, 98, 1],

      //"PSC/roll-OTHPC": [208, 28, 139, 1],
      //"PSC/roll-OTHTSC": [241, 182, 218, 1],
      //"PSC/roll-PCMOD": [253, 180, 98, 1],
      //"PSC/roll-TSTOFC": [184, 225, 134, 1],
      //"PSC/roll-TSUNIT": [77, 172, 38, 1],

      //"PSC": [204, 204, 0, 1],
      "RO": [255, 0, 51, 1],

      //"RO/roll-OTHRRO": [127, 205, 187, 1],
      //"RO/roll-RSO": [44, 127, 184, 1],

      "SSA HQ-COMSNR": [158, 188, 218, 1],
      "SSA HQ-DIVISN": [136, 86, 167, 1],

      //"SSA HQ/Roll-DEPCOM": [229, 245, 249, 1],
      //"SSA HQ/Roll-DEPMNT": [153, 216, 201, 1],
      //"SSA HQ/Roll-OFFICE": [44, 162, 95, 1]
      //"SDW": [255, 102, 204, 1]
  };

  var url = serviceUrl + layer + '/query/?f=json&' +
                'returnGeometry=true&inSR=102100&outFields=*' +
                '&outSR=102100&where=1%3D1';

  $.ajax({url: url, dataType: 'jsonp', success: function(response) {
              if (response.error) {
                alert(response.error.message + '\n' +
                    response.error.details.join('\n'));
              } else {
                // dataProjection will be read from document
                var features = esrijsonFormat.readFeatures(response, {
                  featureProjection:  'EPSG:102100',
                });
                if (features.length > 0) {
                  //vectorSource.addFeatures(features);
                  //sourceFeatures.addFeatures(features);
                  //console.log(features);
                  //var ext = this.map.getView().calculateExtent(this.map.getSize());
                  // var features=[];
                  // for (var i=0; i<nb; ++i)
                  // {	features[i]=new Feature(new Point([ext[0]+(ext[2]-ext[0])*Math.random(), ext[1]+(ext[3]-ext[1])*Math.random()]));
                  //   features[i].set('id',i);
                  // }
                  clusterSource.getSource().clear();
                  clusterSource.getSource().addFeatures(features);

                }              
              }

  }}, this);

  var sourceFeatures = new ol_source_Vector({
      
  });

  var  layerFeatures = new ol_layer_Vector({
      source: sourceFeatures,
      style: function(feature, resolution){
          var styleR3 = new Style( {
              image: new Circle( {
                  radius: 5,
                  fill: new Fill( {
                      color: [0,0,255]
                  } )
              } )
          } );

          var styleCatchAll = new Style( {
              image: new Circle( {
                  radius: 5,
                  fill: new Fill( {
                      color: [255,0,0]
                  } )
              } )
          } );
          
          var ofctypes = [];
          var officetypeList = offTypes;
          for (var key in officetypeList) {
              //console.log(key);
              if (officetypeList.hasOwnProperty(key)) {
                  
                  
                  if (officetypeList[key].length == 1) {
                      //ofctypes.push("'" + officetypeList[key][0] + "'");                    
                      if(officetypeList[key] == feature.get('OFC_TYP')){
                          return new Style( {
                              image: new Circle( {
                                  radius: 5,
                                  fill: new Fill( {
                                      color: officeTypeSymbols[key]
                                  } ),
                                  stroke: new Stroke({
                                      width : 1,
                                      // color: 'rgba(255, 100, 50, 0.8)'
                                      color : 'black',
                                      radius : 1
                                  })
                              } )
                          }) // officeTypeSymbols[key];    
                      }
                  } else {
                      //if (key == "PC/TSC/WBDOC-SAU") {
                          for (var item in officetypeList[key]) {
                              if (officetypeList[key].hasOwnProperty(item)) {
                                  //ofctypes.push("'" + officetypeList[key][item][0] + "'");
                                  if(officetypeList[key] == feature.get('OFC_TYP')){
                                      return new Style( {
                                          image: new Circle( {
                                              radius: 5,
                                              fill: new Fill( {
                                                  color: officeTypeSymbols[key][item][0]
                                              } )
                                          } )
                                      }) // officeTypeSymbols[key];    
                                  }
                              }
                          }
                      //}

                  }

              }
          }
          // console.log(ofctypes);
          // if ( feature.get('OFC_TYP') == '13') {            
          //     return [styleR3];
          // } else {
          //     return [styleCatchAll];
          // }
      }
  });

  // window.onresize = function()
  // {
  
  // }
  // let mapDiv = document.getElementById('map');
  // mapDiv.addEventListener('onresize', function(){
  //   // example.style.background = 'rgb('+random(0,255)+','+random(0,255)+','+random(0,255)+')';
  //   self.map.updateSize();
  // });
  // $('map').on('resize', function() { 
  //   /* What ever */
  //   self.map.updateSize();
  // });

  this.map.on("moveend", function(e){
    // event actions
    e.map.updateSize();
  }, this);
  
  this.map.addLayer(layerFeatures);

  var zoomToExtentControl = new ZoomToExtent({
    extent: [-11243808.051695308, 4406397.202710291, -4561377.290892059, 6852382.107835932]
  });

  this.map.addControl(zoomToExtentControl);
  
  let fullExtents = [-15358099.626816723, 2524371.9646285083, -5857894.255311261, 7142391.46550449];
  let fullmapExtents = projection.transformExtent(
               fullExtents, "EPSG:4326", "EPSG:3857"
 );
  this.map.getView().fit( fullExtents, this.map.getSize() );
  
  // var extent = [-2750000, -900000, 3600000, 4630000];
  // var center = ol.extent.getCenter(extent);
  // map.setView(new ol.View({
  //   extent: extent,
  //   center: center
  // }));

    var select = new ol_interaction_Select({
      layers: [layerFeatures]
    });
    
    this.map.on('pointermove', function(e) {
      if (e.dragging) return;
          
      var pixel = this.getEventPixel(e.originalEvent);
      var hit = this.hasFeatureAtPixel(pixel);
      
      this.getTargetElement().style.cursor = hit ? 'pointer' : '';
    }, this);

    window.closepopup = function(event){
      overlay.setPosition(undefined);
        closer.blur();                
        return false;
    }
    //var popup = new Popup();
    //this.map.addOverlay(popup);

    //show office themes
    var displayOfficeTheme = function(feature, resolution){
      var styleR3 = new Style( {
          image: new Circle( {
              radius: 5,
              fill: new Fill( {
                  color: [0,0,255]
              } )
          } )
      } );

      var styleCatchAll = new Style( {
          image: new Circle( {
              radius: 5,
              fill: new Fill( {
                  color: [255,0,0]
              } )
          } )
      } );
      
      var ofctypes = [];
      var officetypeList = offTypes;
      for (var key in officetypeList) {
          //console.log(key);
          if (officetypeList.hasOwnProperty(key)) {              
              
              if (officetypeList[key].length == 1) {
                  //ofctypes.push("'" + officetypeList[key][0] + "'");                    
                  if(officetypeList[key] == feature.get('OFC_TYP')){
                      return new Style( {
                          image: new Circle( {
                              radius: 5,
                              fill: new Fill( {
                                  color: officeTypeSymbols[key]
                              } ),
                              stroke: new Stroke({
                                  width : 1,
                                  // color: 'rgba(255, 100, 50, 0.8)'
                                  color : 'black',
                                  radius : 1
                              })
                          } )
                      }) // officeTypeSymbols[key];    
                  }
              } else {
                  //if (key == "PC/TSC/WBDOC-SAU") {
                      for (var item in officetypeList[key]) {
                          if (officetypeList[key].hasOwnProperty(item)) {
                              //ofctypes.push("'" + officetypeList[key][item][0] + "'");
                              if(officetypeList[key] == feature.get('OFC_TYP')){
                                  return new Style( {
                                      image: new Circle( {
                                          radius: 5,
                                          fill: new Fill( {
                                              color: officeTypeSymbols[key][item][0]
                                          } )
                                      } )
                                  }) // officeTypeSymbols[key];    
                              }
                          }
                      }
                  //}

              }

          }
      }
      // console.log(ofctypes);
      // if ( feature.get('OFC_TYP') == '13') {            
      //     return [styleR3];
      // } else {
      //     return [styleCatchAll];
      // }
  }


    var showPopup = function(feature, evt, currentmap){
          //var element = popup.getElement();
          console.log(feature.get("NAME"));
          var htmlArr = [];
          
          // var myvar = '<div class="card">'+
          // '  <div class="card-header">'+
          // '    Featured'+
          // '  </div>'+
          // '  <div class="card-body">'+
          // '    <h5 class="card-title">Special title treatment</h5>'+
          // '    <p class="card-text">It\'s a broader card with text below as a natural lead-in to extra content. This content is a little longer.</p>'+
          // '    <a href="#" class="btn btn-primary">Go somewhere</a>'+
          // '  </div>'+
          // '</div>';
          
          htmlArr.push("<div class='card text-white bg-secondary mb-3' style='max-width: 20rem;'>"); //style='max-width: 30rem;         
          htmlArr.push("<div class='card-header'>"); 
          htmlArr.push('<button type="button" onClick="window.closepopup(this)"  class="close" data-dismiss="modal" aria-label="Close">');
          htmlArr.push('<span aria-hidden="true">&times;</span>');
          htmlArr.push('</button>         ');
          htmlArr.push(feature.get("OCD"));      
          htmlArr.push("</div>");
          htmlArr.push("<div class='card-body text-white'>");
          htmlArr.push("<table"); // class='text-primary'
          htmlArr.push("<tr><td><b>OCD&nbsp;&nbsp;:</b></td><td>&nbsp;&nbsp;" + feature.get("OCD") + "</td></tr><br />");
          htmlArr.push("<tr><td><b>Name&nbsp;&nbsp;:</b></td><td>&nbsp;&nbsp;" + feature.get("NAME") + "</td></tr><br />");
          //htmlArr.push("<tr><td><b>Address&nbsp;&nbsp;:</b></td><td>" + feature.get("ADDRESS") + "</td></tr><br />");
          htmlArr.push("<tr><td><b>Address&nbsp;&nbsp;:</b></td><td>&nbsp;&nbsp;" + feature.get("CITY") + ",&nbsp;" + feature.get("STATE") + "&nbsp;&nbsp;" + feature.get("ZIP") + "</td></tr><br />");
          //htmlArr.push("<tr><td></td><td><a href=\"javascript:mapManager.showStreetView(" + latlng.y + "," + latlng.x + ",'Street View " + officeFeature.attributes["OFC_TYP_TXT"] + ": " + officeFeature.attributes["OCD"] + "');void(0)\">Street View</a></td></tr>");
          htmlArr.push("<tr><td><b>Phone&nbsp;&nbsp;:</b></td><td>&nbsp;&nbsp;" + feature.get("PHONE") + "</td></tr><br />");
          htmlArr.push("</table>");
          htmlArr.push("</div>");
          htmlArr.push("</div>");

          
          var coordinate =  feature.values_.geometry.getCoordinates(); //this.map.getLonLatFromViewPortPx(evt.xy); //evt.mapBrowserEvent.coordinate;
          //var pixel = this.getPixelFromCoordinate(coordinate);
          // var content = '<div className="card"><div className="card-body p-3 clearfix">';
          // //content += '<i class="fa fa-cogs bg-primary p-3 font-2xl mr-3 float-left"></i>';
          // content += '<div className="text-primary">' +  feature.get("NAME") + '</div>';
          // content += '</div></div>';
          htmlArr.push(htmlArr);
          var html = '<div><p><div><a href="http://www.chartjs.org"><small className="text-muted">docs</small>' +
                      '</a></div></div>'

          content.innerHTML = htmlArr.join("");
          //popup.show(coordinate,htmlArr.join(""));
          overlay.setPosition(coordinate);
        // $(element).popover('destroy');
        // popup.setPosition(coordinate);
        // $(element).popover({
        //   placement: 'top',
        //   animation: false,
        //   html: true,
        //   content: '<p>The location you clicked was:</p><code></code>'
        // });
        // $(element).popover('show');
    }

    this.map.on('singleclick', function(evt) {                         
      
    });                  

    select.on('select', function(evt){
    var selected = evt.selected;
    var deselected = evt.deselected;

    selected.forEach(function(feature, event){
        //feature.setStyle(styleClick);
        showPopup(feature, evt);
    });

    // deselected.forEach(function(feature){
    //     feature.setStyle(null);
    // });
    });

    this.map.addInteraction(select);

    self.getStyle = function(feature, resolution)
		{	
      var size = feature.get('features').length;
			var style = styleCache[size];
			if (!style)
			{	var color = size>25 ? "192,0,0" : size>8 ? "255,128,0" : "0,128,0";
				var radius = Math.max(8, Math.min(size*0.75, 20));
				var dash = 2*Math.PI*radius/6;
				var dash = [ 0, dash, dash, dash, dash, dash, dash ];
				style = styleCache[size] = new Style(
					{	image: new Circle(
						{	radius: radius,
							stroke: new Stroke(
							{	color: "rgba("+color+",0.5)", 
								width: 15 ,
								lineDash: dash,
								lineCap: "butt"
							}),
							fill: new Fill(
							{	color:"rgba("+color+",1)"
							})
						}),
						text: new Text(
						{	text: size.toString(),
							fill: new Fill(
							{	color: '#fff'
							})
						})
					});
			}
			return [style];
    }

    // Style for the clusters
  var styleCache = {};		

    // Cluster Source
    var clusterSource=new Cluster({
      distance: 40,
      source: new ol_source_Vector()
    });
    // Animated cluster layer
    var clusterLayer = new AnimatedCluster(
    {	
      ame: 'Cluster',
      source: clusterSource,
      animationDuration: true ? 700:0,
      // Cluster style
      style: self.getStyle
    });
    
    this.map.addLayer(clusterLayer);
    
    // add 2000 features
    //addFeatures(2000);

    // Style for selection
    var img = new  Circle(
      {	radius: 5,
        stroke: new Stroke(
        {	color:"rgba(0,0,255,1)", 
          width:1 
        }),
        fill: new Fill(
        {	color:"rgba(0,255,255,0.3)"
        })
      });
    var style0 = new Style( 
      {	image: img
      });
    var style1 = new  Style( 
      {	image: img,
        // Draw a link beetween points (or not)
        stroke: new Stroke(
          {	color:"#fff", 
            width:1 
          }) 
      });
    // Select interaction to spread cluster out and select features
    var selectCluster = new  SelectCluster(
    {	// Point radius: to calculate distance between the features
        pointRadius:7,
        animate: $("#animatesel").prop('checked'),
        // Feature style when it springs apart
        featureStyle: function()
        {	return [ $("#haslink").prop('checked') ? style1:style0 ]
        },
        // selectCluster: false,	// disable cluster selection
        // Style to draw cluster when selected
        style: function(f,res)
        {	
          var cluster = f.get('features');
          if (cluster.length>1)
          {	  
            var feature = f;
            var resolution = res ;
            var s = [];            
            s = self.getStyle(f,res);
            //if ($("#convexhull").prop("checked") && coordinate.convexHull)
            //{	
              var coords = [];
              for (var i=0; i<cluster.length; i++){
                coords.push(cluster[i].getGeometry().getFirstCoordinate());
              }               
              var chull = ol_coordinate_convexHull(coords);
              s.push( 
                new  Style(
                {	stroke: new  Stroke({ color: "rgba(0,0,192,0.5)", width:2 }),
                  fill: new  Fill({ color: "rgba(0,0,192,0.3)" }),
                  geometry: new  Polygon([chull]),
                  zIndex: 1
                }));

              //   new Style({
              //     image: new Circle( {
              //         radius: 5,
              //         fill: new Fill( {
              //             color: officeTypeSymbols[key]
              //         } ),
              //         stroke: new Stroke({
              //             width : 1,
              //             // color: 'rgba(255, 100, 50, 0.8)'
              //             color : 'black',
              //             radius : 1
              //         })
              //     } )
              // }) // officeTypeSymbols[key];    
            //}
            return s;
          }
          else 
          {	return [
              new Style(
              {	image: new Circle (
                {	stroke: new Stroke({ color: "rgba(0,0,192,0.5)", width:2 }),
                  fill: new Fill({ color: "rgba(0,0,192,0.3)" }),
                  radius:5
                })
              })];
          }
        }
      }, (self));
      
    this.map.addInteraction(selectCluster);    
    selectCluster.animate = true;

    
    var navbarToggleclassname = document.getElementsByClassName("navbar-toggler"); //d-md-down-none 
    for(let i=0;i<navbarToggleclassname.length;i++){
        console.log(navbarToggleclassname[i]);
        navbarToggleclassname[i].addEventListener('click', function()
        {        
          setTimeout( function() { 
            self.map.updateSize();
          }, 200);
        } , true);
    }

    var sidebarToggleclassname = document.getElementsByClassName("sidebar-minimizer mt-auto"); //d-md-down-none 
    for(let i=0;i<sidebarToggleclassname.length;i++){
        console.log(sidebarToggleclassname[i]);
        sidebarToggleclassname[i].addEventListener('click', function()
        {        
          setTimeout( function() { 
            self.map.updateSize();
          }, 200);
        } , true);
    }
    //

    selectCluster.on('select', function(evt){
      var selected = evt.selected;
      // var deselected = evt.deselected;
  
      // selected.forEach(function(feature, event){
      //     //feature.setStyle(styleClick);
      //     showPopup(feature, evt);
      // });
  
      // deselected.forEach(function(feature){
      //     feature.setStyle(null);
      // });
      });

    // On selected => get feature in cluster and show info
    selectCluster.getFeatures().on(['add'], function (e, evt)
    {
      var c = e.element.get('features');
      if (c.length==1)
      {	
        var feature = c[0];
        //$(".infos").html("One feature selected...<br/>(office="+feature.get('NAME')+")");
        showPopup(feature, e, this.map);
      }
      else
      {	
        $(".infos").text("Cluster ("+c.length+" features)");
      }
    });

    selectCluster.getFeatures().on(['remove'], function (e)
    {	
      $(".infos").html("");
    });
 
   
}
 
  showClusterOffices(){
    alert("resized");
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  render() {
    return (
      <div className="animated fadeIn">      
        <Row>       
        <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Maps</strong>
                {/* <small> use <code>.alert-link</code> to provide links</small> */}
              </CardHeader>
              <CardBody>             
              <div className="infos"></div> 
              {/* <Button active block color="primary"  onClick={this.showClusterOffices} className="btn-square" aria-pressed="true">Office Cluster</Button>
               */}
              {/* <Alert color="primary">
                  Office Map!
                </Alert> */}
              <a className="skiplink" href="#map">Go to map</a>
              <div id="map" className="map">              {/* <div id="info"></div> */}  
              <div id="popup" className="ol-popup">
                  <a href="#" id="popup-closer" className="ol-popup-closer"></a>
                  <div id="popup-content"></div>
                </div>           
              </div>          
            <div className="options">	
            </div>
            </CardBody>
            </Card>
          </Col>
         
        </Row>
        <Row>
          <Col xs="12" md="6">
          <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Bordered Table
              </CardHeader>
              <CardBody>
                <Table responsive bordered>
                  <thead>
                  <tr>
                    <th>Username</th>
                    <th>Date registered</th>
                    <th>Role</th>
                    <th>Status</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>Pompeius René</td>
                    <td>2012/01/01</td>
                    <td>Member</td>
                    <td>
                      <Badge color="success">Active</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Paĉjo Jadon</td>
                    <td>2012/02/01</td>
                    <td>Staff</td>
                    <td>
                      <Badge color="danger">Banned</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Micheal Mercurius</td>
                    <td>2012/02/01</td>
                    <td>Admin</td>
                    <td>
                      <Badge color="secondary">Inactive</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Ganesha Dubhghall</td>
                    <td>2012/03/01</td>
                    <td>Member</td>
                    <td>
                      <Badge color="warning">Pending</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Hiroto Šimun</td>
                    <td>2012/01/21</td>
                    <td>Staff</td>
                    <td>
                      <Badge color="success">Active</Badge>
                    </td>
                  </tr>
                  </tbody>
                </Table>
                <Pagination>
                  <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem className="page-item"><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                </Pagination>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Charts</strong>
                {/* <small></small> */}
              </CardHeader>
              <CardBody>
                {/* <Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
                  I am an alert and I can be dismissed!
                </Alert> */}
                <div id="chart"></div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Maps;
