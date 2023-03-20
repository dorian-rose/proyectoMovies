const getTest = (req, res) => {
    res.render("userViews/testPage", {
        titulo: "Test Page",
        texto: "This is a description of test page",
    });
};

module.exports = { getTest }