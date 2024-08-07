// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Pages = {
  Onboarding: unknown;
  Login: unknown;
  Register: unknown;
  HomeTab: unknown;
  Post: unknown;
  CreatePost: unknown;
  Profil: unknown;
  Terbaru: unknown;
};

type UserProfileImageProperties = {
  name_display: string;
  full_path: string;
  size: number;
  mime_type: string;
};

type UserConfig = {
  user_id: string;
  is_private: boolean;
  is_share_portfolio: boolean;
  is_pin_exist: boolean;
  is_phone_verified: boolean;
  is_email_verified: boolean;
  is_generated_password: boolean;
  is_generated_profile: boolean;
};

type UserProfile = {
  user_id: string;
  name: string;
  username: string;
  profile_path: string;
  profile_image_properties: UserProfileImageProperties;
  email: string;
  bio: string | null;
  is_pro: boolean;
  is_premium: boolean;
  is_verified: boolean;
  is_blocked: boolean;
  created_at: string;
  total_followers: number;
  total_following: number;
  is_followed: boolean;
  config: UserConfig;
  pro_profile: any | null;
  calendly_url: string | null;
  favorite_topics: string[];
  referral_code: string;
  headline: string | null;
  favorite_instruments: any | null;
};
