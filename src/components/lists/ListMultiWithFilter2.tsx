import IconToggle from "@/components/buttons/IconToggle"
import List from "@/components/lists/List"
import { debounce } from "@/utils/time"
import { FunctionComponent, useMemo, useState } from "react"
import FindInput from "../input/FindInput"



interface Props {
	items: any[],
	selects: any[],
	onChangeSelects: (ids: any[]) => void
	renderRow?: (item: any, index: number) => React.ReactNode
	fnGetId?: (item: any) => any
	fnGetString?: (item: any) => string
}

/**
 * Permette di seezionare più elementi da una lista con un filtro di ricerca
 */
const ListMultiWithFilter2: FunctionComponent<Props> = ({
	items,
	selects,
	onChangeSelects,
	renderRow,
	fnGetId = (item) => item,
	fnGetString = (item) => item?.toString() ?? "",
}) => {

	// STORE

	// HOOKs
	const [txtSearch, setTxtSearch] = useState<string>(null)
	const [search, setSearch] = useState<string>(null)
	const itemsShow = useMemo(() => {
		if (!search || search.length == 0) return items
		return items.filter(item => {
			return (fnGetString?.(item) ?? item)?.toLowerCase().includes(search)
		})
	}, [search, items])

	// HANDLER
	const handleSubjectChange = (item: any) => {
		const id = fnGetId?.(item) ?? item
		const index = selects.indexOf(id)
		const idsSelect = [...selects]
		if (index != -1) idsSelect.splice(index, 1); else idsSelect.push(id)
		onChangeSelects(idsSelect)
	}
	const handleSearchChange = (value: string) => {
		setTxtSearch(value)
		debounce(`ListMultiWithFilter2`, () => setSearch(value.trim().toLowerCase()), items.length > 1000 ? 2000 : 200)
	}
	const handleSelectAll = (check: boolean) => {
		if (!check) {
			onChangeSelects([])
		} else {
			onChangeSelects(items.map(item => fnGetId?.(item) ?? item))
		}
	}

	// RENDER
	const allSelect = selects.length == items.length
	const isSelect = (item: any) => {
		const id = fnGetId?.(item) ?? item
		return selects.indexOf(id) != -1
	}

	if (!items || items.length == 0) return <div className="jack-lbl-empty">EMPTY LIST</div>

	return <div style={{ display: "flex", flexDirection: "column" }}>

		{/* FILTER */}
		<div style={{ display: "flex", position: "relative", alignItems: "center", margin: 3 }}>
			<IconToggle style={{ marginLeft: 3, marginRight: 5 }}
				check={allSelect}
				onChange={handleSelectAll}
			/>
			<FindInput
				value={txtSearch}
				onChange={handleSearchChange}
			/>
		</div>

		{/* LIST */}
		<List
			style={{ maxHeight: 400, overflowY: "auto" }}
			items={itemsShow}
			select={selects as any}
			RenderRow2={(item, index) => <div style={{ padding: '4px 6px', display: 'flex', alignItems: 'center', gap: '4px', flex: 1 }}>
				<IconToggle
					check={isSelect(item)}
					onChange={select => handleSubjectChange(item)}
				/>
				{renderRow?.(item, index) ?? <div className="lbl-prop">{fnGetString(item)}</div>}
			</div>}
		/>

	</div>
}

export default ListMultiWithFilter2



// interface PropRow {
// 	item: string
// }

// const Row: FunctionComponent<PropRow> = ({
// 	item,
// }) => {
// 	return <div style={{ padding: '4px 6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
// 		<IconToggle
// 			check={selects.indexOf(item) != -1}
// 			onChange={select => handleSubjectChange(item)}
// 		/>
// 		<div className="lbl-prop">{item}</div>
// 	</div>
// }