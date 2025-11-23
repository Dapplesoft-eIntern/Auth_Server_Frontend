export interface AuditLog {
  id: number;
  user_name: string;
  business_name: string;
  action: string;
  description: string;
  created_at: string; 
}
