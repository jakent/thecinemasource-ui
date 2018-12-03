import styles from './App.module.scss';
import * as React from 'react';
import { Routes } from '../Routes/Routes';
import { Navigation } from '../Navigation/Navigation';

export class App extends React.Component {
    render() {
        return (
            <div className={styles.App}>
                <div className={styles.Container}>
                    <Navigation/>
                    <Routes/>
                </div>
            </div>
        );
    }
}
