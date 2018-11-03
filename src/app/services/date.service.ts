import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  apiDateTimeToIonDateTimeStringDate(apiDateTime: any): string {
    return new Date(apiDateTime).toISOString();
  }

  ionDateTimeDateToUTC(ionDateTimeDate: any): Date {
    console.log(0, ionDateTimeDate);

    if (!this.dateIsValid(ionDateTimeDate)) {
      console.log(1, ionDateTimeDate.day.value);
      console.log(2, ionDateTimeDate.month.value);
      console.log(3, ionDateTimeDate.year.value);
      console.log(4, new Date(Date.UTC(
        ionDateTimeDate.year.value,
        ionDateTimeDate.month.value - 1,
        ionDateTimeDate.day.value,
        0,
        0,
        0,
        0
      )));
    } else {
      console.log(5, ionDateTimeDate);
      console.log(6, new Date(ionDateTimeDate));
    }

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
