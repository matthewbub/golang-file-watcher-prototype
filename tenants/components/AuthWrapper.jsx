import { useEffect, useState } from "react";
import { supabase } from "../supabase.config";
import { useRouter } from "next/router";

export const AuthWrapper = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const response = await fetch('/api/v1/secure/validate-console')
      const data = await response.json()
      if (data.ok) {
        setLoading(false)
        return
      }

      else {
        router.push('/log-in')
      }
    }

    checkSession()
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <img
              className="h-16 w-auto"
              src="https://bhoyxrelzzohrygasyjt.supabase.co/storage/v1/object/public/public/light_logo_only.png"
              alt="NineMbs Studio"
            />
          </div>
          <div className="mt-4 text-2xl font-bold text-white">NineMbs Studio</div>
        </div>
        <div className="mt-4 text-sm font-medium text-white">Loading...</div>
      </div>
    )
  }

  return children;
}