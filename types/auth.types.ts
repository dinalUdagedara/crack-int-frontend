export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  profile_image_url: string | null;
  is_active: boolean;
  google_id: string | null;
  is_verified: boolean;
  updated_at: string;
}

export interface Role {
  id: string;
  name: string;
  key: "MEMBER" | "SUPER_ADMIN";
  description: string;
  permissions: [];
}

export interface LoginTokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface SessionInfo {
  id: string;
  session_id: string;
  device_info: string;
  device_type: string;
  device_family: string;
  ip_address: string;
  last_active_timestamp: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LoginResponse {
  user: User;
  role: Role;
  current_session: SessionInfo;
}
