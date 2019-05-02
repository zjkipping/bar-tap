import { Pipe, PipeTransform } from '@angular/core';

import { BAR_OPEN, BAR_CLOSED } from '@constants';

@Pipe({
  name: 'barHours'
})
export class BarHoursPipe implements PipeTransform {
  date: Date = new Date();
  days: string[] = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday'
  ];
  day: string = this.days[this.date.getDay()];
  currentHour: number = this.date.getHours();
  currentMin: number = this.date.getMinutes();

  transform(hours: any): string {
    if (hours[this.day].toLowerCase() === 'closed') {
      return BAR_CLOSED;
    }
    var range = hours[this.day].split('-');
    var openAMPM = range[0].replace(/[^A-Za-z]/g, '').toLowerCase();
    var closeAMPM = range[1].replace(/[^A-Za-z]/g, '').toLowerCase();
    var openTime;
    var closeTime;
    var currentTime = this.currentHour * 100 + this.currentMin;

    if (range[0].includes(':')) {
      openTime =
        Number(range[0].split(':')[0]) * 100 +
        Number(range[0].split(':')[1].replace(/\D/g, ''));
    } else {
      openTime = Number(range[0].replace(/\D/g, '')) * 100;
    }

    if (range[1].includes(':')) {
      closeTime =
        Number(range[1].split(':')[0]) * 100 +
        Number(range[1].split(':')[1].replace(/\D/g, ''));
    } else {
      closeTime = Number(range[1].replace(/\D/g, '')) * 100;
    }

    if (openAMPM === 'pm') {
      openTime += 1200;
    }
    if (closeAMPM === 'pm') {
      closeTime += 1200;
    }

    if (currentTime > openTime && currentTime < closeTime) {
      return BAR_OPEN;
    } else {
      return BAR_CLOSED;
    }
  }
}
