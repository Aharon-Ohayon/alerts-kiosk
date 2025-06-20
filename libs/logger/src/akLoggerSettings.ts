export class AkLoggerSettings {
    constructor(
        public readonly minimumLevel: 'debug' | 'info' | 'warn' | 'error'
    ) {}
}
