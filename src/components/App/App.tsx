import styles from './App.module.scss';
import * as React from 'react';
import { Routes } from 'src/components/Routes/Routes';
import { Navigation } from 'src/components/Navigation/Navigation';
import { Provider } from 'react-redux';
import { history, store } from 'src/store';
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
