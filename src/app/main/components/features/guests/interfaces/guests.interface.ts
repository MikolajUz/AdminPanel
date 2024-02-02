import { Injectable } from '@angular/core';

export interface RawGuests {
  id: string;
  an: string; // entry data
  da: string; // first visit date
  wi_c: string; // don't show
  wi: string; // website
  na: string; // name
  lm: string; // don't show
  cd: string; // don't show creation date
  md: string; //don't show, modification date
}

export interface GuestsAPI {
  guests: RawGuests[];
  debug: any[];
}

export class Guests {
  constructor(
    public ID: string,
    public Name: string,
    public Website: string,
    public Entry_Data: string,
    public First_Visit_Date: string
  ) {}
}

@Injectable({
  providedIn: 'root',
})
export class GuestsAdapter {
  adapt(rawData: RawGuests): Guests {
    return new Guests(
      rawData.id,
      rawData.na,
      rawData.wi,
      rawData.an,
      rawData.da
    );
  }
}
