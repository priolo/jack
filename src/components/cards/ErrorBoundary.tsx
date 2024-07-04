import { Component, ErrorInfo, ReactNode } from "react";
import Button from "../buttons/Button";
import cls from "./ErrorBoundary.module.css";



interface Props {
	children?: ReactNode;
}

interface State {
	hasError: boolean
	error?: Error
}

class ErrorBoundary extends Component<Props, State> {
	public state: State = {
		hasError: false,
		error: null,
	};

	public handleClickReload(e) {
		this.setState({ hasError: false })
	}

	public static getDerivedStateFromError(_: Error): State {
		// Aggiorna lo stato in modo che il prossimo render mostri la UI di fallback.
		return { hasError: true };
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		this.setState({ error })
	}

	public render() {

		if (this.state.hasError) return (
			<div className={cls.root}>

				{!!this.state.error ? <>
					<div className={cls.title}>{this.state.error.message}</div>
					<div className={cls.text}>{this.state.error.stack}</div>
				</> : (
					<div> ERRORE SCONOSCIUTO! </div>
				)}

				<Button
					onClick={this.handleClickReload}
				>RESET</Button>

			</div>
		)

		return this.props.children;
	}
}

export default ErrorBoundary;
