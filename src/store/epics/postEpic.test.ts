import nock from 'nock';
import { ActionsObservable, StateObservable } from 'redux-observable';
import { postEpic } from './postEpic';
import { Subject } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { Post } from 'src/domain/Post';
import { PostActionCreators } from "../reducers/postActions";
import { initialState, PostState } from "../reducers/postReducer";

const post: Post = {
    id: 1,
    category: 'category',
    title: 'title',
    author: '',
    date: '2012-03-18',
    excerpt: "excerpt",
    content: "content"
};

const posts: Post[] = [post];

describe('postEpic', () => {
    it('maps fetch post request to success if the api call was successful', () => {

        nock(/.*/)
            .log(console.log)
            .get('/api/posts')
            .reply(200, { results: posts });

        const action$ = ActionsObservable.of(PostActionCreators.fetchPostsRequest());
        const stateInput$ = new Subject<{ post: PostState }>();
        const state$ = new StateObservable<{ post: PostState }>(stateInput$, { post: initialState });

        return postEpic(action$, state$, [])
            .pipe(toArray())
            .toPromise()
            .then((actions) => {
                console.log(actions)
                expect(actions).toEqual([PostActionCreators.fetchPostsSuccess(posts)]);
            });

    });
});
