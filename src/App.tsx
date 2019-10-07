import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { AppPage } from './declarations';

import Menu from './components/Menu';
import About from './pages/About.jsx';
import Game from './pages/Game.jsx'
import Games from './pages/Games.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Join from './pages/Join.jsx'
import Settings from './pages/Settings.jsx';
import Quiz from './pages/Quiz.jsx';
import Map from './pages/Map.jsx'
import Welcome from './pages/Welcome.jsx'
import Outcome from './pages/Outcome.jsx'

import { home, options, football, planet } from 'ionicons/icons';

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
    title: 'Join a Game',
    url: '/join',
    icon: football
  },
  {
    title: 'User Settings',
    url: '/profile/:id/settings',
    icon: options
  },
  {
    title: 'About Manao',
    url: '/about',
    icon: planet
  }
];

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonSplitPane contentId="main">
        <Menu appPages={appPages} />
        <IonRouterOutlet id="main">
          <Route path="/join" component={Join} exact={true} />
          <Route path="/profile/:id/settings" component={Settings} exact={true} />
					<Route path="/play/:id/start" component={Welcome} exact={true} />
          <Route path="/quiz" component={Quiz} exact={true} />
          <Route path="/about" component={About} exact={true} />
					<Route path="/login" component={Login} exact={true} />
          <Route path="/games" component={Games} exact={true} />
					<Route path="/outcome" component={Outcome} exact={true} />
					<Route path="/game/:id" component={Game} exact={true} />
					<Route path="/signup" component={Signup} exact={true} />
					<Route path="/map" component={Map} exact={true} />
          <Route exact path="/" render={() => <Redirect to="/games" />} />
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
);

export default App;
