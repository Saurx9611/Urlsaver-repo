let myleads=[];
const inputBtn=document.getElementById("input-btn");
const inputEl=document.getElementById("input-el");
const ulEl=document.getElementById("ul-el");
const leadsFromlocalstorage=JSON.parse(localStorage.getItem("myleads"));
const deleteBtn=document.getElementById("delete-btn");
const tabBtn=document.getElementById("tab-btn");

tabBtn.addEventListener("click",function(){
    chrome.tabs.query({currentWindow: true, active: true},  //{"windowId": targetWindow.id, "index": tabPosition});
    function (tabs) {  //Tab tab
        myleads.push(tabs[0].url);
        localStorage.setItem("myleads",JSON.stringify(myleads));
        renderLeads(myleads);
    });
    
})
deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear();
    myleads=[];
    renderLeads(myleads);
})
if(leadsFromlocalstorage){
    myleads=leadsFromlocalstorage;
    renderLeads(myleads);
}
inputBtn.addEventListener("click",function(){
    myleads.push(inputEl.value);
    inputEl.value="";
    localStorage.setItem("myleads",JSON.stringify(myleads));
    renderLeads(myleads);
})

function renderLeads(leads){
        let listItems="";

        for(let i=0;i<leads.length;i++){
            listItems+= `
            <li>
                <a target ='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>`;
            // const li=document.createElement("li");
            // li.textContent=myleads[i];
            // ulEl.append(li);
        }

        ulEl.innerHTML=listItems;
}