document.addEventListener("DOMContentLoaded", () => {
	const preferredTheme = localStorage.getItem("theme");
	if (preferredTheme === "light") {
		document.documentElement.classList.add("light");
	}
});

const themeToggleBtn = document.querySelector("#theme-toggle");

themeToggleBtn.addEventListener("click", () => {
	document.documentElement.classList.toggle("light");
	localStorage.setItem(
		"theme",
		document.documentElement.classList.contains("light") ? "light" : "dark"
	);
});

const form = document.querySelector("form");
const nameInput = document.querySelector("#name");
const nameInfo = document.querySelector("output[name=info][for=name]");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const subjectInput = document.querySelector("#subject");
const commentsInput = document.querySelector("#comments");
const commentsInfo = document.querySelector("output[name=info][for=comments]");
const commentsError = document.querySelector(
	"output[name=errors][for=comments]"
);
const formErrorsEl = document.querySelector("#form-errors");

form.addEventListener("cancel", (event) => {
	event.preventDefault();
	console.log("cancel");
	form.reset();
});

form.addEventListener("input", (event) => {
	// add form errors
	const form_errors = [];

	for (const element of form.elements) {
		if (!element.checkValidity()) {
			form_errors.push(`${element.name}: ${element.validationMessage}`);
		}
	}

	formErrorsEl.value = JSON.stringify(form_errors);
	console.log(form_errors);

	// set custom error messages
	if (nameInput.validity.valueMissing) {
		nameInput.setCustomValidity("Please enter your name.");
	} else {
		nameInput.setCustomValidity("");
	}
	if (emailInput.validity.valueMissing) {
		emailInput.setCustomValidity("Please enter your email.");
	} else {
		emailInput.setCustomValidity("");
	}
	if (phoneInput.validity.badInput) {
		phoneInput.setCustomValidity("Please enter 10 digits only.");
	} else {
		phoneInput.setCustomValidity("");
	}
	if (commentsInput.validity.valueMissing) {
		commentsInput.setCustomValidity("Please enter your comments.");
	} else {
		commentsInput.setCustomValidity("");
	}
});

// add validation for comments
const commentsMaxLength = commentsInput.getAttribute("maxlength");

let timeoutId = null;

commentsInput.addEventListener("input", () => {
	const message = commentsInput.value;
	commentsInfo.textContent = `${message.length}/${commentsMaxLength}`;
	commentsInfo.className =
		message.length >= commentsMaxLength
			? "error"
			: message.length >= commentsMaxLength * 0.9
			? "warn"
			: "";

	if (!/^[ -~\r\n\t]*$/.test(message)) {
		commentsInput.setCustomValidity("Please use English characters only.");
		commentsError.textContent = "Please use English characters only.";
		commentsError.classList.add("shown");

		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => commentsError.classList.remove("shown"), 3000);
	} else {
		commentsInput.setCustomValidity("");
		commentsError.textContent = "";
		commentsError.classList.remove("shown");
	}
});
