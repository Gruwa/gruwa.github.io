export interface IEvent {
    id: number,
    name: string,
    date: Date,
    time: string,
    price: number,
    imageUrl: string,
    location?: { // ? означает необязательный параметр или свофство, может отсутствовать
        address: string,
        city: string,
        country: string
    },
    onlineUrl?: string,
    sessions: ISession[]
}

export interface ISession {
    id: number,
    name: string,
    presenter: string,
    duration: number,
    level: string,
    abstract: string,
    voters: string[]

}