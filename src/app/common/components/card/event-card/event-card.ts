import { Component, input } from '@angular/core';
import { EventCardData } from '@common/interfaces';

@Component({
  selector: 'event-card',
  imports: [],
  templateUrl: './event-card.html',
  styleUrl: './event-card.scss'
})
export class EventCard {

  data = input.required<EventCardData>();

}
