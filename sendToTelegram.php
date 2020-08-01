<?php
if(isset($_POST['myJson']))
{
    $uid = $_POST['myJson'];
    echo $uid;

    $jsonArrayData = json_decode($uid, true);

$txt = <<<TEXT
<b>Имя</b>: Вася%0A<b>Телефон</b>: 380978766813%0A%0A
TEXT;
 foreach ($jsonArrayData as $objectUserData) {
$txt .= <<<TEXT
<u>{$objectUserData['userMaterial']}</u>%0A{$objectUserData['thisDesignNameCart']}<b> {$objectUserData['userSize']}</b> см%0A%0A<b>Место: </b>{$objectUserData['userLocation']}%0A<b>Дата и время: </b>{$objectUserData['userDay']} {$objectUserData['userMonth']} {$objectUserData['userYear']} в {$objectUserData['userHour']} : {$objectUserData['userMinute']}%0A<b>Фраза: "</b><pre><code>{$objectUserData['userText']}</code></pre>"%0A%0A{$objectUserData['userComments']}%0A{$objectUserData['userPrice']} грн
TEXT;
}
     $token = "1032058772:AAFRiODZlPdMNpnVKfEK-T3tftLy0OuwGmk";
     $chat_id = "-459499767";


     $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");
     
     if ($sendToTelegram) {
     } else {
       echo "Ошибка отправки заказа, пожалуйста повторите попытку или свяжитесь с нами через контакты на сайте. Спасибо";
     }
    }
?>