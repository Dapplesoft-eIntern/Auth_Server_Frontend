export interface LoginRequest {
    phone: string
    password: string
}

export interface LoginResponse {
    token: string
    refreshToken?: string
    user?: {
        id: string
    }
}
