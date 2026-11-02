import Loader from './loader';

function requireEnv(value: string | undefined, name: string): string {
    if (!value) {
        throw new Error(`${name} must be set in the .env file`);
    }

    return value;
}

const API_URL = requireEnv(process.env.API_URL, 'API_URL');
const API_KEY = requireEnv(process.env.API_KEY, 'API_KEY');

class AppLoader extends Loader {
    constructor() {
        super(API_URL, { apiKey: API_KEY });
    }
}

export default AppLoader;
