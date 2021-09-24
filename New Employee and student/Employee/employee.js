document.addEventListener('DOMContentLoaded',function()
{
    let menu = getsetting();
    
    function getsetting()
    {
        let getmenu={}
        try
        {
            getmenu = JSON.parse(localStorage.getItem("quickMenu") || getmenu );
        }
        catch(e)
        {
            return {};
        }
        return getmenu;
    }

    function cleanMenu()
    {
        localStorage.removeItem("quickMenu");
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
            console.log("its zero");
            return;
        }
        else 
        {
            console.log("its not zero");
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
            link.setAttribute('title', `${linkInfo['title']}-此連結使用過${linkInfo['count']}次`);
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
            localStorage.setItem('quickMenu',JSON.stringify(menu));
            loadMenu();
        });
    }
    loadMenu();
    document.querySelectorAll(".cnc-link").forEach(ForEachlink);
    document.getElementById("cnc-clean-btn").addEventListener("click",cleanMenu);

});