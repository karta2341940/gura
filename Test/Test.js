let ame = document.getElementsByClassName("block");
let kiara=[];
let calli = document.getElementsByClassName("list");
let ina=0;
let heightpeko=[];
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

    console.log(calli[ina].offsetHeight);
    heightpeko[ina]=calli[ina].offsetHeight;
    

    if( kiara[ina] != true )
    {
        Peko(kiara[ina],0);
    }
    else
    {
        Peko(kiara[ina],heightpeko[ina]);
    }
    

/*
    if( kiara[ina] != true )
    {
        calli[ina].classList.remove("clicked");
        kiara[ina] = true; 
        console.log("hi");
    }
    else
    {
        calli[ina].classList.add("clicked");
        kiara[ina] = false; 
    }
    //console.log(kiara[i]);

*/

    

}



function Peko(bool,pasen) 
{
    if(bool!= true)
    {
        setTimeout(function(){ 
        
            calli[ina].setAttribute("style","height:"+pasen+"px");
            kiara[ina] = true;    
        }, 10);
        
    }
    else
    {
        setTimeout(function(){ 

            calli[ina].setAttribute("style","height:0px");
            kiara[ina] = false;
            
         
        }, 300);
    }
    /*
    if(pasen < 100)
    {
        Peko(bool,pasen++);
    }
    */
    
}