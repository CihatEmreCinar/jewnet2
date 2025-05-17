import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  log(message: string, data?: any) {
  if (data !== undefined) {
    console.log(`[LOG]: ${message}`, data);
  } else {
    console.log(`[LOG]: ${message}`);
  }
}


  warn(message: string, data?: any) {
    console.warn(`[WARN]: ${message}`, data);
  }

  error(message: string, data?: any) {
    console.error(`[ERROR]: ${message}`, data);
  }
}
