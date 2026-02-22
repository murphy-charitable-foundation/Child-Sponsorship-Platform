"use client";

import { createContext, useEffect, useState, useContext } from "react";
import { User } from "@supabase/supabase-js";
import { createClient as createSupabaseClient } from "@/lib/supabase/client";


type AuthContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
}); 


export function AuthProvider({ children }: { children: React.ReactNode }) {
    const supabase = createSupabaseClient();

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getInitialUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            setUser(data.user ?? null);
            setLoading(false);
        };
        
        getInitialUser();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, [supabase]);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    return useContext(AuthContext);
}