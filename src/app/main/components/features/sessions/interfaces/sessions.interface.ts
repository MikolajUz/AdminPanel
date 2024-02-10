import { Injectable } from '@angular/core';
import { GenericAdapter } from '../../../../interfaces/API.interface';
import { unserialize } from '../../../../services/unserializePhP';

export interface RawSessions {
  id: string;
  an: string;
  da: string;
  wi: string;
  na: string;
  go: string;
}

export interface SessionsAPI {
  sessions: RawSessions[];
  debug: any[];
}

export class Sessions {
  constructor(
    public ID: string,
    public Name: string,
    public Website: string,
    public Creation_Date: string,
    public Guest: string,
    public Identifier: string,
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
export class SessionsAdapter extends GenericAdapter<Sessions> {
  override adapt(rawData: RawSessions): Sessions {
    const entryDataObject = unserialize(rawData.an);
    return new Sessions(
      rawData.id,
      rawData.na,
      rawData.wi,
      rawData.da,
      rawData.go,
      entryDataObject.x,
      entryDataObject.b,
      entryDataObject.w,
      entryDataObject.h,
      entryDataObject.wv,
      entryDataObject.wh
    );
  }
}
