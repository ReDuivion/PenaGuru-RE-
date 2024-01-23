// middleware/adminAuth.js
import { supabase } from "../config/supabase.js";

export const adminAuthMiddleware = async (handler) => {
  return async (req, res) => {
    const { user } = await supabase.auth.api.getUserByCookie(req);

    if (!user) {
      res.writeHead(302, { Location: "/login" });
      res.end();
      return;
    }

    const { data: adminData, error: adminError } = await supabase
      .from("admins")
      .select("*")
      .eq("email", user.email)
      .single();

    if (adminError || !adminData) {
      res.writeHead(302, { Location: "/unauthorized" });
      res.end();
      return;
    }

    return handler(req, res);
  };
};
