import { createContext } from 'react';
import { observer } from 'mobx-react';
import { useStore } from './store/store';
import Weather from './components/Weather/Weather';
import Cube from './components/Cube/Cube';

const StoreContext = createContext<any>(null);

const App = () => {
  const store = useStore();
  return (
    <StoreContext.Provider value={store}>
      <Weather />
      <br />
      <Cube />
    </StoreContext.Provider>
  );
};

export default observer(App);