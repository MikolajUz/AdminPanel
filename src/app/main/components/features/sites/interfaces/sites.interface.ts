import { Injectable } from '@angular/core';
import { GenericAdapter } from '../../../../interfaces/API.interface';

export interface RawSites {
  id: string;
  wl_c: string;
  wl: string;
  ak: string;
  wy: string;
  ad: string;
  na: string;
  lm: string;
  cd: string;
  md: string;
}

export interface SitesAPI {
  sites: RawSites[];
  debug: any[];
}

export class Sites {
  constructor(
    public ID: string,
    public Name: string,
    public Owner: string,
    public Active: string,
    public Creation_Date: string,
    public Key: string
  ) {}
}

function checkValue(argument: string): string {
  if (argument === '1') {
    return 'no';
  } else if (argument === '2') {
    return 'yes';
  } else {
    return 'unknown';
  }
}

@Injectable({
  providedIn: 'root',
})
export class SitesAdapter extends GenericAdapter<Sites> {
  override adapt(rawData: RawSites): Sites {
    return new Sites(
      rawData.id,
      rawData.na,
      rawData.wl,
      checkValue(rawData.ak),
      rawData.cd,
      rawData.wy
    );
  }
}
