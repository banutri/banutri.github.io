const SUPABASE_URL = "https://qqgupaxqokacqrkunmrr.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxZ3VwYXhxb2thY3Fya3VubXJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0MTQ3ODMsImV4cCI6MjA3NDk5MDc4M30.EmvL78Oh02q-f3KZ2szYpaZrAgVxidvpsR7vtv6NV5o";

async function checkLogin() {
      // Cek apakah ada session login aktif
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        // Jika belum login
        alert("⚠️ Anda belum login!");
        // Jalankan script khusus misalnya redirect atau tampilkan pesan
        // window.location.href = "/login.html";
      } else {
        console.log("✅ User login sebagai:", session.user.email);
      }
}

async function login(user, pass) {
  
  if (!user || !pass) {
    return false;
  }

  const {
    data,
    error
  } = await supabase.auth.signInWithPassword({
    email: user,
    password: pass
  });

  if (error) {
    return false;
  }

  return true;
}
