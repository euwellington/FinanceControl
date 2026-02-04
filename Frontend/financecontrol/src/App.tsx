import { observer } from 'mobx-react-lite';
import { Toaster } from 'react-hot-toast';
import Router from '@/routes'
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Toaster
        position="bottom-right"
      />
      <Router />
    </BrowserRouter>
  )
}
export default observer(App);