const SUPABASE_URL = "https://qqgupaxqokacqrkunmrr.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxZ3VwYXhxb2thY3Fya3VubXJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0MTQ3ODMsImV4cCI6MjA3NDk5MDc4M30.EmvL78Oh02q-f3KZ2szYpaZrAgVxidvpsR7vtv6NV5o";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


async function checkLogin() {
      // Cek apakah ada session login aktif
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        return false;
      } else {
        return true;
      }
}

async function getCurrUserData(){
  const {data : {session}} = await supabase.auth.getSession();
  return session.user;
}

async function getCurrSession(){
  const {data : {session}} = await supabase.auth.getSession();
  return session.user;
}

async function logout(){
  let { error } = await supabase.auth.signOut();
  console.log(error);
  
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




let elmLogin = document.getElementById('mLogin');
let mLogin = new bootstrap.Modal(elmLogin);

elmLogin.addEventListener('shown.bs.modal',function(){
  $('#username').focus();
});


let currentPage = null;
let currentModule = null;

async function navigate(page) {
  // Hancurkan halaman sebelumnya jika punya destroy()
  if (currentModule && currentModule.destroy) {
    console.log(`Destroy ${currentPage}`);
    currentModule.destroy();
  }

  // Muat partial baru
  const res = await fetch(`/pages/${page}.html`);
  if (!res.ok) {
    document.querySelector('#content').innerHTML = `<p>Halaman tidak ditemukan</p>`;
    return;
  }

  document.querySelector('#content').innerHTML = await res.text();

  // Import modul JS halaman
  currentModule = await import(`./${page}.js?cachebust=${Date.now()}`);
  if (currentModule.init) {
    console.log(`Init ${page}`);
    currentModule.init();
  }

  currentPage = page;
}

// Routing sederhana
window.addEventListener('hashchange', () => {
  const page = location.hash.replace('#', '') || 'home';
  navigate(page);
});

// Muat halaman awal
navigate('home');







let tblTransAssets = new DataTable('#tblTransAssets', {
    responsive: true,
    data : [],
    columns : [
      {
        data:'kode_barang',
      },
      {
        data:'tipe',
      },
      {
        data:'tanggal',
      },
    ],
});

$('#btnReload').on('click',function(){
  loadTransaksiAsset();
});

async function loadMasterAset(){
  const {data, error} = await supabase.from('master_aset').select('*');
  if(error){
    console.error("Error :", error);
    return;
  }

  console.log(data);
  
}

async function loadTransaksiAsset() {
  const {
    data,
    error
  } = await supabase
    .from("transaksi_aset")
    .select("*");

  if (error) {
    console.error("Error:", error);
    return;
  }

  tblTransAssets.clear().rows.add(data).draw();

  console.log(data);
}

// on click nav link
$(".nav-link").on("click", function () {
  let link = $(this);

  $(".nav-link").removeClass("active");
  link.addClass("active");
});

$('#loginAct').on('click',function(){
  let doCheck = checkLogin();

  if(!doCheck){
    mLogin.show();
  }else{

  }
});

$('#loginForm').on('submit',function(e){
  e.preventDefault();
  let username = $('#username').val().trim();
  let password = $('#password').val();

  let doLogin = login(username, password);

  if(!doLogin){
    Swal.fire({
      icon:'error',
      text:'Login gagal!',
      timer:3500
    });
    return;
  }
  Swal.fire({
      icon:'success',
      text:'Login berhasil!',
      timer:3500
    });

});

