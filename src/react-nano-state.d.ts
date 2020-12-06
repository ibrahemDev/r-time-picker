

// for fix module
declare module 'react-nano-state' {
    export interface nanoStateContainer<A> {
        value:A 
        dispatchers :Map<any,any>
        dispatch:(arg:A)=>void
    }
    export type nanoStateValue<A> = [A,(arg:A)=>void]
    export function createValueContainer<A>(arg:A) :nanoStateContainer<A>
    export function useValue<A>(arg:nanoStateContainer<A>) :nanoStateValue<A>
}