function Myalert(param)
{
    
    var type = param['type'];
    var message = param['message'];
    var sdTime = param['slideDown'];
    var supTime = param['slideUp'];
    var timeout = param['timeout'];

    if(timeout==null || timeout=="")
    {
        timeout = 1000;
    }

    if(message==null||message=='')
    {
        message="Hello World";
    }

    $('.myalert').removeClass('bg-success bg-danger bg-warning bg-info bg-dark');
    
    if(type=="success")
    {
        
        $('.myalert').addClass('bg-success');
        
        $('.myalert').html(`
        <div class="text-center text-alert text-light"><strong><p>`+message+`</p></strong></div>
        `);

    }
    else if(type=="danger")
    {
        $('.myalert').addClass('bg-danger');
        $('.myalert').html(`
        <div class="text-center text-alert text-light"><strong><p>`+message+`</p></strong></div>
        `);
    }
    else if(type=="info")
    {
        $('.myalert').addClass('bg-info');
        $('.myalert').html(`
        <div class="text-center text-alert text-light"><strong><p>`+message+`</p></strong></div>
        `);
    }
    else if(type=="warning")
    {
        $('.myalert').addClass('bg-warning');
        $('.myalert').html(`
        <div class="text-center text-alert text-light"><strong><p>`+message+`</p></strong></div>
        `);
    }
    else
    {
        $('.myalert').addClass('bg-dark');
        $('.myalert').html(`
        <div class="text-center text-alert text-light"><strong><p>`+message+`</p></strong></div>
        `);
    }

    $('.myalert').slideDown(sdTime);
        setTimeout(function(){
            $('.myalert').slideUp(supTime);
        },timeout)
}
