import { Injectable } from '@angular/core';
import * as phpUnserializeModule from 'phpunserialize';
import { GenericAdapter, RawData } from '../../../../interfaces/API.interface';
const phpUnserialize: any = phpUnserializeModule;

export interface RawGuests {
  id: string;
  an: string;
  da: string;
  wi_c: string;
  wi: string;
  na: string;
  lm: string;
  cd: string;
  md: string;
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
export class GuestsAdapter extends GenericAdapter<Guests> {
  override adapt(rawData: RawGuests): Guests {
    const entryDataObject = phpUnserialize(rawData.an);

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
