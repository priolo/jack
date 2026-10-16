---
id: "linked"
title: 'Linked'
sidebar_label: 'Linked'
sidebar_position: 5
---

Let's say we want to see the details of a USER.  
Clicking on the USERs list could make a detail CARD appear next to the list itself.  
Let's do it!

As usual, let's create the STORE  
`UserDetailStore.js`

```js title="UserDetailStore.js"
import { mixStores } from "@priolo/jon"
import { viewSetup } from "@priolo/jack"

const setup = {

	state: {

		// USER in detail
		user: null,

		// the type of card. It will be useful in the `Render` of `CardsGroup`
		type: "user-detail",
	},

	mutators: {
		// set the "user in detail". Note that it returns the partial "state"
		setUser: (user) => ({ user }),
	},

}

// this STORE derives from `viewSetup`
const userDetailSetup = mixStores(viewSetup, setup)
export default userDetailSetup
```

Here we simply display the two properties of "user"  
The interesting thing is when we click on a "user" in the list  
`UserDetailCard.jsx`

```js
import { FrameworkCard, Header } from "@priolo/jack"

const UserDetailCard = ({
    store,
}) => {

    const user = store.state.user

    return <FrameworkCard
        store={store}
        headerRender={<Header store={store} />}
    >
        <div>NAME: {user.name}</div>
        <div>SURNAME: {user.surname}</div>
    </FrameworkCard>
}

export default UserDetailCard
```

Here we simply display the two properties of "user"  
The interesting thing is when we click on a "user" in the list  
`UsersListCard.jsx`

```jsx title="UsersListCard.jsx"
import { FrameworkCard, Header } from "@priolo/jack"
import { createStore } from "@priolo/jon"
import userDetailSetup from "./UserDetailStore"

const UserListCard = ({
    store,
}) => {

    // HANDLER
    const handleUserClick = (user) => {
        const detailStore = createStore(userDetailSetup)
        detailStore.state.user = user
        const deck = store.state.group
        deck.addLink({ 
            parent: store, 
            view: detailStore, 
            anim: true 
        })
    }

    // RENDER
    return <FrameworkCard
        store={store}
        headerRender={<Header store={store} />}
    >
        {store.state.all.map(user => (
            <div key={user.id} onClick={() => handleUserClick(user)}>
				{user.name}
			</div>
        ))}
    </FrameworkCard>
}

export default UserListCard
```

So by pressing on a "user" I call `handleUserClick`
which:

- creates a new STORE from the SETUP `userDetailSetup`
- assigns the selected user as its state
- takes into consideration the DECK where the "USER LIST STORE" is located
- inside the DECK inserts the created "USER DETAIL STORE" as a link of the "USER LIST STORE"

So the user detail card appears "linked" to the user list CARD

Don't forget to insert the CARD in the DECK render in  
`App.tsx`

```tsx title="App.tsx"

	...

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
>>>							"user-detail": <UserDetailCard store={view} />,
							// ...
						}[view.state.type] ?? <CardView store={view} /> /* <<= default */
					)}
				/>
			</div>

			<DragCmp />

		</div>
	)

	...

```

The code is [here](https://codesandbox.io/p/sandbox/05-linked-h36l8t?file=%2Fsrc%2FApp.tsx%3A14%2C1)
