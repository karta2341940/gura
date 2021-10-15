document.addEventListener('DOMContentLoaded',function()
{
    let menu = getsetting(0);
    let version_storage=getsetting(1);
    function getsetting(b)
    {
        
        let getmenu={}
        try
        {   if(!b)
            {
                getmenu = JSON.parse(localStorage.getItem("quickMenuStu") || getmenu );
            }
            else
            {
                getmenu = JSON.parse(localStorage.getItem("VersionStu") || getmenu );
            }
        }
        catch(e)
        {
            return {};
        }
        return getmenu;
    }
    function version_check()
    {
        let version = "211012-1";//如果有刪除或是修改則版本號增加
        if( version_storage["version"] != version && localStorage.getItem("VersionStu") != null)
        {
            cleanMenu();
        } 
        
        console.log(version_storage["version"]);
        version_storage["version"] = version
        localStorage.setItem("VersionStu",JSON.stringify(version_storage));
        
    }
    function cleanMenu()
    {
        localStorage.removeItem("quickMenuStu");
        menu = getsetting();
        loadMenu();
        location.reload();
    }
    function getTopClicked()
    {
        let result = Object.keys(menu).map(function (key){
            return [key,menu[key]];
        });
        result.sort(function(a,b){
            let countA = a[1]['count'];
            let countB = b[1]['count'];
            //console.log(countA,countB,countA>countB);
            return countB -countA;
        });
        return result;
    }

    function loadMenu()
    {
        let quickMenu =document.getElementById("cnc-quick-menu-list-id")
        let quick_A = quickMenu.querySelectorAll("a");
        let container = document.getElementById("cnc-frequenly-use-container");
        let getTop = getTopClicked();

        if(getTop.length === 0) 
        {
            return;
        }
        else 
        {   
            container.style.display="block";
        }
        let isReachedTopClickedEnd = false;
        quick_A.forEach(function (link,index){
            if(typeof getTop[index] === 'undefined' )
            {
                isReachedTopClickedEnd =true;
            }
            
            if(isReachedTopClickedEnd)
            {
                link.parentElement.style.display='none';
                return;
            }
            let linkInfo = getTop[index][1];
            
            link.querySelector('.cnc-frequenly-content>b').childNodes[0].nodeValue = linkInfo['title'];
            link.setAttribute('title', linkInfo['title']+'(另開新視窗)-此連結使用過'+linkInfo['count']+'次');//IE error
            link.setAttribute('href', "javascript:void(0)");
            link.parentElement.style.display = 'block';

        });
    }
    
    function ForEachlinkFreq(link)
    {
        link.addEventListener("mouseup",function(e){
            let title = link.innerText.trim();
            const quickMenuSettingKey = title;    
            menu[quickMenuSettingKey]['count']++;
            localStorage.setItem("quickMenuStu",JSON.stringify(menu));
            window.open(menu[quickMenuSettingKey].url);
            loadMenu();
        });
    }

    function ForEachlink(link)
    {
        let title = link.innerText;
        let url = link.getAttribute("href");
        const quickMenuSettingKey = title;
        link.addEventListener("mouseup",function(e){
            menu[quickMenuSettingKey] = menu[quickMenuSettingKey] || {} ;
            menu[quickMenuSettingKey].title = title;
            menu[quickMenuSettingKey].url = url;
            menu[quickMenuSettingKey].count = menu[quickMenuSettingKey].count || 0; //To Make sure it is not undefine 
            menu[quickMenuSettingKey]['count']++;
            localStorage.setItem("quickMenuStu",JSON.stringify(menu));
            loadMenu();
        });
    }
    function sub()
    {
        let e = document.querySelector("#cnc-sub-stream");
        let r = e.querySelector(".cnc-list-title>span")
        if( e.classList.contains('cnc-list-h') && r.classList.contains("rotate") )
        {
            e.classList.remove("cnc-list-h");
            r.classList.remove("rotate");
        }
        else
        {
            r.classList.add("rotate");
            e.classList.add("cnc-list-h");
        }
    }
    version_check();
    loadMenu();
    
    document.querySelectorAll(".cnc-frequenly-content").forEach(ForEachlinkFreq);
    document.querySelectorAll(".cnc-link").forEach(ForEachlink);//IE error
    document.getElementById("cnc-clean-btn").addEventListener("click",cleanMenu);
    try
    {
            document.getElementById("cnc-sub-row-click").addEventListener("click",sub);
    }
    catch
    {

    }
});

function display(subStream)
{
    let sub_stream =document.getElementById("cnc-sub-stream");
    if(!subStream)
    {
        sub_stream.style.display="none";
    }
        
}
