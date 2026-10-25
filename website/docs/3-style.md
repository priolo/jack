---
id: "style"
title: 'Style'
sidebar_label: 'Style'
sidebar_position: 3
---

Let's try to make these CARDs more attractive.  
We can use the ready-made `FrameworkCard` component

```tsx title="App.tsx"
const CardView: FunctionComponent = ({
  store,
}) => {

  // STORE
  const state = useStore(store)

  // RENDER
  return (
**	<FrameworkCard
**		headerRender={<Header store={store} icon={<EditorIcon />} />}
**		store={store}
**	>
    	<TextInput
        	value={state.text}
        	onChange={(text) => store.setText(text)}
      	/>
**  </FrameworkCard>
  )
}
```
Now the CARD is also resizable with the cursor on the right margin.

So let's add some color.  
Let's create the file `Card.module.css`
and pass its class to the `FrameworkCard` with the `className` prop:  

```tsx
import cls from "./Card.module.css"

<FrameworkCard store={store} className={cls.root}>
```

```css title="Card.module.css"
.root {
	/* text and background of the CARD */
	--card-fg: #393939;
	--card-bg: #EBFB35;

	/* selected components: button, icon button, float button, table row... */
	--cmp-select-fg: #EBFB35;
	--cmp-select-bg: #393939;

	/* perimeter shadow of text input, button... */
	--cmp-bg: rgba(0, 0, 0, 0.05);

	/* focus outline of the components */
	--cmp-focus: #39393989;

	/* dialog, tooltip, drag */
	--accent: #393939;
	--accent-text: #EBFB35;
}
```

Now we have fantastic CARDs that pierce the retina
[HERE!](https://codesandbox.io/p/sandbox/style-4qcwdv?file=%2Fsrc%2FCard.module.css%3A11%2C1)

All the CSS variables are described in [Theme](./theme).  
To define the colors of the whole application, and not of a single CARD, read the next chapter.
