import {CadUsernamePipe} from './username.pipe';

describe('username pipe', () => {
  let filter: CadUsernamePipe;

  beforeEach(() => {
    filter = new CadUsernamePipe();
  });

  it('should return input if string does not match', () => {
    expect(filter.transform('notlastfirstname')).to.equal('notlastfirstname');
  });

  it('should transform username in first and last name if match ', () => {
    expect(filter.transform('firstname.lastname')).to.equal('Firstname Lastname');
  });
});
