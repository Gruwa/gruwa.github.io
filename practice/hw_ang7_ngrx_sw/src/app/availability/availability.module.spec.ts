import { AvailabilityModule } from './availability.module';

describe('AvailabilityModule', () => {
 let availbilityModule: AvailabilityModule;

 beforeEach(() => {
   availbilityModule = new AvailabilityModule();
 });

 it('should create an instance', () => {
   expect(availbilityModule).toBeTruthy();
 });
});
