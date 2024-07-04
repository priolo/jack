import { ViewStore } from "@/stores/stacks/viewBase"
import { FunctionComponent, useMemo } from "react"
import { Example1Store } from "../stores/stacks/example1"
import { Example2Store } from "../stores/stacks/example2"
import { DOC_TYPE } from "../types"
import Example1View from "./example1/View"
import Example2View from "./example2/View"
import Example3View from "./example3/View"



interface DocCmpProps {
	view: ViewStore,
}

/** Seleziona il contenuto da visualizzare in base al tipo di VIEW */
const PolymorphicCard: FunctionComponent<DocCmpProps> = ({
	view,
}) => {
	const content = useMemo(() => {
		switch (view.state.type) {
			case DOC_TYPE.EXAMPLE1:
				return <Example1View store={view as Example1Store} />
			case DOC_TYPE.EXAMPLE2:
				return <Example2View store={view as Example2Store} />
			case DOC_TYPE.EXAMPLE3:
				return <Example3View store={view as Example2Store} />
	
		}
	}, [view])
	return content
}

export default PolymorphicCard