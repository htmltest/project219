ymaps.ready(init);

                        var myMap;
                        var coords = [55.786505, 37.704143];

                        function init() {
                            myMap = new ymaps.Map('map', {
                                center: coords,
                                zoom: 14,
                                controls: []
                            });

                            myMap.controls.add('zoomControl');
                            myMap.behaviors.disable('scrollZoom');

                            var myPlacemark = new ymaps.Placemark(coords, {}, {
                                iconLayout: 'default#image',
                                iconImageHref: 'images/map-icon.png',
                                iconImageSize: [191, 139],
                                iconImageOffset: [-115, -159]
                            });
                            myMap.geoObjects.add(myPlacemark);
                            myMap.setCenter(coords);
                            if ($(window).width() > 767) {
                                var position = myMap.getGlobalPixelCenter();
                                myMap.setGlobalPixelCenter([ position[0] + 200, position[1] - 75]);
                            }

                            $(window).on('resize', function() {
                                if (myMap) {
                                    myMap.setCenter(coords);
                                    var position = myMap.getGlobalPixelCenter();
                                    if ($(window).width() > 767) {
                                        myMap.setGlobalPixelCenter([ position[0] + 200, position[1] - 75]);
                                    } else {
                                        myMap.setGlobalPixelCenter([ position[0], position[1] - 75]);
                                    }
                                }
                            });
                        }