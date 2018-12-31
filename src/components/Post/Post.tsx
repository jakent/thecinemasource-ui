import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { Photo } from 'src/domain/Photo';
import { ReduxState } from 'src/store';
import { PhotoActionCreators } from 'src/store/reducers/photoReducer';

interface StateProps {
    photos: Photo[]
}

interface DispatchProps {
    fetchPhotosForPost: (id: string) => void
}

interface MatchParams {
    id: string;
}

type Props = RouteComponentProps<MatchParams> & StateProps & DispatchProps

class PostComponent extends React.Component<Props> {

    componentDidMount() {
        this.props.fetchPhotosForPost(this.props.match.params.id)
    }

    render() {
        return (
            <div>
                {this.props.match.params.id}
                {this.props.photos.map((image, index) => (
                    <img key={index} src={image.upload} />
                ))}
            </div>
        );
    }
}

const mapStateToProps: MapStateToProps<StateProps, {}, ReduxState> = state => ({
    photos: state.photo.photos
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = ({
    fetchPhotosForPost: PhotoActionCreators.fetchPhotosRequest
});

export default connect(mapStateToProps, mapDispatchToProps)(PostComponent);
