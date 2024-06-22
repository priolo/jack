import FrameworkCard from "@/components/cards/FrameworkCard"
import { useStore } from "@priolo/jon"
import { FunctionComponent } from "react"
import { Example2State, Example2Store } from "@/stores/stacks/example2"
import Button from "@/components/buttons/Button"



interface Props {
	store?: Example2Store
}

const Example2View: FunctionComponent<Props> = ({
	store,
}) => {

	// STORE
	const state = useStore<Example2State>(store)

	// HOOKs

	// HANDLER

	// RENDER
	return <FrameworkCard
		store={store}
	>
		<div>EXAMPLE 2</div>

		<Button
			onClick={()=>console.log("click")}
		>CLICK ME</Button>
		
	</FrameworkCard>
}

export default Example2View

