$(function () {
  const dic_vocal = ["e", "i", "a", "o", "u"];
  const dic_vocal_val = ["enter", "imes", "ai", "ober", "ufat"];

  const upperLower = /^[a-z0-9 ]+$/;
  let c_result = $("#content-result");
  const textarea = $("#content_textarea textarea");

  // Ejecuta una funcion que hace la tarea de encriptar el texto!
  $("#btn-encrypt").on("click", function () {
    let text = $("#content_textarea textarea").val();
    text = $.trim(text);
    if (text === "" || !upperLower.test(text)) {
      textarea.val("");
      Notification(
        "Verifique el texto sin acentos y mayusculas",
        "#ac160d",
        "aliceblue"
      );
      return;
    }

    let a = EncryptText(text);
    let card = $(`<div class="result">
                      <textarea id="result-text" name="result" id="" cols="30" rows="10" disabled >${a}</textarea>
                      <button id="btn-copy" type="button">Copiar</button>
                </div>`);

    textarea.val("");
    c_result.html(card);
  });

  // Ejecuta una funcion que hace la tarea de desencriptar el texto!
  $("#btn-decrypt").on("click", function () {
    let text = $("#content_textarea textarea").val();
    text = $.trim(text);

    if (text === "" || !upperLower.test(text)) {
      textarea.val("");
      Notification(
        "Verifique el texto sin acentos y mayusculas",
        "#ac160d",
        "aliceblue"
      );
      return;
    }

    let a = DecryptText(text);
    let card = `<div class="result">
                      <textarea id="result-text" name="result" id="" cols="30" rows="10" disabled >${a}</textarea>
                      <button id="btn-copy" type="button">Copiar</button>
                </div>`;

    textarea.val("");
    c_result.html(card);
  });

  // Ejecuta una funcion que copia el resultado
  $(document).on("click", "#btn-copy", function () {
    let text_result = $("#result-text").val();
    navigator.clipboard.writeText(text_result);
    Notification("Texto copiado");
  });

  // Para encripta el texto
  function EncryptText(text) {
    let res = text;
    for (let i of dic_vocal) {
      if (text.includes(i)) {
        let posi = dic_vocal.indexOf(i);
        res = res.replaceAll(i, dic_vocal_val[posi]);
      }
    }
    return res;
  }

  // Para desencriptar el texto
  function DecryptText(text) {
    let bol = true;

    for (let i of dic_vocal_val) {
      if (text.includes(i)) {
        if (bol) {
          text = text.replace("ai", "a");
          bol=false
        }else if(i == "ai") continue
        
        let posi = dic_vocal_val.indexOf(i);
        text = text.replaceAll(i, dic_vocal[posi]);
        
      }
    }
    return text;
  }

  // Notificar

  function Notification(msj, bg, color) {
    let noti = $('<div class="notification"></div>').css(
      "background-color",
      bg
    );
    let text = $("<div>" + msj + "</div>").css("color", color);
    noti.append(text);
    $("body main").append(noti);
    setTimeout(() => {
      noti.remove();
    }, 900);
  }
});
