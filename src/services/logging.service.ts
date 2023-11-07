export class LoggingService{
    public logInfo(message: string): void{
        var date = new Date();
        var dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        var timeString = date.toLocaleTimeString();
        console.info('\x1b[33m%s\x1b[0m', `[${dateString} ${timeString}] ${message}`);
    }

    public logError(message: string): void{
        var date = new Date();
        var dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        var timeString = date.toLocaleTimeString();
        console.info('\x1b[31m%s\x1b[0m', `[${dateString} ${timeString}] ${message}`);
    }
}