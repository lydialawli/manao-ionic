import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { AppPage } from './declarations';

import Menu from './components/Menu';
import List from './pages/List';
import Game from './pages/Game.jsx'
import Games from './pages/Games.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import { home, list } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const appPages: AppPage[] = [
  {
    title: 'Games',
    url: '/games',
    icon: home
  },
  {
    title: 'List',
    url: '/home/list',
    icon: list
  }
];

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonSplitPane contentId="main">
        <Menu appPages={appPages} />
        <IonRouterOutlet id="main">
					<Route path="/login" component={Login} exact={true} />
          <Route path="/games" component={Games} exact={true} />
					<Route path="/game" component={Game} exact={true} />
					<Route path="/signup" component={Signup} exact={true} />
          <Route path="/home/list" component={List} exact={true} />
          <Route exact path="/" render={() => <Redirect to="/games" />} />
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
);

export default App;
