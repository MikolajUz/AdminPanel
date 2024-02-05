import { Injectable } from '@angular/core';
import * as phpUnserializeModule from 'phpunserialize';

const phpUnserialize: any = phpUnserializeModule;

export interface RawEvents {
  se: string;
  po: string;
  ro: string;
  go: string;
  id: string;
  wa: null;
  da: string; // first visit date
  //wi_c: string; // don't show
  wi: string; // website
  na: string; // name
  //lm: string; // don't show
  //cd: string; // don't show creation date
  //md: string; //don't show, modification date
}

export interface EventsAPI {
  events: RawEvents[];
  debug: any[];
}

export class Guests {
  constructor(
    public ID: string,
    public Name: string,
    public Website: string,
    public Date: string,
    public Session: string,
    public Sub_Page: string,
    public Type: string,
    public Guest: string,
    public Value: string
  ) {}

  [key: string]: string;
}

@Injectable({
  providedIn: 'root',
})
export class GuestsAdapter {
  adapt(rawData: RawEvents): Guests {
    const entryDataObject = phpUnserialize(rawData.na); // Use phpUnserialize
    console.log('entryDataObject',entryDataObject)
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
