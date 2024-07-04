import Button from "@/components/buttons/Button"
import Dialog from "@/components/dialogs/Dialog"
import { ViewStore } from "@/stores/stacks/viewBase"
import { useStore } from "@priolo/jon"
import { FunctionComponent } from "react"
import cls from "./Dialog.module.css"



interface Props {
	store?: ViewStore
}

const AlertDialog: FunctionComponent<Props> = ({
	store,
}) => {

	// STORE
	const storeSa = useStore(store)

	// HOOKs

	// HANDLER
	const handleClose = (ok: boolean) => {
		storeSa.alert.open = false
		store.setAlert({ ...storeSa.alert })
		storeSa.alert.resolve(ok)
	}

	// RENDER
	const alert = storeSa.alert

	return <Dialog
		title={alert.title}
		width={200}
		open={alert.open}
		store={store}
		onClose={() => handleClose(false)}
	>

		<div className="lbl-prop-title">DANGER</div>

		<div className={cls.text}>
			{alert.body}
		</div>

		<div className="bars-alert-bg" style={{ height: 20 }} />

		<div style={{ display: "flex", gap: 15, marginTop: 10 }}>
			<Button
				children={alert.labelOk}
				onClick={() => handleClose(true)}
			/>
			<Button
				children={alert.labelCancel}
				onClick={() => handleClose(false)}
			/>
		</div>

	</Dialog>
}

export default AlertDialog
