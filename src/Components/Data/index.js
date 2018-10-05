import createBrowserHistory from 'history/createBrowserHistory';
import { RouterStore } from 'mobx-react-router'
import { Data } from './Data'
import { Core } from './Core'

export const browserHistory = createBrowserHistory();
export const routingStore = new RouterStore();

export { Data, Core }