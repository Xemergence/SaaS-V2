import { supabase } from "./supabase";

export interface UserRole {
  id: string;
  email: string;
  role: "admin" | "user";
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
}

/**
 * Get current user with role information
 * This function fetches the user's role from the database with server-side validation
 */
export async function getCurrentUserWithRole(): Promise<UserRole | null> {
  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return null;
    }

    // Fetch user profile with role from database using RLS-protected query
    const { data: profile, error: profileError } = await supabase
      .from("users")
      .select("id, email, role, first_name, last_name, avatar_url")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      console.error("Error fetching user profile:", profileError);
      return null;
    }

    // Additional server-side role validation using the is_admin() function
    const { data: isAdminResult, error: adminError } =
      await supabase.rpc("is_admin");

    if (adminError) {
      console.error("Error validating admin status:", adminError);
    }

    // Ensure role consistency between database and server function
    const serverValidatedRole = isAdminResult ? "admin" : "user";
    if (profile.role !== serverValidatedRole) {
      console.warn("Role mismatch detected, using server-validated role");
      profile.role = serverValidatedRole;
    }

    return {
      id: profile.id,
      email: profile.email || user.email || "",
      role: profile.role as "admin" | "user",
      first_name: profile.first_name,
      last_name: profile.last_name,
      avatar_url: profile.avatar_url,
    };
  } catch (error) {
    console.error("Error getting current user with role:", error);
    return null;
  }
}

/**
 * Check if current user is admin using server-side validation
 */
export async function isCurrentUserAdmin(): Promise<boolean> {
  try {
    const { data: isAdmin, error } = await supabase.rpc("is_admin");
    if (error) {
      console.error("Error checking admin status:", error);
      return false;
    }
    return isAdmin || false;
  } catch (error) {
    console.error("Error in admin check:", error);
    return false;
  }
}

/**
 * Validate user session and role with server-side verification
 * This function should be called on protected routes
 */
export async function validateUserSession(): Promise<{
  isValid: boolean;
  user: UserRole | null;
  isAdmin: boolean;
}> {
  const user = await getCurrentUserWithRole();
  const isAdmin = await isCurrentUserAdmin();

  return {
    isValid: !!user,
    user,
    isAdmin,
  };
}

/**
 * Sign out user securely
 */
export async function signOutUser(): Promise<void> {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
    }
    // Clear any local storage or session data
    localStorage.clear();
    sessionStorage.clear();

    // Force page reload to clear any cached state
    window.location.href = "/login";
  } catch (error) {
    console.error("Unexpected error during sign out:", error);
    // Force redirect even on error
    window.location.href = "/login";
  }
}

/**
 * Get user display name for UI
 */
export function getUserDisplayName(user: UserRole | null): string {
  if (!user) return "User";

  if (user.first_name && user.last_name) {
    return `${user.first_name} ${user.last_name}`;
  }
  if (user.first_name) {
    return user.first_name;
  }

  // Fallback to email username
  return user.email?.split("@")[0] || "User";
}

/**
 * Get user initials for avatar
 */
export function getUserInitials(user: UserRole | null): string {
  if (!user) return "U";

  if (user.first_name && user.last_name) {
    return `${user.first_name.charAt(0).toUpperCase()}${user.last_name.charAt(0).toUpperCase()}`;
  }
  if (user.first_name) {
    return user.first_name.charAt(0).toUpperCase();
  }

  // Fallback to email first character
  return user.email?.charAt(0).toUpperCase() || "U";
}

/**
 * Get avatar seed for consistent avatar generation
 */
export function getAvatarSeed(user: UserRole | null): string {
  if (!user) return "default";
  return user.email || user.id || "default";
}
