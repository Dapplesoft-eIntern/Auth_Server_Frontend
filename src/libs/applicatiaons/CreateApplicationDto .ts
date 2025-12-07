export interface CreateApplicationDto {
    name: string
    clientId: string
    clientSecret: string
    redirectUri?: string | null
    apiBaseUrl?: string | null
    status: 1 | 2
}
