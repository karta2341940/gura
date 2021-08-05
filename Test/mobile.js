let ame  = document.getElementsByClassName("block");
let kiara=[];
let calli = document.getElementsByClassName("list");
let ina=0;
let heightpeko=[];                          //save all value of height in this array
var j = [];



function gura(self)
{
    
    for( let i = 0 ; i <ame.length ; i ++)
    {
        if( ame[i] == self )
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


function Peko(bool,pasen) 
{
    if( bool !=true )
    {
        j[ina]=0;
        var myvar  = setInterval(function()
        {        
            if(parseFloat(j[ina])>parseFloat(pasen))
            {
                console.log("ok open");
                clearInterval(myvar);
            }
            calli[ina].setAttribute("style","height:"+j[ina]+"px");
            j[ina]++
            
        }, 1);
    }
    else 
    {
        
        var myvar  = setInterval(function()
        {        
            if(parseFloat(j[ina])<=parseFloat(pasen))
            {
                console.log("ok close");
                clearInterval(myvar);
            }
            calli[ina].setAttribute("style","height:"+j[ina]+"px");
            j[ina]--;
            
        }, 1);
    }
        
}

window.onresize=function()
{
    console.log("modify");
         
    if(document.body.clientWidth <= 768)
    {

        for( let i = 0 ; i < ame.length ; i ++)
        {
                calli[i].setAttribute("style","height: auto;"); 
                heightpeko[i] = getComputedStyle(calli[i]).height;
                calli[i].setAttribute("style","height: 0px;");
        }   
    }
    else 
    {
        for( let i = 0 ; i < ame.length ; i ++)
        {
                calli[i].setAttribute("style","height: auto;"); 
        }  
    }
    
         
    
}

new function () 
{
    if(document.body.clientWidth <= 768)
    {

        for( let i = 0 ; i < ame.length ; i ++)
        {
                      
                heightpeko[i] = getComputedStyle(calli[i]).height;
                calli[i].setAttribute("style","height: 0px");
        }   
    }
    console.log(document.body.clientWidth);
  
}

AOS.init();