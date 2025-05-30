import { createRoot } from 'react-dom/client'
import App from './components/app/App.tsx'
import 'normalize.css';
import './styles/global.scss';
import { Provider } from 'react-redux';
import { store } from './store/store.ts'

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <App />
    </Provider>
)
