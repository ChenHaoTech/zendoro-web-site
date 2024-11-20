import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react";
import Cta from "../components/landing/cta";
import FeaturesBlocks from "../components/landing/features-blocks";
import FeaturesHome from "../components/landing/features-home";
import TestimonialsHome from "../components/landing/testimoninals-home";
import Layout from "../components/misc/layout";
import HeroHome from "../components/landing/hero-home";

export default function Home() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY as string);

  // handle password resets
  useEffect(() => {
    // 重置密码的
    supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(event);
      console.log(session?.user.email);
      if (event === "PASSWORD_RECOVERY") {
        const newPassword = prompt("What would you like your new password to be?") || undefined;
        const { data, error } = await supabase.auth
          .updateUser({ password: newPassword });

        if (data) alert("Password updated successfully!");
        if (error) alert("There was an error updating your password.");
      }
    });
    // if has error:
    if (window.location.hash.includes("error=")) {
      alert('Invalid password reset link. Try with a new link~');
    }
  }, [supabase.auth]);


  return (
    <Layout>
      <HeroHome />
      <FeaturesHome />
      <FeaturesBlocks />
      <TestimonialsHome />
      <Cta />
    </Layout>
  )
}
