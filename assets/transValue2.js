let tblTransValue = new DataTable('#tblTransValue', {
    data:[],
    columns: [
        {
            data:'tanggal', class :'text-start'
        },
        {
            data:'created_by'
        },
        {
            data:'tipe'
        },
        {
            data:'nilai'
        },
        {
            data:'keterangan'
        },
    ],
    order: [],
});

init();
function init(){
    const tglStart = moment().subtract(2, 'months').format('YYYY-MM-DD');
    const tglEnd = moment().format('YYYY-MM-DD');
    $('#tglStart').val(tglStart);
    $('#tglEnd').val(tglEnd);

    reloadTblTransVal();
}

async function reloadTblTransVal() {
    let tglStart = $('#tglStart').val();
    let tglEnd = $('#tglEnd').val();
    let tipe = $('#tipeTrans').val() == 'all' ? '%' : $('#tipeTrans').val();

    const {
    data,
    error
  } = await supbase
    .from("v_trans_value")
    .select("*")
    .ilike('tipe',tipe)
    .gte('tanggal', tglStart)   // tanggal >= 2025-10-01
    .lte('tanggal', tglEnd);  // tanggal <= 2025-10-07

  if (error) {
    console.error("Error:", error);
    return;
  }

  tblTransValue.clear().rows.add(data).draw();
    console.log(data);
}

$('#btnReloadData').on('click', async function(){

    reloadTblTransVal();
});

let elmTransVal = document.getElementById('mTransVal');
let mTransVal = new bootstrap.Modal(elmTransVal)

$('#btnAddTransVal').on('click',function(){
    $('#transValForm').trigger('reset');
    mTransVal.show();
});

$('#btnSaveTransVal').on('click',function(){
    $('#transValForm').trigger('submit');
});

$('#transValForm').on('submit',async function(e){
    e.preventDefault();
    let user = await getCurrUserData();
    let data =[ {
            tanggal: moment().format('YYYY-MM-DD'),
            created_by : user.email.split("@")[0],
            nilai :parseFloat($('#inpNilai').val()),
            tipe : $('#inpTipeTrans').val(),
            keterangan : $('#inpKet').val(),
            created_at : moment().format(),
            updated_at : moment().format(),
        }
    ];

    const { insert, error } = await supbase
    .from('transaksi_uang')
    .insert(data);

    if (error) {
        Swal.fire({
            icon:'error',
            text:'Data gagal disimpan!',
            timer:3500
        });
    } else {
        Swal.fire({
            icon:'success',
            text:'Data berhasil disimpan!',
            timer:3500
        });
        $('#transValForm').trigger('reset');
        reloadTblTransVal();
    }
    
})