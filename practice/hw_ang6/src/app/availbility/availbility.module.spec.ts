import { AvailbilityModule } from './availbility.module';

describe('AvailbilityModule', () => {
  let availbilityModule: AvailbilityModule;

  beforeEach(() => {
    availbilityModule = new AvailbilityModule();
  });

  it('should create an instance', () => {
    expect(availbilityModule).toBeTruthy();
  });
});
