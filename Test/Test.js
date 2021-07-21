let ame  = document.getElementsByClassName("block");
let kiara=[];
let calli2 = document.getElementsByClassName("ls");
let calli = document.getElementsByClassName("list");
let ina=0;
let heightpeko=[];                                      //save all value of height in this array
let k = 2;
var j = 0;

new function()
{
    
    var ss5 = getComputedStyle(calli2[5]).height;
    for( let i = 0 ; i < ame.length ; i ++)
    {
        //console.log("stylt ls: "+ss5);
        //console.log("style : "+getComputedStyle(calli[i]).height);
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
        Peko(kiara[ina],heightpeko[ina]);
        kiara[ina] = false; 
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
    j=0;
    var myvar  = setInterval(function()
    {        
       if(parseFloat(j)>parseFloat(pasen))
       {
        console.log("ok");
        clearInterval(myvar);
       }
        calli[ina].setAttribute("style","height:"+j+"px");
        //console.log("style : "+calli[ina].clientHeight);
        //console.log("hei : "+heightpeko[ina]);
        j++

    }, 2);
    
}

function stopp()
{
    clearInterval(myvar);
}