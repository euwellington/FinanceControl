import { HubConnectionBuilder, HubConnection, HttpTransportType, LogLevel } from '@microsoft/signalr';

const baseURL = import.meta.env.VITE_API_HUB;


export function connection(path: string): HubConnection {
  return new HubConnectionBuilder()
    .withUrl(`${baseURL}/${path}`, {  
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
    }) 
    .configureLogging(LogLevel.None)
    .withAutomaticReconnect()
    .build(); 
} 