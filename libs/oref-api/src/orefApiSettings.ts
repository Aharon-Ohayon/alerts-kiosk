export class OrefApiAlertsSettings {
    constructor(
        public readonly interval: number,
        public readonly interestingZones: string[],
        public readonly liveAlertsMinutesRetention: number
    ) {}
}
