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
    const adaptedData: RawData = Object.assign({}, rawData);

    return adaptedData as T;
  }
}
