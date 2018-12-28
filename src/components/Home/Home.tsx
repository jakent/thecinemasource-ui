import * as React from 'react';
import { PostLink } from "../PostLink/PostLink";
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { postPaginator, ReduxState } from '../../store';
import { Post } from '../../domain/Post';
import { getCurrentPagePosts } from '../../store/selectors';

interface StateProps {
    posts: Post[]
    currentPage: number
    hasNext: boolean
    hasPrev: boolean
}

interface DispatchProps {
    requestPage: (page: number) => void
}

type Props = StateProps & DispatchProps;

class Home extends React.Component<Props> {

    componentDidMount() {
        this.props.requestPage(0);
    }

    render() {
        return (
            <div>
                You have {this.props.posts.length}

                {this.props.posts.map((post, index) => (
                    <PostLink key={index} {...post}/>
                ))}

                {this.props.hasPrev &&
                <button onClick={() => this.props.requestPage(this.props.currentPage - 1)}>Prev</button>
                }
                {this.props.hasNext &&
                <button onClick={() => this.props.requestPage(this.props.currentPage + 1)}>Next</button>
                }
            </div>
        );
    }
}

const mapStateToProps: MapStateToProps<StateProps, {}, ReduxState> = state => ({
    posts: getCurrentPagePosts(state),
    currentPage: state.pagination.post.currentPage,
    hasNext: state.pagination.post.hasNext,
    hasPrev: state.pagination.post.hasPrev,
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
    requestPage: (pageNumber: number) => dispatch(postPaginator.actionCreators.requestPage({page: pageNumber})),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
