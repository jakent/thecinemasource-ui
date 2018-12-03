import styles from './Navigation.module.scss';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

export class Navigation extends React.Component {
    render() {
        return (
            <div className={styles.Navigation}>
                <NavLink
                    className={styles.Link}
                    activeClassName={styles.Selected}
                    exact={true}
                    to='/'>
                    Home
                </NavLink>
                <NavLink
                    className={styles.Link}
                    activeClassName={styles.Selected}
                    exact={true}
                    to='/featured'>
                    Featured
                </NavLink>
                <NavLink
                    className={styles.Link}
                    activeClassName={styles.Selected}
                    exact={true}
                    to='/interviews'>
                    Interviews
                </NavLink>
            </div>
        )
    }
}
