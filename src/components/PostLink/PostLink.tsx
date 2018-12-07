import * as React from 'react';
import { Post } from '../../domain/Posts';
import { NavLink } from 'react-router-dom';

export class PostLink extends React.Component<Post> {
    render() {
        return (
            <div>
                <NavLink to={`/post/${this.props.id}`}>{this.props.title}</NavLink>
            </div>
        );
    }
}
