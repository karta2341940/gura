let ame = document.getElementsByClassName("block");
let kiara=[];
function gura(self)
{
    let calli = document.getElementsByClassName("list");
    let ina=0;
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
        calli[ina].classList.remove("clicked");
        calli[ina].classList.add("apr");
        
        kiara[ina] = true; 
    }
    else
    {
        calli[ina].classList.add("clicked");
        
        
        kiara[ina] = false; 
    }
    //console.log(kiara[i]);
}





function Peko() {console.clear();}