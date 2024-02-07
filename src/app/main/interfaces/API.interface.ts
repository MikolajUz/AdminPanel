import { Injectable } from '@angular/core';

export interface RawData {
  id: string;
  [key: string]: any;
}
@Injectable({
  providedIn: 'root',
})
export class GenericAdapter<T> {
  adapt(rawData: RawData): T {
    const adaptedData: any = {};

    for (const key in rawData) {
      if (rawData.hasOwnProperty(key)) {
        adaptedData[key] = rawData[key];
      }
    }

    return adaptedData as T;
  }
}
