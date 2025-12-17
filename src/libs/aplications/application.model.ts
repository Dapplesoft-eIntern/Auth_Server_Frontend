export interface ApplicationDto {
    name: string
    redirectUri: string
    apiBaseUrl: string
}

export interface Application extends ApplicationDto {
    id: string
    clientId: string
    clientSecret: string
    status: number
    statusName: string
}
