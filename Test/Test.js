let ame  = document.getElementsByClassName("block");
let kiara=[];
let calli2 = document.getElementsByClassName("ls");
let calli = document.getElementsByClassName("list");
let ina=0;
let heightpeko=[];                                      //save all value of height in this array
var j = [];

new function()
{
    
    //var ss5 = getComputedStyle(calli2[5]).height;
    for( let i = 0 ; i < ame.length ; i ++)
    {
        
        heightpeko[i] = getComputedStyle(calli[i]).height;
        calli[i].setAttribute("style","height: 0px");
    }   
}


function gura(self)
{
    
    for( i = 0 ; i <ame.length ; i ++)
    {
        if( ame[i] == self )
        {
            ina = i;
            break;
        }
    }   
    
    
    if( kiara[ina] != true )
    {
        Peko(kiara[ina],heightpeko[ina]);
        kiara[ina] = true; 
    }
    else
    {
        Peko(kiara[ina],0);
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
            //console.log("style : "+calli[ina].clientHeight);
            //console.log("hei : "+heightpeko[ina]);
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
            //console.log("hei : "+j);
            j[ina]--;
            
        }, 1);
    }
        
}

function stopp()
{
    clearInterval(myvar);
}