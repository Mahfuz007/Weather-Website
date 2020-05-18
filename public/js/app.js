const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const loading = document.querySelector('#loading');
const message = document.querySelector('#message');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(search.value=="") loading.textContent="Please Provide Location"
    else{
        loading.textContent="Loading...."
        message.textContent="";
        const address= search.value;
        fetch('http://localhost:3000/weather?address='+address).then((response)=>{
            response.json().then((data)=>{
                if(data.error){
                    loading.textContent=data.error;
                }else{
                    loading.textContent=data.location;
                    message.textContent=data.forecast;
                    
                }
            })
        })
    }
})