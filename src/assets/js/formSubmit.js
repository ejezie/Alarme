jQuery(document).ready(function ($) {
    $("#contactForm").on("submit", function (e) {
        sendFormData(e, "#contactForm", "contact");
    });

    $("#devisForm").on("submit", function (e) {
        sendFormData(e, "#devisForm", "devis");
    });

    function sendFormData(e, id, type) {
        e.preventDefault();
        $.ajax({
            url: $(id)[0]["action"],
            type: "POST",
            data: $(id).serialize(),
            datatype: "json",
            success: function (data, response, message) {
                console.log(response);
                setTimeout(() => {
                    window.location.replace("/");
                }, 3000);
                if (type === "contact") {
                    document
                        .querySelector("#contact-form-response")
                        .classList.add("success");
                    document.querySelector(
                        "#contact-form-response"
                    ).innerHTML = `<i class="fa fa-info-circle"></i><b>Succès:</b> Votre demande est envoyée avec succès`;
                }
                if (type === "devis") {
                    document
                        .querySelector("#devis-form-response")
                        .classList.add("success");
                    document.querySelector(
                        "#devis-form-response"
                    ).innerHTML = `<i class="fa fa-info-circle"></i><b>Succès:</b> Votre demande est envoyée avec succès`;
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown, jqXHR);
                if (type === "contact") {
                    document
                        .querySelector("#contact-form-response")
                        .classList.add("error");
                    document.querySelector(
                        "#contact-form-response"
                    ).innerHTML = `<i class="fa fa-info-circle"></i><b>Erreur:</b> Veuillez vérifier vos données d'entrée`;
                }
                if (type === "devis") {
                    document.querySelector("#devis-form-response").classList.add("error");
                    document.querySelector(
                        "#devis-form-response"
                    ).innerHTML = `<i class="fa fa-info-circle"></i><b>Erreur:</b> Veuillez vérifier vos données d'entrée`;
                    console.log(textStatus);
                }
            },
        });
    }
});

var CaptchaCallback = function () {
    jQuery(".g-recaptcha").each(function () {
        grecaptcha.render(this, {
            sitekey: "6LcPxYkcAAAAAKzH1PEIaNdHOHIGb65OeXkjJyut",
            callback: correctCaptcha,
        });
    });
};

function correctCaptcha() {
    if (grecaptcha === undefined) {
        return;
    }
    console.log(grecaptcha.getResponse());
    document.querySelectorAll(".g-recaptcha").forEach((checkbox) => {
        checkbox.classList.add("hidden");
    });
    document.querySelectorAll(".form-submit").forEach((button) => {
        button.classList.remove("disabled");
        button.innerHTML = "Envoyer";
    });
}

let contactResponse = document.querySelector(".contact-form-response");
contactResponse.addEventListener("click", () => {
    contactResponse.classList.remove("success", "error");
});
