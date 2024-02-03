import { Injectable } from '@angular/core';
import * as phpUnserializeModule from 'phpunserialize';

const phpUnserialize: any = phpUnserializeModule;

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
    public First_Visit_Date: string,
    public Browser_Info: string,
    public Width: string,
    public Height: string,
    public Width_Vp: string,
    public Height_Vp: string
  ) {}

  [key: string]: string;
}

@Injectable({
  providedIn: 'root',
})
export class GuestsAdapter {
  adapt(rawData: RawGuests): Guests {
    const entryDataObject = phpUnserialize(rawData.an); // Use phpUnserialize

    return new Guests(
      rawData.id,
      rawData.na,
      rawData.wi,
      rawData.da,
      entryDataObject.b,
      entryDataObject.w,
      entryDataObject.h,
      entryDataObject.wv,
      entryDataObject.wh
    );
  }
}
