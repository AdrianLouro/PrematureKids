import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  apiDateTimeToIonDateTimeStringDate(apiDateTime: any): string {
    return apiDateTime + '.000Z';
  }

  ionDateTimeDateToUTC(ionDateTimeDate: any): Date {
    return !this.dateIsValid(ionDateTimeDate) ? new Date(Date.UTC(
      ionDateTimeDate.year.value,
      ionDateTimeDate.month.value - 1,
      ionDateTimeDate.day.value,
      0,
      0,
      0,
      0
    )) : new Date(ionDateTimeDate);
  }

  dateIsValid(ionDateTimeDate: any): boolean {
    return !isNaN(new Date(ionDateTimeDate).getTime());
  }
}
