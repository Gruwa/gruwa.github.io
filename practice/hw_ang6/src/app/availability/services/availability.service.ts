import {Injectable} from '@angular/core';
import {ITimeOff} from '../../shared/interfaces/timeoff.interface';
import {ActivatedRoute} from '@angular/router';

@Injectable()
export class AvailabilityService {

  constructor(private route: ActivatedRoute) {
  }

  public getAvailabilityActive(items: any, id: string): ITimeOff {
    return items['items'].find(item => item.id === id);
  }
}
