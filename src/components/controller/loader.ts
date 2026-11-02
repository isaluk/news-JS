import { Callback, Endpoint, HttpMethod, HttpStatus, QueryOptions, RequestParams } from '../../types';

class Loader {
    constructor(
        private readonly baseLink: string,
        private readonly options: Readonly<Partial<QueryOptions>>
    ) {}
    protected getResp<T>(
        { endpoint, options = {} }: RequestParams,
        callback: Callback<T> = (): void => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load<T>('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === HttpStatus.Unauthorized || res.status === HttpStatus.NotFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: Partial<QueryOptions>, endpoint: Endpoint): string {
        const urlOptions: Partial<QueryOptions> = { ...this.options, ...options };
        const url = new URL(endpoint, this.baseLink);

        Object.entries(urlOptions).forEach(([key, value]) => {
            if (value) url.searchParams.set(key, value);
        });

        return url.toString();
    }

    private load<T>(
        method: HttpMethod,
        endpoint: Endpoint,
        callback: Callback<T>,
        options: Partial<QueryOptions>
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then((res: Response) => this.errorHandler(res))
            .then((res: Response): Promise<T> => res.json())
            .then((data: T) => callback(data))
            .catch((err: unknown) => console.error(err));
    }
}

export default Loader;
