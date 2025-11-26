export interface AuditLogDto {
    user_name: string
    business_name: string
    action: string
    description: string
}

export interface AuditLog extends AuditLogDto {
    id: number
    created_at: string
}
