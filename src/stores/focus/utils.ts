import { ViewStore } from "../stacks/viewBase"


/**
 * Restituisce l'elemento HTML della CARD
 */
export function getFrameworkElement(view: ViewStore): HTMLElement {
	const elemCard = document.getElementById(view.state.uuid)?.querySelector('.jack-framework')
	return elemCard as HTMLElement
}

/**
 * Restituisce gli elementi focusabili della CARD
 */
function getFocusableElements(view: ViewStore): { bodyIndex: number, elements: HTMLElement[] } {
	const elemCard = getFrameworkElement(view)
	if (!elemCard) return { bodyIndex: -1, elements: [] }

	const elemActions = [...elemCard.querySelectorAll('.jack-framework-actions [tabindex]')]
		.filter((e: HTMLElement) => e.tabIndex >= 0)
	const elemBody = [...elemCard.querySelectorAll('.jack-framework-body [tabindex]')]
		.filter((e: HTMLElement) => e.tabIndex >= 0)

	return {
		bodyIndex: elemActions.length,
		elements: [...elemActions, ...elemBody] as HTMLElement[]
	}
}

/**
 * da il fuoco all'elemento in posizione
 * restituisce true se l'elemento esiste e ha ricevuto il fuoco
 */
export function focusPosition(view: ViewStore, position: number): boolean {
	const focusable = getFocusableElements(view)
	if (focusable.elements.length <= position || position < 0) return false
	const elem = focusable.elements[position]
	elem?.focus()
	elem?.scrollIntoView({ behavior: "smooth" });
	return true
}

/**
 * Individua e da il fuoco al primo elemento di una CARD
 * restituisce l'indice dell'elemento tra gli elementi focusabili
 */
export function focusAuto(view: ViewStore): number {
	const focusable = getFocusableElements(view)
	if (!focusable.elements || focusable.elements.length == 0) return -1
	let indexFocus = focusable.elements.indexOf(document.activeElement as HTMLElement)
	if (indexFocus == -1) focusable.elements.findIndex(e => e.autofocus)
	if (indexFocus == -1) indexFocus = focusable.bodyIndex
	if (indexFocus == -1) indexFocus = 0
	const elem = 	focusable.elements[indexFocus]
	elem?.focus()
	elem?.scrollIntoView({ behavior: "smooth" });
	return indexFocus
}

