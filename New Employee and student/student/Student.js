let ctsub=false;
document.addEventListener('DOMContentLoaded',function()
{
    let menu = getsetting();
    
    function getsetting()
    {
        let getmenu={}
        try
        {
            getmenu = JSON.parse(localStorage.getItem("quickMenuStu") || getmenu );
        }
        catch(e)
        {
            return {};
        }
        return getmenu;
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
            console.log(countA,countB,countA>countB);
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
            link.setAttribute('title', `${linkInfo['title']}-此連結使用過${linkInfo['count']}次`);//IE error
            link.setAttribute('href', linkInfo['url']);
            link.parentElement.style.display = 'block';

        });
        
    }

    function ForEachlink(link)
    {
        let title = link.innerText;
        let url = link.getAttribute("href");
        const quickMenuSettingKey = title;
        //console.log(title+"\n"+url);
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
        console.log("hello");
        if(ctsub)
        {
            let sub = document.getElementById("cnc-sub-stream")
            sub.style.height="26em";
            let usada = document.querySelector(".cnc-list-title>span");
            usada.style.animation = "rotates 1s forwards"
            console.log(usada);
            ctsub=!ctsub;;
        }
        else
        {
            let sub = document.getElementById("cnc-sub-stream")
            sub.style.height="3em";
            let usada = document.querySelector(".cnc-list-title>span");
            usada.style.animation = "unrotates 1s forwards"
            ctsub=!ctsub;
        }

    }
    
    
    loadMenu();
    document.querySelectorAll(".cnc-link").forEach(ForEachlink);//IE error
    document.getElementById("cnc-clean-btn").addEventListener("click",cleanMenu);
    document.getElementById("cnc-sub-row-click").addEventListener("click",sub);
});
function display(subStream)
{
    let sub_stream =document.getElementById("cnc-sub-stream");
    console.log(sub_stream)
    if(!subStream)
    {
        sub_stream.style.display="none";
    }
        
}