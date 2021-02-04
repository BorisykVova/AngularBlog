import { Injectable } from '@angular/core'
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FbCreateResponse, Post} from '../admin/shared/interfaces';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PostService {

    constructor(
        private http: HttpClient,
    ) { }

    create(post: Post): Observable<Post> {
        return this.http.post(`${environment.fbDBUrl}/posts.json`, post)
            .pipe(
                map((response: FbCreateResponse) => {
                    const createdPost: Post = {
                        ...post,
                        id: response.name,
                        date: new Date(post.date),
                    }
                    return createdPost
                }),
            )
    }

}
