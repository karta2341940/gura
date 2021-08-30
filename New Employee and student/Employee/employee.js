function getCookie(cname)
{
    var name =cname + "=";
    var docookie=decodeURIComponent(document.cookie);
    var ca = docookie.split(";");
    for(let i = 0 ; i < ca.length ; i++ )
    {
        let c = ca[i];
        while( c.charAt(0) == " ")
        {
            c = c.substring(1); 
        }
        if( c.indexOf(name) == 0)
        {
           return c.substring(name.length,c.length);
        }
    }
    return "";
}

function setCookie(cname , cval , alive) 
{
    var day=new Date();
    day.setTime( day.getTime() + (alive * 24 * 60 * 60 * 1000) ); 
    var expires = "expires=" + day.toGMTString();
    document.cookie =cname + "=" + cval + ";" + expires + ";path=/";
}
    
function checkClicked()
{
    
    let fav = getCookie("favlink");
    if(fav == "")
    { 
        let cnctext = String(this.text).replace(/\s*/g,"");
        let cncurl = String(this.href);
        
    }
}
    
let xs = document.getElementsByClassName("cnc-link");
new function ()
{
    for(let i = 0 ; i < xs.length ; i ++)
    {
        xs[i].addEventListener("mouseenter",checkClicked);
    }
}
