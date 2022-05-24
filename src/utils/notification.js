
const content = (title, message, type) => {
    return {
        title: title,
        message: message,
        type: type,                              // 'default', 'success', 'info', 'warning'
        container: 'top-right',                // where to position the notifications
        animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
        animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
        dismiss: {
            duration: 4000,
            onScreen: true
        }
    }
}

module.exports = {
    content
}