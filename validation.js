module.exports.login = (body) => {
    return new Promise((resolve, reject) => {
        let returnObj = {
            email: null,
            pass: null,
            passErr: null,
            emailErr: null
        }
        if (body.emailLog.length > 0) {
            if (body.passLog.length > 0) {
                returnObj.email = body.emailLog;
                returnObj.pass = body.passLog;
                resolve(returnObj);
                return;
            } else {
                returnObj.email = body.emailLog;
                returnObj.passErr = "Please Enter your password"
                reject(returnObj);
                return;
            }
        } else if (body.passLog.length > 0) {
            returnObj.emailErr = "Please Enter your email";
            returnObj.pass = body.passLog;
            reject(returnObj)
            return;
        } else {
            returnObj.emailErr = "Please Enter your email"
            returnObj.passErr = "Please Enter your password"
            reject(returnObj)
            return;
        }

    });
};

module.exports.register = (body) => {
    return new Promise((resolve, reject) => {
        let returnObj = {
            first: null,
            firstErr: null,
            last: null,
            lastErr: null,
            email: null,
            emailErr: null,
            pass: null,
            passErr: null,
            passConfirm: null,
            passConfirmErr: null,
            phone: null,
            phoneErr: null,
            subscribe: null
        }
        if (body.first && body.last && body.phone && body.pass && body.passTwo && body.email) {
            //Check form for regExp if all entries made
            //Check Regexp for phone
            if (!(/^[0-9]{3}[-]?\s*[0-9]{3}[-]?\s*[0-9]{4}$/.test(body.phone))) {
                returnObj.phoneErr = "Please enter the following format ###-###-####"
            } else {
                returnObj.phone = body.phone;
            }
            //Check RegExp for password
            if (!(/^(?=.*[!@#$%^&*-+{}])(?=.*[A-Z])(?=.*\d).{8,32}$/.test(body.pass))) {
                returnObj.passErr = "Please create password with one Upper Case Letter, One Number and one special character (!@#$%^&*-+{})"
            } else {
                returnObj.pass = body.pass;
            }
            //Check RegExp for confirmed password
            if (!(/^(?=.*[!@#$%^&*-+{}])(?=.*[A-Z])(?=.*\d).{8,32}$/.test(body.passTwo))) {
                returnObj.passConfirmErr = "Please create password with one Upper Case Letter, One Number and one special character (!@#$%^&*-+{})"
            } else if (body.pass !== body.passTwo) {
                returnObj.passConfirmErr = "Please match passwords"
            } else {
                returnObj.passConfirm = body.passTwo;
            }
            //Check Regexp for email
            if (!(/^\w+[A-Za-z0-9]\.?\w*[A-Za-z0-9]@[a-zA-Z0-9]+\.[A-Za-z]{2,3}$/.test(body.email))) {
                returnObj.emailErr = "Please enter an appropriate email"
            } else {
                returnObj.email = body.email;
            }

            if ((returnObj.emailErr || returnObj.phoneErr || returnObj.passErr || returnObj.passConfirmErr)) {
                returnObj.first = body.first;
                returnObj.last = body.last;
                returnObj.subscribe = body.formOpt;
                reject(returnObj);
                return;
            } else {
                resolve(returnObj);
                return;
            }
        } else {
            //check all entries for missing information 
            //Assign error messages if null fields
            if (!body.first) {
                returnObj.firstErr = "Please fill out your first name"
            } else {
                returnObj.first = body.first;
            }

            if (!body.last) {
                returnObj.lastErr = "Please fill out your last name"
            } else {
                returnObj.last = body.last;
            }

            if (!body.phone) {
                returnObj.phoneErr = "Please fill out your phone number"
            } else {
                returnObj.phone = body.phone;
            }

            if (!body.pass) {
                returnObj.passErr = "Please fill out your password"
            } else {
                returnObj.pass = body.pass;
            }

            if (!body.passTwo) {
                returnObj.passConfirmErr = "Please confirm your password"
            } else {
                returnObj.passConfirm = body.passTwo;
            }

            if (!body.email) {
                returnObj.emailErr = "Please fill out your email"
            } else {
                returnObj.email = body.email;
            }

            reject(returnObj);
            return;
        }
    });
};