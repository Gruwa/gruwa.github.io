declare namespace cad {
  // notification interfaces
  namespace notifications {
    interface INotification<T> {
      id: string;
      type: string;
      description: string;
      actionDate: string;
      generator: { type: string, name: string };
      actor: {id: string};
      object: INotificationObject<T>;
      target: { id: string };
      channels: string[];
    }

    interface INotificationObject<T> {
      type: string;
      name: string;
      details: T;
    }

    interface INotificationEventData<T> {
      type: string;
      notification?: INotification<T>;
      totalElements?: number;
    }

    interface IRegisterResponse {
      sessionId: string;
      totalElements: number;
    }

    interface IAcknowledgedResponse {
      ids: string[];
      totalElements: number;
    }
  }

  // by default $window doesn't have SSE object declarations, so have to add them manually
  interface IWindowService extends ng.IWindowService {
    EventSource: sse.IEventSourceStatic;
  }

  interface IWindow extends Window {
    EventSource: sse.IEventSourceStatic;
  }

  // declare server-sent events for ts compiler
  namespace sse {
    enum ReadyState {CONNECTING = 0, OPEN = 1, CLOSED = 2}

    interface IEventSourceStatic extends EventTarget {
      new (url: string, eventSourceInitDict?: IEventSourceInit);
      url: string;
      withCredentials: boolean;
      CONNECTING: ReadyState; // constant, always 0
      OPEN: ReadyState; // constant, always 1
      CLOSED: ReadyState; // constant, always 2
      readyState: ReadyState;
      onopen: Function;
      onmessage: (event: IOnMessageEvent) => void;
      onerror: Function;
      close: () => void;
    }

    interface IEventSourceInit {
      withCredentials?: boolean;
    }

    interface IOnMessageEvent {
      data: string;
    }
  }
}
