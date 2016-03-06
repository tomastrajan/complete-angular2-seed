import { Observable } from "rxjs/Observable";
import { Injectable } from "angular2/core";
import { Http, Response } from "angular2/http";

import Config from "../config";

@Injectable()
export default class GithubService {

    constructor(
        private http: Http,
        private config: Config
    ) {}

    public getRepos(query: any): Observable<Repository> {
        console.log(this.config.API_URL);
        console.log(this.http.get(`${this.config.API_URL}search/repositories?q=${query}`));
        return this.http
            .get(`${this.config.API_URL}search/repositories?q=${query}`)
            .map((res: Response) => res.json())
            .map((data: any) => data.items.map(this.dtoToModel));
    }

    private dtoToModel(item: any): Repository {
        return {
            id: item.id,
            name: item.full_name,
            description: item.description,

            url: item.html_url,
            clone: item.clone_url,
            homepage: item.homepage,

            stargazers: item.stargazers_count,
            forks: item.forks_count,
            owner: {
                id: item.owner.id,
                type: item.owner.type,
                name: item.owner.login,

                url: item.owner.html_url,
                avatar: item.owner.avatar_url
            }
        };
    }

}

export interface Repository {
    id: String;
    name: String;
    description: String;

    url: String;
    clone: String;
    homepage: String;

    stargazers: String;
    forks: String;
    owner: Owner;
}

export interface Owner {
    id: String;
    type: String;
    name: String;

    url: String;
    avatar: String;
}
