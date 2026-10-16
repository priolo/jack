---
id: "list"
title: 'List'
sidebar_label: 'List'
sidebar_position: 4
---

Ok! Let's create another CARD with something useful inside.  
For example, a list of USERs.  
This time we'll do it outside of `App.tsx`  
and in JS to simplify reading.  

First, let's create the SETUP of the STORE.  
We said a simple list of USERs that can be modified:  
`UserListStore.jsx`

```js title="UserListStore.jsx"
import { mixStores } from "@priolo/jon"
import { viewSetup } from "@priolo/jack"

const setup = {
	state: {
		// all USERs
		all: [],
		// the type of card. It will be useful in the `Render` of `CardsGroup`
		type: "user-list",
	},

	mutators: {
		// changes the "all" property and the state of the STORE
		setAll: (all) => ({ all }),
	},
}

// this STORE derives from `viewSetup`
const userSetup = mixStores(viewSetup, setup)

export default userSetup
```

Let's create our React component  
`UsersListCard.jsx`

```jsx title="UsersListCard.jsx"
import { FrameworkCard, Header } from "@priolo/jack"

const UserListCard = ({
	// the instance of the STORE derived from the previous setup
    store,
}) => {
    return <FrameworkCard
        store={store}
        headerRender={<Header store={store} />}
    >

        {store.state.all.map(user => (
            <div>{user.name}</div>
        ))}

    </FrameworkCard>
}

export default UserListCard
```

Finally, the button to insert this card into our DECK  
`App.tsx`

```tsx title="App.tsx"
const App: FunctionComponent = () => {

	// HANDLERS
	/** insert a new CARD to the DECK of type EXAMPLE */
	const handleAdd = () => {
		const view = createStore(cardSetup) as ViewStore
		deckCardsSo.add({ view })
	};
	const handleAddUserList = () => {
		const view = createStore(userSetup)
		view.setAll([
			{ name: "Ivano", surname: "Iorio" },
			{ name: "Edoardo", surname: "Iorio" },
			{ name: "Alfredo", surname: "Iorio" },
		])
		deckCardsSo.add({ view })
	}

	// RENDER
	return (
		<div style={cssRoot}>

			<div style={{ display: "flex", flexDirection: "column" }}>
				<Button onClick={handleAdd}>ADD CARD</Button>
				<Button onClick={handleAddUserList}>USERS</Button>
			</div>

			<div style={cssDeck}>
				<CardsGroup
					cardsStore={deckCardsSo}
					// based on `view.state.type` of the STORE 
					// render the correct React CARD
					Render={({ view }) => (
						{
							"user-list": <UserListCard store={view} />,
							// "other-type": <OtherComponent store={view} />,
							// ...
						}[view.state.type] ?? <CardView store={view} /> /* <<= default */
					)}
				/>
			</div>

			<DragCmp />

		</div>
	)
}
```

...and that's all... [here is the code](https://codesandbox.io/p/sandbox/04-list-kzcg2s?file=%2Fsrc%2FApp.tsx%3A14%2C4)