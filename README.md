# 17-mapLeaflet
It will perform an API call to USGS [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) to get earthquake info for the last 7 days for earthquakes above 2.5 magnitude. Using D3 and Leaflet it will produce a map from earthquake data retrieved.

Base Layers - There are 3 base layers to choose from- light, satelite, and outdoor. 

Tectonic Plates - The tectonic plate lines are displayed over the basemap. Data on tectonic plates was found at <https://github.com/fraxen/tectonicplates>.

Data Points -Earthquake data is plotted based on longitude and latitude. The data is plotted with points sized and colored according to the magnitude of the earthquake. Lesser magnitude results in smaller, lighter circles. 

PopUps -There are popups that provide additional information for each point when clicked.

Legend - The legend provides reference on the magnitude color relationship.
