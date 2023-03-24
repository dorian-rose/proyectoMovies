

const showDashboard = (req,res) => {
    try {
        res.render('./userViews/dashboard.ejs')
    } catch (error) {
        console.log('FAILED to RENDER dashboard')
    }
}

module.exports = {
    showDashboard
}