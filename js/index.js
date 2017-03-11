function submitForm(form) {
    if (this.validateForm(form)) {
		var httpRequest = new XMLHttpRequest(),
			data = new FormData(form);

		if (!httpRequest) {
			alert('Giving up :( Cannot create an XMLHTTP instance');
			return false;
		}
		httpRequest.onreadystatechange = function () {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200 && JSON.parse(httpRequest.responseText).success) {
					this.displaySuccessPanel();
				} else {
					alert('Your information could not be submitted');
				}
			}
		}.bind(this);
		httpRequest.open('POST', 'https://code-test.titan.analogfolk.com/', true);
		httpRequest.send(data);
	} else {
		alert('Please fill out the form completely.');
	}
}

function validateForm (form) {
	var inputs = form.querySelectorAll('input[type="text"], input[type="email"]'),
		formIsValid = true;

	for (var i = 0; i < inputs.length; i++) {
		if (inputs[i].value === '') {
			formIsValid = false;
			break;
		}
	}

	return formIsValid;
}

function displaySuccessPanel() {
	var tabsPanels = document.querySelectorAll('.subscription-widget .tabs-panel');
	for (var i = 0; i < tabsPanels.length; i++) {
		if (tabsPanels[i].getAttribute('id') === 'success') {
			tabsPanels[i].style.display = 'block';
		} else {
			tabsPanels[i].style.display = 'none';
		}
	}
}