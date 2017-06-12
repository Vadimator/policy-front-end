export interface AppStateReducerInterface {
    name(): string;
    reducer(state: any, action: any): any;
}