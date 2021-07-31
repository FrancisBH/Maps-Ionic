import { Component, OnInit } from '@angular/core';

declare var google;

interface Marker {
  position: {
    lat: number,
    lng: number,
  };
  title: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  map: any;
directionsService = new google.maps.DirectionsService();
directionsDisplay = new google.maps.DirectionsRenderer();
// parque simon bolivar
origin = { lat: 0.3046256, lng: -78.2542291 };
// Parque la 93
destination = { lat: 0.2980018, lng: -78.2655191 };

  markers: Marker[] = [
    {
      position: {
        lat: 0.3046256,
        lng: -78.2542291,
      },
      title: 'Parque Simón Bolivar'
    },
    {
      position: {
        lat: 0.3046256,
        lng: -78.2542291,
      },
      title: 'Jardín Botánico'
    },
    {
      position: {
        lat: 0.3046256,
        lng: -78.2542291,
      },
      title: 'Parque la 93'
    },
    {
      position: {
        lat: 0.3046256,
        lng: -78.2542291,
      },
      title: 'Maloka'
    },
  ];

  constructor() {}

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map');
    const indicatorsEle: HTMLElement = document.getElementById('indicators');
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: this.origin,
      zoom: 12
    });
  
    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setPanel(indicatorsEle);
  
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      this.calculateRoute();
    });
  }

  private calculateRoute() {
    this.directionsService.route({
      origin: this.origin,
      destination: this.destination,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (response, status)  => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });
    }  

  renderMarkers() {
    this.markers.forEach(marker => {
      this.addMarker(marker);
    });
  }

  addMarker(marker: Marker) {
    return new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title
    });
  }

}
