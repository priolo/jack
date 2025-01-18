import { deepEqual } from "@/utils/object";
import { ViewStore } from "../stacks/viewBase";



/**
 * Cicla tutte le VIEWs di un array compresi i children
 * se il callback restituisce un valore allora termina e restituisce il valore 
 * se il callback restituisce null continua
 */
export function forEachViews<T>(views: ViewStore[], callback: (view: ViewStore) => T): T {
	if (!views) return null
	for (const view of views) {
		const ret = forEachLink(view, callback)
		if (ret != null) return ret
	}
	return null
}
function forEachLink<T>(view: ViewStore, callback: (view: ViewStore) => T): T {
	if (!view) return null
	const ret = callback(view)
	if (ret != null && ret !== false) return ret
	if (view.state.linked) return forEachLink(view.state.linked, callback)
	return null
}

/** 
 * restituisce una VIEW tramite l'id cercando nei "child" in un array di VIEW 
 * in pratica è un findAll specializzato sull'id
 */
export function getById(views: ViewStore[], id: string): ViewStore {
	return forEachViews(views, (view) => {
		if (view.state.uuid === id) {
			return view
		}
	})
}

/** cerca su tutte le CARD (anche i children) uno STATE */
export function findAll(views: ViewStore[], state: any) {
	const ret: ViewStore[] = []
	forEachViews(
		views,
		(view) => {
			if (deepEqual(state, view.state)) ret.push(view)
		}
	)
	return ret
}

/** cerca nel DECK solo le CARD senza parent */
export function findInRoot(views: ViewStore[], state: any) {
	return forEachViews(
		views,
		(view) => deepEqual(state, view.state) ? view : null
	)
}


/**
 * cicla i parent 
 * se c'e' un return si ferma e restituisce
 * se il return è null o false continua
 * @param callback se non definito prende il parent che sta alla radice
 */
export function findParent(
	view: ViewStore,
	callback: (view: ViewStore) => ViewStore | boolean = (v) => v.state?.parent == null ? v : null
): ViewStore {
	let parent = view
	while (parent != null) {
		const ret = callback(parent)
		if (ret != null && ret !== false) return ret as ViewStore
		parent = parent.state.parent
	}
	return null
}
/** 
 * cicla tutti i parent di "view" 
 */
export function forEachParent(view: ViewStore, callback: (view: ViewStore) => void): void {
	let parent = view?.state.parent
	while (parent != null) {
		callback(parent)
		parent = parent.state.parent
	}
}

/** 
 * Restituisce il deep di una view rispetto i suoi parents 
 */
export function numLinkedParent(view: ViewStore): number {
	let count = 0
	forEachParent(view, () => count++)
	return count
}

/**
 * restituisce il PARENT in STACK d una VIEW
 */
export function getRoot(view: ViewStore): ViewStore {
	let parent: ViewStore = null
	forEachParent(view, (p) => parent = p)
	return parent
}

/** genera un uuid per un DOC */
export function createUUID(): string {
	var dt = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
		/[xy]/g,
		(c) => {
			let r = (dt + (Math.random() * 16)) % 16 | 0;
			dt = Math.floor(dt / 16);
			return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
		}
	);
	return uuid;
}

/**
 * restituisce la VIEW precedente o successiva
 */
export function getNear(view: ViewStore, left: boolean = false): ViewStore {
	// se necessita ho un parent o un linked uso quelli
	if (left && !!view.state.parent) return view.state.parent
	if (!left && view.state.linked) return view.state.linked

	const group = view?.state.group
	if (!group) return null


	if (left) {
		let nextIndex = group.getIndexByView(view) - 1
		if (nextIndex < 0) nextIndex = group.state.all.length - 1
		return forEachLink(group.state.all[nextIndex], v => v.state?.linked == null ? v : null)
	}

	const parent = findParent(view)
	let nextIndex = group.getIndexByView(parent) + 1
	if (nextIndex >= group.state.all.length) nextIndex = 0
	return group.state.all[nextIndex]
}
