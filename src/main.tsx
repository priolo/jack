import ReactDOM from 'react-dom/client';
import App from './App';
import { createStore } from '@priolo/jon';
import cardsSetup, { CardsStore } from './stores/docs/cards';



import './css/colors.css';
import './css/colors-var.css';
import './css/index.css';
import './css/input.css';
import './css/label.css';
import './css/textarea.css';
import './css/scrollbar.css';
import './css/animation.css';
import './css/button.css';
import './css/interaction.css';
import './css/layout.css';
import './css/monaco.css';


export const deckCardsSo = createStore(cardsSetup) as CardsStore




ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>,
)

