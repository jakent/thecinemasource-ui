import * as React from 'react';
import { PostLink } from "../PostLink/PostLink";
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { PostActionCreators, FetchPostRequest } from '../../store/actions/postActions';
import { ReduxState } from '../../store';
import { Post } from '../../domain/Post';

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
    fetchPosts: () => dispatch(PostActionCreators.fetchPostsRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
