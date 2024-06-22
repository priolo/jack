import FrameworkCard from "@/components/cards/FrameworkCard"
import { Example1Store } from "@/stores/stacks/example1"
import { useStore } from "@priolo/jon"
import { FunctionComponent } from "react"
import { Example1State } from "../../stores/stacks/example1"
import Button from "../../JackTest"



interface Props {
	store?: Example1Store
}

const Example1View: FunctionComponent<Props> = ({
	store,
}) => {

	// STORE
	const state = useStore<Example1State>(store)

	// HOOKs

	// HANDLER

	// RENDER
	return <FrameworkCard
		store={store}
	>
		<div>EXAMPLE 1</div>

		<div>{state.text}</div>

		<Button
			onClick={()=>console.log("click")}
		>CLICK ME</Button>

	</FrameworkCard>
}

export default Example1View

