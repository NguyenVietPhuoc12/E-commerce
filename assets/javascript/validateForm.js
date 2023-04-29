// Constructor Function Of Form Validator
function Validator(options) {
    let formElement = document.querySelector(options.form);

    var selectorRules = {};

    function getParentElement(element, selector) {
        while(element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }


    function validate(inputElement, rule) {
        // User's value: inputElement.value
        // exe func: rule.exe;

        let errorElement = getParentElement(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
        let errorMessage;
        let inputDetail = formElement.querySelector('.input__detail');

        let rules = selectorRules[rule.selector];
        let rulesLength = rules.length;


        for (var i = 0; i < rulesLength; i++) {
            errorMessage = rules[i](inputElement.value);

            if (errorMessage) {
                break;
            }

        }


        if (errorMessage) {
            errorElement.innerHTML = errorMessage + "<i class='bx bx-error bx-burst' ></i>";
            errorElement.style.color = '#ff623d';
            getParentElement(inputElement, options.formGroupSelector).classList.add('invalid');
            getParentElement(inputElement, options.formGroupSelector).classList.remove('succes');
            
        } else {
            errorElement.innerHTML = 'Success' + "<i class='bx bxs-check-shield' style='color: #71be34; font-size: 1.2rem;'></i>";
            errorElement.style.color = '#71be34';
            getParentElement(inputElement, options.formGroupSelector).classList.remove('invalid');
            getParentElement(inputElement, options.formGroupSelector).classList.add('succes');
        }

        return !errorMessage;
    }

    function clearErrorValidate(inputElement, rule) {
        let errorElement = getParentElement(inputElement, options.formGroupSelector).querySelector(options.errorSelector);

        errorElement.innerText = '';
        getParentElement(inputElement, options.formGroupSelector).classList.remove('invalid');
        getParentElement(inputElement, options.formGroupSelector).classList.remove('succes');


    }

    if(formElement) {
        // Handle loop through each rules for validate work
        formElement.addEventListener('submit', function(event) {
            // Skip default behavior of submit button
            event.preventDefault();

            var isFormValid = true;

            options.rules.forEach(function(rule) {
                let inputElement = formElement.querySelector(rule.selector);
                let isValid = validate(inputElement, rule);

                if (!isValid) {
                    isFormValid = false;
                }
            });

            

            // Get all value of each inputElement
            if (isFormValid) {
                if(typeof options.onSubmit === 'function') {
                    var formEnableInputs = formElement.querySelectorAll('[name]:not([disable])');
                    var formValues = Array.from(formEnableInputs).reduce(function(values, input) {
                        values[input.name] = input.value;
                        return values
                    }, {});

                    options.onSubmit(formValues);
                    options.showMessage('Chúc mừng bạn đã đăng ký thành công!');
                } else {
                    formElement.submit();
                }
            }
        });



        // Loop each other rules and process event(blur, input, etc...);
        options.rules.forEach(function(rule) {
            // Save rules for each other input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.exe);
            } else {
                selectorRules[rule.selector] = [rule.exe];
            }

            let inputElement = formElement.querySelector(rule.selector);

            if(inputElement) {
                // Handle validate with onblur event DOM
                inputElement.addEventListener('blur', function() {
                    validate(inputElement, rule);
                });
                // Handle validate with oninput event DOM
                inputElement.addEventListener('input', function() {
                    clearErrorValidate(inputElement, rule);
                });
            }
        });
    };
};



// Defined Rules For Current Form Validate
// General Rule: 
// 1. When error occured: return message error
// 2. When doesn't any error: return 'undefined'
Validator.isRequired = function(selector, message) {
    return {
        selector: selector,
        exe: function(value) {
            return value.trim() ? undefined : message || 'Please enter this field!';
        }
    };
};

Validator.isEmail = function(selector, message) {
    return {
        selector: selector,
        exe: function(value) {
            var regexValue =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regexValue.test(value) ? undefined : message || 'Please enter your email!'
        }
    };
};

Validator.minLength = function(selector, min, message) {
    return {
        selector: selector,
        exe: function(value) {
            return value.length >= min ? undefined : message || `Please enter this field min ${min} characters!`
        }
    }
}

Validator.isConfirmed = function(selector, getConfirmValue, message) {
    return {
        selector: selector,
        exe: function(value) {
            return value === getConfirmValue() ? undefined : message || 'Value input is invalid!'
        }
    }
}