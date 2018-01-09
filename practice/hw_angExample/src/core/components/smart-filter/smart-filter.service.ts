interface ISmartFilterSlot {
  name: string;
  data: any;
  subscribers: Function[];
}

export class SmartFilterService {
  slots: ISmartFilterSlot[] = [];

  constructor() {
    'ngInject';
  }

  initSlot(name: string) {
    let slot: ISmartFilterSlot = _.find(this.slots, {name});

    if (slot) {
      return slot;
    }

    slot = {
      name,
      data: {},
      subscribers: []
    };
    this.slots.push(slot);

    return slot;
  }

  setSlotData(name: string, data: any) {
    let slot: ISmartFilterSlot = _.find(this.slots, {name});

    if (!slot) {
      throw `can't find slot`;
    }

    slot.data = data;

    _.each(slot.subscribers, (subscriber) => {
      subscriber(data);
    });
  }

  subscribeToSlot(name: string, fn: Function) {
    let slot: ISmartFilterSlot = _.find(this.slots, {name});

    if (!slot) {
      throw `can't find slot`;
    }

    slot.subscribers.push(fn);
  }

}
