export abstract class EventArgs {
    protected toString(): string {
        return JSON.stringify(this, undefined, 2);
    }
}
