export interface Token {
  id: bigint;           // Primary key
  user_id: bigint;      // FK → Users.id
  app_id: bigint;       // FK → Applications.id
  access_token: string; // Access token
  refresh_token: string;// Refresh token
  issued_at: string;    // Timestamp
  expires_at: string;   // Timestamp
  revoked: boolean;     // Token revoked status
}
