let cartGoodId = -1,
goodsCounter = 0,
cartDesignSrc = '',
cartDesignName = '',
userLocation = '',
userYear = '',
userMonth = '',
userDay = '',
userHour = '',
userMinute = '',
userText = '',
userComments = '',
userSize = '',
userMaterial = '',
userPrice = '',
goodsBtnRemove = '',
cost = [],
goodsCost = 0,
// Get array with objs
arrayCart = JSON.parse(localStorage.getItem('arrayCart'));
// console.log(arrayCart)
	
// show quantity goods
function showGoodsCount(goodsCounter = arrayCart.length){
    arrayCart = JSON.parse(localStorage.getItem('arrayCart'));
    // if there are goods in the cart 
    if(goodsCounter > 0){
        document.getElementById('main-cart-count').innerText = goodsCounter;
        document.querySelector('.main-cart').classList.remove('dn');
        document.querySelector('.cart-status').innerText = `Товаров в корзине: ${goodsCounter}` 
    }
    else{
        document.querySelector('.main-cart').classList.add('dn');
        document.querySelector('.cart-status').innerText = 'Корзина Пустая';
    }
}


// getCartData получает данные о заказе из хранилища в массив. В цикле вызывает функцию renderCart которая отрисовывает DOM.
function getCartData(){
    arrayCart = JSON.parse(localStorage.getItem('arrayCart'));

    arrayCart.forEach(arrayCartObj => {
        cartGoodId++;
        cartDesignSrc = arrayCartObj.thisDesignSrcCart,
        cartDesignName = arrayCartObj.thisDesignNameCart,
        userLocation = arrayCartObj.userLocation,
        userYear = arrayCartObj.userYear,
        userMonth = arrayCartObj.userMonth,
        userDay = arrayCartObj.userDay,
        userHour = arrayCartObj.userHour,
        userMinute = arrayCartObj.userMinute,
        userText = arrayCartObj.userText,
        userComments = arrayCartObj.userComments,
        userSize = arrayCartObj.userSize,
        userMaterial = arrayCartObj.userMaterial,
        userPrice = arrayCartObj.userPrice,
        cost.push(arrayCartObj.userPrice)
        renderCart();
    });
   
    showGoodsCount();
    removeItem();
    goodsCostCalc()


}
getCartData();


function renderCart(){    
    let out = `
    <div class="cart-good" attr-id="${cartGoodId}">
    <button class="cart-good-del" id="${cartGoodId}">&#10006;</button>
        <div class="layout-designs-block">
            <div class="designs-block">
                <div class="designs-block-frame">
                    <img src="assets/img/${cartDesignSrc}.png" alt="Предпросмотр" class="card-preview-img">
                </div>
            </div>
        </div>
        <div class="cart-good-info">
            <p><b>Карта звездного неба "<span id="cart-name">${cartDesignName}</span>"</b></p>
            <p>Размер: <span class="cart-size">${userSize}</span>cм</p>
            <p>Представление: <span class="cart-material">${userMaterial}</span></p>
            <p>Место события: <span class="cart-location">${userLocation}</span></p>
            <p>Дата и время: <span class="cart-date">${userDay} ${userMonth} ${userYear} в ${userHour}:${userMinute}</span></p>
            <p>Фраза: "<span class="cart-user-text-top">${userText}</span>"</p>
            <p>Комментарий: <span class="cart-user-text-bottom">${userComments}</span></p>
            <p>Доставка: Бесплатная</p>

            <p class="price">Стоимость: <span id="cart-good-price">${userPrice}</span>грн</p>
        </div>
    </div>`
    document.getElementById('cart-render').innerHTML += out;
}   


// Получаем все текущие кнопки и запускаем цикл
function removeItem(){
    goodsBtnRemove = document.querySelectorAll('.cart-good-del');
    goodsBtnRemove.forEach(item => {
        item.addEventListener('click', function(){
            // по нажатию на кнопку товара "удалить" мы получаем id кнопки который равен индексу этого товара в массиве arrayCart
            // Удаляем товар. Перезаписываем в хранилище. Очищаем DOM. 
            let id = this.id
            arrayCart.splice(id,1);
            localStorage.setItem('arrayCart', JSON.stringify(arrayCart));
            document.getElementById('cart-render').innerHTML = '';
            // cartGoodId со значением -1 нужен чтобы при перерендере id обнулялись
            cartGoodId = -1;
            getCartData();
        })
        
    })
}



// Delete all goods
function removeAllItems(){
    localStorage.removeItem('arrayCart')
    document.getElementById('cart-render').innerHTML = '';
    showGoodsCount(goodsCounter = 0);
}
document.getElementById('del-all-cart').addEventListener('click', removeAllItems);


// calc goods cost

function goodsCostCalc(){
    goodsCost = 0;
    cost.forEach(price => {
        price = +price;
        goodsCost += price;
    })
    document.getElementById('cart-calc').innerText = goodsCost;
    cost = [];
}
















// console.log(localStorage.getItem('arrayCart'))

document.getElementById('send-order').addEventListener('click', sendOrder)
function sendOrder(e){
    e.preventDefault();
    let test = (localStorage.getItem('arrayCart'));
    
}


// Validation order
    const form = document.getElementById('form');
    const username = document.getElementById('cart-username');
    const adress = document.getElementById('cart-post');
    const post = document.getElementById('cart-adress');
    const phone = document.getElementById('cart-phone');
    const comment = document.getElementById('cart-comment');
    let arrayForm = [],
    formCount = 0,
    arrayFormObj = {}
    
    document.getElementById('send-order').addEventListener('click', e => {
        e.preventDefault();
        checkInputs();
    });

    function checkInputs() {
        formCount = 0;
        const usernameValue = username.value.trim();
        const adressValue = adress.value.trim();
        const postValue = post.value.trim();
        const phoneValue = phone.value.trim();
        const commentValue = comment.value.trim();
        
        if(usernameValue === '') {
            setErrorFor(username, 'Введите Имя и Фамилию получателя');
        } else {
            setSuccessFor(username);   
        }
        
        if(phoneValue === '') {
            setErrorFor(phone, 'Введите ваш телефон');
        } else if (!isPhone(phoneValue)) {
            setErrorFor(phone, 'Введите верный номер');
        } else {
            setSuccessFor(phone);
        }
        
        if(adressValue === '') {
            setErrorFor(adress, 'Введите адресс доставки');
        } else {
            setSuccessFor(adress);
        }
        if(postValue === '') {
            setErrorFor(post, 'Введите отделение');
        } else {
            setSuccessFor(post);
        }

        arrayFormObj = {
            usernameValue: usernameValue,
            adressValue: adressValue,
            postValue: postValue,
            phoneValue: phoneValue,
            commentValue: commentValue,
            goodsCost: goodsCost  
          }
    }
    function ajaxSendForm(){
        localStorage.removeItem('arrayForm');
        arrayForm.push(arrayFormObj);
        localStorage.setItem('arrayForm', JSON.stringify(arrayForm));

        $.ajax({
            url: 'assets/php/sendToTelegram.php',
            type: 'POST',
            data: {
                myJson : localStorage.getItem('arrayCart'),
                myFormJson : localStorage.getItem('arrayForm')
            }
        });
    } 


    function setErrorFor(input, message) {
        const formControl = input.parentElement;
        const small = formControl.querySelector('small');
        formControl.className = 'form-control error';
        small.innerText = message;
    }
    
    function setSuccessFor(input) {
        const formControl = input.parentElement;
        formControl.className = 'form-control success';
        formCount++;
        // console.log(formCount)

        if(formCount >= 4){
            ajaxSendForm();
        }
    }
    
 
    // function isEmail(email) {
    //     return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    // }
    function isPhone(phone){
        return /^\d[\d\(\)\ -]{4,13}\d$/.test(phone);
    }


// let arr = JSON.parse(localStorage.getItem('arrayCart'));
// console.log(arr)
// localStorage.setItem("tovar_list",JSON.stringify(tovar_list));

// console.log(typeof arr)
// $.ajax({
//         url: 'cart.php',
//         type: 'POST',
//         data: {myJson : localStorage.getItem('arrayCart')}
//         // data: {myJson: localStorage.getItem('arrayCart'), fileName: 'myjson.json'},
//     });
    