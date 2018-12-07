import * as React from 'react';
import { PostLink } from "../PostLink/PostLink";
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { ActionCreators, FetchPostRequest } from '../../store/actions/postActions';
import { ReduxState } from '../../store';
import { Post } from '../../domain/Posts';

interface StateProps {
    posts: Post[]
}

interface DispatchProps {
    fetchPosts: () => FetchPostRequest
}

type Props = StateProps & DispatchProps;

class Home extends React.Component<Props> {

    componentDidMount() {
        this.props.fetchPosts();
    }

    render() {
        return (
            <div>
                You have {this.props.posts.length}

                {this.props.posts.map((post, index) => (
                    <PostLink key={index} {...post}/>
                ))}
            </div>
        );
    }
}

const mapStateToProps: MapStateToProps<StateProps, {}, ReduxState> = state => ({
    posts: state.post.posts
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
    fetchPosts: () => dispatch(ActionCreators.fetchPostsRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
