import * as React from 'react';
import { PostLink } from "../PostLink/PostLink";
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { postPagination, ReduxState } from 'src/store';
import { Post } from 'src/domain/Post';
import { doesCurrentPageHaveNext, doesCurrentPageHavePrev, getCurrentPagePosts } from 'src/store/selectors';

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
    hasNext: doesCurrentPageHaveNext(state),
    hasPrev: doesCurrentPageHavePrev(state),
    requestedPage: state.pagination.posts.requestedPage,
    currentPage: state.pagination.posts.currentPage,
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
    requestPage: (pageNumber: number) => dispatch(postPagination.actionCreators.requestPage({page: pageNumber})),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
