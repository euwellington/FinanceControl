import { connection } from '@/services/hub';
import { HubConnection, HubConnectionState } from '@microsoft/signalr';
import { makeAutoObservable } from 'mobx';

class HubConnectionStore {
  connect: Promise<HubConnection>;
  error: boolean;
  state: HubConnectionState | string = "";

  constructor() {
    makeAutoObservable(this);
    this.connect = this.init();
    this.error = false;
  }

  async init(): Promise<HubConnection> {
    const connectionHub: HubConnection = connection('hub');

    try {
      await connectionHub.start();
      this.error = false;
      this.state = connectionHub.state;
      console.log('>> system connected with hub service');

      connectionHub.onclose((error?: Error) => {
        this.error = !!error;
        connectionHub.start().catch((err) => console.error('Reconnection failed:', err));
        if (error) console.error(`Something went wrong: ${error}`);
      });
    } catch (e) {
      console.error('>> error connecting to hub service', e);
      this.error = true;
    }

    return connectionHub;
  }
}

export default HubConnectionStore;