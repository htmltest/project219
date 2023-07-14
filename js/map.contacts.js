ymaps.ready(init);

var myMap;
// var coords = [55.730239, 37.646121];
var coords = [55.786505, 37.704143];

function init() {
	myMap = new ymaps.Map('map', {
		center: coords,
		zoom: 15,
		controls: []
	});

	myMap.controls.add('zoomControl');
	myMap.behaviors.disable('scrollZoom');

	var myPlacemark = new ymaps.Placemark(coords, {}, {
		iconLayout: 'default#image',
		iconImageHref: 'images/map-icon.png',
		iconImageSize: [191, 139],
		iconImageOffset: [-95, -139]
	});
	myMap.geoObjects.add(myPlacemark);
	myMap.setCenter(coords);
}
