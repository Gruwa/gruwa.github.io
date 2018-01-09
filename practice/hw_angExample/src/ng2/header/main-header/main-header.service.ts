import {Injectable} from '@angular/core';
import {MainHeaderComponent} from './main-header.component';

/**
 * This service shares instance of the main header component
 */
@Injectable()
export class MainHeaderService {
  headerInstance: MainHeaderComponent;
}
