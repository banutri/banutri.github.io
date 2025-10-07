const SUPABASE_URL = "https://qqgupaxqokacqrkunmrr.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxZ3VwYXhxb2thY3Fya3VubXJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0MTQ3ODMsImV4cCI6MjA3NDk5MDc4M30.EmvL78Oh02q-f3KZ2szYpaZrAgVxidvpsR7vtv6NV5o";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let elmLogin = document.getElementById('mLogin');
let mLogin = new bootstrap.Modal(elmLogin);

elmLogin.addEventListener('shown.bs.modal',function(){
  $('#username').focus();
});

$('#loginForm').on('submit',function(e){
  e.preventDefault();
  let username = $('#username').val().trim();
  let password = $('#password').val();

  login(username, password);

})

async function login(user, pass) {
  

  if (!user || !pass) {
    setStatus("Isi username dan password terlebih dahulu.");
    return;
  }

  setStatus("Mencoba login...");

  const {
    data,
    error
  } = await supabase.auth.signInWithPassword({
    email: user,
    password: pass
  });

  if (error) {
    setStatus("Login gagal: " + error.message);
    showSession({
      error: error.message
    });
    return;
  }

  setStatus("Login sukses.");
  showSession(data.session);
  console.log("Access token:", data.session.access_token);
}

function setStatus(t) {
  // document.getElementById("status").textContent = t;
  
  Swal.fire({
    icon:'info',
    text:t,
    timer:3500
  });
}

function showSession(obj) {
  // document.getElementById("sessionOut").textContent = JSON.stringify(obj, null, 2);
  Swal.fire({
    icon:'info',
    text:JSON.stringify(obj, null, 2),
    timer:3500
  })
}

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

// simpan daftar script yang diinject
let injectedScripts = [];
let currentDestroyFn = null;

function unloadContent() {
  try {
    if (typeof currentDestroyFn === "function") {
      currentDestroyFn(); // panggil fungsi destroy dari halaman
    }
  } catch (e) {
    console.error("Destroy error:", e);
  }
  currentDestroyFn = null;

  // hapus script yang pernah dimasukkan
  injectedScripts.forEach(s => {
    if (s.parentNode) s.parentNode.removeChild(s);
  });
  injectedScripts = [];

  // kosongkan DOM
  $("#content").empty();
}

function loadPage(file) {
  unloadContent();

  $.get(file, function (data) {
    let content = $("#content");
    content.html(data);

    // parse data html untuk ambil script
    let tmp = $("<div>").html(data);
    tmp.find("script").each(function () {
      let s = document.createElement("script");
      if (this.src) {
        s.src = this.src;
        s.async = false;
      } else {
        s.text = this.text;
      }
      document.body.appendChild(s);
      injectedScripts.push(s);
    });

    // kalau halaman mendefinisikan window.pageDestroy
    if (typeof window.pageDestroy === "function") {
      currentDestroyFn = window.pageDestroy;
    }
  });
}

// on click nav link
$(".nav-link").on("click", function () {
  let link = $(this);
  let page = link.data("page");
  let file = "";

  if (page === "report") {
    file = "pages/report/reportPage.html";
  } else if (page === "transValue") {
    file = "pages/transValPage/transValPage.html";
  }

  if (file !== "") {
    loadPage(file);
  }

  $(".nav-link").removeClass("active");
  link.addClass("active");
});

