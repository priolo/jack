import focusSo from "."
import docsSo from "../docs"
import { getNear } from "../docs/utils"
import { VIEW_SIZE } from "../stacks/types"
import { getFrameworkElement } from "./utils"


/**
 * Inizializza il listener per i tasti
 */
export function startListener() {
	document.addEventListener('keydown', (event) => {
		focusSo.state.shiftKey = event.shiftKey
		focusSo.state.altKey = event.altKey
		focusSo.state.ctrlKey = event.ctrlKey

		let view = focusSo.state.view
		const inZen = !!view && docsSo.state.zenCard == view

		if (inZen && event.code == "Escape") {
			docsSo.zenClose()
			return
		}

		if (!event.altKey) return
		focusSo.setShow(true)
		if (event.code == "AltLeft" || event.code == "AltRight") {
			event.preventDefault()
			return
		}

		if (!view && (event.code == "ArrowLeft" || event.code == "ArrowRight")) {
			view = docsSo.state.allDeck?.[0]?.state.all[0]
		}
		if (!view) return

		if (event.ctrlKey) {
			if (event.code == "ArrowLeft") {
				const group = view.state.group
				const index = group.getIndexByView(view)
				group.move({ view, index: index - 1 })
			} else if (event.code == "ArrowRight") {
				const group = view.state.group
				const index = group.getIndexByView(view)
				group.move({ view, index: index + 2 })
			} else if (event.code == "ArrowUp") {
				if (view.state.size == VIEW_SIZE.COMPACT) {
					view.setSize(VIEW_SIZE.NORMAL)
				} else {
					docsSo.zenOpen(view)
				}
			} else if (event.code == "ArrowDown") {
				if (inZen) {
					docsSo.zenClose()
				} else {
					focusSo.state.view.setSize(VIEW_SIZE.COMPACT)
				}
			}
			return
		}
		
		switch (event.code) {

			case 'ArrowUp': {
				if (!focusSo.moveVert(true)) return
				break
			}
			case 'ArrowDown': {
				if (!focusSo.moveVert(false)) return
				break
			}
			case 'ArrowLeft': {
				focusSo.moveHoriz(true)
				break
			}
			case 'ArrowRight': {
				focusSo.moveHoriz(false)
				break
			}

			// CLOSE
			case "Backspace": {
				if (inZen) { docsSo.zenClose(); break }
				const card = getNear(view) ?? getNear(view, true)
				if (!!card) focusSo.focus(card)
				view?.onRemoveFromDeck()
				break
			}

			// DETACH
			case "KeyD": {
				if (inZen) { docsSo.zenClose(); break }
				if (!view.state.parent && !!view.state.linked) {
					view.state.group.detach(view.state.linked)
				} else {
					view.state.group.detach(view)
				}
				break;
			}

			// FINDER
			case "KeyF": {
				const inputElem = getFrameworkElement(view).querySelector('.jack-cmp-txt-finder input') as HTMLInputElement
				if (!inputElem) return
				inputElem?.focus()
				break;
			}

			// NUMBER SHORTCUTS
			default: {
				const digit = parseInt(event.code.replace(event.code.startsWith("Digit") ? "Digit" : "Numpad", ""))
				if (isNaN(digit)) return
				const btnElem = getFrameworkElement(view).querySelector(`.jack-focus-${digit}`) as HTMLElement
				if (!btnElem) return
				btnElem.focus()
				btnElem.click()
				break;
			}
		}

		event.preventDefault()

	})
	document.addEventListener('keyup', (event) => {
		if (!event.altKey) focusSo.setShow(false)
		focusSo.state.shiftKey = event.shiftKey
		focusSo.state.altKey = event.altKey
		focusSo.state.ctrlKey = event.ctrlKey
	})

}