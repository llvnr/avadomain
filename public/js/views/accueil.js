import Config from "../module.js"

function Accueil(doc, options){

    // LOAD CSS 
        let cssNormalService = document.getElementById('cssNormalService')
        cssNormalService.href = '/css/module/style.css';
        let cssResponsiveService = document.getElementById('cssResponsiveService')
        cssResponsiveService.href = '/css/module/responsive.css';
    // LOAD CSS 

    let loaderHTML
    let arrDomain = []

    let ContainerPrincipaleContent = document.getElementById("ShellBody");
    ContainerPrincipaleContent.innerHTML = ""

    let cadreService = document.createElement('div')
    cadreService.classList.add('cadre__service')
        {
            // let logoServiceHTML = document.createElement('img')
            // logoServiceHTML.classList.add('cadre__service_logo')
            // logoServiceHTML.src = options.logo
            // cadreService.append(logoServiceHTML)
            // let titleHTML = document.createElement('h2')
            // titleHTML.innerText = options.app
            // cadreService.append(titleHTML)
            let descriptionHTML = document.createElement('small')
            descriptionHTML.innerText = Config.description
            cadreService.append(descriptionHTML)
            
        }
    ContainerPrincipaleContent.append(cadreService)

    if(options.mobile){
        ContainerPrincipaleContent = document.getElementById('blockContainer__contenu-content')
    } else {
        ContainerPrincipaleContent = document.getElementById('ShellBody')
    }

    // ContainerPrincipaleContent.innerHTML = ''

    // headerService(ContainerPrincipaleContent, {
    //     app: options.app,
    //     logo: options.logo,
    //     description: options.description,
    //     menu: []
    // })

    let alertHTML = document.createElement('div')
    alertHTML.classList.add('alert')
    alertHTML.style.display = "none"
    ContainerPrincipaleContent.append(alertHTML)

    // let messageHTML = document.createElement('container__message')
    // messageHTML.style.display = "none"
    // ContainerPrincipaleContent.append(messageHTML)
    
    let containerHTML = document.createElement('div')
    containerHTML.classList.add('container__application')

        let AvadomainLabelNameHTML = document.createElement("div")
        AvadomainLabelNameHTML.classList.add("Avadomain__label-name")
        AvadomainLabelNameHTML.innerText = "Nom du domaine : "
        containerHTML.append(AvadomainLabelNameHTML)

        let AvadomainInputNameHTML = document.createElement("input")
        AvadomainInputNameHTML.type = "text"
        AvadomainInputNameHTML.classList.add("Avadomain__input-name")
        containerHTML.append(AvadomainInputNameHTML)

        let AvadomainBtnSearchHTML = document.createElement("button")
        AvadomainBtnSearchHTML.classList.add("Avadomain__btn-search")
        AvadomainBtnSearchHTML.innerText = "Vérifier la disponibilité"
        containerHTML.append(AvadomainBtnSearchHTML)

        let arrExtension = [
            ".fr", ".com", ".be", ".org", ".eu", ".net", ".co.uk", ".info",
            ".name", ".biz", ".me", ".mobi", ".re", ".de", ".lu", ".ch", ".restaurant",
            ".expert", ".paris", ".alsace", ".wtf", ".services", ".media", ".immo",
            ".guide", ".discount", ".events", ".chat", ".camera", ".boutique", ".pub",
            ".consulting", ".photo", ".wiki", ".video", ".tw", ".technology", ".photos",
            ".network", ".football", ".email", ".club", ".tel", ".pictures", ".pw", ".wf",
            ".pm", ".uk", ".xyz", ".education", ".tools", ".site", ".cloud", ".website", ".pro"
        ]

        let AvadomainGridHTML = document.createElement("div")
        AvadomainGridHTML.classList.add("Avadomain__grid")

            AvadomainBtnSearchHTML.addEventListener('click', function() {

                let regexPoint = /\./;
                let regexEspace = /\s+/;
                let nameDomain = AvadomainInputNameHTML.value 
                // if(nameDomain.substring(0, 3) === "www.") return alert('Le nom ne doit pas comporté www.')

                if(nameDomain.length == 0) {
                    // return alert('Le champ [Name] est obligatoire.')
                    alertHTML.classList.add('warning')
                    alertHTML.style.display = null 
                    alertHTML.innerText = 'Le champ [Name] est obligatoire.'

                    setTimeout(() => {
                        alertHTML.classList.remove('warning')
                        alertHTML.style.display = "none";
                    }, 5000);
                }
                else if(nameDomain.substring(0, 4) === "www.") {

                    alertHTML.classList.add('warning')
                    alertHTML.style.display = null 
                    alertHTML.innerText = 'Le nom ne doit pas comporté www.'

                    setTimeout(() => {
                        alertHTML.classList.remove('warning')
                        alertHTML.style.display = "none";
                    }, 5000);

                }
                else if(nameDomain.substring(0, 7) === "http://") {

                    alertHTML.classList.add('warning')
                    alertHTML.style.display = null 
                    alertHTML.innerText = 'Le nom ne doit pas comporté http://'

                    setTimeout(() => {
                        alertHTML.classList.remove('warning')
                        alertHTML.style.display = "none";
                    }, 5000);

                }
                else if(nameDomain.substring(0, 8) === "https://") {

                    alertHTML.classList.add('warning')
                    alertHTML.style.display = null 
                    alertHTML.innerText = 'Le nom ne doit pas comporté https://'

                    setTimeout(() => {
                        alertHTML.classList.remove('warning')
                        alertHTML.style.display = "none";
                    }, 5000);

                }
                else if(regexPoint.test(nameDomain)) {

                    alertHTML.classList.add('warning')
                    alertHTML.style.display = null 
                    alertHTML.innerText = 'Le champ [Name] ne doit pas comporté de point.'

                    setTimeout(() => {
                        alertHTML.classList.remove('warning')
                        alertHTML.style.display = "none";
                    }, 5000);

                } else if(regexEspace.test(nameDomain)) {

                    alertHTML.classList.add('warning')
                    alertHTML.style.display = null 
                    alertHTML.innerText = 'Le champ [Name] ne doit pas comporté d\'espace.'

                    setTimeout(() => {
                        alertHTML.classList.remove('warning')
                        alertHTML.style.display = "none";
                    }, 5000);

                } else {

                    AvadomainBtnSearchHTML.disabled = true
                    AvadomainBtnSearchHTML.innerText = "Patientez..."
    
                    arrExtension.forEach(element => {
                        
                        checkDomain({
                            name: nameDomain,
                            ext: element
                        })
                        .then(result => {
    
                            if(result.status){
                                arrDomain.push({
                                    domain: nameDomain + element,
                                    status: true
                                })
                            } else {
                                arrDomain.push({
                                    domain: nameDomain + element,
                                    status: false
                                })
                            }
    
                            if(arrExtension.length == arrDomain.length){
                                AvadomainBtnSearchHTML.disabled = false
                                AvadomainBtnSearchHTML.innerText = "Vérifier la disponibilité"
                                console.log(arrDomain)
                                
                                arrDomain.forEach(element => {
                                    let AvadomainCardHTML = document.createElement("div")
                                    if(element.status){
                                        AvadomainCardHTML.classList.add("Avadomain__card", "Avadomain__card-disponible")
                                        AvadomainCardHTML.innerHTML = `${element.domain} <br> Disponible`
                                    } else {
                                        AvadomainCardHTML.classList.add("Avadomain__card", "Avadomain__card-indisponible")
                                        AvadomainCardHTML.innerHTML = `${element.domain} <br> Indisponible`
                                    }
                                    AvadomainGridHTML.append(AvadomainCardHTML)
                                });
    
                            }
    
                        })
                        .catch(err => {
                            alert(err)
                        })
    
                    });

                }

            })

        containerHTML.append(AvadomainGridHTML)

    ContainerPrincipaleContent.append(containerHTML)

    async function checkDomain(options){

        let tkn = localStorage.getItem("access_token")
        let bearer = 'Bearer ' + tkn;
        let myDomain = options.name + options.ext

        const response = await fetch('/api/avadomain/checkdomain', {
            method: "POST",
            body: JSON.stringify({
                domain: myDomain
            }),
            headers: {
                'Authorization': bearer,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        const domain = await response.json();
        return domain;

    }

}

export default Accueil;