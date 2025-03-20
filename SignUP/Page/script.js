// Initialize EmailJS after the page loads
window.onload = function () {
    emailjs.init("7vJ5Nt-XXSnvf14oK"); // Replace with your actual EmailJS User ID
};

// Generate a 6-digit OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}

// Send OTP for Signup
function sendOTP() {
    let email = document.getElementById("signup-email").value.trim();

    if (email === "") {
        alert("Please enter a valid email address.");
        return;
    }

    let otp = generateOTP();
    let otpExpiry = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes

    // Store OTP & expiry in session storage
    sessionStorage.setItem("signupOTP", JSON.stringify({ otp, otpExpiry }));

    let params = {
        to_email: email,
        passcode: otp
    };

    emailjs.send("service_tm2gk7f", "template_jprvkvu", params)
        .then(function(response) {
            console.log("OTP sent successfully!", response);
            alert("OTP sent to " + email);
        })
        .catch(function(error) {
            console.error("Error sending OTP:", error);
            alert("Failed to send OTP. Please try again.");
        });
}

// Verify OTP for Signup
function verifyOTP() {
    let enteredOTP = document.getElementById("signup-otp").value.trim();
    let storedData = sessionStorage.getItem("signupOTP");

    if (!storedData) {
        alert("No OTP found. Please request a new OTP.");
        return;
    }

    let { otp, otpExpiry } = JSON.parse(storedData);

    if (Date.now() > otpExpiry) {
        alert("OTP has expired. Please request a new OTP.");
        sessionStorage.removeItem("signupOTP");
        return;
    }

    if (enteredOTP == otp) {
        alert("Signup Successful!");
        sessionStorage.removeItem("signupOTP"); // Remove OTP after verification
    } else {
        alert("Invalid OTP. Try again.");
    }
}

// Send OTP for Login
function sendLoginOTP() {
    let email = document.getElementById("login-email").value.trim();

    if (!email) {
        alert("Enter a valid email");
        return;
    }

    let otp = generateOTP();
    let otpExpiry = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes

    sessionStorage.setItem("loginOTP", JSON.stringify({ otp, otpExpiry }));

    emailjs.send("service_tm2gk7f", "template_jprvkvu", {
        to_email: email,
        passcode: otp
    }).then(() => {
        alert("Login OTP Sent!");
    }).catch(error => {
        console.error("Error sending OTP:", error);
        alert("Failed to send OTP. Try again.");
    });
}

// Verify OTP for Login
function verifyLoginOTP() {
    let enteredOTP = document.getElementById("login-otp").value.trim();
    let storedData = sessionStorage.getItem("loginOTP");

    if (!storedData) {
        alert("No OTP found. Please request a new OTP.");
        return;
    }

    let { otp, otpExpiry } = JSON.parse(storedData);

    if (Date.now() > otpExpiry) {
        alert("OTP has expired. Please request a new OTP.");
        sessionStorage.removeItem("loginOTP");
        return;
    }

    if (enteredOTP == otp) {
        alert("Login Successful!");
        sessionStorage.removeItem("loginOTP");
    } else {
        alert("Invalid OTP. Try again.");
    }
}
