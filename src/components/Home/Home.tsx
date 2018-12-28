import * as React from 'react';
import { PostLink } from "../PostLink/PostLink";
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { postPaginator, ReduxState } from '../../store';
import { Post } from '../../domain/Post';

interface StateProps {
    posts: Post[]
    currentPage: number
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

                <button onClick={() => this.props.requestPage(this.props.currentPage + 1)}>Next</button>
            </div>
        );
    }
}

const mapStateToProps: MapStateToProps<StateProps, {}, ReduxState> = state => ({
    posts: Object.values(state.posts),
    currentPage: state.pagination.post.currentPage
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
    requestPage: (pageNumber: number) => dispatch(postPaginator.actionCreators.requestPage({page: pageNumber})),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
