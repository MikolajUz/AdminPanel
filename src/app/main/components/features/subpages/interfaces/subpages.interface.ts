import { Injectable } from '@angular/core';
import { GenericAdapter } from '../../../../interfaces/API.interface';

export interface RawSubpages {
  id: string;
  na: string;
  se: string;
  wi: string;
  go: string;
  da: string;
  cz: string;
}

export interface SubpagesAPI {
  pages: RawSubpages[];
  debug: any[];
}

export class Subpages {
  constructor(
    public ID: string,
    public URL: string,
    public Session: string,
    public Website: string,
    public Guest: string,
    public Visit_Date: string,
    public Loading_Time: string
  ) {}
}

@Injectable({
  providedIn: 'root',
})
export class SubpagesAdapter extends GenericAdapter<Subpages> {
  override adapt(rawData: RawSubpages): Subpages {
    return new Subpages(
      rawData.id,
      rawData.na,
      rawData.se,
      rawData.wi,
      rawData.go,
      rawData.da,
      rawData.cz
    );
  }
}
