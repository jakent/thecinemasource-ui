import * as React from 'react';
import { Post } from '../../domain/Post';

export class PostComponent extends React.Component<Post> {
    render() {
        return (
            <div>
                {this.props.title}
            </div>
        );
    }
}
