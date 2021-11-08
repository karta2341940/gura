let ame  = document.getElementsByClassName("block");
let kiara=[];
let calli = document.getElementsByClassName("list");
let ina=0;
let heightpeko=[];                          //save all value of height in this array
var j = [];


function gura()
{
    
    for( let i = 0 ; i <ame.length ; i ++)
    {
        if( ame[i] == this )
        {
            ina = i;
            break;
        }
    }   
    
    
    if( kiara[ina] != true )
    {
        calli[ina].setAttribute("style","height:"+heightpeko[ina]+";");
        kiara[ina] = true; 
    }
    else
    {
        calli[ina].setAttribute("style","height:"+0+"px;");
        kiara[ina] = false; 
    }

}
new function () 
{
    if(document.body.clientWidth <= 768)
    {
        for( let i = 0 ; i < ame.length ; i ++)
        {
            ame[i].addEventListener("click",gura);
        } 
        for( let i = 0 ; i < ame.length ; i ++)
        {
                      
                heightpeko[i] = getComputedStyle(calli[i]).height;
                calli[i].setAttribute("style","height: 0px");
        }   
    }
    console.log(document.body.clientWidth);
  
}

AOS.init();