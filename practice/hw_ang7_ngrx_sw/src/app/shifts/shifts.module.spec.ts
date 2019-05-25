import { ShiftsModule } from './shifts.module';

describe('AvailabilityModule', () => {
 let shiftsModule: ShiftsModule;

 beforeEach(() => {
   shiftsModule = new ShiftsModule();
 });

 it('should create an instance', () => {
   expect(shiftsModule).toBeTruthy();
 });
});
