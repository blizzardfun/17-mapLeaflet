# 17-mapLeaflet
Using D3 and Leaflet to produce a map from earthquake data retrieved from USGS
It will perform an API call to USGS [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) to get earthquake info for the last 7 days for earthquakes above 2.5 magnitude.

Earth quake data is plotted based on longitude and latitude with 3 base layers to choose from- light, satelite, and outdoor. The data is plotted with points sized and colored according to the magnitude of the earthquake. Lesser magnitude results in smaller, lighter circles. There are also popups that provide additional information for each point when clicked and a legend for reference on the magnitude colors.
