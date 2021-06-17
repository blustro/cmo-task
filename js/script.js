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
										<label class="form-label">Name</label>
										<input type="text" name="name" class="form-control" placeholder="Your Name" required data-v-min-length="3">

										<label class="form-label">E-mail</label>
										<input type="email" name="email" class="form-control" placeholder="email@email.com" required>

										<label class="form-label">Phone</label>
										<input type="text" name="phone" class="form-control" placeholder="Your phone number" required>

										<label class="form-label">Message</label>
										<textarea class="form-control"
										name="message"
										placeholder="Your message" required></textarea>

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
										<button class="btn btn-primary mt-3">Send</button>
									</form>
								</div>
							</div>
							`;
    }).join("");
    $formsContainer.append(formItems);

    $("select").on("change", function () {
      $(this).parent().find(".hidden").addClass("show");
    });

    // $("form").on("submit", function (e) {
    //   e.preventDefault();
    //   var queryString = $(this).serializeArray();
    //   $(this).addClass("was-validated");

    //   console.log(queryString);
    // });

    const forms = document.querySelectorAll(".requires-validation");
    Array.from(forms).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          event.preventDefault();
          event.stopPropagation();

          const formTemplate = $(
            '<div class="alert alert-success mt-3" role="alert">Form sent successfully.</div>'
          );

          form.classList.add("was-validated");

          if (form.checkValidity()) {
            formTemplate.appendTo(form);
          }
        },
        false
      );
    });
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
