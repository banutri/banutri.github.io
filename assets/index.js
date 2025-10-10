let elmLogin = document.getElementById('mLogin');
let mLogin = new bootstrap.Modal(elmLogin);

elmLogin.addEventListener('shown.bs.modal',function(){
  $('#username').focus();
});

initAuth();

async function initAuth(){
  let btn = $('#authAct');
  let cek = await checkLogin();

  if(cek == false){
    btn.removeClass('btn-outline-danger');
    btn.addClass('btn-outline-primary');
    btn.attr('data-act','login');
    btn.html('Login');
    mLogin.show();
  }else if(cek == true){
    btn.removeClass('btn-outline-primary');
    btn.addClass('btn-outline-danger');
    btn.attr('data-act','logout');
    btn.html('Logout');
  }
}

async function checkLogin() {
    const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        return false;
      } else {
        return true;
      }
}

async function logout(){
  let { error } = await supabase.auth.signOut();
  if(error){
    return false;
  }else{
    return true;
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
  console.log('Modul yang diimport:', currentModule);

  currentPage = page;
}

// Routing sederhana
let page = location.hash.replace('#', '') || 'home';
window.addEventListener('hashchange', () => {
  page = location.hash.replace('#', '') || 'home';
  navigate(page);
});

// Muat halaman awal
navigate(page);
setInterval(() => {
}, 1000);







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

$('#authAct').on('click', async function(){
  let btn = $(this);
  let act = btn.data('act');
  let doCheck = await checkLogin();

  console.log(doCheck, act);
  
  if(doCheck == false && act=='login'){
    console.log('kok gak mau kesini');
    
    mLogin.show();
  }else if(doCheck == true && act =='logout'){
    
    Swal.fire({
      title: 'Logout?',
      text: 'Anda harus login kembali untuk melakukan transaksi!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya',
      cancelButtonText: 'Tidak',
      // reverseButtons: true, // Membalik urutan tombol (opsional)
      customClass: {
        confirmButton: 'btn btn-sm btn-outline-danger mx-2',
        cancelButton: 'btn btn-sm btn-outline-secondary mx-2'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        let doLogout = await logout();
        if(doLogout== false){
          Swal.fire('Gagal!', 'Gagal Logout', 'error');
        }else{
          Swal.fire('Berhasil!', 'Berhasil Logout', 'success');
          btn.removeClass('btn-outline-danger');
          btn.addClass('btn-outline-primary');
          btn.attr('data-act','login');
          btn.html('Login');
          window.location.reload();
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Swal.fire('Dibatalkan', 'Tindakan dibatalkan.', 'error');
      }
    });

  }
});



$('#loginForm').on('submit', async function(e){
  e.preventDefault();
  let btn = $('#authAct');

  let username = $('#username').val().trim();
  let password = $('#password').val();

  let doLogin = await login(username, password);

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

    btn.removeClass('btn-outline-primary');
    btn.addClass('btn-outline-danger');
    btn.attr('data-act','logout');
    btn.html('Logout');
    mLogin.hide();
    window.location.reload();

});

