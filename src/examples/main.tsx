import ReactDOM from 'react-dom/client';
import { createStore } from '@priolo/jon';
import cardsSetup, { CardsStore } from '../stores/docs/cards';
import App from './App';


import '../css/index.css';

import '@/css/animation.css';
import '@/css/graph.css';
import "@/css/interaction.css";
import '@/css/label.css';
import '@/css/layout.css';
import '@/css/scrollbar.css';
import docsSo from '../stores/docs';




export const deckCardsSo = createStore(cardsSetup) as CardsStore
export const deckCards2So = createStore(cardsSetup) as CardsStore

docsSo.setAllDeck([deckCardsSo])


ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>,
)

