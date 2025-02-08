import { Component, DestroyRef, inject, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent {
  places = signal<Place[] | undefined>(undefined);
  isFetching = signal(false);
  error = signal('');
  private placesService = inject(PlacesService)
  private destroyRef = inject(DestroyRef);

  // another way to provide httpClient
  // constructor(private httpClient: HttpClient) {}

  // execute once when application is ready.
  ngOnInit() {
    this.isFetching.set(true);
    const subscription = 
    this.placesService.loadAvailablePlaces().subscribe({
        next: (places) => {
          //console.log(events.body?.places);
          this.places.set(places);
        },
        error: (error: Error) => {
          // console.log(error);
          this.error.set(error.message);
        },
        complete: () => {
          this.isFetching.set(false);
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onSelectPlace(selectedPlace: Place)
  {
    const subscription = this.placesService.addPlaceToUserPlaces(selectedPlace)
    .subscribe({
      next: (resData) => console.log(resData),  
      error: (error: Error) =>{ 
        console.log(error)
    }});

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }
}