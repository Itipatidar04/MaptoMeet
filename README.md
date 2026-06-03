# MaptoMeet

Test Commit

#Before this we'll add a functionality selecting current location as source.
whenever a user selects current location option ->
1. geolocation Api gets current location coordinates
2. reverse nominatim(converts coordinates to location name)
3. location object 
4. it is set as source
5. and a current location marker will render on map


Phase 1
Create geolocation service
Phase 2
Request location on page load
Phase 3
Store currentLocation state
Phase 4
Render Current Location Marker
Phase 5
Verify marker moves correctly
Phase 6

Add search option:

📍 Use Current Location

which simply does:

setSource(currentLocation)





#what we have done till now is to search for source and destination using nomination api and also got latitude and longitude. 
#our next task is to create route from source to destination. this will be done by getting geometry json coordinates for route from osrm and rendering that on ui using mapbox.


so flow will be like:-
1. when source and destination is added, the markers for those should be rendered at correct locations.
2. create osrm services,
3. when button clicked,validate the entered source and destination whether its correct or not
4. build osrm request(long, lat)
5. call osrm
6. instpect response() ->distance, duration, geometry
7. create route state in which we'll store this response (distance, duration, geometry)
8. convert this geometry coordinates in geojson format
9. pass it to mapbox for rendering route visually on map
10.Fit bounds -> map after rendering should check for min/max coordinates and should automatically zoom in and zoom out.
