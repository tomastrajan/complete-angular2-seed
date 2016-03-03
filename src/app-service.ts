import { Injectable } from "angular2/core";

@Injectable()
export default class AppService {

    public getName(): String {
        return "Tomas";
    }

}
