let btn_menu      = document.querySelector(".btn-menu");
let header        = document.querySelector("header");
let links         = document.querySelector(".links ul");
let list          = document.querySelector(".links ul li");
let cards         = document.querySelectorAll(".cards .card");
let container_box = document.querySelector(".container_box");
let NewCards      = document.querySelectorAll(".container_box .box_card");
let download_more = document.querySelector(".download_more .btn");
let chopping_icon = document.querySelector(".chopping");
let product_sign  = document.querySelector(".products");
let storeProducts = [];
let point = document.createElement("div");
    point.style.cssText = `
        width: 15px ;
        height : 15px ; 
        border-radius : 15px ;
        position: absolute;
        top:-7px;
        left:18px ;
        font-weight : bold ;
        text-align: center;
        line-height: 15px;
        font-size: 13px; 
        color : orange ;
    `;


if(window.sessionStorage.product !== undefined){
    storeProducts = JSON.parse(window.sessionStorage.product);
    point.innerHTML= `${storeProducts.length}`

    if(storeProducts.length !== 0){
        let image = document.querySelector("products .image");
        if(image)image.remove();
        chopping_icon.parentElement.appendChild(point);
    }
}
if(storeProducts.length === 0){
        let image = document.createElement("div");
        image.className = "image";
        let img = document.createElement("img");
        img.src = "../img/New folder/shop.png";
        image.appendChild(img);
        if(product_sign !== null)product_sign.appendChild(image);
        if(document.querySelector(".btn_buy"))document.querySelector(".btn_buy").style.cssText = "opacity: 0.5;pointer-events: none;";
    }


btn_menu.addEventListener('click' , function(){
    btn_menu.classList.toggle("open");
    if(btn_menu.getAttribute("class") === "btn-menu open"){
        links.style.cssText= "transform:scale(1,1)translateY(0px)";
    }
    else{
        links.style.cssText= "transform:scale(0,0)translateY(200px)";
    }
})

let countScroll = 0;
window.onscroll = function(){
    if(countScroll < window.scrollY){
        countScroll = window.scrollY;
        header.style.cssText = "transition-delay: 1s;top : -100% ";
    }else{
        countScroll = window.scrollY;
        header.style.cssText = "transition-delay: 0s;top : 0";
    }
}

/* =============================================== */
/* ================ the new files ================ */
/* =============================================== */

import { content_product , content_apple , content_screen } from "./content.js";

if(document.body.className === "default_product"){
    NewCards = document.querySelectorAll(".container_box .box_card");
    download_more.onclick = function(){
        NewCards = document.querySelectorAll(".container_box .box_card");
        OtherProduct(content_product);
        rangement();
        react(NewCards);
        this.style.cssText = "display : none";
        clickOnProduct(NewCards);
    }
}
else if(document.body.className === "apple_product"){
    NewCards = document.querySelectorAll(".container_box .box_card");
    download_more.onclick = function(){
        OtherProduct(content_apple);
        rangement();
        react(NewCards);
        this.style.cssText = "display : none";
        clickOnProduct(NewCards);
    }
}
else if(document.body.className === "screen_product"){
    NewCards = document.querySelectorAll(".container_box .box_card");
    download_more.onclick = function(){
        OtherProduct(content_screen);
        rangement();
        react(NewCards);
        this.style.cssText = "display : none";
        clickOnProduct(NewCards);
    }
}
else{
    NewCards = document.querySelectorAll(".container_box .box_card");
    react(NewCards);
    clickOnProduct(NewCards);
}

function OtherProduct(products) {
    for (const pro of products) {
        let box_card = document.createElement("div");
        box_card.className = "box_card";
        box_card.style = "transition-delay : 0s ; opacity:1";

        let head_card = document.createElement("div");
        head_card.className = "head_card";

        let icon = document.createElement("div");
        icon.className = "icon";
        let i = `<i class="fa-regular fa-heart"></i>`;
        icon.innerHTML = i;
        head_card.appendChild(icon);

        let details = document.createElement("div");
        details.className = "details";
        let pragraph = `
            <p style="--clr:blue">الاكثر مبيعا</p>
            <p style="--clr:red">${pro.discount}% خصم</p>
        `;
        details.innerHTML = pragraph;
        head_card.appendChild(details);

        let body_card = document.createElement("div");
        body_card.className = "body_card";

        let image = document.createElement("img");
        image.src = `${pro.path_image}`
        body_card.appendChild(image);

        let info = document.createElement("div");
        info.className = "info";

        let stars_div = document.createElement("div");
        stars_div.className = "stars"
        let stars_range = `
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
        `;
        stars_div.innerHTML = stars_range;
        info.appendChild(stars_div);
        let p = document.createElement("p");
        p.textContent = `${pro.name}`;
        info.appendChild(p);
        body_card.appendChild(info);

        let foot_card = document.createElement("div");
        foot_card.className = "foot_card";
        let price = document.createElement("div");
        price.className = "price";
        price.innerHTML = `<p style="--c : blue">${pro.current_price}</p>`;
        if(pro.discount != 0){
            price.innerHTML += `<del style="--c : #999">${pro.present_price}</del>`
        }
        foot_card.appendChild(price);

        box_card.appendChild(head_card)
        box_card.appendChild(body_card)
        box_card.appendChild(foot_card)
        container_box.appendChild(box_card);
    }
}

window.onload = function(){
    NewCards.forEach(function(ele,index,array){
        ele.style.opacity = '1';
    });
}

rangement();

function rangement(){
    NewCards  = document.querySelectorAll(".container_box .box_card");
    let price = [];
    let name = [];
    NewCards.forEach((e,i) => {
        e.style.cssText =`--delay: ${i} ; transition-delay : calc(var(--delay)*0.1s) ; opacity : 1`;
        name.push(e.children[1].children[1].children[1].innerHTML);
        price.push(Number(e.children[2].children[0].children[0].children[0].innerHTML.split(",").join("")));
    });
    name.sort()
    price.sort(function(e,a){return e - a});
    return [name , price];
}

let selection = document.querySelector("#sorting");
if(selection != null){
    selection.addEventListener('change' , function(){
        let value = selection.value;
        type_of_selection_sort(value);
    })
}

function type_of_selection_sort(value){
    NewCards  = document.querySelectorAll(".container_box .box_card");
    let order = 0;
    if(value === "price"){
        let price = rangement()[1];
        for (let i = 0; i < price.length; i++) {
            let select = price[i];
            for (let j = 0; j < price.length; j++) {
                let currentSelect = Number(NewCards[j].children[2].children[0].children[0].children[0].innerHTML.split(",").join(""));
                if(currentSelect === select){
                    NewCards[j].style.cssText = `order : ${order}`;
                    order++;
                }
            }
        }
    }
    else if(value === "name"){
        let name = rangement()[0];
        for (let i = 0; i < name.length; i++) {
            let select = name[i];
            for (let j = 0; j < name.length; j++) {
                let currentSelect = NewCards[j].children[1].children[1].children[1].innerHTML;
                if(currentSelect === select){
                    NewCards[j].style.cssText = `order : ${order}`;
                    order++;
                }
            }
        }
    }
    NewCards.forEach(function(ele,index,array){ ele.style.opacity = '1'})
}

react(cards);
react(NewCards);
function react(element){
    element.forEach(function(ele , index , arr){
    ele.children[0].children[0].onclick =  function(){
        this.classList.toggle('active');
        if(this.getAttribute("class") === "icon active"){
            ele.children[0].children[0].children[0].style.cssText = "color : red ; animation: animation_react 0.3s linear 0s 1 forwards;";
            ele.children[0].children[0].children[0].setAttribute("class" , "fa-solid fa-heart");
        }
        else{
            ele.children[0].children[0].children[0].style.cssText = "color : #222";
            ele.children[0].children[0].children[0].setAttribute("class" , "fa-regular fa-heart");
        }
        }
    });
}
/* =============================================================== */
clickOnProduct(cards);
clickOnProduct(NewCards);

function clickOnProduct(products){
    products.forEach(function(card){
        card.children[1].addEventListener('click' , function(){
            view_product_to_buy_it(card);
            window.scrollTo({top:0 , left:0});
            components.style.cssText = "opacity : 1";
        }) 
    })
}
function view_product_to_buy_it(card_Selected){
    let card_details = {
        name : card_Selected.children[1].children[1].children[1].innerHTML,
        image : card_Selected.children[1].children[0].src, 
        discount: card_Selected.children[0].children[1].children[1].innerHTML,
        current_price : card_Selected.children[2].children[0].children[0].innerHTML,
        price : card_Selected.children[2].children[0].children[0].children[0].innerHTML,
        range : card_Selected.children[1].children[1].children[0].innerHTML,
    }
    let article = document.querySelector(".article")
    article.innerHTML = '';
    article.style.cssText = "background-color: #fafafa";

    let container = document.createElement("div");
    container.className = "container";
    container.style.cssText = "margin-top:150px";
    container.appendChild(create_page(card_details));
    document.querySelector("article").appendChild(container);
    create_page(card_details.price)
}

function create_page(content){
    let page = document.createElement("div");
    page.className = "page";

    let head_content = document.createElement("div");
    head_content.className = "head_content";
    let disc = document.createElement("p");
    disc.innerHTML = content.discount;
    head_content.appendChild(disc);

    let option = document.createElement("div");
    option.className = "option";

    let icon = document.createElement("div");
    icon.className = "icon";
    let i = `<i class="fa-regular fa-heart"></i>`;
    icon.innerHTML = i;

    icon.addEventListener('click' , function(){
        this.classList.toggle("active");
        if(this.className === "icon active"){
            icon.children[0].setAttribute("class" , "fa-solid fa-heart");
            icon.children[0].style.cssText = "color : red ; animation: animation_react 0.3s linear 0s 1 forwards;"
        }
        else{
            icon.children[0].setAttribute("class" , "fa-regular fa-heart");
            icon.children[0].style.cssText = "color : #999";
        }
    })
    let share = document.createElement("div");
    share.className = "share";
    share.innerHTML = `<i class="fa-regular fa-share-from-square"></i>`;
    
    option.appendChild(icon);
    option.appendChild(share);

    head_content.appendChild(option);
    page.appendChild(head_content)

    let body = document.createElement("div");
    body.className = "body";

    let info_content = document.createElement("div");
    info_content.className = "info_content";
    let product_name = document.createElement("p");
    product_name.innerHTML = content.name;
    info_content.appendChild(product_name);

    let stars_div = document.createElement("div");
    stars_div.className = "stars";
    stars_div.innerHTML = content.range;
    info_content.appendChild(stars_div);

    let product_price = document.createElement("div");
    product_price.className = "product_price";

    let current = document.createElement("p");
    current.className = "current";
    current.innerHTML = content.current_price;

    product_price.appendChild(current);

    info_content.appendChild(product_price);
    let btn_configuration = document.createElement("div");
    btn_configuration.className = "btn_config";
    btn_configuration.innerHTML = `
        <p style = "pointer-events : none">اضف الي العربه</p>
        <img style = "pointer-events : none" src = "https://raw.githubusercontent.com/AhmedOrgline/raya2/399ce12838666ee161a6adc229a8e10761218d34/img/New%20folder/shopping-cart.png">
    `
    btn_configuration.addEventListener('click' , function(){
        let load = document.createElement("div");
        load.style.cssText = `
            width:30px ;
            height:30px ;
            padding: 5px 3px ;
            display:flex;
            justify-content:center;
            align-items: center;
            background: conic-gradient(#fff 0deg, #fff 30deg, #000f46 30deg, #000f46 180deg, #fff 270deg) ;
            border-radius:50px ;
            position: absolute;
            top: 50%;left:5px;
            transform: translateY(-50%);
            animation: loading 1s linear 3;
        `;
        let min = document.createElement("div");
        min.style.cssText = "width:24px; height:24px; border-radius:25px ; background-color:#000f46";
        load.appendChild(min);
        this.appendChild(load)
        setTimeout(() => {
            load.style.display='none';
            this.style.cssText = "opacity: 0.3 ; pointer-events: none";
            this.children[0].innerHTML = "تم الاضافه";
            storeProducts.push(content);
            window.sessionStorage.setItem("product" , JSON.stringify(storeProducts));
            point.innerHTML = '';
            point.innerHTML= `${storeProducts.length}`
            if(storeProducts.length !== 0)chopping_icon.parentElement.appendChild(point);

            document.body.innerHTML += ` 
                <div class="display">
                    <i class="fa-solid fa-xmark close"></i>
                    <h1>تم الاضافه الي عربه التسوق بنجاح</h1>
                    <div class = "pro">
                        <img src = "${content.image}">
                        <div class = "information">
                            <p>${content.name}</p>
                            <p>${content.current_price}</p>
                        </div>
                    </div>
                    <h2 class = "chop_card"><a href = "css_default/sign.html" class = "btn_card">عربه التسوق</a></h2>
                </div>
            `
            let btn_card = document.querySelector(".btn_card")
            document.body.className === "home_page"? btn_card.href = "css_default/sign.html": btn_card.href = "sign.html";
            
            setTimeout(() => {
                document.querySelector(".display").style.cssText = "top:250px ; opacity : 1";
            }, 500);
            setTimeout(() => {
                document.querySelector(".display").style.cssText = "top:-250px ; opacity : 0";
            }, 4000);
            document.querySelector(".close").onclick = function(){
                document.querySelector(".display").style.cssText = "top:-250px ; opacity : 0";
            }

            if(storeProducts.length !== 0){
                if(chopping_icon.parentElement.children[2] !== undefined)chopping_icon.parentElement.children[2].remove();
                let point = document.createElement("div");
                point.style.cssText = `
                    width: 15px ;
                    height : 15px ; 
                    border-radius : 15px ;
                    position: absolute;
                    top:-5px;
                    left:15px ;
                    font-weight : bold ;
                    text-align: center;
                    line-height: 15px;
                    font-size: 13px; 
                    color : #fff ;
                    pointer-events: none;
                `
                point.innerHTML= `${storeProducts.length}`
                chopping_icon.parentElement.appendChild(point);
            }
        }, 1000);
    });
    info_content.appendChild(btn_configuration);
    let info = document.createElement("div");
    info.className = "info_text";
    info.innerHTML = `
        <div class = component>
            <div class = "icon_text"><i class="fa-solid fa-clock"></i></div>
            <div class = "text"> 
                <p style = "--clr_text : #000">موعد التسلسم داخل القاهره والجيزه</p>
                <p style = "--clr_text : #999">1 - 5 <bdi>ايام</bdi></p>
            </div>
        </div>
        <div class = component>
            <div class = "icon_text"><i class="fa-solid fa-clock"></i></div>
            <div class = "text"> 
                <p style = "--clr_text : #000">موعد التسلسم خارج القاهره والجيزه</p>
                <p style = "--clr_text : #999">1 - 10 <bdi>ايام</bdi></p>
            </div>
        </div>
        <div class = component>
            <div class = "icon_text"><i class="fa-solid fa-shield"></i></div>
            <div class = "text"> 
                <p style = "--clr_text : #000">الضمان</p>
                <p style = "--clr_text : #999">سنتان</p>
            </div>
        </div>
        <div class = component>
            <div class = "icon_text"><i class="fa-solid fa-lock"></i></div>
            <div class = "text"> 
                <p style = "--clr_text : #000">الدفع الامن</p>
                <p style = "--clr_text : #999">الدفع عند التوصيل</p>
            </div>
        </div>
        <div class = component>
            <div class = "icon_text"><i class="fa-solid fa-rotate-left"></i></div>
            <div class = "text"> 
                <p style = "--clr_text : #000">ارجاع</p>
                <p style = "--clr_text : #999">خلال 14 يوم</p>
            </div>
        </div>
        <div class = component>
            <div class = "icon_text"><i class="fa-solid fa-hotel"></i></div>
            <div class = "text"> 
                <p style = "--clr_text : #000">بيع بواسطه</p>
                <p style = "--clr_text : #00f"><a href = "#">Raya Shop</a></p>
            </div>
        </div>
    `
    info_content.appendChild(info);

    body.appendChild(info_content)

    let image_content = document.createElement("div");
    image_content.className = "image_content";

    let bigImge = document.createElement("div");
    bigImge.className = "bigImg";
    let imgB = document.createElement("img");
    imgB.src = content.image;
    bigImge.appendChild(imgB);

    let minImg = document.createElement("div");
    minImg.className = "minImg";
    let imgM = document.createElement("img");
    imgM.src = content.image;
    minImg.appendChild(imgM);

    image_content.appendChild(bigImge);
    image_content.appendChild(minImg);
    body.appendChild(image_content);

    page.appendChild(body);
    return page;
}

let components = document.querySelector(".article");
window.onload = function(){
    if(components !== null)components.style.opacity = '1';
}

/* ===================>> buy the products page<<================== */
let products = document.querySelector(".products");
let def = document.querySelector(".product_value");

if(def!==null){
    def.innerHTML = storeProducts.length == 1 ? `لديك منتج واحد في عربة التسوق`: `لديك (${storeProducts.length}) من المنتجات في عربه التسوق`;
    if(storeProducts.length==0){
        def.innerHTML = "ليس لديك اي نوع من المنتجات";
    }
}

if(products !== null){
    let price = [];
    if(storeProducts.length > 0){
        for (let i = 0; i < storeProducts.length; i++) {
            products.innerHTML += `
            <div class="product">
                <div class="img"><img src="${storeProducts[i].image}" alt=""></div>
                <div class="info">
                    <p class = "name_of_product">${storeProducts[i].name}</p>
                    <div class="amount">
                        <div class="some">
                            <i class="fa-solid fa-minus" data-target = "decrease"></i>
                            <span>1</span>
                            <i class="fa-solid fa-plus" data-target = "increase"></i>
                        </div>
                        <p>اختر الكميه</p>
                    </div>
                    <h3 class = "price_of_product">${storeProducts[i].current_price}</h3>
                </div>
                <div class="icon_delete"><i class="fa-solid fa-trash-can"></i></div>
            </div>
        `
            price.push(Number(storeProducts[i].price.split(",").join("")));
        }
        let num = patern(price)
        document.querySelectorAll(".price").forEach((m) => m.children[0].innerHTML = create_patern_of_price(num));
        let count_Controle = document.querySelectorAll(".some i");
        let default_count = 2;
        count_Controle.forEach((c) => {
            c.onclick =  function(e){
                let count = c.parentElement.children[1].innerHTML;
                if(c.getAttribute("data-target") === "increase"){
                    if(count == 1){
                        count++;
                        c.parentElement.children[1].innerHTML = count;
                        c.parentElement.parentElement.parentElement.children[2].children[0].innerHTML = create_patern_of_price(Number(c.parentElement.parentElement.parentElement.children[2].children[0].innerHTML.split(",").join(""))*default_count);
                    }
                }
                if(c.getAttribute("data-target") === "decrease"){
                    if(count == 2){
                        count--;
                        c.parentElement.children[1].innerHTML = count;
                        c.parentElement.parentElement.parentElement.children[2].children[0].innerHTML = create_patern_of_price(Number(c.parentElement.parentElement.parentElement.children[2].children[0].innerHTML.split(",").join(""))/default_count);
                    }
                }
                price=[];
                Array.from(products.children).forEach((product) => price.push(Number(product.children[1].children[2].children[0].innerHTML.split(",").join(""))));
                num = patern(price)
                document.querySelectorAll(".price").forEach((m) => m.children[0].innerHTML = create_patern_of_price(num));
            }
        });
    }
    Array.from(products.children).forEach((product)=>{
        if(product.children[2] !== undefined){
        product.children[2].addEventListener('click' , function(){
            this.children[0].remove();
            let load = document.createElement("div");
            load.style.cssText = `
                width:30px ;
                height:30px ;
                padding: 5px 3px ;
                display:flex;
                justify-content:center;
                align-items: center;
                background: conic-gradient(#f00 0deg, #f00 30deg, #fff 30deg, #fff 180deg, #f00 270deg);
                border-radius:50px ;
                position: absolute;
                top: 10px;left:0px;
                animation: loading 1s linear 3;
            `;
            let min = document.createElement("div");
            min.style.cssText = "width:24px; height:24px; border-radius:25px ; background-color:#fff";
            load.appendChild(min);
            this.appendChild(load)
            setTimeout(() => {
                product.remove();
                storeProducts = storeProducts.filter((pro) => pro.image !== product.children[0].children[0].src);
                window.sessionStorage.clear();
                window.sessionStorage.product = JSON.stringify(storeProducts);

                let point = document.querySelector(".option div")
                if(point){
                    point.innerHTML= `${storeProducts.length}`;
                    if(storeProducts.length !== 0)chopping_icon.parentElement.appendChild(point);
                }
                price=[];
                Array.from(products.children).forEach((product) => price.push(Number(product.children[1].children[2].children[0].innerHTML.split(",").join(""))));
                let num = patern(price)
                document.querySelectorAll(".price").forEach((m) => m.children[0].innerHTML = create_patern_of_price(num));
                if(storeProducts.length === 0){
                    def.innerHTML = "ليس لديك اي نوع من المنتجات";
                    point.remove();
                    let image = document.createElement("div");
                    image.className = "image";
                    let img = document.createElement("img");
                    img.src = "../img/New folder/shop.png";
                    image.appendChild(img);
                    if(product_sign !== null)product_sign.appendChild(image);
                    document.querySelector(".btn_buy").style.cssText = "opacity: 0.5;pointer-events: none;";
                }
                else{
                    def.innerHTML = `لديك (${storeProducts.length}) من المنتجات في عربه التسوق`;
                }
            }, 1000);
        })
    }})
}

function patern(price){
    let num = 0;
    for (const key of price) {
        num += key;
    }
    return num;
}
function create_patern_of_price(price){
    let word = '';
        if(price > 999 && price <= 9999){
            price = price.toString().split("");
            for (let i = 0; i < price.length; i++) {
                i===0? word += price[i]+',' : word+= price[i];
            }
            price = word;
        }
        else if(price > 9999 && price < 99999){
            price = price.toString().split("");
            for (let i = 0; i < price.length; i++) {
                i===1? word += price[i]+',' : word+= price[i];
            }
            price = word;
        }
        else if(price > 9999 && price < 999999){
            price = price.toString().split("");
            for (let i = 0; i < price.length; i++) {
                i===2? word += price[i]+',' : word+= price[i];
            }
            price = word;
        }
        else{
            price = price;
        }
        return price;
}
/* ===================>>> cconfiguration order <<<=================== */
let btn_buy = document.querySelector(".btn_buy");
let container_sign = document.querySelector(".container_sign");
if(btn_buy){
    btn_buy.addEventListener('click' , function(){
        let load = document.createElement("div");
        load.style.cssText = `
            width:30px ;
            height:30px ;
            padding: 5px 3px ;
            display:flex;
            justify-content:center;
            align-items: center;
            background: conic-gradient(#fff 0deg, #fff 30deg, #00f 30deg, #00f 180deg, #fff 270deg) ;
            border-radius:50px ;
            position: absolute;
            top: 50%;left:5px;
            transform: translateY(-50%);
            animation: loading 1s linear 3;
        `;
        let min = document.createElement("div");
        min.style.cssText = "width:24px; height:24px; border-radius:25px ; background-color:#00f";
        load.appendChild(min);
        this.appendChild(load)
        setTimeout(() => {
            container_sign.innerHTML = '';
            container_sign.innerHTML = `
                <div class = "container">
                    <header class = "header">
                        <a href="../index.html" class="logo">
                            <img src="https://raw.githubusercontent.com/AhmedOrgline/raya2/399ce12838666ee161a6adc229a8e10761218d34/img/logo.png"alt="">
                        </a>
                    </header>
                </div>
                <div class = "container top">
                    <div class = "Raya">
                        <img src = "raya.png">
                    </div>
                    <div class = "form_user">
                        <h3>معلومات الاتصال</h3>
                        <div class = "form-input">
                            <input type = "text" required>
                            <span>الاسم</span>
                        </div>
                        <div class = "form-input">
                            <input type = "text" required>
                            <span>البريد الالكتروني</span>
                        </div>
                        <div class = "form-input">
                            <input type = "text" required>
                            <span>رقم الهاتف</span>
                        </div>
                        <div class = "form-input">
                            <input type = "text" required>
                            <span>العنوان</span>
                        </div>
                        <div class = "form-btn">
                            <p>تاكيد الطلب</p>
                        </div>
                    </div>
                </div>
                <footer style = "background-color: transparent ;">
                    <div class="footer" >
                        <p>© 2024 - راية شوب | جميع الحقوق محفوظة</p>
                    </div>
                </footer>
            `
        }, 1000);
        
    })
}
