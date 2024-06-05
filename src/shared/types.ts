export type PixelSize = `${number}px`

export enum VALIDATOR_STATE {
    NONE,
    VALID,
    INVALID
}

export type Validator = (input: string) => VALIDATOR_STATE

export enum LoadingState {
    IDLE,
    LOADING,
    RESOLVED,
    ERROR
}