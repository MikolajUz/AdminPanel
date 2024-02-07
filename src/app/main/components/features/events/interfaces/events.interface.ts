import { Injectable } from '@angular/core';

interface wa {
  e: string;
  h: string;
  ha: string;
  w: string;
  wh: string;
  wv: string;
  x: string;
  y: string;
}

export interface RawEvents {
  id: string;
  se: string;
  po: string;
  ro: string;
  go: string;
  wi: string;
  wa: wa | null;
  da: string;
  na: string;
}

export interface EventsAPI {
  events: RawEvents[];
  debug: any[];
}

export class Events {
  constructor(
    public ID: string,
    public Name: string,
    public Website: string,
    public Sub_Page: string,
    public Type: string,
    public Value: string,
    public Session: string,
    public Guest: string,
    public Date: string
  ) {}

  [key: string]: string;
}

@Injectable({
  providedIn: 'root',
})
export class EventsAdapter {
  adapt(rawData: RawEvents): Events {
    let wa = '';
    rawData.wa ? (wa = rawData.wa.e) : null;
    return new Events(
      rawData.id,
      rawData.na,
      rawData.wi,
      rawData.po,
      rawData.ro,
      wa,
      rawData.se,
      rawData.go,
      rawData.da
    );
  }
}
