import axios from "axios";
import {httpClient} from "../../../services/httpClient/httpClient";
import {GenericApiResponse, HttpMethod} from "../../../services/httpClient/types";
// import {httpClient} from "../../../services/httpClient/httpClient";
// import {HttpMethod} from "../../../services/httpClient/types";

export interface BookLists {
    display_name: string;
    list_name: string;
    updated: string;
    //....
}

export const getBooksLists = async (): Promise<BookLists[]>  => {
    const callApi = httpClient.call<GenericApiResponse<BookLists[]>>('lists/names.json', HttpMethod.get, {
        params: {
            'api-key': 'PL0DUwFZ0UJh3fKqix45dkOlFgzzsnFk',
        }
    });
    const response = await callApi.call();
    return response.data.results;
    // const response = await axios.get('https://api.nytimes.com/svc/books/v3/lists/names.json', { params: {
    //     'api-key': 'PL0DUwFZ0UJh3fKqix45dkOlFgzzsnFk',
    //     }});
    // return response.data.results;
};
