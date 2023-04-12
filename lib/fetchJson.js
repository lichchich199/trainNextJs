// fetchError extends Error
export class FetchError extends Error {
    constructor({message, response, data}) {
        super(message)
        if(Error.captureStackTrace) {
            Error.captureStackTrace(this, FetchError)
        }
        this.name = 'FetchError'
        this.response = response
        this.data = data ?? { message: message}
    }   

}
// fetch by input
export default async function fetchJson(input, init) {
    // fetch(input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Response>
    const response = await fetch(input, init)
    const data = response.json();
    
    // response !ok
    if(response.ok) {
        return data;
    }
    // response !ok
    throw new FetchError({
        message: response.statusText,
        response,
        data
    })
}