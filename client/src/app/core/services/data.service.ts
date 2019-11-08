import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class DataService {
  private dataObs$ = new Subject();

  getData() {
    return this.dataObs$;
  }

  updateData(data: boolean) {
    this.dataObs$.next(data);
  }
}
