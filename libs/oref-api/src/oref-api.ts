import { singleton } from 'tsyringe';



export class OrefApiAlertsSettings {
  constructor(public readonly interval: number) {}
}

@singleton()
export class OrefApi {
  constructor(private settings: OrefApiAlertsSettings) {

    setInterval(async () => {
        
    }, settings.interval);
  }

  private async fetchAlerts() {}
}
