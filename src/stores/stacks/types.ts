export enum VIEW_SIZE {
	NORMAL,
	COMPACT,
	ICONIZED,
}

// export enum VIEW_PARAMS {
// 	POSITION = "pos",
// }

// export enum VIEW_VARIANTS {
// 	DEFAULT = "",
// 	LINK = "_link",
// }

export enum LOAD_MODE {
	MANUAL,
	PARENT,
	POLLING
}

export enum LOAD_STATE {
	IDLE,
	LOADING,
	ERROR
}
export enum MESSAGE_TYPE {
	INFO = "info",
	SUCCESS = "success",
	WARNING = "warn",
	ERROR = "error"
}

export interface SnackbarState {
	open: boolean
	title?: string
	body?: string
	type?: MESSAGE_TYPE
	timeout?: number
}
export interface AlertState {
	open?: boolean
	title: string
	body: string
	labelOk?: string
	labelCancel?: string
	resolve?: (value: boolean) => void
}
