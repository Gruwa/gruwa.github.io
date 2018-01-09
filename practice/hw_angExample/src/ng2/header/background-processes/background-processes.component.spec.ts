import * as moment from 'moment';
import {EventEmitter} from '@angular/core';
import {fakeAsync, tick} from '@angular/core/testing';
import {GlobalEventsService} from '../../common';
import {BackgroundProcessesComponent, BackgroundProcessDismissPopupComponent, IBackgroundProcess} from './';

describe('UsersCreateComponent', () => {
  let component: BackgroundProcessesComponent;

  // component dependencies
  let windowService;
  let currentUserService;
  let modalService;
  let globalEventsService;
  let supportService;
  let backgroundProcessesService;
  let loggerService;

  // modal mock
  const processDismissPopupComponent = new BackgroundProcessDismissPopupComponent();

  // data mock
  const progressProcess: IBackgroundProcess = {
    id: 1,
    name: 'process_1',
    appId: 'app_1',
    processType: 'type_1',
    status: 'PROGRESS',
    processLink: 'link_1',
    actionTime: '2000-06-02T09:30:42',
    username: 'user_1',
    acknowledged: false
  };
  const successProcess: IBackgroundProcess = {
    id: 2,
    name: 'process_2',
    appId: 'app_2',
    processType: 'type_2',
    status: 'SUCCESS',
    processLink: 'link_2',
    actionTime: '2000-06-02T09:30:42',
    username: 'user_2',
    acknowledged: false
  };
  const failedProcess: IBackgroundProcess = {
    id: 3,
    name: 'process_3',
    appId: 'app_3',
    processType: 'type_3',
    status: 'FAILED',
    processLink: 'link_3',
    actionTime: '2000-06-02T09:30:42',
    username: 'user_3',
    acknowledged: false
  };

  beforeEach(() => {
    windowService = {
      location: {
        href: null
      }
    };
    currentUserService = {
      user: {
        login: 'userLogin'
      }
    };
    modalService = {
      open: sinon.stub()
    };
    loggerService = {
      error: sinon.stub()
    };
    globalEventsService = new GlobalEventsService();
    supportService = {
      openPopup: sinon.stub()
    };
    backgroundProcessesService = {
      fetch: sinon.stub(),
      acknowledge: sinon.stub(),
      startPolling: sinon.stub(),
      stopPolling: sinon.stub()
    };

    component = new BackgroundProcessesComponent(
      windowService,
      currentUserService,
      modalService,
      loggerService,
      globalEventsService,
      supportService,
      backgroundProcessesService
    );
  });

  function expectDataRequested() {
    it('should load success processes for last hour for current user', () => {
      expect(backgroundProcessesService.fetch).calledWithExactly({
        filter_username_eq: currentUserService.user.login,
        filter_status_in: 'SUCCESS',
        filter_acknowledged_eq: false,
        filter_actionTime_gt: moment.utc().subtract(1, 'hours').format('YYYY-MM-DDThh:mm:ss'),
        filter_actionTime_le: moment.utc().format('YYYY-MM-DDThh:mm:ss')
      });
    });

    it('should load progress and failed processes for current user', () => {
      expect(backgroundProcessesService.fetch).calledWithExactly({
        filter_username_eq: currentUserService.user.login,
        filter_status_in: 'PROGRESS,FAILED',
        filter_acknowledged_eq: false
      });
    });
  }

  describe('init', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    expectDataRequested();
  });

  describe('data load', () => {
    function simulateDataLoad(data) {
      backgroundProcessesService.fetch.onFirstCall().returns(Promise.resolve(data));
      backgroundProcessesService.fetch.onSecondCall().returns([]);
      component.ngOnInit();
      tick();
    }

    it('should save processes as a state of component', fakeAsync(() => {
      const data = [progressProcess, failedProcess, successProcess];
      simulateDataLoad(data);
      expect(component.processes).to.have.deep.members(data);
    }));

    it('should be in "failed" state if there is at least one failed process', fakeAsync(() => {
      simulateDataLoad([progressProcess, failedProcess, successProcess]);
      expect(component.state).to.equal('failed');
    }));

    it('should be in "progress" state if there is at least one process in progress and no failed', fakeAsync(() => {
      simulateDataLoad([progressProcess, successProcess]);
      expect(component.state).to.equal('progress');
    }));

    it('should be in "success" state if there are no progress,failed processes', fakeAsync(() => {
      simulateDataLoad([successProcess]);
      expect(component.state).to.equal('success');
    }));

    it('should be in "success" state if there are no processes', fakeAsync(() => {
      simulateDataLoad([]);
      expect(component.state).to.equal('success');
    }));

    it('should not displayed if there are no processes', fakeAsync(() => {
      simulateDataLoad([]);
      expect(component.isDisplayed).to.be.false;
    }));
  });

  describe('process opening', () => {
    beforeEach(() => {
      component.processes = [failedProcess];
      component.openProcess(failedProcess.id);
    });

    it('should redirect to proccess link', () => {
      expect(windowService.location.href).to.equal(failedProcess.processLink);
    });

    it('should close dropdown', () => {
      expect(component.isOpened).to.be.false;
    });
  });

  describe('process dismissing', () => {
    let modal;

    beforeEach(() => {
      modal = {
        componentInstance: processDismissPopupComponent,
        result: Promise.resolve(),
        close: sinon.stub()
      };
      modalService.open.returns(modal);
      component.processes = [failedProcess];
      component.dismissProcess(failedProcess.id);
    });

    function expectPopupClosed() {
      it('should close warning popup', () => {
        expect(modal.close).calledOnce;
      });
    }

    it('should open warning popup', () => {
      expect(modalService.open).calledWithExactly(BackgroundProcessDismissPopupComponent, {size: 'lg'});
    });

    it('should open supply process name to modal content', () => {
      expect(processDismissPopupComponent.processName).to.equal(failedProcess.name);
    });

    describe('support request', () => {
      beforeEach(() => {
        processDismissPopupComponent.requestSupport();
      });

      it('should aknowledge process', () => {
        expect(supportService.openPopup).calledOnce;
      });

      it('should close dropdown', () => {
        expect(component.isOpened).to.be.false;
      });

      expectPopupClosed();
    });

    describe('cancel', () => {
      beforeEach(() => {
        processDismissPopupComponent.cancel();
      });

      expectPopupClosed();
    });
  });

  describe('actions after popup was opened', () => {
    const process1 = {...successProcess};
    const process2 = {...successProcess, id: successProcess.id + 1};

    beforeEach(fakeAsync(() => {
      backgroundProcessesService.fetch.onFirstCall().returns(Promise.resolve([process1, process2]));
      backgroundProcessesService.fetch.onSecondCall().returns([]);
      component.onToggle(true);
      tick();
    }));

    expectDataRequested();

    it('should mark success processes as read', () => {
      expect(backgroundProcessesService.acknowledge).calledWithExactly([process1.id, process2.id]);
    });
  });

  describe('real time updates', () => {
    beforeEach(fakeAsync(() => {
      backgroundProcessesService.fetch.returns(Promise.resolve());
      component.ngOnInit();
      tick();
    }));

    it('should subscribe for updates', () => {
      expect(backgroundProcessesService.startPolling).calledOnce;
    });

    it('should add new process if it does not exist', () => {
      const newProcess = {...progressProcess};
      component.processes = [];
      globalEventsService.broadcast('backgroundProcesses:newItem', newProcess);

      expect(component.processes).to.have.deep.members([newProcess]);
    });

    it('should patch process if it exists', () => {
      const newProcess = {...progressProcess, status: 'SUCCESS'};
      component.processes = [progressProcess];
      globalEventsService.broadcast('backgroundProcesses:newItem', newProcess);

      expect(component.processes).to.have.deep.members([newProcess]);
    });
  });

  describe('failure case', () => {
    it('should handle failure to avoid "Uncaught (in promise)" error', fakeAsync(() => {
      backgroundProcessesService.fetch.returns(Promise.reject('zzz'));
      component.ngOnInit();
      tick();
      expect(loggerService.error).calledOnce;
    }));
  });

});
