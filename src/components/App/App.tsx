import styles from './App.module.scss';
import * as React from 'react';
import { Routes } from '../Routes/Routes';
import { Navigation } from '../Navigation/Navigation';
import { Provider } from 'react-redux';
import { history, store } from '../../store';
import { ConnectedRouter } from "connected-react-router";

export class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <div className={styles.App}>
                        <div className={styles.Container}>
                            <Navigation/>
                            <Routes/>
                        </div>
                    </div>
                </ConnectedRouter>
            </Provider>
        );
    }
}
