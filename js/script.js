$(document).ready(function () {
  const $formsContainer = $("#forms");
  $.get("../data.json", (data) => {
    const formItems = $.map(data.forms, (form, i) => {
      return `
							<div class="col-12 col-lg-4">
								<label class="form-label">${form.name}</label>
								<select class="form-select mb-3" aria-label="Default select example">
									<option>Please select...</option>
									${form.options
                    .map((option, i) => {
                      return `<option value="${i}">${option}</option>`;
                    })
                    .join("")}
								</select>

								<form id="form${i + 1}" class="requires-validation" novalidate>
									<div class="hidden">
                    <div class="form-check">
                      <label class="form-label">Name</label>
										  <input type="text" name="name" class="form-control" placeholder="Your Name" required>
                    </div>
										
                    <div class="form-check">
                      <label class="form-label">E-mail</label>
										  <input type="email" name="email" class="form-control" placeholder="email@email.com" required email>
                    
                    </div>

                    <div class="form-check">
					  					<label class="form-label">Phone</label>
						  				<input type="text" name="phone" class="form-control" placeholder="Your phone number" required>
                    </div>

										<div class="form-check">
                      <label class="form-label">Message</label>
                      <textarea class="form-control"
                      name="message"
                      placeholder="Your message" required></textarea>
                    </div>

										<div class="form-check">
                    <label class="form-label">Contact Preference</label required>
										<div class="col-12">
											${form.contact
                        .map((pref, i) => {
                          const contactLowerCase = pref
                            .replace(/\s(.)/g, function ($1) {
                              return $1.toUpperCase();
                            })
                            .replace(/\s/g, "")
                            .replace(/^(.)/, function ($1) {
                              return $1.toLowerCase();
                            });
                          return `
														<div class="form-check form-check-inline">
															<input class="form-check-input" type="radio" name="inlineRadioOptions" value="${contactLowerCase}" required>
															<label class="form-check-label">${pref}</label>
														</div>
													`;
                        })
                        .join("")}
											</div>
                    </div>

										<button class="btn btn-primary mt-3">Send</button>
									</form>
								</div>
							</div>
							`;
    }).join("");
    $formsContainer.append(formItems);

    $("select").on("change", function (e) {
      const alert = document.querySelector(".alert");

      e.target.parentNode.querySelector(".hidden").classList.add("show");
      e.target.parentNode.contains(alert) ? alert.remove() : "";
    });

    function replaceValidationUI(form) {
      form.addEventListener(
        "invalid",
        function (event) {
          event.preventDefault();
        },
        true
      );

      form.addEventListener("submit", function (event) {
        let sel = form.parentNode.querySelector("select");
        let formNameValue = sel.options[sel.selectedIndex].text;

        event.preventDefault();
        event.stopPropagation();

        if (this.checkValidity()) {
          const formTemplate = $(
            `<div class="alert alert-success alert-dismissible fade show mt-3" role="alert">
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>

              Form sent successfully.
            </div>`
          );
          const data = $(this).serializeArray();
          data[data.length] = { formName: formNameValue };
          console.log(data);

          formTemplate.appendTo(form);

          form.reset();
          form.classList.remove("was-validated");
          form.querySelector(".hidden").classList.remove("show");
        }
      });

      var submitButton = form.querySelector(
        "button:not([type=button]), input[type=submit]"
      );
      submitButton.addEventListener("click", function (event) {
        let invalidFields = form.querySelectorAll(":invalid"),
          errorMessages = form.querySelectorAll(".invalid-feedback"),
          parent;

        for (var i = 0; i < errorMessages.length; i++) {
          errorMessages[i].parentNode.removeChild(errorMessages[i]);
        }

        for (var i = 0; i < invalidFields.length; i++) {
          parent = invalidFields[i].closest(".form-check");
          parent.insertAdjacentHTML(
            "beforeend",
            `<div class='invalid-feedback'>
              ${invalidFields[i].validationMessage}
            </div>`
          );
        }

        if (invalidFields.length > 0) {
          invalidFields[0].focus();
          form.classList.add("was-validated");
        }
      });
    }

    const forms = document.querySelectorAll("form");
    for (var i = 0; i < forms.length; i++) {
      replaceValidationUI(forms[i]);
    }
  });
});

// var request = new XMLHttpRequest();
// request.open("GET", "../data.json", true);

// request.onload = function () {
//   if (this.status >= 200 && this.status < 400) {
//     // Success!
//     var data = JSON.parse(this.response);
//     console.log(data);
//   } else {
//     // We reached our target server, but it returned an error
//   }
// };

// request.onerror = function () {
//   // There was a connection error of some sort
// };

// request.send();
